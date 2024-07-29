interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}
type SuccessCallBack = ()=> void;
type ErrorCallBack = (error: string)=> void;
export class CheckService implements CheckServiceUseCase {
    constructor( 
        private readonly successCallBack?: SuccessCallBack, 
        private readonly errorCallBack?: ErrorCallBack
    ){

    }

    public async execute(url: string): Promise<boolean>{
        try {
            const req= await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallBack && this.successCallBack();
            return true;
        } catch (error) {
            console.log(`error ${error}`);
            this.errorCallBack && this.errorCallBack(`${error}`);
            return false;
        }
    }
}