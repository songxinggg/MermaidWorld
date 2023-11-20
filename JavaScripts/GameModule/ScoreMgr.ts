import { SpawnManager,SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
﻿/**
 * @Author       : songxing
 * @Date         : 2023-04-18 13:42:16
 * @LastEditors  : songxing
 * @LastEditTime : 2023-04-18 14:27:09
 * @FilePath     : \mermaidworld\JavaScripts\GameModule\ScoreMgr.ts
 * @Description  : 
 */


import { SceneDataHelper } from "../SceneModule/SceneData";
import { scheduler } from "../util/Scheduler";
import { Utils } from "../util/Utils";

export default class ScoreMgr {

	static _instance: ScoreMgr

	public static get instance(): ScoreMgr{
		if (!this._instance) {
			this._instance=new ScoreMgr()
		}
		return this._instance;
	}

	srcPool: IPlayerScore[]
	private _goPool: mw.GameObject[]

	constructor() {
		this.srcPool = []
		this._goPool = []
	}



	/**玩家加入 */
	async onPlayerJoin(pid: string, nickName: string) {
		if (mw.SystemUtil.isClient()) return
		console.log("____________________onPlayerJoin ", pid, this.srcPool.length)

		let src: IPlayerScore
		for (let s of this.srcPool) {
			if (s.pid == pid) {
				src = s
				break
			}
		}
		for (let s of this.srcPool) {
			if (!src && !s.enbleS) {
				src = s
				break
			}
		}
		if (!src) {
			let go = SpawnManager.spawn({ guid: "C180748D4C8910F91051DFBE6AE38F69" })
			await go.asyncReady()
			await Utils.waitForSeconds(1)
			this._goPool.push(go)
			src = go.getChildByName("BP_MWSysAnchor").getScripts()[0] as unknown as IPlayerScore
			this.onPlayerRegiser(src)
		}
		src.enbleS = true
		src.nickName = nickName
		scheduler.tickStart(() => src.pid = pid)
		src.treasureNum = DataCenterS.getData(Player.getPlayer(Number(pid)),SceneDataHelper).getTreasureNum()
	}

	/**玩家离开 */
	onPlayerLeft(pid:string) {
		if (mw.SystemUtil.isClient()) return
		this.srcPool.forEach(s => {
			if (s.pid == pid) {
				s.pid = "-1"
				s.enbleS = false
			}
		})

	}


	/**注册玩家积分脚本 */
	onPlayerRegiser(src: IPlayerScore) {
		console.log("________________________onPlayerRegiser ", src.pid)
		this.srcPool.push(src)
	}


	addTreasure(pid: string) {
		this.srcPool.forEach(s => {
			if (s.pid == pid) {
				s.treasureNum++
			}
		})
	}
}

export interface IPlayerScore {
	enbleS: boolean

	pid: string

	nickName: string


	treasureNum: number
}
