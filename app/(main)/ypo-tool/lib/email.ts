import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
  return new Resend(key);
}

export async function sendMagicLink(email: string, token: string) {
  const resend = getResend();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const magicLink = `${baseUrl}/api/ypo-tool/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "Campfire <noreply@getcampfire.com>",
    to: email,
    subject: "Your YPO Assessment Access Link",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F8F5FC; }
    .container { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
    .card { background: #ffffff; border-radius: 12px; padding: 40px 32px; }
    h1 { color: #1C1334; font-size: 24px; margin: 0 0 16px; }
    p { color: #636B7C; font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
    .button {
      display: inline-block;
      background: #6E3FCC;
      color: #ffffff !important;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 8px 0 24px;
    }
    .footer { color: #9CA3AF; font-size: 13px; margin-top: 32px; text-align: center; }
    .expiry { color: #9CA3AF; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>Access Your YPO Assessment</h1>
      <p>Click the button below to sign in to the Activating Behaviors assessment tool.</p>
      <a href="${magicLink}" class="button">Sign In</a>
      <p class="expiry">This link expires in 15 minutes and can only be used once.</p>
      <p class="expiry">If you didn't request this, you can safely ignore this email.</p>
    </div>
    <p class="footer">Sent by Campfire on behalf of YPO Marcoms</p>
  </div>
</body>
</html>
    `.trim(),
  });
}
