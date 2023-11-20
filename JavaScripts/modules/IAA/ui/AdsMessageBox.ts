/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-27 13:57:59
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-21 10:18:13
 * @FilePath: \mermaidworld\JavaScripts\modules\IAA\ui\AdsMessageBox.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Track_Click, Track_Page } from "../../../Track/TrackMsg";
import { GameConfig } from "../../../config/GameConfig";
import AdsMessageBox_Generate from "../../../ui-generate/uiTemple/ui/AdsMessageBox_generate";



import { Utils } from "../../../util/Utils";
import { IAAModuleC } from "../IAAModuleC";
import { IAAPos } from "../IAAPos";

/** 
 * @Author       : lei.zhao
 * @Date         : 2022-10-27 11:15:38
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2022-10-27 11:20:33
 * @FilePath     : \mermaidworld\JavaScripts\modules\IAA\ui\AdsMessageBox.ts
 * @Description  : 修改描述
 */
export class AdssMessageBox extends AdsMessageBox_Generate {
    private _pos: IAAPos;
    private _gold: number
    protected override onShow(pos: IAAPos, count: number, gold?: number): void {
        this._pos = pos;
        if (pos == IAAPos.Time_Collect) {
            this.mGetCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetGuid.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
            this.mGetRounCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetSkill.visibility = (mw.SlateVisibility.Collapsed)
            this.adImg.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
            this.adCount.text = (Utils.formatString(GameConfig.TextUI.getElement(68).Name, count))
            this.adMermaidTxt.text = GameConfig.TextUI.getElement(66).Name;
            Track_Page("frame_tip")
        } else if (pos == IAAPos.Cloth_Gold) {
            Track_Page("frame_coin")
            this.mGetCoin.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
            this.mGetGuid.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetSkill.visibility = (mw.SlateVisibility.Collapsed)
            this.mGetRounCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.adImg.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
            this.adCount.text = (Utils.formatString(GameConfig.TextUI.getElement(68).Name, count))
        } else if (pos == IAAPos.Round_Gold) {
            this.mGetCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetGuid.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetSkill.visibility = (mw.SlateVisibility.Collapsed)
            this.adImg.visibility = (mw.SlateVisibility.Collapsed);
            this._gold = gold
            this.mGetRounCoin.visibility = (mw.SlateVisibility.SelfHitTestInvisible);

            this.adCount.text = ("")
        } else if (pos == IAAPos.Skill_Num) {
            this.mGetCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetGuid.visibility = (mw.SlateVisibility.Collapsed);
            this.adImg.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetRounCoin.visibility = (mw.SlateVisibility.Collapsed);
            this.mGetSkill.visibility = (mw.SlateVisibility.SelfHitTestInvisible)

            this.adCount.text = ("")
        }



    }

    protected onStart(): void {
        this.mShowAds.onClicked.add(() => {
            mw.UIService.hide(AdssMessageBox);
            if (this._pos == IAAPos.Cloth_Gold) {
                Track_Click("getCoin")
                ModuleService.getModule(IAAModuleC).showRewardAd(this._pos);
            } else if (this._pos == IAAPos.Time_Collect) {
                Track_Click("getGuid1")
                ModuleService.getModule(IAAModuleC).showRewardAd(this._pos);
            } else if (this._pos == IAAPos.Round_Gold) {
                ModuleService.getModule(IAAModuleC).showRewardAd(this._pos, { gold: this._gold });
            } else if (this._pos == IAAPos.Skill_Num) {
                Track_Click("speedad")
                ModuleService.getModule(IAAModuleC).showRewardAd(this._pos);
            }

        });
        this.mClose.onClicked.add(() => {
            mw.UIService.hide(AdssMessageBox);
        });
        this.title.text = GameConfig.TextUI.getElement(62).Name
        this.adTxt2.text = GameConfig.TextUI.getElement(65).Name
        this.adTxt1.text = GameConfig.TextUI.getElement(65).Name
        this.adGold.text = GameConfig.TextUI.getElement(45).Name
        this.adApacet.text = GameConfig.TextUI.getElement(64).Name
        this.adNo.text = GameConfig.TextUI.getElement(63).Name
        this.adtxT3.text = GameConfig.TextUI.getElement(65).Name
        this.adtxT3_1.text = GameConfig.TextUI.getElement(74).Name


        this.adSkillTip.text = GameConfig.TextUI.getElement(75).Name
        this.adTxt4.text = GameConfig.TextUI.getElement(65).Name
        this.adTxt4_1.text = GameConfig.TextUI.getElement(76).Name
    }
}