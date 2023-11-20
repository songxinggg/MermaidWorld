


import { GuideModuleC } from "module_guide";
import TipsUI from "../commonUI/P_Tips";
import { GameConfig } from "../config/GameConfig";
import { FacadMainUI } from "../face/facadMainUI";
import { globalVas } from "../GlobalDefine";
import { GlobalModule } from "../GlobalModule";
import { IAAUtils } from "../util/IAAUtils";
import { scheduler } from "../util/Scheduler";
import { Utils } from "../util/Utils";
import { GameDataHelper } from "./GameData";
import { GameModule_S } from "./GameModule_S";
import P_Game from "./UI/P_Game";
import P_Gold from "./UI/P_Gold";
import { GuideHelper } from "../GuideModule/GuideModule_Client";


export class GameModule_C extends ModuleC<GameModule_S, GameDataHelper>{
    initOver: boolean = false;
    onStart(): void {

        scheduler.timeStart(() => this.sendLogin(), 1);
        this.init()  
        Event.addLocalListener("EnterHideLevel",()=>{this.enterHideLevel()})
    }

    /**初始化场景要找的物体 */
    async init() {
        if (this.initOver) return
        mw.UIService.show(P_Gold)
        mw.UIService.getUI(FacadMainUI)
        this.initOver = true
        console.log("初始化是否通过了" + this.initOver)
    }

    /**进入场景后执行 */
    onEnterScene(sceneType: number): void {
        console.log("GameModule_Client Enter:!!!!!");
        mw.SoundService.playBGM(GameConfig.Audio.getElement(1).ResGUID, GameConfig.Audio.getElement(1).Volume)
    }


    /**发送登录 */
    sendLogin() {
        let nickName = mw.AccountService.getNickName() || "pieCeshi"
        console.log("测试名称" + nickName)
        this.server.net_PlayerLogin_S(this.localPlayer.playerId, nickName)
    }


    /**登录返回
     * @param res 是否为新玩家
     */
    net_PlayerLogin_C(res: boolean) {
        mw.UIService.show(P_Game);
        GuideHelper.instance.beginGuide();
       
    }

    private ismove: boolean = false
    onUpdate(dt: number): void {
        if (Player.localPlayer.character.isMoving) {
            if (!this.ismove && !Player.localPlayer.character.isJumping) {
                Utils.playSound(7)
                this.ismove = true
            }
        } else {
            this.ismove = false
            mw.SoundService.stopSound(GameConfig.Audio.getElement(7).ResGUID)
        }

    }


    addGold(value: number) {
        this.server.net_AddGold(value)
    }



    setPosition(position: mw.Vector) {
        this.localPlayer.character.worldTransform.position = position.clone()
    }

    enterHideLevel() {
        TipsUI.show(GameConfig.TextUI.getElement(55).Name)
    }
    /**返回大厅位置 */
    return2LobbyPos() {
        this.setPosition(Utils.randomCirclePoint(globalVas.LobbyStartPoint, 500))
        
    }
}