


import { GameDataHelper } from "./GameData";
import { GameModule_C } from "./GameModule_C";
import ScoreMgr from "./ScoreMgr";

export class GameModule_S extends ModuleS<GameModule_C, GameDataHelper>{


	battlePlayerid: string[]
	onStart(): void {
		this.battlePlayerid = []
	}



	protected onPlayerLeft(player: mw.Player): void {
		let pid = player.playerId.toString()
			this.playerLeft(pid)
	}



	/**玩家登录 */
	public net_PlayerLogin_S(pid: number, nickName: string) {
		let player = Player.getPlayer(pid)
		player.character.displayName = nickName
		this.playerJoin(pid.toString(), nickName)
		let res = false
		this.getClient(Player.getPlayer(pid)).net_PlayerLogin_C(res)   //这个玩家登陆成功了
	}

	playerJoin(pid: string, nickName: string) {
		this.battlePlayerid.push(pid)
		ScoreMgr.instance.onPlayerJoin(pid, nickName)
	}


	/**玩家 下线*/
	playerLeft(pid: string) {
		if (this.battlePlayerid.includes(pid))
			this.battlePlayerid.splice(this.battlePlayerid.indexOf(pid), 1)
		ScoreMgr.instance.onPlayerLeft(pid)
	}




	public net_AddGold(value: number,player?:mw.Player) {
		this.currentData.AddGold(value)
		this.getPlayerData(player).save(true).OnGoldNumChange.call(this.getPlayerData(player).GetGoldNum(),value)
	}

}