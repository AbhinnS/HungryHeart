import nodemailer from "nodemailer";
import dns from "node:dns";

const isSmtpConfigured = () =>
  Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );

  if (typeof dns.setDefaultResultOrder === "function") {
    dns.setDefaultResultOrder("ipv4first");
  }
  
  const createTransporter = () => {
    // Use explicit configuration rather than service: "gmail"
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // MUST be your 16-character Google App Password
      },
      // Backup enforcement for Nodemailer's internal lookup
      connectionTimeout: 15000,
    });
  };
// const createTransporter = () =>
//   nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<{ sent: boolean; devMode: boolean }> => {
  if (!isSmtpConfigured()) {
    console.log(`📧 [DEV OTP] ${email} → ${otp}`);
    return { sent: true, devMode: true };
  }

  try {
    const transporter = createTransporter();
    const from =
      process.env.SMTP_FROM || `"Hungry Hearts" <${process.env.SMTP_USER}>`;

    await transporter.sendMail({
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

    return { sent: true, devMode: false };
  } catch (error) {
    console.error("Email send failed:", error);
    return { sent: false, devMode: false };
  }
};
