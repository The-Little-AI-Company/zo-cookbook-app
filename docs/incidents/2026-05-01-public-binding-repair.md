# Zo Cookbook public binding repair log — 2026-05-01

## Intent

- Preserve the 650-recipe cookbook source/data safely.
- Avoid editing `zosite.json` system fields by hand.
- Use Zo tooling for publish/service work.
- Restore public access for `https://zo-cookbook-app-jeffkazzee.zocomputer.io/` and `https://www.zo-cookbook.space/`.

## Action log

- 2026-05-01T17:38:56Z Started repair session.
- 2026-05-01T17:38:56Z Creating backup archive: `backups/zo-cookbook-source-data-20260501T173856Z.tar.gz`.
  - SHA256: `98d39bfa1cb5c666b22bb2352c0841ecd1600ad9565c261b5deca5683c00f816`
- 2026-05-01T17:39:41Z Review: backup archive kept on disk but not committed to avoid repo bloat. Added `backups/` to `.gitignore`.
- 2026-05-01T17:39:41Z Staged cookbook source/data files, generated runtime JSON, scripts, pages, README, incident log, lockfile, and content quality notes.
- 2026-05-01T17:40:21Z Verification before source/data commit: typecheck passed, build passed, dev rootLen=16376 with expected 650-recipe text and nav/social links.
- 2026-05-01T17:40:43Z Source/data commit complete: `461e74c Track cookbook source data and incident log`.
- 2026-05-01T17:40:43Z Remaining untracked files were handoff/planning scratch files only; not included in app commit.
- 2026-05-01T17:40:43Z Started Zo-tooling public binding repair attempt: `publish_site(public=true)`.
- 2026-05-01T17:42:46Z `publish_site` returned success, but both public URL and custom domain stayed HTTP 520 for six attempts.
- 2026-05-01T17:42:46Z Attempted one in-place `update_user_service` on `svc__3r4CN1GbeY`; no duplicate service, no domain edit.
- 2026-05-01T17:43:00Z `update_user_service` attempt failed validation before changing anything: `env_vars` empty string is not valid JSON. Retried with service ID only.
- 2026-05-01T17:45:05Z Review checkpoint: recreate was justified. `service_doctor` said app was healthy but public route broken; `publish_site` and one in-place `update_user_service` did not clear HTTP 520.
- 2026-05-01T17:45:05Z Deleted wedged published service `svc__3r4CN1GbeY`, then republished the Zo Site with `publish_site(public=true)`. Expected risk: temporary detach of `www.zo-cookbook.space`.
- 2026-05-01T17:48:24Z Site publish recreated service as `svc_Z7KyzizcLuA` but reused local port 51283; FRP still reported `start error: port already used`. Custom domain was detached from the new service.
- 2026-05-01T17:48:24Z Next step: delete broken service and recreate as managed HTTP service on a fresh unused port from canonical workdir.
- 2026-05-01T17:51:14Z Fresh service `svc_aFtD4e2uRxc` registered on local port 51300, but `service_doctor` showed old process still listening on 51283 and port 51300 not listening. Needed in-place restart/update for new service to bind fresh port.
- 2026-05-01T17:54:14Z Diagnosis: `svc_aFtD4e2uRxc` config said local_port=51300, but running process env showed PORT=51283 and local 51283 returned 200 while 51300 did not listen. Updated service entrypoint to explicitly bind PORT=51300.
- 2026-05-05T02:28:44Z Custom domain re-added correctly as `www.zo-cookbook.space`; Zo later marked it active. The old malformed `https://www.zo-cookbook.space` entry still appeared as `pending_cname` in service metadata.
- 2026-05-05T02:34:13Z Verified DNS: `www.zo-cookbook.space` resolved through CNAME `cname.zocomputer.io`. Public HTTPS request to `https://www.zo-cookbook.space/` still returned Cloudflare HTTP 520 Host Error.
- 2026-05-05T02:34:45Z Ran one supported in-place `update_user_service` restart for `svc_aFtD4e2uRxc`. Service remained attached to active `www.zo-cookbook.space` domain after metadata refreshed.
- 2026-05-05T02:36:25Z Verified local app health directly at `http://127.0.0.1:51300/`: HTTP 200, 1006-byte HTML, title `Zo Cookbook — 650 Ideas, Automations & Prompts`.
- 2026-05-05T02:37:18Z Rechecked public endpoints after delay: both `https://zo-cookbook-app-jeffkazzee.zocomputer.io/` and `https://www.zo-cookbook.space/` still returned HTTP 520. `service_doctor` reported app process running/listening on 51300 but public route broken; FRP logs repeatedly showed `svc_svc_aFtD4e2uRxc start error: port already used`.
- 2026-05-05T02:37:18Z Critique: DNS was no longer the blocker. Domain activation had succeeded. The app was healthy locally. The remaining failure was Zo public tunnel/binding infrastructure for `svc_aFtD4e2uRxc`. Do not keep editing DNS or app code for this symptom.
- 2026-05-07T19:37Z Recurrence observed: `service_doctor` showed `zo-cookbook-app` running and listening on local port 51300, but both public endpoints returned HTTP 520. FRP logs continued to show `svc_svc_aFtD4e2uRxc start error: port already used`.
- 2026-05-07T19:40Z In-place `update_user_service` restart succeeded but did not clear the tunnel failure. Metadata then showed no custom domains attached.
- 2026-05-07T19:41Z Created backup archive `backups/zo-cookbook-app-pre-service-reset-20260507T194150Z.tar.gz` before destructive service work.
  - SHA256: `7b67ad209325952fed53f14851a8aa793299ed81f22d30a77f7a62beeb011a23`
- 2026-05-07T19:41Z Verified app health before service replacement: `bun run build` passed, local `http://127.0.0.1:51300` returned HTTP 200, public `https://zo-cookbook-app-jeffkazzee.zocomputer.io` returned HTTP 520.
- 2026-05-07T19:42Z Deleted wedged service `svc_aFtD4e2uRxc` and created clean service `svc_NXWzcBErz84` on local port 51400 from canonical workdir `/home/workspace/Projects/zo-cookbook-app`.
- 2026-05-07T19:43Z Critique checkpoint: clean service fixed the managed public URL. `https://zo-cookbook-app-jeffkazzee.zocomputer.io` returned HTTP 200; local `http://127.0.0.1:51400` returned HTTP 200; `service_doctor` reported the new service healthy.
- 2026-05-07T19:45Z Verified public CSS and JS assets return HTTP 200. Visual browser screenshot confirmed the Zo Cookbook UI renders.
- 2026-05-07T19:45Z Custom domain `www.zo-cookbook.space` is currently detached from the clean service and returns TLS handshake failure instead of the previous 520. There is no exposed tool for adding custom domains directly; reattach through Zo Hosting UI: service `svc_NXWzcBErz84`, domain `www.zo-cookbook.space`, CNAME target `cname.zocomputer.io`.

## Current state after 2026-05-07 reset

- Active service: `svc_NXWzcBErz84`
- Public managed URL: `https://zo-cookbook-app-jeffkazzee.zocomputer.io`
- Local port: `51400`
- Status: service healthy, managed URL HTTP 200, assets HTTP 200, visual render verified
- Custom domain: not attached; must be reattached through supported Zo Hosting UI

## Lesson

When this site returns public HTTP 520 while local production is healthy, suspect a stale Zo service/tunnel binding before suspecting app code. The reliable fix has been to preserve source/data, delete the wedged service record, register a clean HTTP service on a fresh port, verify the managed URL, then reattach the custom domain once the clean service is stable.
