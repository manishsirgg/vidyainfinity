import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { Resend } from 'resend';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // ✅ Load Environment Variables Once
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
  const mailchimpDc = process.env.MAILCHIMP_DC;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!mailchimpApiKey || !mailchimpListId || !mailchimpDc) {
    console.error('Mailchimp environment variables missing');
    return res.status(500).json({ error: 'Mailchimp not configured' });
  }

  if (!resendApiKey) {
    console.error('Resend API key missing');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(resendApiKey);

  // ✅ Create Mailchimp subscriber hash
  const subscriberHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const mailchimpUrl = `https://${mailchimpDc}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${subscriberHash}`;

  try {
    // ✅ 1. Add or Update Contact in Mailchimp
    const mailchimpResponse = await fetch(mailchimpUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `anystring:${mailchimpApiKey}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: name || '',
          PHONE: phone || '',
          SERVICE: service || '',
        },
        tags: service
          ? [`SERVICE_${service.toUpperCase().replace(/\s+/g, '_')}`]
          : [],
      }),
    });

    if (!mailchimpResponse.ok) {
      const errorData = await mailchimpResponse.json();
      console.error('Mailchimp Error:', errorData);
      return res.status(400).json(errorData);
    }

    // ✅ 2. Send Internal Notification Email
    await resend.emails.send({
      from: 'Vidya Infinity <noreply@vidyainfinity.com>',
      to: 'info@vidyainfinity.com',
      subject: 'New Admission Inquiry',
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || ''}</p>
        <p><strong>Service:</strong> ${service || ''}</p>
        <p><strong>Message:</strong></p>
        <p>${message || ''}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}