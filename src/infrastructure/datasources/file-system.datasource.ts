import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSecuriryLevel } from "../../domain/entitites/log.entity";
import {appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from "fs"
export class FileSystemDataSource implements LogDataSource{
    private readonly logPath = "logs/";
    private readonly allLogspath = "logs/logs-low.log";
    private readonly mediumLogPath = "logs/logs-medium.log";
    private readonly highLogPath = "logs/logs-high.log";
    constructor(){
        this.createLogFiles();
    }
    private createLogFiles = ()=>{
        if(!existsSync(this.logPath)){
            mkdirSync(this.logPath);
        }
        [this.allLogspath, this.mediumLogPath, this.highLogPath].forEach((path)=>{
            if(existsSync(path)){
                return;
            }
            writeFileSync(path, "");
        });
    }
    public saveLog(log: LogEntity): Promise<void> {
        const logAsJson =`${JSON.stringify(log)}\n`;
        appendFileSync(this.allLogspath, logAsJson);
        if(log.level == LogSecuriryLevel.low){
            return Promise.resolve();
        }
        if(log.level == LogSecuriryLevel.medium){
            appendFileSync(this.mediumLogPath, logAsJson);
        }else if(log.level == LogSecuriryLevel.high){
            appendFileSync(this.highLogPath, logAsJson);
        }
        return Promise.resolve();
    }
    private getLogsFromFile = (path: string): LogEntity[] =>{
        const content = readFileSync(path, "utf-8");
        if (content === ""){
            return [];   
        }
        const logs = content.split("\n").map((log)=>{
            return LogEntity.fromJson(log);
        });
        return logs;


    }
    public getLogs(severityLevel: LogSecuriryLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSecuriryLevel.low:
                return Promise.resolve(this.getLogsFromFile(this.allLogspath));
            case LogSecuriryLevel.medium:
                return Promise.resolve(this.getLogsFromFile(this.mediumLogPath));
            case LogSecuriryLevel.high:
                return Promise.resolve(this.getLogsFromFile(this.highLogPath));
            default:
                throw new Error("Invalid severity level");
        }
    }
    
}