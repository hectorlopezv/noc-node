import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSecuriryLevel } from "../../entitites/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase{
    execute(to: string | string[]):Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly logRepository: LogRepository, 
        private readonly emailService: EmailService
    ){

    }
    async execute(to: string | string[]): Promise<boolean> {
        
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent){
                throw new Error('Error sending email');
            }
            const log = new LogEntity({
                level: LogSecuriryLevel.low,
                message: `Log email sent`,
                origin: "send-email-logs.ts"
            })
            this.logRepository.saveLog(log);           
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSecuriryLevel.low,
                message: `Error sending email ${error}`,
                origin: "send-email-logs.ts"
            })
            this.logRepository.saveLog(log);
            return false;
        }
    }

    

}