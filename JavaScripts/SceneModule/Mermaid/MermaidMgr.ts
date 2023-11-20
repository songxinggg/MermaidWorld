import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
/**
 * @Author       : songxing
 * @Date         : 2023-03-14 16:38:48
 * @LastEditors  : songxing
 * @LastEditTime : 2023-07-07 14:00:09
 * @FilePath     : \mermaidworld\JavaScripts\SceneModule\Mermaid\MermaidMgr.ts
 * @Description  : 
 */


import { GuideModuleC } from "module_guide"
import { GameAssets } from "../../GameAssets"
import { GlobalModule } from "../../GlobalModule"
import { GameConfig } from "../../config/GameConfig"
import { IMermaidMgrElement } from "../../config/MermaidMgr"
import { DyObjUtil } from "../../util/CreatGo"
import { Utils } from "../../util/Utils"
import { SceneDataHelper } from "../SceneData"

export default class MermaidMgr {

	private _aiPool: mw.Character[]


	/**当前场景中显示出来的ai */
	private _aistateMap: Map<number, mw.Character>
	/**当前场景中生成可拾取triggerMap */
	private _takeTriggerMap: Map<number, mw.Trigger>

	private _socketMap: Map<number, mw.GameObject>

	private _tailMap: Map<number, mw.GameObject>

	private _tailPool: mw.GameObject[]

	private _effEctMap: Map<number, number>

	private _triggerMap: Map<number, string>

	init() {
		this._aiPool = []
		this._tailPool = []
		this._socketMap = new Map()
		this._aistateMap = new Map()
		this._takeTriggerMap = new Map()
		this._triggerMap = new Map()
		this._tailMap = new Map()
		this._effEctMap = new Map()
		this.spawnBoxTrigger()
	}



	private async spawnBoxTrigger() {  //这个是检测范围的trigger
		GameConfig.MermaidMgr.getAllElement().forEach(async item => {
			let trigger = SpawnManager.spawn({guid:"Trigger"}) as mw.Trigger
			trigger.shape = mw.TriggerShapeType.Sphere;
			trigger.worldTransform.scale = new mw.Vector(item.checkRaduis)
			trigger.worldTransform.position = item.pos
			this._triggerMap.set(item.id, trigger.gameObjectId)
			trigger.onEnter.add((go) => {
				try {
					if (PlayerManagerExtesion.isCharacter(go) && go.gameObjectId == Player.localPlayer.character.gameObjectId) {
						this._triggerMap.forEach((guid, qid) => {
							if (guid === trigger.gameObjectId) {
								this.spwanAi(qid, item.pos)
							}
						})
					}
				}
				catch (e) {
					console.error('.....' + e)
				}

			})

			trigger.onLeave.add((go) => {
				if (PlayerManagerExtesion.isCharacter(go) && go.gameObjectId == Player.localPlayer.character.gameObjectId) {
					this._triggerMap.forEach((guid, qid) => {
						if (guid === trigger.gameObjectId) {
							this.returnAi(qid) //离开这个返回回收AI 回收对应的拾取触发器
						}
					})
				}
			})
			await Utils.waitForTicks(1)
			trigger.enabled = (false);
			 setTimeout(() => {
				trigger.enabled = (true);
			}, 1000);
		})
	}



	private async spwanAi(qid: number, pos: mw.Vector) {
		let ai = this._aiPool.pop()
		if (!ai) {
			ai = SpawnManager.spawn({guid:"NPC"}) as mw.Character
			await ai.asyncReady()
			ai.worldTransform.scale = new mw.Vector(1.4)
			ai.displayName = ""
			ai.gravityScale = 0;
		}
		
		ai.worldTransform.position = new mw.Vector(pos.x, pos.y, pos.z)
		ai.worldTransform.rotation = new mw.Rotation(GameConfig.MermaidMgr.getElement(qid).rotate)
		this._aistateMap.set(qid, ai)
		this.clothToAicharacter(ai, qid)
		this.attchTakeTrigger(qid, pos)
		this.addGetEffect(qid)
	}

	//还要给ai身上套个拾取的触发器
	private attchTakeTrigger(qid: number, pos: mw.Vector) {

		let takeTrigger = SpawnManager.spawn({guid:"Trigger"}) as mw.Trigger
		takeTrigger.shape=mw.TriggerShapeType.Sphere;
		takeTrigger.worldTransform.scale = new mw.Vector(2)

		takeTrigger.worldTransform.position = new mw.Vector(pos.x, pos.y, pos.z)
		takeTrigger.onEnter.add((go) => {
			if (PlayerManagerExtesion.isCharacter(go) && go.gameObjectId == Player.localPlayer.character.gameObjectId) {
				GlobalModule.SceneModule_C.onTakeTreasure(qid)
				this.addGetEffect(qid, true)
			}
		})
		this._takeTriggerMap.set(qid, takeTrigger)
	}

	/**添加人鱼拾取特效
	 * 人鱼id */
	private addGetEffect(qid: number, isget: boolean = false) {
		if (this._effEctMap.has(qid))
			return
		if (DataCenterC.getData(SceneDataHelper).isGetTreasure(qid) || isget) {
			let effcetid = Utils.playEffect(6, null, this._aistateMap.get(qid).worldTransform.position)
			this._effEctMap.set(qid, effcetid)
		}

	}



