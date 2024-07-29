import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSecuriryLevel } from "../../domain/entitites/log.entity";
const prisma = new PrismaClient();
const severityEnum = {
    low : SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
export class PostGreSqlDataSource implements LogDataSource{
    constructor(){}
     public async saveLog(log: LogEntity): Promise<void> {
       await prisma.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level],
            }
        });
        
    }

    public async getLogs(severityLevel: LogSecuriryLevel): Promise<LogEntity[]> {

        const logs = await prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        });
        return logs?.map((log)=>{
            return LogEntity.fromObject(log);
        })
    }
    
}