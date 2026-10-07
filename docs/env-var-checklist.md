# Environment variable checklist

Names and purpose only. Do not paste real keys, project URLs, or passwords into this file. This checklist follows `docs/sponsor-auth-requirements.md`.

A `VITE_` prefix means Vite may copy that value into the browser bundle. Only public values get that prefix. The service-role key bypasses row-level security, so it must never use a `VITE_` prefix.

| Name | Client-safe or server-only | Used for | Never do this |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Client-safe | Public project URL for sign-in and sponsor requests that still obey row-level security | Do not treat the URL as a secret, and do not put a service-role key in this variable |
| `VITE_SUPABASE_ANON_KEY` | Client-safe | Public anon key for the auth session in the browser. Row-level security still limits which rows a sponsor can see | Do not put the service-role key here. The anon key is not a way to skip row-level security |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Admin bypass of row-level security in trusted server code only | Never prefix this name with `VITE_`. Never import it in browser code, commit a real value, or paste it into docs or screenshots |
| `SUPABASE_URL` | Server-only | Optional copy of the project URL for server reads that do not use the `VITE_` name | Do not put a key or password in this variable. It is a URL, not a secret bypass |

`.env.example` may be committed because it holds placeholders only. Real values belong in `.env` or `.env.local`, which Git ignores. `.env.example` itself stays tracked.
