/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-27 13:44:13
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-31 15:52:25
 * @FilePath: \mermaidworld11\JavaScripts\util\SimplePlane.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** 
 * @Author       : MengYao.Zhao
 * @Date         : 2022/03/24 10:44:45
 * @Description  : 平面对象
 */

import { Utils } from "./Utils";

export class SimplePlane {
    private a: number;
    private b: number;
    private c: number;
    private d: number;

    //点法式
    constructor(p: mw.Vector, normal: mw.Vector) {
        this.a = normal.x;
        this.b = normal.y;
        this.c = normal.z;
        this.d = -(this.a * p.x + this.b * p.y + this.c * p.z);
    }

    private static VectorMutply(a: mw.Vector, b: mw.Vector): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static LineInterPlane2(lineFrom: mw.Vector, lineTo: mw.Vector, plane: SimplePlane, outResult: { intersection: boolean, interPos: mw.Vector }) {
        // 直线方程P(t) = Q + tV         
        let dir = lineTo.subtract(lineFrom);
        dir = dir.normalize();

        let d = plane.d;
        let n = new mw.Vector(plane.a, plane.b, plane.c);
        let s = this.VectorMutply(n, dir);

        if (Math.abs(s) <= Utils.Zero) // 直线与平面平行
        {
            outResult.intersection = false;
            return;
        }
        let q = - d - this.VectorMutply(n, lineFrom);
        let t = q / s;
        // 将t带入直线方程P(t) = Q + tV,就可得到直线与平面的交点
        outResult.interPos.x = lineFrom.x + t * dir.x;
        outResult.interPos.y = lineFrom.y + t * dir.y;
        outResult.interPos.z = lineFrom.z + t * dir.z;
        outResult.intersection = true;
    }
    static LineInterPlane(lineFrom: mw.Vector, lineTo: mw.Vector, planePoint: mw.Vector, planeNormal: mw.Vector, outResult: { intersection: boolean, interPos: mw.Vector }) {
        planeNormal = planeNormal.normalize();
        let plane: SimplePlane = new SimplePlane(planePoint, planeNormal);
        this.LineInterPlane2(lineFrom, lineTo, plane, outResult);
    }

}

