

import { GameConfig } from "../config/GameConfig";
import Loding_Generate from "../ui-generate/uiTemple/ui/Loding_generate";


/**Loading界面 */
export default class Loadsing extends Loding_Generate {
    private static _instance: Loadsing;
    private static get instance(): Loadsing {
        if (Loadsing._instance == null) {
            Loadsing._instance =mw.UIService.create(Loadsing) 
        }
        return Loadsing._instance;
    }

    private targetPercent: number = 0;//目标进度
    private curPercent: number = 0;//当前进度
    private speed: number = 1;//速度
    private completeAutoClose: boolean = false;//完成是否自动移除loading

  
    onStart(): void {
        this.curPercent = 0
        this.canUpdate = true;
       
    }
    onUpdate(dt: number) {
        let value = this.curPercent;
        if (value >= this.targetPercent) {
            if (this.completeAutoClose) {
                this.canUpdate=false
                    mw.UIService.hide(Loadsing);
            }
            return;
        }
        value += dt * this.speed;
        this.curPercent = value
    }
    onShow(msg: string, targetPercent: number, completeAutoClose: boolean) {
        this.mTitle.text = (GameConfig.TextUI.getElement(1).Name)
        this.msg_txt.text = (GameConfig.TextUI.getElement(2).Name)
        if (targetPercent < this.targetPercent) {
            this.curPercent = 0
        }
        this.targetPercent = targetPercent;
        this.completeAutoClose = completeAutoClose;
        this.mProgressBar.currentValue =(this.targetPercent)
        this.msg_txt.text = (msg);
    }
    /**
     * 显示loading(不同阶段会重复调用)
     * @param msg 显示的提示信息
     * @param targetPercent 目标进度(0-1)
     * @param completeAutoClose 完成后是否自动关闭
     */
    public static showLoading(msg: string, targetPercent: number, completeAutoClose?: boolean) {
        mw.UIService.showUI(this.instance,mw.UILayerTop, msg, targetPercent, completeAutoClose);
    }
}