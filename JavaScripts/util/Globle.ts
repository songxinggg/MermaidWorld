/**
 * 自动Init的装饰器，可以自动调用对象的Init方法，自动初始化
 * @param obj 
 */
export function AutoInit(obj: { init: Function; }) {
    obj.init();
}
/**
 * 类定义，使用这个可以省去类参数繁琐的类型声明    如:fun<T>(c:{new():T}) 可以写成 fun<T>(c:Class<T>)
 */
export interface Class<T> extends Function {
    new(...args: any[]): T;
}
/**回调体，用于Action和Event系统的辅助功能*/
export class CallBack {
    private fun: Function;
    private thisArg: any;
    public dirty: boolean = false;//脏标记
    constructor(fun: Function, thisArg: any) {
        this.fun = fun;
        this.thisArg = thisArg;
    }
    public call(...prames: any[]) {
        if (!this.dirty) {
            this.fun.call(this.thisArg, ...prames);
        }
    }
    public includes(fun: Function, thisArg: any): boolean {
        return this.fun == fun && this.thisArg == thisArg;
    }
}
/**任意参数的代理*/
export class Action {
    protected funArgList: Array<CallBack> = [];
    private callingRemNum: number = -1;//调用时移除的数量
    private countChangeCallback: Function;//长度变化的回调
    //设置长度变化的回调方法
    public setCountChangeCallback(Callback?: Function) {
        this.countChangeCallback = Callback;
    }
    public add(fn: Function, thisArg?: any): void {
        if (fn == null) return;
        let index = this.getFunIndex(fn, thisArg);
        if (index == -1) this.funArgList.push(new CallBack(fn, thisArg));
        if (this.countChangeCallback != null) this.countChangeCallback(this.count);
    }
    public remove(fn: Function, thisArg: any): void {
        if (fn == null) return;
        if (this.callingRemNum >= 0) {
            this.callingRemNum++;
            let callBack = this.getCallBack(fn, thisArg);
            if (callBack != null) callBack.dirty = true;
        } else {
            let index = this.getFunIndex(fn, thisArg);
            if (index != -1) this.funArgList.splice(index, 1);
            if (this.countChangeCallback != null) this.countChangeCallback(this.count);
        }
    }
    public call(...prams: any): void {
        if (this.funArgList.length == 0) return;
        this.callingRemNum = 0;
        for (let i = 0; i < this.funArgList.length; i++) {
            try { this.funArgList[i].call(...prams); }
            catch (e) { }
        }
        if (this.callingRemNum > 0) {//Call的时候有方法被移除了
            for (let i = 0; i < this.funArgList.length;) {
                if (this.funArgList[i].dirty)
                    this.funArgList.splice(i, 1);
                else
                    i++;
            }
            if (this.countChangeCallback != null) this.countChangeCallback(this.count);
        }
        this.callingRemNum = -1;
    }
    //判断是否包含某个监听方法
    public includes(fn: Function, thisArg: any): boolean {
        if (fn == null) return false;
        return this.getFunIndex(fn, thisArg) != -1;
    }
    public clear(): void {
        while (this.funArgList.length > 0) this.funArgList.pop();
    }
    private getFunIndex(fn: Function, thisArg: any): number {
        for (let i = 0; i < this.funArgList.length; i++) {
            if (this.funArgList[i].includes(fn, thisArg)) return i;
        }
        return -1;
    }
    private getCallBack(fn: Function, thisArg: any): CallBack {
        for (let i = 0; i < this.funArgList.length; i++) {
            if (this.funArgList[i].includes(fn, thisArg)) return this.funArgList[i];
        }
        return null;
    }
    public get count() {
        return this.funArgList.length;
    }
}
/**一个参数的代理*/
export class Action1<T> extends Action {
    public add(fn: (a: T) => void, thisArg: any): void { super.add(fn, thisArg); }
    public remove(fn: (a: T) => void, thisArg: any): void { super.remove(fn, thisArg); }
    public call(arg: T): void { super.call(arg); }
}
/**二个参数的代理*/
export class Action2<T, S> extends Action {
    public add(fn: (a: T, b: S) => void, thisArg: any): void { super.add(fn, thisArg); }
    public remove(fn: (a: T, b: S) => void, thisArg: any): void { super.remove(fn, thisArg); }
    public call(a: T, b: S): void { super.call(a, b); }
}

export class Time {
    public static onEnterFrame: Action1<number> = new Action1<number>();//进入帧(参数dt)
    private static delayExecuteFun: Array<{ id: number, fun: Function, frame: number }> = [];
    private static delayExecuteId: number = 0;
    private static _delayTime = 0;
    public static get delayTime(): number {
        return this._delayTime;
    }
    //返回自游戏运行后所经过的总时长，单位秒，精确到毫秒。
    public static get time(): number {
        return mw.TimeUtil.elapsedTime();
    }
    //延迟X帧执行
    public static delayExecute(fun: Function, frameNum: number = 1): number {
        let id = ++this.delayExecuteId;
        this.delayExecuteFun.push({ id: id, fun, frame: frameNum });
        return id;
    }
    //清除延迟X帧执行
    public static clearDelayExecute(id: number) {
        for (let i = 0; i < this.delayExecuteFun.length; i++) {
            if (this.delayExecuteFun[i].id == id) {
                this.delayExecuteFun.splice(i, 1);
                break;
            }
        }
    }
    //延迟(单位:秒)
    public static async delaySecond(second: number): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            setTimeout(() => {
                return resolve();
            }, second * 1000);
        });
    }
    public static update(dt: number) {
        this._delayTime = dt;
        this.onEnterFrame.call(dt);
        this.delayExecuteUpdate();
    }
    private static delayExecuteUpdate() {
        if (this.delayExecuteFun.length == 0) return;
        for (let i = 0; i < this.delayExecuteFun.length;) {
            this.delayExecuteFun[i].frame--
            if (this.delayExecuteFun[i].frame <= 0) {
                try { this.delayExecuteFun[i].fun(); } catch (e) { }
                this.delayExecuteFun.splice(i, 1);
            } else {
                i++;
            }
        }
    }
}