# Bug: Stale Zo Service Tunnel Binding

## Plain-English diagnosis

The app is not broken. The public service record is.

This bug happens when the Zo Cookbook production server is healthy locally, but Zo's public tunnel keeps routing to a wedged service binding. The public URL returns 520 even though the app builds, starts, and answers on localhost.

Do not start by rewriting app code. Do not start by editing DNS. The failure is usually the service/tunnel binding.

## Known historical example

- Wedged service: `svc_aFtD4e2uRxc`
- Wedged port: `51300`
- Clean replacement service: `svc_NXWzcBErz84`
- Clean replacement port: `51400`
- Managed URL: `https://zo-cookbook-app-jeffkazzee.zocomputer.io`
- Custom domain: `www.zo-cookbook.space`
- Related incident log: `docs/incidents/2026-05-01-public-binding-repair.md`

Use these as examples, not permanent truth. Always inspect current state first.

Tool-call examples in this document are written as pseudo-calls. They are Zo service tools, not shell commands. Bash commands are shown in fenced `bash` blocks.

## Symptoms, in diagnostic order

### 1. Public managed URL fails

Check the Zo-managed public URL first:

```bash
curl -s -o /tmp/cookbook-public.html \
  -w 'public: %{http_code} bytes:%{size_download}\n' \
  https://zo-cookbook-app-jeffkazzee.zocomputer.io \
  --max-time 20
```

Bug sign:

```text
public: 520 bytes:7357
```

A 520 here matters more than the custom domain. If the managed URL is down, the problem is not DNS for `www.zo-cookbook.space`.

### 2. Custom domain also fails

Then check the custom domain:

```bash
curl -s -o /tmp/cookbook-custom.html \
  -w 'custom: %{http_code} err:%{errormsg}\n' \
  https://www.zo-cookbook.space \
  --max-time 20 || true
```

Bug signs:

```text
custom: 520
```

or, after the bad service has been replaced but the domain is not reattached yet:

```text
custom: 000 err:OpenSSL/... sslv3 alert handshake failure
```

That second one means the domain is detached, not that the app is dead.

### 3. `service_doctor` says the app process is healthy

Run service diagnostics on the current cookbook service by label or ID:

```text
service_doctor("zo-cookbook-app")
```

Bug signs:

- process manager is running
- tunnel client is connected
- `zo-cookbook-app` is `RUNNING`
- logs include `Started server: http://localhost:<port>`
- diagnosis says the service appears healthy, or says local service is healthy while the public route is broken

This is the main split: healthy local app, broken public route.

### 4. Build passes

From the repo root:

```bash
bun run build
```

Bug sign:

```text
✓ built
```

Ignore harmless Vite warnings like:

```text
Generated an empty chunk: "data".
```

That warning is not the outage.

### 5. Local service returns 200

Use the current service port from `service_doctor`. Historical examples were `51300` and `51400`.

```bash
curl -s -o /tmp/cookbook-local.html \
  -w 'local: %{http_code} bytes:%{size_download}\n' \
  http://127.0.0.1:<PORT> \
  --max-time 10
```

Bug sign:

```text
local: 200 bytes:1006
```

If local is 200 but public is 520, stop blaming React, Vite, Hono, or recipe data.

### 6. Public assets may fail before reset and pass after reset

Once the managed URL returns 200, verify assets too:

```bash
curl -s -o /tmp/cookbook-public.html \
  -w 'public: %{http_code} bytes:%{size_download}\n' \
  https://zo-cookbook-app-jeffkazzee.zocomputer.io \
  --max-time 20
```

Then run a small Python snippet to print asset paths matching `/assets/...css` and `/assets/...js`:

```bash
python3 - <<'PY'
import re
from pathlib import Path
html = Path('/tmp/cookbook-public.html').read_text(errors='ignore')
paths = sorted(set(re.findall(r'/(assets/[^"\']+\.(?:css|js))', html)))
for path in paths:
    print(f'https://zo-cookbook-app-jeffkazzee.zocomputer.io/{path}')
PY
```

Then curl each printed URL:

```bash
curl -s -o /tmp/cookbook-asset-check.out \
  -w 'asset: %{http_code} bytes:%{size_download}\n' \
  '<PRINTED_ASSET_URL>' \
  --max-time 20
```

Expected fixed sign:

```text
asset: 200
```

Hardcoded hashed filenames from an old incident are only examples and should not be trusted.

### 7. FRP logs show `port already used`

Check recent tunnel logs:

```bash
grep -Ei 'zo-cookbook-app|start error|start proxy success|port already used|Started server' \
  /dev/shm/frpc-frp-standard-5.log \
  /dev/shm/zo-cookbook-app.log \
  /dev/shm/zo-cookbook-app_err.log 2>/dev/null | tail -160
```

Bug sign:

```text
[svc_svc_aFtD4e2uRxc] start error: port already used
```

