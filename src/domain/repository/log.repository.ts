import { LogEntity, LogSecuriryLevel } from "../entitites/log.entity";

export abstract class LogRepository {
    public abstract saveLog(log: LogEntity): Promise<void>;
    public abstract getLogs(severityLevel: LogSecuriryLevel): Promise<LogEntity[]>;
}