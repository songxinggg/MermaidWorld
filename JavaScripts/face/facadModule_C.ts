import { FacadModuleBaseC, FacadScript, FacadUtil, IRoleAvatarCfg } from "module_facad";
import { GameDataHelper } from "../GameModule/GameData";
import P_Game from "../GameModule/UI/P_Game";
import { ServerEvents } from "../LocalEvents";
import { SceneDataHelper } from "../SceneModule/SceneData";
import { Track_Click, Track_buildAction, Track_ClothLifeTime } from "../Track/TrackMsg";
import MessagesBox from "../commonUI/P_MessageBox";
import TipsUI from "../commonUI/P_Tips";
import { GameConfig } from "../config/GameConfig";
import { IRoleAvatarElement } from "../config/RoleAvatar";
import { IAAData } from "../modules/IAA/IAAData";
import { IAAModuleC } from "../modules/IAA/IAAModuleC";
import { IAAPos } from "../modules/IAA/IAAPos";
import { AdssMessageBox } from "../modules/IAA/ui/AdsMessageBox";
import { IAAUtils } from "../util/IAAUtils";
import { scheduler } from "../util/Scheduler";
import { Utils } from "../util/Utils";
import facaLoading from "./facaLoading";
import { FacadMainUI } from "./facadMainUI";
import { FacadModuleS } from "./facadModule_S";

@Component
export default class FacadScriptExt extends FacadScript {
	//属性同步的时候配置表还没注册
	getCfg(id: number): IRoleAvatarCfg {
		return GameConfig.RoleAvatar.getElement(id);
	}

}

export class FacadModuleC extends FacadModuleBaseC<FacadModuleS> {
	onFacadReady(): void {
		
	}
	getListenServerAIBasicStanceAndAnimation(): string[] {
		return
	}
	onCameraComplete(): void {
		return
	}
	private _clothLifeTime: number


	getLookObjGuid(): string {
		return "6F37B70D";
	}
	getFacadClass() {
		return mw.Script.spawnScript(FacadScriptExt);
	}
	getTargetArmLength(): number {
		return 220;
	}
	getRotationSpeed(): number {
		return -20;
	}
	onStart(): void {
		FacadUtil.addCfg(GameConfig.RoleAvatar.getAllElement());
		//轮询检测对应的AI换装有没有成功
		let timer = scheduler.tickStart(() => {
			if (this.facadHumand) {
				this.facadHumand.displayName = ""
				this.facadHumand.onDescriptionComplete.add(() => {
					mw.UIService.hide(facaLoading)
				})
				scheduler.cancel(timer)
			}
		}, 1, -1)

		if (!IAAUtils.isRewardOpen()) {
			FacadUtil.foreach(cfg => {
				if (cfg.priceType == 3) {
					cfg.priceType = 1
				}
			})
		}

	}
	onNoticeNeedBuy(cfgIds: number[]) {
		MessagesBox.showOneBtnMessage("标题", "当前装扮包含未拥有套装，请购买或拾取后再保存");
	}
	getDefaultCfgId(): number {
		return GameConfig.RoleAvatar.getAllElement()[0].ID;
	}
	getHumanGuid(): string {
		return "1EA2DF2D"
	}
	getFacadCfg(cfgId: number): IRoleAvatarElement {
		return GameConfig.RoleAvatar.getElement(cfgId);
	}
	getItemIdsByType(type: number): IRoleAvatarElement[] {
		let ret = GameConfig.RoleAvatar.getAllElement().filter(t => {
			return t.type == type;
		})
		return ret;
	}
	isSameType(cfgId: number, type: number): boolean {
		let cfg = this.getFacadCfg(cfgId);
		if (!cfg) 
			return false
		return cfg.type == type;
	}

	/**请求购买衣服 */
	reqBuySuit(cfgId: number): void {
		const cfg = this.getFacadCfg(cfgId);
		if (cfg.priceType == 3) {    //如果是广告获取类型的衣服
			Track_Click("getCloth")
			ModuleService.getModule(IAAModuleC).showRewardAd(IAAPos.Cloth_Buy, { clothId: cfgId });
		} else if (DataCenterC.getData(GameDataHelper).GetGoldNum() >= cfg.price) {  //如果是金币获取类型的衣服或者是拾取解锁            
			super.reqBuySuit(cfgId)
		} else {   //金币不足了


			if (!IAAUtils.isRewardOpen()) {
				TipsUI.show(GameConfig.TextUI.getElement(31).Name)
				return
			}
			const data = DataCenterC.getData(IAAData);
			if (data.hasCount(IAAPos.Cloth_Gold)) {
				mw.UIService.show(AdssMessageBox, IAAPos.Cloth_Gold, data.hasCount(IAAPos.Cloth_Gold));
			} else {
				TipsUI.show(GameConfig.TextUI.getElement(31).Name)
			}
		}
	}

	gm_unlockAllCloth() {
		Event.dispatchToServer(ServerEvents.EV_GMaddAllCloth)
	}

	reqChangeFacadSuitState(cfgId: number) {
		let use = this.isSuitInTmpUse(cfgId)
		super.reqChangeFacadSuitState(cfgId)
		const type = this.getFacadCfg(cfgId).type
		//音效
		if ([1, 2, 11].includes(type)) {
			Utils.playSound(9)
		} else {
			Utils.playSound(10)
		}
		//特效
		if ([3, 9].includes(type)) {
			Utils.playEffect(2, this.getLookObjGuid())
		} else if ([2, 4].includes(type)) {
			Utils.playEffect(4, this.getLookObjGuid())
		} else {
			Utils.playEffect(3, this.getLookObjGuid())
		}


		if (DataCenterC.getData(SceneDataHelper).isHaveNewCloth(cfgId)) {
			(this.server as FacadModuleS).net_deletNewCloth(this.localPlayerId, cfgId)
		}
		let ret: string[] = []
		Object.values(this.getFacadCfg(cfgId)).forEach(value => {
			if (value && typeof value === "string") {
				ret.push(value)
			}
		})
		for (let i = 0; i < ret.length; i++) {
			if (ret[i].length == 32 && !use) {   //如果使用的是角色工程  需要load防止多次点击
				//mw.UIService.show(facaLoading)
				break
			}
		}
		Track_buildAction(cfgId)
	}


	openFacad() {
		this._clothLifeTime = Date.now()
		super.openFacad(FacadMainUI);
		mw.UIService.hide(P_Game)
		mw.SoundService.playBGM(GameConfig.Audio.getElement(2).ResGUID, GameConfig.Audio.getElement(1).Volume)
	}

	closeFacad(): void {
		Track_ClothLifeTime((Date.now() - this._clothLifeTime) / 1000)  //上报在换装界面停留的时间
		super.closeFacad();
		mw.UIService.hide(FacadMainUI);
		mw.UIService.show(P_Game)
		mw.SoundService.playBGM(GameConfig.Audio.getElement(1).ResGUID, GameConfig.Audio.getElement(1).Volume)
	}

}