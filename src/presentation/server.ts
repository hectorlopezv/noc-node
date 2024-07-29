// import { CronService } from "./cron/cron-service";
// import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository =  new LogRepositoryImpl(new FileSystemDataSource());
export class Server {
    public static start(){
        console.log('Server started');
        // Send Email
    }
}
