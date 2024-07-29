export enum LogSecuriryLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}
export class LogEntity{
    public level: LogSecuriryLevel;
    public message: string;
    public createdAt: Date;
    constructor(level: LogSecuriryLevel, message: string){
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
    static fromJson(json: string): LogEntity{
        const {message, level, createdAt} = JSON.parse(json);
        if(!message){
            throw new Error("Message is required");
        }
        if(!level){
            throw new Error("Level is required");
        }
        if(!createdAt){
            throw new Error("createdAt is required");
        }

        const log = new LogEntity(level, message);
        log.createdAt = new Date(createdAt);
        return log;
    }

}