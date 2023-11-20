import { FacadModuleBaseS, FacadUtil } from "module_facad";
import { GameDataHelper } from "../GameModule/GameData";
import { GameModule_S } from "../GameModule/GameModule_S";
import { ServerEvents } from "../LocalEvents";
import { SceneDataHelper } from "../SceneModule/SceneData";
import { Track_clothid, Track_Box } from "../Track/TrackMsg";
import { GameConfig } from "../config/GameConfig";
import { IRoleAvatarElement } from "../config/RoleAvatar";
import FacadScriptExt, { FacadModuleC } from "./facadModule_C";











export class FacadModuleS extends FacadModuleBaseS<FacadModuleC> {
	async onPlayerJoined(player: mw.Player) {
		super.onPlayerJoined(player);

		let data = this.getPlayerData(player);
		FacadUtil.foreach(cfg => {
			if (cfg.priceType == 0) {
				data.addSuit(cfg.ID);
			}
		})
	}

	net_gmAddAllCloth(player: mw.Player) {
		let data = this.getPlayerData(player);
		FacadUtil.foreach(cfg => {
			data.addSuit(cfg.ID)
		})
		data.save(true)
	}

	getAutoEquipPartIds(player: mw.Player): number[] {
		return null;// return [41, 43]
	}
	getFacadClass() {
		return mw.Script.spawnScript(FacadScriptExt);
	}
	onStart(): void {
		FacadUtil.addCfg(GameConfig.RoleAvatar.getAllElement());

		Event.addClientListener(ServerEvents.EV_GMaddAllCloth, (player: mw.Player) => {
			this.net_gmAddAllCloth(player)
		})
	}

	checkBuyConditon(player: mw.Player, cfg: IRoleAvatarElement): boolean {
		//这里扣钱什么
		//return true
		let GameData = DataCenterS.getData(player, GameDataHelper)
		if (cfg.price <= GameData.GetGoldNum() || [2, 3].includes(cfg.priceType)) {  //如果金币足够 或者是拾取人鱼获得 或者是看广告获得
			if ([1, 3].includes(cfg.priceType)) {
				Track_clothid(cfg.ID, player)
			}
			if (cfg.priceType == 1)
				ModuleService.getModule(GameModule_S).net_AddGold(-cfg.price, player)
			const sceneData = DataCenterS.getData(player, SceneDataHelper)
			sceneData.addNewCloth(cfg.ID)
			sceneData.save(true).OnNewClothItemChange.call(cfg.type)
			sceneData.save(true).OnNewClothsChange.call(sceneData.getNewClothLen())
			Track_Box(cfg.ID, player)
			return true
		} else {
			return false
		}
	}
	/**删除新衣服 */
	net_deletNewCloth(pid: number, cfgId: number) {
		const sceneData = DataCenterS.getData(pid, SceneDataHelper)
		sceneData.deleteCloth(cfgId)
		sceneData.save(true).OnNewClothItemChange.call(GameConfig.RoleAvatar.getElement(cfgId).type)
		sceneData.save(true).OnNewClothsChange.call(sceneData.getNewClothLen())

	}

	//测试接口================================
	getFacadCfg(cfgId: number): IRoleAvatarElement {
		return GameConfig.RoleAvatar.getElement(cfgId);
	}
	getDefaultCfgId(player: mw.Player): number {
		//这里可以根据其他条件返回,比如性别什么的
		return GameConfig.RoleAvatar.getAllElement()[0].ID;
	}
	//测试接口================================

}



