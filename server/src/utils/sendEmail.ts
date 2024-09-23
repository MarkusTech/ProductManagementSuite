import nodemailer, { Transporter } from "nodemailer";

interface SendEmailOptions {
  subject: string;
  message: string;
  send_to: string;
  sent_from: string;
  reply_to?: string;
}

const sendEmail = async ({
  subject,
  message,
  send_to,
  sent_from,
  reply_to,
}: SendEmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log(info);
  } catch (err) {
    console.error(err);
  }
};

export default sendEmail;
