import TipsUI from "../../commonUI/P_Tips";
import { GameConfig } from "../../config/GameConfig";
import { GameModule_C } from "../../GameModule/GameModule_C";
import P_ClothTips from "../../GameModule/UI/P_ClothTips";
import { globalVas } from "../../GlobalDefine";
import { ClientEvents } from "../../LocalEvents";
import SceneModule_C from "../../SceneModule/SceneModule_C";
import { IAAUtils } from "../../util/IAAUtils";
import { Utils } from "../../util/Utils";
import { IAAData } from "./IAAData";
import { IAAModuleS } from "./IAAModuleS";
import { IAAPos } from "./IAAPos";
import { AdssMessageBox } from "./ui/AdsMessageBox";


export class IAAModuleC extends ModuleC<IAAModuleS, IAAData>{
    private _collectTimer: number;
    private _startTime: number;


    public cd: number = 0

    private isFirst: boolean = true

    override onStart(): void {
        const isready = IAAUtils.isRewardOpen()
        this._startTime = Date.now();

        Event.addLocalListener(ClientEvents.EV_NewTreasure, () => {
            if (Date.now() - this._startTime < globalVas.firstNewTreasureTime * 1000 || !isready) return;
            clearTimeout(this._collectTimer);

            if (this.data.hasCount(IAAPos.Time_Collect) > 0) {
                this._collectTimer = setTimeout(() => {
                    mw.UIService.show(AdssMessageBox, IAAPos.Time_Collect, this.data.hasCount(IAAPos.Time_Collect));
                }, globalVas.newTreasureTime * 1000);
            }
        });

        this.server.net_resetDate();
    }
    /**
     * 播放视频广告
     * @param pos 
     */
    public showRewardAd(pos: IAAPos, data?: { [key: string]: number | string }) {
        if (IAAUtils.InAd) return
        if (this.data.hasCount(pos) > 0 && IAAUtils.isRewardOpen()) {
            IAAUtils.showRewardAd(() => {
                this.onRewardAdSuccess(pos, data);
            }, () => {
                TipsUI.show(GameConfig.TextUI.getElement(58).Name);
            }, () => {

            })
        } else {
            TipsUI.show(GameConfig.TextUI.getElement(60).Name);
        }

    }



    private onRewardAdSuccess = (pos: IAAPos, data?: { [key: string]: number | string }) => {
        this.server.net_onPlaySuccess(pos, data);
        switch (pos) {
            case IAAPos.Main_Collect:
                ModuleService.getModule(SceneModule_C).guideToCloseMermaid();
                break;
            case IAAPos.Time_Collect:
                ModuleService.getModule(SceneModule_C).guideToCloseMermaid();
                break;
            case IAAPos.Skill_Num:
                ModuleService.getModule(SceneModule_C).onskill(600)
                break;
            case IAAPos.Round_Gold:
                let round = Math.random() > 0.2 ? Utils.randomNum(10, 14) : Utils.randomNum(14, 20)
                if (typeof (data.gold) == "number") {
                    TipsUI.show(Utils.formatString(GameConfig.TextUI.getElement(77).Name, round))
                    ModuleService.getModule(GameModule_C).addGold(data.gold * round)
                    mw.UIService.getUI(P_ClothTips).tweenGold(data.gold * round)
                }
                break;
        }
    }


    reset() {
        this.server.net_resetDate();
    }



    onUpdate(dt: number): void {
        if (IAAUtils.InAd) {
            if (this.cd > (this.isFirst ? globalVas.fistAdTime - 20 : globalVas.adTime - 20)) {
                this.cd -= 20
            }
            return
        }
        this.cd += dt
        if (this.cd >= globalVas.fistAdTime && this.isFirst) {
            this.showInsterial()
            this.isFirst = false
            this.cd = 0
        } else if (this.cd >= globalVas.adTime && !this.isFirst) {

            this.showInsterial()
            this.cd = 0
        }
    }


    showInsterial() {
        if (!IAAUtils.isInterstitialOpen()) return
        console.log("時間到了 調用插屏廣告")
        IAAUtils.showInterstitialAd(() => {
        }, () => {
        }, null)
    }
}