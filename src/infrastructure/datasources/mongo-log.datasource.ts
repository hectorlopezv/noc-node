import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSecuriryLevel } from "../../domain/entitites/log.entity";
export class MongoDataSource implements LogDataSource{
    constructor(){}
     public async saveLog(log: LogEntity): Promise<void> {
            const newLog = await LogModel.create(log);
            await newLog.save();
    }

    public async getLogs(severityLevel: LogSecuriryLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({level: severityLevel});
        return logs?.map((log)=>{
            return LogEntity.fromObject(log);
        })
    }
    
}