The exact service ID will change. The important pattern is:

```text
[svc_svc_<cookbook-service-id>] start error: port already used
```

That is the rotten smell. It means the tunnel binding is wedged around a stale service record.

## What not to do

Do not:

- rewrite app code just because the public URL is 520
- edit `zosite.json` system-managed fields by hand
- force random `PORT=...` hacks unless there is a verified port mismatch
- keep restarting the same bad service forever
- delete/recreate multiple services without taking notes
- add `https://www.zo-cookbook.space` as a custom domain
- treat custom-domain failure as DNS if the managed URL is also failing

The malformed domain entry `https://www.zo-cookbook.space` was ghost data from a bad custom-domain add. The correct custom domain is only:

```text
www.zo-cookbook.space
```

No protocol. No slash.

## Fix walkthrough

### Step 0 — Name the risk before touching anything

This fix can temporarily detach `www.zo-cookbook.space`. That is acceptable if it is already returning 520, but write it down before acting.

Target outcome:

1. Preserve source/data.
2. Prove app health locally.
3. Replace the wedged service record.
4. Verify the managed public URL.
5. Reattach the custom domain only after the managed URL works.

### Step 1 — Inspect current state

Run:

```text
service_doctor("zo-cookbook-app")
```

Record:

- current service ID
- current local port
- current entrypoint
- current workdir
- whether custom domains are attached
- whether logs show `port already used`

Also check repo status:

```bash
git status --short
```

Do not mix service repair with unrelated untracked files.

### Step 2 — Back up the project

From `Projects/zo-cookbook-app`:

```bash
set -euo pipefail
mkdir -p backups
stamp=$(date -u +%Y%m%dT%H%M%SZ)
archive="backups/zo-cookbook-app-pre-service-reset-${stamp}.tar.gz"
tar --exclude='./node_modules' \
    --exclude='./dist' \
    --exclude='./.git' \
    --exclude='./backups' \
    -czf "$archive" .
sha256sum "$archive"
ls -lh "$archive"
```

If `tar` reports `file changed as we read it`, rerun once. That usually means build/service files moved while the archive was being created.

### Step 3 — Prove the app itself is healthy

Run:

```bash
bun run build
```

Then check local production on the current service port from `service_doctor`:

```bash
curl -s -o /tmp/cookbook-local-before-reset.html \
  -w 'local-before-reset: %{http_code} bytes:%{size_download}\n' \
  http://127.0.0.1:<CURRENT_PORT> \
  --max-time 10
```

Expected:

```text
local-before-reset: 200
```

Then confirm public is still broken:

```bash
curl -s -o /tmp/cookbook-public-before-reset.html \
  -w 'public-before-reset: %{http_code} bytes:%{size_download}\n' \
  https://zo-cookbook-app-jeffkazzee.zocomputer.io \
  --max-time 10
```

Expected bug confirmation:

```text
public-before-reset: 520
```

If build fails or local is not 200, stop. That is a different bug.

### Step 4 — Delete only the wedged service

Use the supported Zo service tool, not manual process killing.

Delete the specific service ID that `service_doctor` identified as the current wedged cookbook service:

```text
delete_user_service({ service_id: "<WEDGED_SERVICE_ID>" })
```

Historical example:

```text
delete_user_service({ service_id: "svc_aFtD4e2uRxc" })
```

Do not delete unrelated services like `idea-pad`, `skillmark`, `gitea`, or anything else just because they are listed nearby.

### Step 5 — Pick a fresh unused local port

Use a small Python check:

```bash
python3 - <<'PY'
import socket
for port in range(51400, 51450):
    s = socket.socket()
    s.settimeout(.1)
    busy = s.connect_ex(('127.0.0.1', port)) == 0
    s.close()
    if not busy:
        print(port)
        break
PY
```

Use the printed port for the new service.

### Step 6 — Register a clean service

Create a new managed HTTP service from the canonical project workdir.

Use:

```text
register_user_service({
  label: "zo-cookbook-app",
  mode: "http",
  local_port: <FRESH_PORT>,
  entrypoint: "bash -c 'bun run prod'",
  workdir: "/home/workspace/Projects/zo-cookbook-app",
  env_vars: "{\"NODE_ENV\":\"production\",\"ZO_CLIENT_IDENTITY_TOKEN\":\"none\"}",
  public: "true"
})
```

Historical fixed example:

```text
register_user_service({
  label: "zo-cookbook-app",
  mode: "http",
  local_port: 51400,
  entrypoint: "bash -c 'bun run prod'",
  workdir: "/home/workspace/Projects/zo-cookbook-app",
  env_vars: "{\"NODE_ENV\":\"production\",\"ZO_CLIENT_IDENTITY_TOKEN\":\"none\"}",
  public: "true"
})
```

Why this shape:

- `server.ts` reads `process.env.PORT` first.
- Zo injects the selected service port for HTTP services.
- The command does not hardcode `PORT=...` inside the entrypoint.
- The workdir stays canonical.

