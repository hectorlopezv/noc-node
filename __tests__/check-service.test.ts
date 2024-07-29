import { CheckService }  from "../src/domain/use-cases/checks/check-service"
describe('CheckService use Case', ()=>{
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallBack = jest.fn();
    const errorCallBack = jest.fn();

    const checkService = new CheckService(mockRepository, successCallBack,errorCallBack);

    test('Should return true if service is ok', async ()=>{
        const wasOk = await checkService.execute('https://www.google.com');
        expect(wasOk).toBe(true);
        expect(successCallBack).toHaveBeenCalled();
    });
});