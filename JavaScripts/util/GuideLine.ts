import { SpawnManager,SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-27 13:57:59
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-31 15:46:42
 * @FilePath: \mermaidworld\JavaScripts\util\GuideLine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** 
 * @Author       : lei.zhao
 * @Date         : 2022-10-27 09:55:39
 * @LastEditors  : songxing
 * @LastEditTime : 2023-10-15 16:16:05
 * @FilePath     : \mermaidworld\JavaScripts\util\GuideLine.ts
 * @Description  : 修改描述
 */

import { scheduler } from "./Scheduler";
const temp_vec = new mw.Vector();

export class GuideLine {
    private static _instance: GuideLine;

    public static get instance(): GuideLine{
        if (!this._instance) {
            this._instance =new GuideLine()
        }
        return this._instance;
    }
    private _guideArrow: mw.GameObject;
    private _targetPosition: mw.Vector;
    private _isGuide: boolean;
    private _char: mw.Character;

    constructor() {
        Promise.all([mw.AssetUtil.asyncDownloadAsset("7697"), mw.AssetUtil.asyncDownloadAsset("197483")]).then(() => {
            this._guideArrow = SpawnManager.wornSpawn("7697");
            (this._guideArrow as mw.Model).setMaterial("197483");
            this._char = Player.localPlayer.character;

        });
        scheduler.tickStart((dt)=>{
           this._update(dt)
        },1,-1);
    }
    private _update = (dt: number) => {
        if (this._guideArrow && this._isGuide) {
            mw.Vector.subtract(this._targetPosition, this._char.worldTransform.position, temp_vec);
            let scale = temp_vec.length / 100;
            if (temp_vec.length < 500) {
                this._guideArrow.setVisibility(mw.PropertyStatus.Off);
                this._isGuide = false;
            }
            mw.Vector.multiply(temp_vec, 0.5, temp_vec);
            this._guideArrow.worldTransform.rotation = temp_vec.toRotation();
            mw.Vector.add(this._char.worldTransform.position, temp_vec, temp_vec);

            this._guideArrow.worldTransform.position = temp_vec;
            temp_vec.x = scale;
            temp_vec.y = temp_vec.z = 1;
            this._guideArrow.worldTransform.scale = temp_vec;

        }
    }
    /**
     * 设置引导路径
     * @param position 
     */
    public setWorldPos(position: mw.Vector) {
        if (this._guideArrow) {
            this._guideArrow.setVisibility  (mw.PropertyStatus.On);
        }
        this._targetPosition = position;
        this._isGuide = true;
    }

}
