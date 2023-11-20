/**
 * @Author       : songxing
 * @Date         : 2023-03-14 15:38:15
 * @LastEditors  : songxing
 * @LastEditTime : 2023-03-14 16:22:33
 * @FilePath     : \mermaidworld\JavaScripts\face\facadMainUI.ts
 * @Description  : 
 */
import { FacadItemRender, IRoleAvatarCfg, FacadUIBase, FacadUICfg } from "module_facad";
import { SceneDataHelper } from "../SceneModule/SceneData";
import { Track_Page, Track_Click } from "../Track/TrackMsg";
import TipsUI from "../commonUI/P_Tips";
import { GameConfig } from "../config/GameConfig";
import { IAAModuleC } from "../modules/IAA/IAAModuleC";
import { IAAPos } from "../modules/IAA/IAAPos";
import FacadItem_Generate from "../ui-generate/uiTemple/ui/FacadItem_generate";
import FacadMain_Generate from "../ui-generate/uiTemple/ui/FacadMain_generate";
import { IAAUtils } from "../util/IAAUtils";
import { Utils } from "../util/Utils";
import { FacadModuleC } from "./facadModule_C";

class FacadItemRenderExt extends FacadItemRender<FacadItem_Generate> {
	constructor() {
		super(FacadItem_Generate, new mw.Vector2(295, 260));
	}
	getModule(): FacadModuleC {
		return ModuleService.getModule(FacadModuleC);
	}

	protected onStart(): void {
		super.onStart()
		let sceneData = DataCenterC.getData(SceneDataHelper)


		this.view.mbtnUse.touchMethod = (mw.ButtonTouchMethod.PreciseTap);

		this.view.mbtnUse.onClicked.add(() => {
			Utils.playSound(6)
		})

		this.view.mBtnSelect.onClicked.clear()
		this.view.mBtnSelect.onClicked.add(() => {
			Utils.playSound(6)
			let module = this.getModule();
			if (module.hasSuit(this.data.ID)) {
				module.reqChangeFacadSuitState(this.data.ID);
			} else {
				if (this.data.priceType == 3) {
					module.reqBuySuit(this.data.ID);
				} else if (this.data.priceType == 1) {
					TipsUI.show(GameConfig.TextUI.getElement(53).Name)
				} else {
					TipsUI.show(GameConfig.TextUI.getElement(32).Name)
				}
			}


			if (sceneData.isHaveNewCloth(this.data.ID)) {
				this.view.mnewImg.visibility = (mw.SlateVisibility.Collapsed)
			}
		})

	}

	setData(data: IRoleAvatarCfg) {

		this.data = data;
		this.view.mImgIcon.imageGuid = (data.icon.toString());
		this.view.mImgGold.imageGuid = (data.priceIcon.toString());
		this.view.mPrice.text = (data.price.toString());
		let qulaity = GameConfig.RoleAvatar.getElement(data.ID).qulaity
		this.view.quliaty.text = (GameConfig.TextUI.getElement(18 + qulaity).Name)

		let isHave = this.getModule().hasSuit(data.ID);
		this.view.mBuyCon.visibility = (!isHave && data.priceType == 1 ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed);
		this.view.mermaidSeed.text = GameConfig.TextUI.getElement(data.priceType == 2 ? 30 : 57).Name
		const visible = !isHave && (data.priceType == 2 || data.priceType == 3) ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
		this.view.mermaidSeed.visibility = (visible)
		this.view.seedbtn.visibility = (visible)
		this.updateUseState();

		if (!isHave && data.priceType == 3) {
			Track_Page("cloth_getfree")
		}

		if (DataCenterC.getData(SceneDataHelper).isHaveNewCloth(data.ID)) {
			//开启小点点
			this.view.mnewImg.visibility = (mw.SlateVisibility.HitTestInvisible)
		} else {
			this.view.mnewImg.visibility = (mw.SlateVisibility.Collapsed)
		}

	}


}


export class FacadMainUI extends FacadUIBase<FacadMain_Generate> {
	name: string = "FacadMainUI"
	mGuideImg: mw.Image
	mBtnSave: mw.StaleButton

