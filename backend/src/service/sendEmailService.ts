import nodemailer from "nodemailer";
import { SendEmailType } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const SMTP_PORT = process.env.SMTP_PORT as string;
const EMAIL_USER = process.env.SENDER_EMAIL_USER as string;
const EMAIL_PASS = process.env.SENDER_EMAIL_PASS as string;
const SMTP_SERVICE = process.env.SMTP_SERVICE as string;

const sendEmail = async (mailObj: SendEmailType) => {
  const { to, subject, text } = mailObj;

  try {
    let transporter = nodemailer.createTransport({
      service: SMTP_SERVICE,
      port: parseInt(SMTP_PORT),
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // correo ideal => "noreply@autominder.com"
    await transporter.sendMail({
      from: EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      /** @todo queda pendiente agregar una plantilla html!! */
    });

    return "mail send with exist";
  } catch (err) {
    throw new Error(
      `Something went wrong in the sendEmail method. Error: ${err}`
    );
  }
};

export { sendEmail };
