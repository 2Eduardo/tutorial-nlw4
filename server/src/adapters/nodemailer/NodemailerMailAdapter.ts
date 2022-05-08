import { IMailAdapter, SendMailData } from "../IMailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fcf2e0fc32e6f6",
    pass: "a58ef1c9a8f5b9"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@fedget.com>',
      to: 'Eduardo Luis <eduardodolinski31@gmail.com>',
      subject,
      html: body
    });
  }
}
