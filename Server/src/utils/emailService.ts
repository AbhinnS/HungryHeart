import { Resend } from "resend";

const isResendConfigured = () => Boolean(process.env.RESEND_API_KEY);

const resend = isResendConfigured()
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<{ sent: boolean; devMode: boolean }> => {
  if (!isResendConfigured() || !resend) {
    console.log(`📧 [DEV OTP] ${email} → ${otp}`);
    return { sent: true, devMode: true };
  }

  try {
    const from = process.env.SMTP_FROM || "Hungry Hearts <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to: email,
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

    if (error) {
      console.error("Email send failed:", error);
      return { sent: false, devMode: false };
    }

    console.log("Email sent:", data?.id);
    return { sent: true, devMode: false };
  } catch (error) {
    console.error("Email send failed:", error);
    return { sent: false, devMode: false };
  }
};