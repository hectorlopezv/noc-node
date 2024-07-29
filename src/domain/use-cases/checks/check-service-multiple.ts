import { LogEntity, LogSecuriryLevel } from "../../entitites/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}
type SuccessCallBack = ()=> void;
type ErrorCallBack = (error: string)=> void;
export class CheckServiceMultiple implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack?: SuccessCallBack, 
        private readonly errorCallBack?: ErrorCallBack
    ){

    }
    private callLogs(log: LogEntity){
        this.logRepository.forEach((logRepository) => {
            logRepository.saveLog(log)
        });
    }
    public async execute(url: string): Promise<boolean>{
        try {
            const req= await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                level: LogSecuriryLevel.low,
                message: `Service ${url} is ok`,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.successCallBack && this.successCallBack();
            return true;
        } catch (error) {
            const log = new LogEntity( {
                level: LogSecuriryLevel.high,
                message: `Error on check service ${url}`,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.errorCallBack && this.errorCallBack(`${error}`);
            return false;
        }
    }
}