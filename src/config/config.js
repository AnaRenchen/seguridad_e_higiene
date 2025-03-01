import dotenv from "dotenv";
import { Command, Option } from "commander";

let program = new Command();

program.addOption(
  new Option("-m, --mode <mode>", "Script ejecution mode")
    .choices(["dev", "prod"])
    .default("dev")
);
program.parse();

const argumentos = program.opts();

const mode = argumentos.mode;
dotenv.config({
  path: mode === "prod" ? "./src/.env.production" : "./src/.env.development",
  override: true,
});

export const config = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.MODE,
  PASSWORD_GMAIL_NODEMAILER: process.env.PASSWORD_GMAIL_NODEMAILER,
  USER_GMAIL_NODEMAILER: process.env.USER_GMAIL_NODEMAILER,
};