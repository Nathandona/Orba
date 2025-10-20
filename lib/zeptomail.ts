import nodemailer from 'nodemailer';

if (!process.env.ZEPTOMAIL_USER || !process.env.ZEPTOMAIL_PASS) {
  throw new Error('ZEPTOMAIL_USER and ZEPTOMAIL_PASS must be set in environment variables');
}

// Create ZeptoMail transporter using SMTP
export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.zeptomail.eu',
  port: 587, // Using TLS
  secure: false, // true for 465 (SSL), false for 587 (TLS)
  auth: {
    user: process.env.ZEPTOMAIL_USER,
    pass: process.env.ZEPTOMAIL_PASS,
  },
});

// Helper function to send emails with a similar API to Resend
export const sendEmail = async ({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  return await emailTransporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

