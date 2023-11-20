
import { GuideModuleC } from "module_guide";
import { ClientEvents } from "../../LocalEvents";
import { SceneDataHelper } from "../../SceneModule/SceneData";
import { Track_Click } from "../../Track/TrackMsg";
import { GameConfig } from "../../config/GameConfig";
import { IAAModuleC } from "../../modules/IAA/IAAModuleC";
import { IAAPos } from "../../modules/IAA/IAAPos";
import { IAAUtils } from "../../util/IAAUtils";
import { scheduler } from "../../util/Scheduler";
import { Utils } from "../../util/Utils";
import P_ClothTips from "./P_ClothTips";

import TipsGet_Generate from "../../ui-generate/uiTemple/ui/TipsGet_generate";

export default class P_TipsGet extends TipsGet_Generate {

    private getqid = 0
    /**是否翻倍 */
    private isdobule: boolean = false
    private _schedulerAd: number;
    private _adActiveTime: number = 0;
    private _adActiveCount: number = 0;

    private _isInGuide: boolean = true

    onStart() {
        this.mBtnClose.onClicked.add(() => {
            Utils.playSound(6)
            this.isdobule = false
            mw.UIService.hideUI(this)
        })
        this.mPlayAds.onClicked.add(() => {
            this.showAd();
        });


        this.getCoin.onClicked.add(() => {
            Utils.playSound(6)
            this.isdobule = false
            Track_Click("findcoin")
            mw.UIService.hideUI(this)
        })

        this.adbtn.onClicked.add(() => {
            Utils.playSound(6)
            ModuleService.getModule(IAAModuleC).showRewardAd(IAAPos.Round_Gold, { gold: GameConfig.MermaidMgr.getElement(this.getqid).rewardGold })
            Track_Click("findadcoin")
            this.isdobule = true
            mw.UIService.hideUI(this)

        })

        if (ModuleService.getModule(GuideModuleC).getCurGuideId() >= 2) {
            this._isInGuide = false
        }

        this.adtext.text = GameConfig.TextUI.getElement(74).Name
        this.mTitle.text = (GameConfig.TextUI.getElement(28).Name)
        this.text.text = GameConfig.TextUI.getElement(72).Name
        this.text_1.text = GameConfig.TextUI.getElement(71).Name
        Event.addLocalListener(ClientEvents.Ev_FinshGuide, () => { this._isInGuide = false })



    }


    onShow(...params: any[]) {
        this.getqid = params[0]
        console.log("_________________________P_TipsGet show ", this.getqid)

        if (this._isInGuide || !IAAUtils.isRewardOpen()) {
            scheduler.timeStart(() => {
                this.isdobule = false
                mw.UIService.hideUI(this)
            }, 3)
            this.adCanvas.visibility = mw.SlateVisibility.Collapsed
        } else {
            this.adCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
        }

        let congfig = GameConfig.MermaidMgr.getElement(this.getqid)
        this.mImgFish.imageGuid = (congfig.icon.toString())
        this.mTxtQuality.text = (GameConfig.TextUI.getElement(18 + congfig.Qulaity).Name)
        this.mTxtName.text = (congfig.Name)
        this.text_get.text = Utils.formatString(GameConfig.TextUI.getElement(78).Name, congfig.rewardGold)
        if (IAAUtils.isInterstitialOpen())
            this.checkAdState();
    }

    /**
     * 展示全屏广告
     */

    private showAd() {
        this.mAds.visibility = mw.SlateVisibility.Collapsed
        this.mPlayAds.visibility = mw.SlateVisibility.Collapsed
        scheduler.cancel(this._schedulerAd);
        IAAUtils.showInterstitialAd(() => {
            this._adActiveCount = 0;
            this._adActiveTime = Date.now() + 90000;
        }, null, null)
    }
    /**
     * 判断全屏AD是否需要展示
     * @returns 
     */
    private checkAdState() {
        scheduler.cancel(this._schedulerAd);
        this._adActiveCount++;
        //冷却时间未到
        let isShowAd = false;
        if (this._adActiveTime <= Date.now()) {

            let adActiveTotal = 1;
            const treasureNum = DataCenterC.getData(SceneDataHelper).getTreasureNum();
            if (treasureNum <= 15 && [7, 11, 13, 15].includes(treasureNum)) {
                isShowAd = true
            } else if (treasureNum > 15) {
                adActiveTotal = 2
                isShowAd = this._adActiveCount >= adActiveTotal;
            }
        }

        this.mAds.visibility = (isShowAd ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed);
        this.mPlayAds.visibility = (isShowAd ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed);
        if (isShowAd) {
            let time = 5;
            this._schedulerAd = scheduler.timeStart(() => {
                this.mTimeCount.text = (`(${time--})`);
            }, 1, 5, -1, () => {
                this.showAd();
            });
        }
    }


    onHide() {
        if (this.getqid > 0) {
            mw.UIService.show(P_ClothTips, this.getqid, this.isdobule)
        }
        this.mImgFish.imageGuid = ""
        this.getqid = 0
    }

}
