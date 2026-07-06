import { google } from "googleapis";

const isGmailConfigured = () =>
  Boolean(
    process.env.GMAIL_CLIENT_ID &&
      process.env.GMAIL_CLIENT_SECRET &&
      process.env.GMAIL_REFRESH_TOKEN &&
      process.env.GMAIL_USER
  );

const getGmailClient = () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return google.gmail({ version: "v1", auth: oAuth2Client });
};

// Builds a raw base64url-encoded MIME message, which the Gmail API requires
const buildRawMessage = ({
  to,
  from,
  subject,
  html,
  text,
}: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}) => {
  const boundary = "boundary_hungryhearts_otp";

  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
    "",
    `--${boundary}--`,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<{ sent: boolean; devMode: boolean }> => {
  if (!isGmailConfigured()) {
    console.log(`📧 [DEV OTP] ${email} → ${otp}`);
    return { sent: true, devMode: true };
  }

  try {
    const gmail = getGmailClient();
    const from = `Hungry Hearts <${process.env.GMAIL_USER}>`;

    const raw = buildRawMessage({
      to: email,
      from,
      subject: "Your Hungry Hearts login code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes. Do not share this code.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #800000;">Hungry Hearts</h2>
          <p>Your one-time login code is:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #800000;">${otp}</p>
          <p style="color: #666; font-size: 14px;">Valid for 5 minutes. Do not share this code with anyone.</p>
        </div>
      `,
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return { sent: true, devMode: false };
  } catch (error) {
    console.error("Email send failed:", error);
    return { sent: false, devMode: false };
  }
};