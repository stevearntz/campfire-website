import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
  return new Resend(key);
}

function baseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_ENV === "production")
    return "https://www.getcampfire.com";
  return "http://localhost:3000";
}

export async function sendMagicLink(email: string, token: string) {
  const resend = getResend();
  const magicLink = `${baseUrl()}/api/presentations/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "Campfire <noreply@getcampfire.com>",
    to: email,
    subject: "Your sign-in link for Tell It So It Moves",
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
    .eyebrow { color: #6E3FCC; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 12px; }
    h1 { color: #1C1334; font-size: 24px; margin: 0 0 16px; }
    p { color: #636B7C; font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
    .button { display: inline-block; background: #6E3FCC; color: #ffffff !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 8px 0 24px; }
    .expiry { color: #9CA3AF; font-size: 14px; }
    .footer { color: #9CA3AF; font-size: 13px; margin-top: 32px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <p class="eyebrow">Tell It So It Moves</p>
      <h1>Sign in to your course</h1>
      <p>Click the button below to pick up where you left off — your presentation, your worksheets, and your coaching track.</p>
      <a href="${magicLink}" class="button">Sign in</a>
      <p class="expiry">This link expires in 15 minutes.</p>
      <p class="expiry">If you didn't request this, you can safely ignore this email.</p>
    </div>
    <p class="footer">Sent by Campfire</p>
  </div>
</body>
</html>
    `.trim(),
  });
}
