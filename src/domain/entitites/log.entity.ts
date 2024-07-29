export enum LogSecuriryLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}
export interface LogEntityOptions{
    level: LogSecuriryLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}
export class LogEntity{
    public level: LogSecuriryLevel;
    public message: string;
    public createdAt: Date;
    public origin: string
    constructor(options: LogEntityOptions){
       const {level, message, origin, createdAt= new Date()} = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }
    static fromJson(json: string = '{}'): LogEntity{
        const {message, level, createdAt, origin} = JSON.parse(json);
        if(!message){
            throw new Error("Message is required");
        }
        if(!level){
            throw new Error("Level is required");
        }
        if(!createdAt){
            throw new Error("createdAt is required");
        }

        const log = new LogEntity({
            level,message, origin: origin, createdAt
        });
        return log;
    }

    static fromObject = (object: { [key: string]: any}): LogEntity=>{
        const {message, level, createdAt, origin} = object;
        if(!message){
            throw new Error("Message is required");
        }
        if(!level){
            throw new Error("Level is required");
        }
        if(!createdAt){
            throw new Error("createdAt is required");
        }

        const log = new LogEntity({
            level,message, origin: origin, createdAt
        });
        return log;

    }

}