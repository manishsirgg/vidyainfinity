import type { VercelRequest, VercelResponse } from '@vercel/node';

type PushBroadcastRequest = {
  title?: string;
  message?: string;
  url?: string;
  imageUrl?: string;
  sendToAll?: boolean;
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

function normalizeSegments(segments: unknown) {
  if (!Array.isArray(segments)) {
    return [];
  }

  return segments
    .filter((segment): segment is string => typeof segment === 'string')
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function normalizeFilters(filters: unknown) {
  if (!Array.isArray(filters)) {
    return [];
  }

  return filters.filter(
    (filter): filter is Record<string, string> =>
      Boolean(filter) && typeof filter === 'object' && !Array.isArray(filter)
  );
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
    sendToAll = false,
    segments,
    filters,
    data,
  } = (req.body || {}) as PushBroadcastRequest;

  const normalizedMessage = typeof message === 'string' ? message.trim() : '';
  const normalizedSegments = normalizeSegments(segments);
  const normalizedFilters = normalizeFilters(filters);
  const targetingModes = [
    sendToAll,
    normalizedSegments.length > 0,
    normalizedFilters.length > 0,
  ].filter(Boolean).length;

  if (!normalizedMessage) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  if (targetingModes !== 1) {
    return res.status(400).json({
      error:
        'Choose exactly one audience: set sendToAll=true, provide segments, or provide filters.',
    });
  }

  const payload: Record<string, unknown> = {
    app_id: oneSignalAppId,
    target_channel: 'push',
    headings: {
      en: typeof title === 'string' && title.trim() ? title.trim() : 'Vidya Infinity',
    },
    contents: {
      en: normalizedMessage,
    },
  };

  if (sendToAll) {
    payload.included_segments = ['Subscribed Users'];
  } else if (normalizedSegments.length > 0) {
    payload.included_segments = normalizedSegments;
  } else {
    payload.filters = normalizedFilters;
  }

  if (typeof url === 'string' && url.trim()) {
    payload.url = url.trim();
  }

  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    payload.chrome_web_image = imageUrl.trim();
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
