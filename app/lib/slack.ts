interface ContactFields {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export async function sendSlackNotification(fields: ContactFields) {
  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("SLACK_CONTACT_WEBHOOK_URL is not set — skipping Slack notification");
    return;
  }

  const fullName = [fields.firstName, fields.lastName].filter(Boolean).join(" ");

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New Contact Form Submission", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${fullName || "—"}` },
          { type: "mrkdwn", text: `*Email:*\n${fields.email}` },
          { type: "mrkdwn", text: `*Company:*\n${fields.company || "—"}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${fields.message || "_No message provided_"}`,
        },
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Slack webhook returned ${res.status}`);
  }
}
