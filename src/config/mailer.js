import * as nodemailer from "nodemailer";
import { config } from "./config.js";
import __dirname from "../utils/utils.js";
import { logger } from "../utils/logger.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.USER_GMAIL_NODEMAILER,
      pass: config.PASSWORD_GMAIL_NODEMAILER,
    },
  });

  export const sendEmail = async (subject, text, htmlContent) => {
    
  
    try {
        const email = await transporter.sendMail({
          from: `"CHST web" <${config.USER_GMAIL_NODEMAILER}>`,
          to: "anamagbh@gmail.com",
          subject: subject,
          html: htmlContent,
          text: text,
        });

       logger.info(`Correo enviado a anamagbh@gmail.com con asunto: ${subject}`);
    
        return email;
      } catch (error) {
        logger.error(
          JSON.stringify(
            {
              name: error.name,
              message: error.message,
              stack: error.stack,
              code: error.code,
            },
            null,
            5
          )
        );
      }
    };
