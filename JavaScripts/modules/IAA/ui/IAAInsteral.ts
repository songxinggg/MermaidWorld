import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
﻿/**
 * @Author       : 田可成
 * @Date         : 2023-01-04 11:39:50
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-05 09:15:15
 * @FilePath     : \mermaidworld\JavaScripts\modules\IAA\ui\IAAInsteral.ts
 * @Description  : 
 */
/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-27 16:04:29
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-30 17:14:47
 * @FilePath: \mermaidworld\JavaScripts\modules\IAA\ui\IAAInsteral.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import IAAInsteral_Generate from "../../../ui-generate/uiTemple/ui/IAAInsteral_generate";
import { IAAUtils } from "../../../util/IAAUtils";
import { scheduler } from "../../../util/Scheduler";


export default class IAAInsteral extends IAAInsteral_Generate {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mPlayAds.onClicked.add(() => {
            this.showAd();
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.bUseUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }



    private _schedulerAd: number;

    /**
    * 展示全屏广告
    */

    private showAd() {

        this.mAds.visibility = mw.SlateVisibility.Collapsed
        this.mPlayAds.visibility = mw.SlateVisibility.Collapsed
        mw.UIService.hideUI(this)
        scheduler.cancel(this._schedulerAd);
        mw.AdsService.isReady(mw.AdsType.Interstitial, isReady => {
            if (isReady) {
                GeneralManager.modifyShowAd(mw.AdsType.Interstitial, isSuccess => {
                    if (isSuccess == mw.AdsState.Success) {

                    }
                });
            }
        });
    }


    onShow() {
        if (IAAUtils.isInterstitialOpen())
            this.showInsteral(true)
        else
            mw.UIService.hideUI(this)
    }

    showInsteral(isShowAd: boolean) {
        if (!IAAUtils.isInterstitialOpen()) return
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



    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}