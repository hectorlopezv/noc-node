import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSecuriryLevel } from "../../domain/entitites/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    constructor(private readonly logDataSource: LogDataSource) {
    }
    async  saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    async getLogs(severityLevel: LogSecuriryLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
}