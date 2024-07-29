import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { MongoDataBase } from "../data/mongo";
import { PostGreSqlDataSource } from "../infrastructure/datasources/postgresql-log.datasource";

const LogRepository =  new LogRepositoryImpl(new PostGreSqlDataSource());
export class Server {
    public static async  start(){
        console.log('Server started');
        // Send Email
        await MongoDataBase.connect({
            mongoUrl: process.env.MONGO_URL as string,
            dbName: process.env.MONGO_DB_NAME as string
        });
             CronService.createJob('*/5 * * * * *', ()=>{
            const date = new Date();
            const url = 'http://localhost:3001/posts';
            console.log(`Job executed at ${date}`);
            new CheckService(LogRepository, ()=>{
                console.log(`${url} is ok`);
            },(error)=>{
                console.log(`Error ${error}`);
            }).execute(url)
        });
    }
}
