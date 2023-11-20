
import { ClientEvents } from "../../LocalEvents"
import TipsUI from "../../commonUI/P_Tips"
import { GameConfig } from "../../config/GameConfig"
import { IMermaidMgrElement } from "../../config/MermaidMgr"
import { FacadModuleC } from "../../face/facadModule_C"
import ClothItem_Generate from "../../ui-generate/uiTemple/ui/ClothItem_generate"
import ClothTips_Generate from "../../ui-generate/uiTemple/ui/ClothTips_generate"
import GlodItem_Generate from "../../ui-generate/uiTemple/ui/GlodItem_generate"

import { scheduler } from "../../util/Scheduler"
import { Utils } from "../../util/Utils"
import P_Game from "./P_Game"
import P_Gold from "./P_Gold"



export default class P_ClothTips extends ClothTips_Generate {
	/**大堆的金币item */
	private _glodItems: GlodItem_Generate[]
	private _clothItem: ClothItem_Generate
	private getqid: number

	private _mermaidConfig: IMermaidMgrElement
    /**是否翻倍的金币 */
	private isdouble: boolean = false

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		this.mTitle.text = (GameConfig.TextUI.getElement(46).Name)
		this.mGOtoCloth.text = (GameConfig.TextUI.getElement(47).Name)

		this._glodItems = []
		for (let i = 0; i < 11; i++) {
			this._glodItems.push(mw.UIService.create(GlodItem_Generate))
		}

		this.mBtnClose.onClicked.add(() => {
			mw.UIService.hideUI(this)
			this.tweenClothAward()
			scheduler.timeStart(() => {
				if (!this.isdouble)
					this.tweenGold(this._mermaidConfig.rewardGold)
			}, 2)
		})

		this.mGOtoCloth.onClicked.add(() => {
			if (this.getqid == 1) {
				Event.dispatchToLocal(ClientEvents.EV_GuideStep4)
			}
			ModuleService.getModule(FacadModuleC).openFacad()
			mw.UIService.hideUI(this)
		})



	}

	private hideTid
	onShow(...params: any[]) {

		this.getqid = params[0]
		this.isdouble = params[1]
		this._mermaidConfig = GameConfig.MermaidMgr.getElement(this.getqid)
		this.hideTid && scheduler.cancel(this.hideTid)
		this.hideTid = scheduler.timeStart(() => {
			mw.UIService.hideUI(this); this.tweenClothAward(); scheduler.timeStart(() => {
				if (!this.isdouble) {
					this.tweenGold(this._mermaidConfig.rewardGold)
				}
			}, 2)
		}, 3)


		if (!this._mermaidConfig.rewardId) {
			mw.UIService.hideUI(this)
			if (!this.isdouble)
				this.tweenGold(this._mermaidConfig.rewardGold)
		} else {
			const clothCfg = GameConfig.RoleAvatar.getElement(this._mermaidConfig.rewardId)
			this.mImgCloth.imageGuid = (clothCfg.icon.toString())

			this.mTxtQuality.text = (GameConfig.TextUI.getElement(18 + clothCfg.qulaity).Name)
			const ClothTypeString = ["0", GameConfig.TextUI.getElement(7).Name, GameConfig.TextUI.getElement(8).Name, GameConfig.TextUI.getElement(10).Name,
				GameConfig.TextUI.getElement(11).Name, GameConfig.TextUI.getElement(12).Name, GameConfig.TextUI.getElement(13).Name, GameConfig.TextUI.getElement(14).Name,
				GameConfig.TextUI.getElement(15).Name, GameConfig.TextUI.getElement(16).Name, GameConfig.TextUI.getElement(9).Name]
			this.mTypeName.text = (ClothTypeString[clothCfg.type])
		}
	}

    /**对金币做动画 */
	tweenGold(goldnum: number) {
		Utils.playSound(4)
		if (goldnum > 0) {
			let nums = Math.min(goldnum / 10 + 4, 10) //生成金币yuanshu
			let tweenGoldArr: GlodItem_Generate[] = []
			TipsUI.show(GameConfig.TextUI.getElement(42).Name + "X" + goldnum)
			for (let i = 0; i < nums; i++) {
				tweenGoldArr.push(this._glodItems[i])
				mw.UIService.showUI(this._glodItems[i])
				let startPos = startPosArr[i]
				this._glodItems[i].rootCanvas.position = (startPos)
			}

			scheduler.timeStart(() => {
				let i = 0
				scheduler.timeStart(() => {
					let glodItem = tweenGoldArr[i]
					let tweenGold = new mw.Tween(glodItem.rootCanvas.position)
					tweenGold.to(Utils.getUIPostion(mw.UIService.getUI(P_Gold).mImgGold), 1000)
						.onUpdate(value => { glodItem.rootCanvas.position = (value); })
						.onComplete(() => { mw.UIService.hideUI(glodItem) })
						.easing(mw.TweenUtil.Easing.Back.In)
						.start()
					i++
				}, 0.2, tweenGoldArr.length, -1, () => {
					Utils.playSound(5)
				})

			}, 1)


		}
	}



	/**对衣服做动画 */
	tweenClothAward() {
		const clothCfg = GameConfig.RoleAvatar.getElement(this._mermaidConfig.rewardId)
		let startPos = Utils.getUIPostion(this.mImgCloth)
		if (this._mermaidConfig.rewardId > 0) {
			if (!this._clothItem)
				this._clothItem = mw.UIService.create(ClothItem_Generate)
			mw.UIService.showUI(this._clothItem)
			this._clothItem.rootCanvas.position = (startPos)
			this._clothItem.mImg.imageGuid = (clothCfg.icon.toString())
			scheduler.timeStart(() => {
				let tweenCloth = new mw.Tween(this._clothItem.rootCanvas.position)
				tweenCloth.to(Utils.getUIPostion(mw.UIService.getUI(P_Game).mBtnDress), 1000)
					.onUpdate(value => this._clothItem.rootCanvas.position = (value))
					.onComplete(() => { mw.UIService.hideUI(this._clothItem); Utils.playSound(5) })
					.easing(mw.TweenUtil.Easing.Back.In)
					.start()
			})

		}
	}

	onHide() {
		scheduler.tickStart(() => {
			this.hideTid && scheduler.cancel(this.hideTid)
			this.hideTid = null
		})

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
const startPosArr: mw.Vector2[] = [new mw.Vector2(750, 250), new mw.Vector2(800, 250), new mw.Vector2(850, 250), new mw.Vector2(900, 250), new mw.Vector2(950, 250),
new mw.Vector2(750, 350), new mw.Vector2(800, 350), new mw.Vector2(850, 350), new mw.Vector2(900, 350), new mw.Vector2(950, 350)]
