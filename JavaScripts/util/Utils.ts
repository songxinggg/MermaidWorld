import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
/** 
 * @Author       : MengYao.Zhao
 * @Date         : 2022/03/9 09:08:32
 * @Description  :一些全局性的工具函数
 */

import { GameConfig } from "../config/GameConfig";
import { scheduler } from "./Scheduler";
//import { Scheduler } from "./Scheduler";

export class Utils {
    //角度转弧度
    static DegreeToRadian = Math.PI / 180;
    //弧度转角度
    static RadianToDegree = 180 / Math.PI;
    //0值
    static Zero = 1e-9;

    /**
     * 转为向量::服务器传过来的vecter不能直接用 
     * @param vec 需要转换的向量
     * @returns 返回新的
     */
    static converVecter(vec: mw.Vector) {
        return new mw.Vector(vec.x, vec.y, vec.z)
    }


    /**
     * 截断一个数
     * @param value  需要截断的数
     * @param min  最小值
     * @param max  最大值
     * @returns  返回截断后的数
     */
    static clamp(value: number, min: number, max: number) {
        if (value > max) return max;
        if (value < min) return min;
        return value;
    }

    /**
     * 随机一个整数 [Min,Max]
     * @param Min 最小值
     * @param Max  最大值
     * @returns  返回一个区间随机整数
     */
    static randomNum(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    /**
     * 随机一个浮点数
     * @param Min  最小值
     * @param Max  最大值
     * @returns 返回一个区间随机浮点数
     */
    static randomNumFloat(Min, Max): number {
        return Min + Math.random() * (Max - Min);
    }

    /**
    * 以该点为圆心返回一个圆平面内的随机点
    * @param point 初始坐标
    * @r 半径
    */
    static randomCirclePoint(point: mw.Vector, r: number): mw.Vector {
        while (1) {
            let cx = 2 * r * Math.random() - r + point.x
            let cy = 2 * r * Math.random() - r + point.y
            if ((cx - point.x) * (cx - point.x) + (cy - point.y) * (cy - point.y) <= r * r)
                return new mw.Vector(cx, cy, point.z)
        }
    }




    /**
     * @description: 格式化字符串
     * @param {string} str
     * @param {array} args
     * @return {*}
     */
    static formatString(str: string, ...args: any[]) {
        if (args.length == 0) {
            return str;
        }
        for (let i = 0; i < args.length; i++) {
            const re = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(re, args[i]);
        }
        return str;
    }

    /**
     * 获取3维向量的长度平方
     * @param v3 3维向量
     * @returns 长度
     */
    static Magnitude(v3: mw.Vector): number {
        return v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
    }

    /**
     * 获取3维向量的长度 
     * @param v3 3维向量
     * @returns 长度
     */
    static v3Magnitude(v3: mw.Vector): number {
        let result = v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
        return Math.sqrt(result);
    }

    /**
     * 获取2维向量的长度
     * @param v2 2维向量 
     * @returns 
     */
    static v2Magnitude(v2: mw.Vector2): number {
        let result = v2.x * v2.x + v2.y * v2.y;
        return Math.sqrt(result);
    }

    /**
     * 向量的插值计算
     * @param from  起始向量
     * @param to  结束向量
     * @param t 比值[0-1]
     * @returns 返回插值向量
     */
    static v3Lerp(from: mw.Vector, to: mw.Vector, t: number): mw.Vector {

        let result = new mw.Vector(0, 0, 0);

        result.x = from.x + (to.x - from.x) * t;
        result.y = from.y + (to.y - from.y) * t;
        result.z = from.z + (to.z - from.z) * t;

        return result;
    }






    /**
     * 寻找一个物体下所有子模型节点，包含根节点
     * @param source 目标物体
     * @param result objs包含了所有物体
     */
    static findTotalObjs(source: mw.GameObject, result: { objs: mw.GameObject[] }) {
        let children: mw.GameObject[] = source.getChildren();
        result.objs.push(source);
        if (children.length > 0) {
            for (const child of children) {
                this.findTotalObjs(child, result);
            }
        }
    }

    /**
     * 2维向量点积
     * @param p1 点1
     * @param p2 点2
     * @returns 返回点积
     */
    public static v2Product(p1: mw.Vector2, p2: mw.Vector2): number {
        return p1.x * p2.y - p2.x * p1.y;
    }

    /**
     * 检查两条2d线段是否相交
     * @param a 线段1的起点
     * @param b 线段1的终点
     * @param c 线段2的起点
     * @param d 线段2的终点
     * @returns 返回相交与否
     */
    public static checkLineIntersect(a: mw.Vector2, b: mw.Vector2, c: mw.Vector2, d: mw.Vector2): boolean {
        let dirAC = a.subtract(c);
        let dirAD = a.subtract(d);
        let dirBC = b.subtract(c);
        let dirBD = b.subtract(d);
        let dirCA = dirAC.multiply(-1);
        let dirDA = dirAD.multiply(-1);
        let dirCB = dirBC.multiply(-1);
        let dirDB = dirBD.multiply(-1);
        return (this.v2Product(dirAC, dirAD) * this.v2Product(dirBC, dirBD) <= this.Zero) && (this.v2Product(dirCA, dirCB) * this.v2Product(dirDA, dirDB) <= this.Zero)
    }

    /**
     *  检查线段和矩形是否相交，不考虑z轴  参数为线段加矩形的6个点位
     * @param l1 线段的起点
     * @param l2 线段的终点
     * @param s1 矩形的第1个点
     * @param s2 矩形的第2个点
     * @param s3 矩形的第3个点
     * @param s4 矩形的第4个点
     * @returns 返回相交与否
     */
    public static checkSquareIntersect(l1: mw.Vector2, l2: mw.Vector2, s1: mw.Vector2, s2: mw.Vector2, s3: mw.Vector2, s4: mw.Vector2): boolean {
        if (this.checkLineIntersect(l1, l2, s1, s2))
            return true;
        if (this.checkLineIntersect(l1, l2, s2, s3))
            return true;
        if (this.checkLineIntersect(l1, l2, s3, s4))
            return true;
        if (this.checkLineIntersect(l1, l2, s1, s4))
            return true;
        return false;
    }


    /**
     * 检查二维点是否在矩形之内,xy平面上，不考虑Z轴     
     * @param point 检查点
     * @param lb 矩形的第1个点
     * @param rb 矩形的第2个点
     * @param lt 矩形的第3个点
     * @param rt 矩形的第4个点
     * @returns 返回是否在矩形内
     */
    public static checkPointInRectangle(point: mw.Vector2, lb: mw.Vector2, rb: mw.Vector2, lt: mw.Vector2, rt: mw.Vector2): boolean {
        let minX = Math.min(lb.x, rb.x, lt.x, rt.x);
        let maxX = Math.max(lb.x, rb.x, lt.x, rt.x);
        let minY = Math.min(lb.y, rb.y, lt.y, rt.y);
        let maxY = Math.max(lb.y, rb.y, lt.y, rt.y);

        if (point.x > maxX || point.x < minX || point.y > maxY || point.y < minY)
            return false;
        return true;
    }

    /**
     * 对一个物体做贝塞尔曲线运动
     * @param obj 物体
     * @param time 完成所需时间
     * @param points 所需要的点列表
     */
    static ObjDoBezier(obj: mw.GameObject, time: number, points: mw.Vector[]) {
        Utils.DoLerpForValue(0, 1, time, (value) => {
            let point = Utils.Bezier(points, value)
            obj.worldTransform.position = new mw.Vector(point.x, point.y, point.z)
        })
    }

    static Bezier(_points: mw.Vector[], lerp: number): mw.Vector {
        if (_points.length == 2)//只有2个点时，直接返回插值点
        {
            return Utils.v3Lerp(_points[0], _points[1], lerp);
        }

        let nextArray: mw.Vector[] = []
        for (let i = 0; i < _points.length - 1; i++) {
            let pointA = _points[i];
            let pointB = _points[i + 1];
            let lerpPoint = Utils.v3Lerp(pointA, pointB, lerp);
            nextArray.push(lerpPoint);
        }
        return Utils.Bezier(nextArray, lerp);
    }




    /**
     * 对两个数值做一个的插值，每帧和结束都可以提供回调,返回Timer句柄
     * @param start 起始值
     * @param end 
     * @param time  时间 s
     * @param tickCallBack 
     * @param onComplete 
     * @param easingFunction 插值函数
     */
    public static DoLerpForValue(start: number, end: number, time: number, tickCallBack: (value: number) => void, onComplete: () => void = null, easingFunction = mw.TweenUtil.Easing.Linear.None): number {
        let dist = end - start;
        let curTime = 0;
        let scale = 0;;
        let nowValue = start;
        time = time == 0 ? 1 : time;
        let tickTimer = scheduler.tickStart((dt) => {
            curTime += dt;
            let over = false;
            scale = curTime / time;
            if (scale >= 1) {
                scale = 1;
                over = true;
            }
            scale = easingFunction(scale);
            nowValue = start + scale * dist;
            tickCallBack(nowValue);
            if (over) {
                scheduler.cancel(tickTimer);
                onComplete && onComplete();
            }
        }, 1, -1);
        return tickTimer;
    }

    /**
     * 等待一会
     * @param second  s
     * @returns 
     */
    static async waitForSeconds(second: number): Promise<void> {
        return new Promise<void>(resolve => {
            scheduler.timeStart(() => {
                resolve();
            }, second);
        });
    }

    /**
     * 等待一会
     * @param tick 帧
     * @returns 
     */
    static async waitForTicks(tick: number): Promise<void> {
        return new Promise<void>(resolve => {
            scheduler.tickStart(() => {
                resolve();
            }, tick);
        });
    }
    /**复制一个数组 */
    static arrCopy<T>(arr: Array<T>): Array<T> {
        let copyArr: Array<T> = []
        for (let i = 0; i < arr.length; i++) {
            copyArr.push(arr[i])
        }
        return copyArr
    }

    /**
     * @description: 将index上的元素插到target下标，并将其他元素向后移动
     * @param {number} target 要插入的下标
     * @param {number} index 进行插入的元素下标
     * @param {Array} array 进行操作的数组
     * @return {*}
     */
    public static arrayInsert<T>(target: number, index: number, array: Array<T>) {
        if (index > array.length || target < 0) {
            return;
        }
        let item = array[index];
        for (let i = index; i >= target; i--) {
            if (i == target) array[i] = item;
            else array[i] = array[i - 1];
        }
        return array;
    }

    public static playSound(index: number) {
        let audioConfig = GameConfig.Audio.getElement(index);
        if (!audioConfig)
            return
        mw.SoundService.playSound(audioConfig.ResGUID, audioConfig.IsLoop, audioConfig.Volume)
    }
    /**
     * 播放一个特效
     * @param index 配置表id
     * @param guid 物体的guid
     * @param pos 位置
     * @returns 该特效的uuid
     */
    public static playEffect(index: number, guid: string, pos?: mw.Vector): number {
        let effid: number
        const effCfg = GameConfig.Effect.getElement(index)
        if (!effCfg)
            return
        let go = GameObject.findGameObjectById(guid)
        console.log("特效市场" + effCfg.IsLoop ? -effCfg.LifeTime : 1)
        if (go) {
            effid = GeneralManager.rpcPlayEffectOnGameObject(effCfg.ResGUID, go, effCfg.IsLoop ? -effCfg.LifeTime : 1, effCfg.Offset, new mw.Rotation(effCfg.Rotate), effCfg.Scale)
        }
        if (pos) {
            let loc = pos.add(effCfg.Offset)
            effid = GeneralManager.rpcPlayEffectAtLocation(effCfg.ResGUID, loc, effCfg.IsLoop ? -effCfg.LifeTime : 1, new mw.Rotation(effCfg.Rotate), effCfg.Scale)
        }
        return effid
    }
    /**
     * 停止一个特效
     * @param effid 特效的uudi
     */
    public static stopEff(effid: number) {
        EffectService.stop(effid)
    }

    /**获取ui全局位置 */
    public static getUIPostion(ui: mw.Widget) {
        let pos = new mw.Vector2(0, 0)
        pos.x = ui.position.x
        pos.y = ui.position.y
        let parent: mw.Widget = ui.parent
        while (parent) {
            pos = pos.add(parent.position)
            parent = parent.parent
        }
        return pos
    }

}



