import type { VercelRequest, VercelResponse } from '@vercel/node';

type PushBroadcastRequest = {
  title?: string;
  message?: string;
  url?: string;
  imageUrl?: string;
  segments?: string[];
  filters?: Array<Record<string, string>>;
  data?: Record<string, unknown>;
};

function getAuthToken(req: VercelRequest) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader?.startsWith('Bearer ')) {
    return authorizationHeader.slice('Bearer '.length).trim();
  }

  const secretHeader = req.headers['x-push-secret'];
  return typeof secretHeader === 'string' ? secretHeader : undefined;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.PUSH_BROADCAST_SECRET;
  const oneSignalAppId = process.env.ONESIGNAL_APP_ID;
  const oneSignalRestApiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!secret || !oneSignalAppId || !oneSignalRestApiKey) {
    return res.status(500).json({
      error: 'Push notifications are not configured on the server.',
    });
  }

  if (getAuthToken(req) !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    title = 'Vidya Infinity',
    message,
    url,
    imageUrl,
    segments,
    filters,
    data,
  } = (req.body || {}) as PushBroadcastRequest;

  if (!message) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  if (segments && filters) {
    return res.status(400).json({
      error: 'Choose either segments or filters for targeting, not both.',
    });
  }

  const payload: Record<string, unknown> = {
    app_id: oneSignalAppId,
    target_channel: 'push',
    headings: {
      en: title,
    },
    contents: {
      en: message,
    },
  };

  if (Array.isArray(filters) && filters.length > 0) {
    payload.filters = filters;
  } else {
    payload.included_segments =
      Array.isArray(segments) && segments.length > 0
        ? segments
        : ['Subscribed Users'];
  }

  if (url) {
    payload.url = url;
  }

  if (imageUrl) {
    payload.chrome_web_image = imageUrl;
  }

  if (data && Object.keys(data).length > 0) {
    payload.data = data;
  }

  try {
    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${oneSignalRestApiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('OneSignal API error:', responseData);
      return res.status(response.status).json(responseData);
    }

    return res.status(200).json({
      success: true,
      oneSignal: responseData,
    });
  } catch (error) {
    console.error('Push broadcast failed:', error);
    return res.status(500).json({ error: 'Unable to send the push broadcast.' });
  }
}
