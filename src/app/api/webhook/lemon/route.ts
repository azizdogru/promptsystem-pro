import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || process.env.LEMON_WEBHOOK_SECRET;

    // Strict HMAC-SHA256 signature verification if secret is provided
    if (secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (
        digest.length !== signatureBuffer.length ||
        !crypto.timingSafeEqual(digest, signatureBuffer)
      ) {
        console.error('Lemon Squeezy Webhook: Invalid HMAC signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else {
      console.warn('Lemon Squeezy Webhook: LEMONSQUEEZY_WEBHOOK_SECRET is not configured. Processing in test mode.');
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const eventName = payload?.meta?.event_name || 'unknown';
    console.log(`[LemonSqueezy Webhook] Received event: ${eventName}`);

    // Process order creation / completed payment
    if (eventName === 'order_created') {
      const attributes = payload?.data?.attributes || {};
      const customerEmail = attributes.user_email || attributes.customer_email;
      const customerName = attributes.user_name || 'Valued Customer';
      const orderNumber = attributes.order_number || attributes.identifier || '';
      const totalFormatted = attributes.total_formatted || '$9.90';
      const receiptUrl = attributes.urls?.receipt || '';
      const productName = attributes.first_order_item?.variant_name || attributes.first_order_item?.product_name || 'Enterprise AI Prompt Architecture & System Templates';

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app';
      const accessUrl = `${baseUrl}/success?order=${orderNumber}`;

      // Automated email delivery via Resend API
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey && customerEmail) {
        try {
          const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Enterprise AI Prompt Architecture & System Templates Is Ready</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .content { padding: 32px 24px; }
    .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin: 20px 0; }
    .info-box { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.5; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Payment Confirmed</h1>
      <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Order #${orderNumber} • ${totalFormatted}</p>
    </div>
    <div class="content">
      <p>Hello <strong>${customerName}</strong>,</p>
      <p>Thank you for your order. Your official <strong>${productName}</strong> has been generated and is ready for permanent download.</p>
      
      <div style="text-align: center;">
        <a href="${accessUrl}" class="btn">Download Official Document (PDF)</a>
      </div>

      <div class="info-box">
        <strong>Document Instructions:</strong>
        <ul style="margin: 8px 0 0; padding-left: 20px;">
          <li>Review all names, dates, and terms for complete accuracy.</li>
          <li>Save a signed copy for your permanent records.</li>
          <li>If required, notarize or serve according to your state statutory instructions.</li>
        </ul>
      </div>

      ${receiptUrl ? `<p style="font-size: 13px; color: #64748b;">Official Lemon Squeezy Receipt: <a href="${receiptUrl}" style="color: #2563eb;">View Receipt</a></p>` : ''}
    </div>
    <div class="footer">
      <p>Instant Statutory Document Delivery System • 256-Bit SSL Encrypted</p>
    </div>
  </div>
</body>
</html>
          `.trim();

          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: process.env.EMAIL_FROM || 'PromptSystemPro Orders <orders@promptsystem-pro.com>',
              to: [customerEmail],
              subject: `Your Official Enterprise AI Prompt Architecture & System Templates is Ready (Order #${orderNumber})`,
              html: emailHtml,
            }),
          });

          if (!resendResponse.ok) {
            const errBody = await resendResponse.text();
            console.error('[LemonSqueezy Webhook] Resend delivery failed:', errBody);
          } else {
            console.log(`[LemonSqueezy Webhook] Document delivery email dispatched to ${customerEmail}`);
          }
        } catch (emailErr) {
          console.error('[LemonSqueezy Webhook] Error sending delivery email:', emailErr);
        }
      } else {
        console.log(`[LemonSqueezy Webhook] Order recorded for ${customerEmail}. RESEND_API_KEY not configured, skipping email.`);
      }
    }

    return NextResponse.json({
      received: true,
      event: eventName,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[LemonSqueezy Webhook] Handler error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal webhook error' },
      { status: 500 }
    );
  }
}
