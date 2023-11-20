import { SpawnManager,SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
﻿/**
 * @Author       : 田可成
 * @Date         : 2022-12-23 13:27:49
 * @LastEditors  : songxing
 * @LastEditTime : 2023-10-15 16:11:49
 * @FilePath     : \mermaidworld\JavaScripts\util\CreatGo.ts
 * @Description  : 
 */


/*
 * @Author: xing.song xing.song@appshahe.com
 * @Date: 2022-08-26 11:38:51
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-31 15:44:13
 * @FilePath: \mermaidworld\JavaScripts\util\CreatGo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class DyObjUtil {

	public static Ins = new DyObjUtil();
	private _map: Map<string, boolean> = new Map();
	private _delayIdMap: Map<string, number> = new Map();
	public setIds(ids: string) {
		let arr = ids.split(",");
		arr.forEach(element => {
			this._map.set(element, true);
		});
	}

	public createGo<T extends mw.GameObject>(guid: string) {
		if (this._map.has(guid) == false) {
			// Event.dispatchToLocal(C2CEvent.TestIds, guid);
			//return null;
		}

		// let go = MW.GameObject.spawnGameObject(guid, mw.SystemUtil.isServer());
		let go = SpawnManager.modifyPoolSpawn(guid);
		if (go instanceof mw.Effect) {
			mw.TimeUtil.delaySecond
			let delayId = mw.TimeUtil.delayExecute(() => {
				(go as mw.Effect).play();
				this._delayIdMap.delete(go.gameObjectId);
			}, 10);
			this._delayIdMap.set(go.gameObjectId, delayId);
		}
		if (go == null) {
			console.log("无效的guid", guid);
		}
		return go as T;
	}



	public destoryGo(go: mw.GameObject) {
		if (!go) {
			return null;
		}
		if (this._delayIdMap.has(go.gameObjectId)) {
			let delayId = this._delayIdMap.get(go.gameObjectId);
			mw.TimeUtil.clearDelayExecute(delayId);
			this._delayIdMap.delete(go.gameObjectId);
		}
		mwext.GameObjPool.despawn(go);
		return null;
	}
}
