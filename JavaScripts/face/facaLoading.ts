﻿
import { GameConfig } from "../config/GameConfig";
import FacaLoading_Generate from "../ui-generate/uiTemple/ui/FacaLoading_generate";


export default class facaLoading extends FacaLoading_Generate {

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		this.loadingTxt.text = (GameConfig.TextUI.getElement(56).Name)
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {

	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

}
