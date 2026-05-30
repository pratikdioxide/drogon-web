---
name: Neon Auth proxy origin fix
description: Why the manual auth proxy must set origin to the Neon Auth server host, not the browser origin
---

## The Rule
In `app/api/auth/[...path]/route.ts`, the upstream `fetch()` to Neon Auth must set `origin` to the Neon Auth server's own origin (e.g. `https://ep-xxxx.neonauth.c-8.us-east-1.aws.neon.tech`), NOT the browser's `Origin` header.

**Why:** Neon Auth's `checkOrigin` validates incoming `origin` headers against its trusted origins list. The browser's Replit dev URL is not trusted, so it returns `{"code":"INVALID_ORIGIN","message":"Invalid origin"}` (403). The official `@neondatabase/auth/next` server handler (`prepareRequestHeaders`) sets `origin` to the Neon Auth server's own host — which IS in the trusted list. Setting `x-neon-auth-middleware: true` alone does not bypass origin checks when the origin value is untrusted.

**How to apply:** Derive origin from `NEON_AUTH_URL`:
```ts
const NEON_ORIGIN = new URL(process.env.NEON_AUTH_URL!).origin
// e.g. "https://ep-xxxx.neonauth.c-8.us-east-1.aws.neon.tech"
// then: headers['origin'] = NEON_ORIGIN
```

This is the same logic as the official handler's `safeAuthHost(baseUrl)` + `"https://" + safeHost`.