	constructor() {
		super(FacadMain_Generate, ModuleService.getModule(FacadModuleC), FacadItemRenderExt);
	}

	protected onShow(...params: any[]): void {
		super.onShow(...params)
	}

	protected onStart(): void {
		super.onStart()
		if (!IAAUtils.isRewardOpen()) {
			this.view.adCanvas.visibility = mw.SlateVisibility.Collapsed
		}
		let sceneData = DataCenterC.getData(SceneDataHelper)
		for (let i = 1; i <= 10; i++) {
			if (sceneData.isHaveNewClothType(i)) {
				this.view["mNewImg" + i].visibility = (mw.SlateVisibility.HitTestInvisible)
			} else {
				this.view["mNewImg" + i].visibility = (mw.SlateVisibility.Collapsed)
			}
		}
		sceneData.OnNewClothItemChange.add(type => {
			if (sceneData.isHaveNewClothType(type)) {
				this.view["mNewImg" + type].visibility = (mw.SlateVisibility.HitTestInvisible)
			} else {
				this.view["mNewImg" + type].visibility = (mw.SlateVisibility.Collapsed)
			}
		}, this)

		this.view.madCoinBtn.onClicked.add(() => {
			Track_Click("clothcoin")
			ModuleService.getModule(IAAModuleC).showRewardAd(IAAPos.Cloth_Gold)
		})


	}


	protected initUICfg(cfg: FacadUICfg): void {
		//滑动组件
		cfg.scrollBox = this.view.mScrollBox;
		//滑动组件下装格子的容器
		cfg.scrollContent = this.view.mContent;
		//单个格子的渲染大小
		cfg.renderItemSize = new mw.Vector2(295, 260);
		//格子水平垂直间距
		cfg.horAndVerSpace = new mw.Vector2(2, 20);
		this.view.mGuideImg.size = (cfg.renderItemSize)
		cfg.btnLeft = this.view.btnLeft;
		cfg.btnRight = this.view.btnRight;
		cfg.btnSave = this.view.mBtnSave;
		cfg.btnRevert = this.view.btnReset;
		cfg.mTouch = this.view.mTouch;
		cfg.mPosImg = this.view.mPos;
		this.mGuideImg = this.view.mGuideImg
		this.mBtnSave = this.view.mBtnSave
		this.view.mBtnClose.onClicked.add(() => {
			Utils.playSound(6)
			ModuleService.getModule(FacadModuleC).closeFacad();
		})




		//添加三个按钮，并关联三种类型,第一个默认选中
		const ClothTypeString = ["0", GameConfig.TextUI.getElement(7).Name, GameConfig.TextUI.getElement(8).Name, GameConfig.TextUI.getElement(10).Name,
			GameConfig.TextUI.getElement(11).Name, GameConfig.TextUI.getElement(12).Name, GameConfig.TextUI.getElement(13).Name, GameConfig.TextUI.getElement(14).Name,
			GameConfig.TextUI.getElement(15).Name, GameConfig.TextUI.getElement(16).Name, GameConfig.TextUI.getElement(9).Name]



		for (let i = 1; i <= 10; i++) {
			this.addTabs(this.view["btn" + i], i, i == 1)
			this.view["mTextBtn" + i].text = (ClothTypeString[i])
		}

		this.view.madCoinTxt.text = (GameConfig.TextUI.getElement(73).Name)
		this.view.mBtnSave.text = (GameConfig.TextUI.getElement(17).Name)
		this.view.btnReset.text = (GameConfig.TextUI.getElement(18).Name)
	}

	/**
	 * 类型按钮切换回调
	 * @param btn 某个按钮
	 * @param isSelect 是否选中
	 */
	protected onTabBtnStateChangeCallBack(btn: mw.StaleButton, isSelect: boolean) {
		btn.normalImageColor = (new mw.LinearColor(mw.LinearColor.colorHexToLinearColor(isSelect ? "#ffff05ff" : "#ffffffff")))
	}

} 