import nodemailer from 'nodemailer';
import { LogEntity, LogSecuriryLevel } from '../../domain/entitites/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
interface Attachment{
    filename: string;
    path: string;
}
interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}
export class EmailService{

    private transported = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth:{
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRET_KEY
        }
    });
    constructor(){}
    async sendEmail(options: SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody, attachments} = options;

        try {
            const sentIformation = await this.transported.sendMail({
                to,subject,html: htmlBody,attachments
            });

            console.log('Email sent', sentIformation);

            return true;
        } catch (error) {
            console.log("Error sending email",error);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]):Promise<boolean>{
        try {
            const subject = "server logs";
            const htmlBody = "<h1>Server logs</h1>";
            const attachments = [
                {
                    filename: 'logs-low.log', path: './logs/logs-low.log'
                },
                {
                    filename: 'logs-medium.log', path: './logs/logs-medium.log'
                },
                {
                    filename: 'logs-high.log', path: './logs/logs-high.log'
                }
                ];
            return  await this.sendEmail({to,subject,htmlBody,attachments});
        } catch (error) {
            console.log(
                'Error sending email with logs',error
            );
            return false;
        }
    }
}