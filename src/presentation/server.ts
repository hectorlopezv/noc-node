import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository =  new LogRepositoryImpl(new FileSystemDataSource());
export class Server {
    public static start(){
        console.log('Server started');
     
        CronService.createJob('*/5 * * * * *', ()=>{
            const date = new Date();
            const url = 'http://localhost:3001/posts';
            console.log(`Job executed at ${date}`);
            new CheckService(fileSystemLogRepository, ()=>{
                console.log(`${url} is ok`);
            },(error)=>{
                console.log(`Error ${error}`);
            }).execute(url)
        });
    }
}
