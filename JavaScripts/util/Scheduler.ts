/** 
 * @Author       : MengYao.Zhao
 * @Date         : 2022/03/9 09:42:52
 * @Description  : 定时器，计划服务
 */
import { objectPoolServices } from "./ObjectPoolServices";


export namespace scheduler {

    export type IntervalCallBack = (dt: number) => void;
    export type CompleteCallback = (...args: any) => void;

    //定时器实体
    class ScheduleEntry {
        id: number;
        callback: IntervalCallBack;
        interval: number;
        totalTime: number;
        times: number;
        isTickUpdate: boolean;
        /**间隔期间的 时间消耗*/
        costTime: number;
        /**间隔期间的 帧消耗  */
        costFrame: number;
        /**总的消耗时间计时 */
        costTotalTime: number;

        onComplete: CompleteCallback;
        args: any[];
    }

    const scheduleList: ScheduleEntry[] = [];


    const newScheduleList: ScheduleEntry[] = [];

    const removedScheduleList: ScheduleEntry[] = [];

    let scheduleInstanceId: number = 1;

    /**
     * 按时间启动回调服务 下一帧生效
     * @param intervalCallBack  时间间隔回调函数，参数为时间隔时间
     * @param interval   时间间隔 默认 1s
     * @param times 执行次数，>0表示执行次数，<0表示不限制，默认为1   
     * @param totalTime 总的执行时间，用于结束判断，如<=0表示无结束时间限制，以times为准,默认-1
     * @param completeCallback 总时间完成后的回调，在totalTime达到时调用，如果是不限制的情况下则不会调用到,参数为 args 默认为null
     * @param args 回调参数
     * @returns id，可作为Cancle参数取消回调
     */
    export function timeStart(intervalCallBack: IntervalCallBack, interval: number = 1, times: number = 1, totalTime: number = -1, completeCallback: CompleteCallback = null, ...args: any[]): number {
        let entry = objectPoolServices.getPool(ScheduleEntry).spawn();
        entry.id = scheduleInstanceId++;
        entry.interval = interval;
        entry.callback = intervalCallBack;
        entry.totalTime = totalTime;
        entry.times = Math.ceil(times);
        entry.isTickUpdate = false;
        entry.costTime = 0;
        entry.costFrame = 0;
        entry.costTotalTime = 0;
        entry.onComplete = completeCallback
        entry.args = args;
        newScheduleList.push(entry);
        return entry.id;
    }

    /**
     * 按帧启动回调服务 下一帧生效
     * @param intervalCallBack  帧间隔回调函数，参数为帧间隔时间
     * @param interval   帧间隔 默认 1
     * @param times 执行次数，>0表示执行次数，<0表示不限制，默认为1   
     * @param totalTime 总的执行时间，用于结束判断，如<=0表示无结束时间限制，以times为准,默认-1
     * @param completeCallback 总时间完成后的回调，在totalTime达到时调用，如果是不限制的情况下则不会调用到,参数为 args 默认为null
     * @param args 回调参数
     * @returns id，可作为Cancle参数取消回调
     */
    export function tickStart(intervalCallBack: IntervalCallBack, interval: number = 1, times: number = 1, totalTime: number = -1, completeCallback: CompleteCallback = null, ...args: any[]): number {
        let entry = new ScheduleEntry();
        entry.id = scheduleInstanceId++;
        entry.interval = Math.ceil(interval);
        entry.callback = intervalCallBack;
        entry.totalTime = totalTime;
        entry.times = Math.ceil(times);
        entry.isTickUpdate = true;
        entry.costTime = 0;
        entry.costFrame = 0;
        entry.costTotalTime = 0;
        entry.onComplete = completeCallback
        entry.args = args;
        newScheduleList.push(entry);
        return entry.id;
    }

    /**
     * 取消回调服务
     * @param id 唯一标志
     * @returns 
     */
    export function cancel(id: number): void {
        let index = -1;
        for (let i = 0; i < scheduleList.length; i++) {
            if (scheduleList[i].id == id) {
                index = i;
                cancelEntry(scheduleList[i]);
                break;
            }
        }
        if (index == -1) {
            // Debugger.Warn("Scheduler Cancel error,not exist, id: " + id);
        }
    }

    /**
     * 取消定时器
     * @param entry 定时器实体 
     */
    function cancelEntry(entry: ScheduleEntry) {
        entry.callback = null;
        entry.onComplete = null;
        removedScheduleList.push(entry);
    }

    /**
     * 帧更新
     * @param dt tick的时间，s
     */
    export function tick(dt: number): void {
        if (newScheduleList.length > 0) {
            newScheduleList.forEach((entry) => {
                scheduleList.push(entry);
            });
            newScheduleList.splice(0, newScheduleList.length);
        }
        if (removedScheduleList.length > 0) {
            removedScheduleList.forEach((entry) => {
                let index = scheduleList.indexOf(entry);
                if (index > -1) {
                    scheduleList.splice(index, 1);
                    objectPoolServices.getPool(ScheduleEntry).return(entry);
                }
            });
            removedScheduleList.splice(0, removedScheduleList.length);
        }
        for (let i = 0; i < scheduleList.length; i++) {
            let entry = scheduleList[i];
            let nowTime = entry.costTotalTime + dt;
            if (entry.isTickUpdate) {
                //帧消耗和时间间隔消耗更新
                entry.costFrame++;
                entry.costTime += dt;
                if (entry.costFrame == entry.interval) {
                    if (entry.times != 0) {
                        /**进行一次帧间隔调用 */
                        try {
                            if (entry.callback)
                                entry.callback(entry.costTime);
                        } catch (error) {
                            console.error(error);
                        }
                        entry.costFrame = 0;
                        entry.costTime = 0;
                        if (entry.times > 0)
                            entry.times--;
                    }
                }

            }
            else {
                //时间消耗间隔更新
                entry.costTime += dt;
                if (entry.costTime >= entry.interval) {
                    if (entry.times != 0) {
                        /**进行一次时间间隔调用 */
                        try {
                            if (entry.callback)
                                entry.callback(entry.interval);
                        } catch (error) {
                            console.error(error);
                        }
                        entry.costTime = entry.costTime - entry.interval;
                        if (entry.times > 0)
                            entry.times--;
                    }
                }
            }
            if (entry.totalTime <= 0) {
                //结束受次数控制
                if (entry.times == 0) {
                    try {
                        if (entry.onComplete)
                            entry.onComplete(entry.args)
                    } catch (error) {
                        console.error(error);
                    }
                    cancelEntry(entry);
                    continue;
                }
            }
            else {
                //结束由总时间控制
                if (nowTime >= entry.totalTime) {
                    try {
                        if (entry.onComplete)
                            entry.onComplete(entry.args)
                    } catch (error) {
                        console.error(error);
                    }
                    cancelEntry(entry);
                    continue;
                }
                else {
                    entry.costTotalTime = nowTime;
                }
            }
        }
    }
}