	private async clothToAicharacter(ai: mw.Character, qid: number) {
		console.log("换装了" + qid)
		const config = GameConfig.MermaidCloth.getElement(qid)
		if (!config)
			return
		//鱼尾巴
		ai.description.advance.clothing.lowerCloth.style = ""
		ai.description.advance.clothing.shoes.style = ""
		let tail = this._tailPool.pop()
		if (!tail) {
			tail = await SpawnManager.spawn({guid:GameAssets.tail})
		}
		if (config.matGuid) {
			let objs: mw.GameObject[] = []
			objs.push(tail)
			while (objs.length > 0) {
				let node = objs.shift()
				if (node.getChildren().length > 0) {
					node.getChildren().forEach(obj => {
						objs.push(obj);
						if ((obj as mw.Model).setMaterial != null)
							(obj as mw.Model).setMaterial(config.matGuid)
					})
				}
			}
		}

		ai.attachToSlot(tail, mw.HumanoidSlotType.Root)
		const maleType = GameConfig.MermaidMgr.getElement(qid).maletype
		tail.localTransform.position = (maleType === 2 ? new mw.Vector(3, -1, 73.5) : new mw.Vector(1, -2, 90))
		tail.localTransform.rotation = (new mw.Rotation(0, 0, 90))
		this._tailMap.set(qid, tail)
		//插槽类型的物品
		//ai.switchToFlying()

		if (config.effectGuid) {
			let go = DyObjUtil.Ins.createGo(config.effectGuid)
			this._socketMap.set(qid, go)
			if (config.socket >= 0) {
				if (ai.attachToSlot) {
					ai.attachToSlot(go, config.socket)
				} else {
					go.parent = ai
				}
				go.localTransform.position = (config.posOffset != null && config.posOffset)
				go.localTransform.rotation = (config.rotate != null && new mw.Rotation(config.rotate))
				go.worldTransform.scale = config.scale
			}
		}
		ai.switchToWalking()

		let loadData = (cfgguid: string, ai: mw.Character) => {
			ai.setDescription([cfgguid])
			// return new Promise<void>((res) => {
			// 	let tool = ai.setDescription(cfgguid)
			// 	res();
			// })
		}
		//然后根据id换上对应的装扮
		if (config) {
			const partList = [config.upper, config.hairstyle, config.role, config.glove]
			for (let i = 0; i < partList.length; i++) {
				await loadData(partList[i], ai)
			}

		}

	}



	/**回收鱼尾巴 */
	private returnTail(qid: number) {
		let tail = this._tailMap.get(qid)
		if (tail) {
			this._tailPool.push(tail)
			tail.worldTransform.position = new mw.Vector(10000, 10000, 10000)
			this._tailMap.delete(qid)
		} else {
			console.log("___________________________aiTail null", qid)
		}
	}


	/**回收Ai */
	private returnAi(qid: number) {
		let ai = this._aistateMap.get(qid)
		if (ai) {
			this._aiPool.push(ai)
			ai.worldTransform.position = new mw.Vector(10000, 10000, 10000)
			ai.clearDescription()
			this._aistateMap.delete(qid)
		} else {
			console.log("___________________________aiReturn null", qid)
		}
		Utils.stopEff(this._effEctMap.get(qid))
		this._effEctMap.delete(qid)
		this.returnTakeTrigger(qid)
		this.returnTail(qid)
		if (GameConfig.MermaidCloth.getElement(qid).effectGuid)
			this.returnSocketObj(qid)
	}
	/**删除拾取触发器 */
	private returnTakeTrigger(qid: number) {
		let trigger = this._takeTriggerMap.get(qid)
		if (trigger) {
			trigger.enabled = (false)
			trigger.destroy()
			trigger = null
			this._takeTriggerMap.delete(qid)
		} else {
			console.log("___________________________TriggerReturn null", qid)
		}
	}


	private returnSocketObj(qid: number) {
		let objs = this._socketMap.get(qid)
		if (objs) {
			if (objs != null) {
				objs.parent = null
				DyObjUtil.Ins.destoryGo(objs)
			}


		} else {
			console.log("___________________________SocketReturnObj null", qid)
		}
	}

	/**
	 * 返回距离最近的未获取宝物
	 * @returns 
	 */
	public getCloseUnGetTreasure(): IMermaidMgrElement {
		GuideModuleC
		const playerLoc = Player.localPlayer.character.worldTransform.position;
		const data = DataCenterC.getData(SceneDataHelper);
		const allMermaids = GameConfig.MermaidMgr.getAllElement();
		const sortMermaids = allMermaids.sort((a, b) => mw.Vector.squaredDistance(playerLoc, a.nealPos != null ? a.nealPos : a.pos) - mw.Vector.squaredDistance(playerLoc, b.nealPos != null ? b.nealPos : b.pos));
		for (const mermaid of sortMermaids) {
			if (!data.isGetTreasure(mermaid.id)) {
				return mermaid;
			}
		}
		return null;
	}
}
