# Push notifications

This project now supports browser push notifications through OneSignal.

## What it covers

- **Subscriber opt-in from the website** using the footer CTA.
- **Blog alerts** when you publish a new article.
- **Marketing campaigns** to all push subscribers or to a specific OneSignal segment.
- **Server-side broadcast endpoint** for manual sends or CMS/deployment hooks.
- **Explicit audience selection** so a request cannot accidentally send to all subscribers.

## Required environment variables

Add these variables in Vercel:

- `VITE_ONESIGNAL_APP_ID` — public app ID used by the browser SDK.
- `ONESIGNAL_APP_ID` — the same OneSignal app ID for server-to-server sends.
- `ONESIGNAL_REST_API_KEY` — REST API key from OneSignal.
- `PUSH_BROADCAST_SECRET` — shared secret used to protect `/api/push/broadcast`.

## OneSignal dashboard setup

1. Create a **Web Push** app in OneSignal for `https://vidyainfinity.com`.
2. Add the site icon and default notification icon.
3. Keep **auto prompt disabled** so the site only asks for permission after a user clicks the CTA.
4. Optional but recommended: create segments or categories such as:
   - `Blog Updates`
   - `Marketing`
   - `Deadlines`

## Send a blog notification

```bash
curl -X POST https://vidyainfinity.com/api/push/broadcast \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PUSH_BROADCAST_SECRET" \
  -d '{
    "title": "New blog is live",
    "message": "Read our latest guide to studying in Canada in 2026.",
    "sendToAll": true,
    "url": "https://vidyainfinity.com/blog/study-in-canada-2026"
  }'
```

## Send a marketing campaign to a specific segment

```bash
curl -X POST https://vidyainfinity.com/api/push/broadcast \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PUSH_BROADCAST_SECRET" \
  -d '{
    "title": "Free counselling slots open",
    "message": "Book your April counselling session before seats fill up.",
    "segments": ["Marketing"],
    "url": "https://vidyainfinity.com/#contact"
  }'
```

## Suggested workflow

- When a new blog post is merged and deployed, call `/api/push/broadcast` from your release checklist or CI workflow.
- For campaigns, either use the protected API endpoint above or send the push directly from the OneSignal dashboard.
- Use OneSignal segments to separate subscribers who want blogs versus marketing messages.
- The broadcast API requires an explicit audience on every request: `sendToAll`, `segments`, or `filters`.
