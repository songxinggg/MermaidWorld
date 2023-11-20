


import { scheduler } from "../util/Scheduler";


import { GameModule_C } from "../GameModule/GameModule_C";
import P_TipsGet from "../GameModule/UI/P_TipsGet";
import { ClientEvents } from "../LocalEvents";
import { Track_LifeTime, Track_MermaidId, Track_TaskId, Track_getMermaid_num, Track_pickTime } from "../Track/TrackMsg";
import TipsUI from "../commonUI/P_Tips";
import { GameConfig } from "../config/GameConfig";
import { GuideLine } from "../util/GuideLine";
import { IAAUtils } from "../util/IAAUtils";
import { Utils } from "../util/Utils";
import MermaidMgr from "./Mermaid/MermaidMgr";
import { SceneDataHelper } from "./SceneData";
import SceneModule_S from "./SceneModule_S";


export default class SceneModule_C extends ModuleC<SceneModule_S, SceneDataHelper>{
    /**用来记录寻找每个美人鱼的时间间隔的时间 */
    private takeTime: number

    /**新手引导过后寻找到第一个美人鱼所需要的时间 */
    private guideTakeTime: number
    /**每分钟上报找到的人鱼数量 */
    private mermaid_num: number

    private currentTime: number

    private currentGetMerId: number = 0
    /**上下浮动状态 */
    private _swimType: SwimType
    /**上下浮动状态是否开始 */
    private isPause: boolean = true

    /**游戏开始的时间 */
    private _startTime: number
    /**是否在冲刺中 */
    public _isSkill: boolean = false

    mermaidMgr: MermaidMgr
    onStart(): void {
        this.init()
        this._startTime = Date.now()
        InputUtil.onKeyDown(mw.Keys.C, () => {
            this.guideToCloseMermaid()
        })
    }


    init() {
        this.mermaidMgr = new MermaidMgr()
        this.mermaidMgr.init()
        this.takeTime = Date.now()
        this.mermaid_num = 0
        this.currentTime = 0
        Event.addLocalListener(ClientEvents.Ev_FinshGuide, () => {
            this.guideTakeTime = Date.now()
        })
    }



    onTakeTreasure(qid: number) {
        console.log("拾取到了" + qid)
        if (this.currentGetMerId == qid)
            return
        this.currentGetMerId = qid     //避免拾取后的连续弹窗
        scheduler.timeStart(() => {
            this.currentGetMerId = 0
        }, 1)
        if (!this.data.isGetTreasure(qid)) {
            if (qid == 1) {
                Event.dispatchToLocal(ClientEvents.EV_GuideStep3)
            }
            Event.dispatchToLocal(ClientEvents.EV_NewTreasure);
            this.server.net_onPlayerTakeTreasure(qid)
            this.data.takeTreasure(qid)

            mw.UIService.show(P_TipsGet, qid)
            Track_pickTime((Date.now() - this.takeTime) / 1000)
            this.takeTime = Date.now()

            Utils.playSound(3)
            Utils.playEffect(1, null, GameConfig.MermaidMgr.getElement(qid).pos)
            this.mermaid_num++
            if (this.data.getTreasureNum() == 1) {  //说明是新手引导过完之后再次捡到新宝物了
                Track_LifeTime((Date.now() - this.guideTakeTime) / 1000)
            }
            Track_MermaidId(qid, (Date.now() - this._startTime) / 1000)
        }

        else {
            TipsUI.show(GameConfig.TextUI.getElement(41).Name)
        }
    }


    /**点击使用冲刺技能 */
    onskill(skilleff: number) {
        if (!this._isSkill) {
            this._isSkill = true

            let swimSpeed = this.localPlayer.character.maxSwimSpeed
            this.localPlayer.character.maxSwimSpeed += addSwimSpeed
            Utils.playSound(8)
            let effectid = Utils.playEffect(5, this.localPlayer.character.gameObjectId)
            scheduler.timeStart(() => {
                this.localPlayer.character.maxSwimSpeed = swimSpeed
                mw.SoundService.stopSound(GameConfig.Audio.getElement(8).ResGUID)
                Utils.stopEff(effectid)
                this._isSkill = false
            }, skilleff)


            if (IAAUtils.isRewardOpen()) {
                this.server.net_addSkillCount()
            }

        }


    }

    resetAllTreasure(id?: number) {
        this.server.net_resetAllTreasure(id)
    }

    onFly() {
        this.isPause = false
        this._swimType = SwimType.up
    }


    onDown() {
        this.isPause = false
        this._swimType = SwimType.down
    }

    onCancleFly() {
        this.isPause = true
    }
    /**
     * 到最近的人鱼
     */
    public guideToCloseMermaid() {
        const close = this.mermaidMgr.getCloseUnGetTreasure();
        if (close) {
            Track_TaskId(close.id)
            GuideLine.instance.setWorldPos(close.nealPos != null ? close.nealPos : close.pos);
        } else {
            TipsUI.show(GameConfig.TextUI.getElement(61).Name)
        }

    }

    goToNewMermaid() {
        const close = this.mermaidMgr.getCloseUnGetTreasure();
        if (close) {
            ModuleService.getModule(GameModule_C).setPosition(close.pos)
        }
    }


    onUpdate(dt: number): void {
        this.currentTime += dt
        if (this.currentTime >= 60) {
            this.currentTime = 0
            Track_getMermaid_num(this.mermaid_num)
            this.mermaid_num = 0

        }

        if (!this.isPause) {
            if (this._swimType == SwimType.up) {
                this.localPlayer.character.swimUp(this.localPlayer.character.maxSwimSpeed)
            } else {

                this.localPlayer.character.swimDown(this.localPlayer.character.maxSwimSpeed)
            }
        }

    }
}


const addSwimSpeed: number = 600

export enum SwimType {
    up = 0,
    down
}