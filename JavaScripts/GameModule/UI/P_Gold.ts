

import { Track_Click } from "../../Track/TrackMsg";
import TipsUI from "../../commonUI/P_Tips";
import { GameConfig } from "../../config/GameConfig";
import { IAAData } from "../../modules/IAA/IAAData";
import { IAAPos } from "../../modules/IAA/IAAPos";
import { AdssMessageBox } from "../../modules/IAA/ui/AdsMessageBox";
import Gold_Generate from "../../ui-generate/uiTemple/ui/Gold_generate";
import { IAAUtils } from "../../util/IAAUtils";
import { scheduler } from "../../util/Scheduler";
import { Utils } from "../../util/Utils";
import { GameDataHelper } from "../GameData";


export default class P_Gold extends Gold_Generate {

    onStart() {
        let goldData = DataCenterC.getData(GameDataHelper)
        this.mTxtGold.text = (goldData.GetGoldNum().toString())

        goldData.OnGoldNumChange.add((value: number, changeValue: number) => {
            this.doGoldTween(value)
            this.setGoldTxtChange(changeValue)
        }, this)
        this.mchangeGold.renderOpacity = (0)

        if (!IAAUtils.isRewardOpen())
            this.addGold.visibility = mw.SlateVisibility.Collapsed
        const data = DataCenterC.getData(IAAData);
        this.addGold.onClicked.add(() => {
            Track_Click("coinadd")
            if (data.hasCount(IAAPos.Cloth_Gold)) {
                mw.UIService.show(AdssMessageBox, IAAPos.Cloth_Gold, data.hasCount(IAAPos.Cloth_Gold));
            } else {
                TipsUI.show(GameConfig.TextUI.getElement(60).Name)
            }
        })
    }

    doGoldTween(value: number) {
        let goldTween = new mw.Tween({ X: Number(this.mTxtGold.text) })
            .to({ X: value }, 1000)
            .onUpdate((r) => {
                this.mTxtGold.text = (r.X.toFixed())
            })
            .start()
    }

    private changeTimer: number
    setGoldTxtChange(changeValue: number) {
        this.mchangeGold.renderOpacity = (1)
        this.mchangeGold.fontColor = (changeValue < 0 ? mw.LinearColor.red : mw.LinearColor.yellow)
        this.mchangeGold.text = (changeValue > 0 ? "+" + changeValue.toString() : changeValue.toString())
        if (this.changeTimer)
            scheduler.cancel(this.changeTimer)
        this.changeTimer = Utils.DoLerpForValue(1, 0, 1, (value) => {
            this.mchangeGold.renderOpacity = (value)
        }, () => { this.changeTimer = null })
    }


}
