

import { GameConfig } from "../config/GameConfig";
import { GameModule_S } from "../GameModule/GameModule_S";
import ScoreMgr from "../GameModule/ScoreMgr";
import { SceneDataHelper } from "./SceneData";
import SceneModule_C from "./SceneModule_C";
import { IAAModuleS } from "../modules/IAA/IAAModuleS";
import { FacadModuleS } from "../face/facadModule_S";

export default class SceneModule_S extends ModuleS<SceneModule_C, SceneDataHelper>{



	/**玩家拾取到了宝物 */
	net_onPlayerTakeTreasure(qid: number) {
		let res = this.currentData.takeTreasure(qid)
		if (res) {
			const type = GameConfig.MermaidMgr.getElement(qid).rewardType
			if (type.includes(2)) {
				//说明奖励了服饰
				const clothId = GameConfig.MermaidMgr.getElement(qid).rewardId
				ModuleService.getModule(FacadModuleS).net_BuySuit(clothId, this.currentPlayer)
			}
			ModuleService.getModule(GameModule_S).net_AddGold(GameConfig.MermaidMgr.getElement(qid).rewardGold,this.currentPlayer)
			this.currentData.save(true)
			ScoreMgr.instance.addTreasure(this.currentPlayer.playerId.toString())
		}
	}

	/**重置所有捡到的鱼的数据 */
	net_resetAllTreasure(id?:number) {
		this.currentData.resetAllTreasure(id)
		this.currentData.save(true)
	}


	net_addSkillCount(){
		ModuleService.getModule(IAAModuleS).addSkillCount(this.currentPlayer)
	}


}