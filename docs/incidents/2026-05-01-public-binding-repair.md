# Zo Cookbook public binding repair log — 2026-05-01

## Intent
- Preserve the 650-recipe cookbook source/data safely.
- Avoid editing `zosite.json` system fields by hand.
- Use Zo tooling for publish/service work.
- Restore public access for `https://zo-cookbook-app-jeffkazzee.zocomputer.io/` and `https://www.zo-cookbook.space/`.

## Action log
- 2026-05-01T17:38:56Z Started repair session.
- 2026-05-01T17:38:56Z Creating backup archive: backups/zo-cookbook-source-data-20260501T173856Z.tar.gz
98d39bfa1cb5c666b22bb2352c0841ecd1600ad9565c261b5deca5683c00f816  backups/zo-cookbook-source-data-20260501T173856Z.tar.gz
- 2026-05-01T17:39:41Z Review: backup archive kept on disk but not committed to avoid repo bloat. Added backups/ to .gitignore.
- 2026-05-01T17:39:41Z Staged cookbook source/data files, generated runtime JSON, scripts, pages, README, incident log, lockfile, and content quality notes.
- 2026-05-01T17:40:21Z Verification before source/data commit: typecheck passed, build passed, dev rootLen=16376 with expected 650-recipe text and nav/social links.
- 2026-05-01T17:40:43Z Source/data commit complete: 461e74c Track cookbook source data and incident log.
- 2026-05-01T17:40:43Z Remaining untracked files are handoff/planning scratch files only; not included in app commit.
- 2026-05-01T17:40:43Z Starting Zo-tooling public binding repair attempt: publish_site(public=true).
- 2026-05-01T17:42:46Z publish_site returned success, but both public URL and custom domain stayed HTTP 520 for six attempts.
- 2026-05-01T17:42:46Z Attempting one in-place update_user_service on svc__3r4CN1GbeY; no duplicate service, no domain edit.
- 2026-05-01T17:43:00Z update_user_service attempt failed validation before changing anything: env_vars empty string is not valid JSON. Retrying with service_id only.
- 2026-05-01T17:45:05Z Review checkpoint: Recreate is justified. service_doctor says app is healthy but public route broken; workaround is delete_user_service/register_user_service. publish_site and one in-place update_user_service did not clear HTTP 520.
- 2026-05-01T17:45:05Z Proceeding to delete wedged published service svc__3r4CN1GbeY, then republish the Zo Site with publish_site(public=true). This may temporarily detach www.zo-cookbook.space.
- 2026-05-01T17:48:24Z Site publish recreated service as svc_Z7KyzizcLuA but reused local_port 51283; FRP still reports start error: port already used. Custom domain is currently detached from the new service.
- 2026-05-01T17:48:24Z Next step: delete broken service and recreate as managed HTTP service on a fresh unused port from canonical workdir.
