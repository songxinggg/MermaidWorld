/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/03/9 09:45:46
* @Description  : 单例基类
*/
export class Singleton {
    static ins<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}

