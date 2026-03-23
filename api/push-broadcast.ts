export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, message, url } = req.body;

  // ✅ Basic validation
  if (!title || !message || !url) {
    return res.status(400).json({
      error: "Missing required fields: title, message, url",
    });
  }

  // ✅ ENV validation
  if (!process.env.ONESIGNAL_APP_ID || !process.env.ONESIGNAL_REST_API_KEY) {
    return res.status(500).json({
      error: "OneSignal environment variables not configured",
    });
  }

  try {
    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.ONESIGNAL_APP_ID,
        included_segments: ["Subscribed Users"],
        headings: { en: title },
        contents: { en: message },
        url: url,
      }),
    });

    const data = await response.json();

    // ✅ Handle OneSignal API failure
    if (!response.ok) {
      return res.status(500).json({
        error: "OneSignal API error",
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      onesignal_response: data,
    });

  } catch (error) {
    console.error("Push broadcast error:", error);

    return res.status(500).json({
      error: "Push broadcast failed",
    });
  }
}
