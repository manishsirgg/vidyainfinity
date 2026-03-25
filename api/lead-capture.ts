import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, source, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY!;
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID!;
  const mailchimpDc = process.env.MAILCHIMP_DC!;

  const oneSignalAppId = process.env.ONESIGNAL_APP_ID!;
  const oneSignalRestKey = process.env.ONESIGNAL_REST_API_KEY!;

  const resend = new Resend(process.env.RESEND_API_KEY!);

  const subscriberHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  try {
    // ⭐ MAILCHIMP
    await fetch(
      `https://${mailchimpDc}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `any:${mailchimpApiKey}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: {
            FNAME: name || "",
            PHONE: phone || "",
            SERVICE: service || "",
          },
          tags: [
            service ? `SERVICE_${service}` : "GENERAL",
            source ? `SOURCE_${source}` : "SOURCE_WEBSITE",
          ],
        }),
      }
    );

    // ⭐ ONESIGNAL CONTACT TAG
    await fetch("https://onesignal.com/api/v1/players", {
      method: "POST",
      headers: {
        Authorization: `Basic ${oneSignalRestKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: oneSignalAppId,
        identifier: email,
        device_type: 11,
        tags: {
          lead_source: source || "website",
          interest: service || "general",
        },
      }),
    });

    // ⭐ INTERNAL EMAIL
    await resend.emails.send({
      from: "Vidya Infinity <noreply@vidyainfinity.com>",
      to: "info@vidyainfinity.com",
      subject: "New Lead Received",
      html: `
        <h2>New Lead</h2>
        <p>Name: ${name || ""}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone || ""}</p>
        <p>Service: ${service || ""}</p>
        <p>Source: ${source || ""}</p>
        <p>Message: ${message || ""}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lead capture failed" });
  }
}