### Step 7 — Critique checkpoint before touching the custom domain

Stop and verify the managed URL before doing anything with `www.zo-cookbook.space`.

Run:

```text
service_doctor("<NEW_SERVICE_ID>")
```

Then:

```bash
sleep 8
curl -s -o /tmp/cookbook-public-after-reset.html \
  -w 'public-after-reset: %{http_code} bytes:%{size_download}\n' \
  https://zo-cookbook-app-jeffkazzee.zocomputer.io \
  --max-time 20

curl -s -o /tmp/cookbook-local-after-reset.html \
  -w 'local-after-reset: %{http_code} bytes:%{size_download}\n' \
  http://127.0.0.1:<FRESH_PORT> \
  --max-time 15
```

Expected fixed signs:

```text
public-after-reset: 200
local-after-reset: 200
```

If public is still 520 after the clean service, stop. Do not keep poking. Prepare a support handoff with service ID, logs, curl output, and attempted fixes.

### Step 8 — Verify page shell and assets

Check the HTML:

```bash
python3 - <<'PY'
from pathlib import Path
html = Path('/tmp/cookbook-public-after-reset.html').read_text(errors='ignore')
for needle in ['Zo Cookbook', '/assets/index-', '<div id="root"']:
    print(f'{needle}:', needle in html)
print(html[:220].replace('\n', ' '))
PY
```

Expected:

```text
Zo Cookbook: True
/assets/index-: True
<div id="root": True
```

Then check the actual asset URLs found in `/tmp/cookbook-public-after-reset.html`.

```bash
python3 - <<'PY'
import re
from pathlib import Path
html = Path('/tmp/cookbook-public-after-reset.html').read_text(errors='ignore')
paths = sorted(set(re.findall(r'/(assets/[^"\']+\.(?:css|js))', html)))
for path in paths:
    print(f'https://zo-cookbook-app-jeffkazzee.zocomputer.io/{path}')
PY
```

Then curl each printed URL and expect HTTP 200.

Optional visual check:

```bash
agent-browser open https://zo-cookbook-app-jeffkazzee.zocomputer.io
sleep 4
agent-browser screenshot --full /home/.z/workspaces/<conversation-id>/cookbook-public-after-reset.png
```

Do not report localhost URLs to the user.

### Step 9 — Reattach the custom domain

Only do this after the managed URL returns 200.

Use Zo Hosting UI:

- Open [Hosting → Services](/?t=sites&s=services)
- Open service: `zo-cookbook-app`
- Confirm service ID matches the new clean service
- Add custom domain: `www.zo-cookbook.space`
- CNAME target should be: `cname.zocomputer.io`

Do not add:

```text
https://www.zo-cookbook.space
```

After reattaching, verify:

```bash
curl -s -o /tmp/cookbook-custom-after-reattach.html \
  -w 'custom-after-reattach: %{http_code} bytes:%{size_download}\n' \
  https://www.zo-cookbook.space \
  --max-time 20
```

Expected:

```text
custom-after-reattach: 200
```

### Step 10 — Document what changed

Update the incident log:

```text
docs/incidents/2026-05-01-public-binding-repair.md
```

Include:

- old service ID
- new service ID
- old port
- new port
- backup archive path and SHA256
- build/local/public verification results
- whether the custom domain is attached
- any remaining blocker

Then commit only the relevant doc changes.

## Fast decision tree

```text
Public managed URL 520?
  No → This is not this bug.
  Yes → Check local service.

Local service 200 and build passes?
  No → App bug. Debug code/build/server.
  Yes → Check FRP logs.

FRP shows cookbook service `port already used`?
  No → Possible Zo platform outage. Gather support handoff.
  Yes → Stale service tunnel binding. Replace service record.

Clean replacement service returns managed URL 200?
  No → Stop and escalate with evidence.
  Yes → Verify assets/render, then reattach custom domain.
```

## Final done checklist

- [ ] Backup created under `backups/` and kept out of git
- [ ] `bun run build` passes
- [ ] Old local port checked
- [ ] Managed public URL confirmed broken before reset
- [ ] Wedged service deleted by exact service ID
- [ ] Clean service registered from `/home/workspace/Projects/zo-cookbook-app`
- [ ] New service healthy in `service_doctor`
- [ ] Managed public URL returns HTTP 200
- [ ] CSS and JS assets return HTTP 200
- [ ] Visual render checked
- [ ] `www.zo-cookbook.space` reattached only after managed URL works
- [ ] Incident log updated
- [ ] Relevant docs committed

## Why this keeps happening to this site

The cookbook had old workaround state around published ports, service replacement, and a malformed custom-domain entry. That combination made the service record easier to wedge than simpler services.

The fix is not mystical. Burn the stale binding, keep the source, create a clean service, verify public routing, then put the domain back. Surgical arson, basically.
