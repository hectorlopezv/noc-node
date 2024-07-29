import { CronService } from "./cron/cron-service";
import { CheckService } from "./domain/use-cases/checks/check-service";


export class Server {
    public static start(){
        console.log('Server started');
        CronService.createJob('*/5 * * * * *', ()=>{
            const date = new Date();
            console.log(`Job executed at ${date}`);
            new CheckService(()=>{
                console.log('Success');
            },(error)=>{
                console.log(`Error ${error}`);
            }).execute('http://localhost:3001/posts')
        });
    }
}
