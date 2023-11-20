/**
 * @Author       : songxing
 * @Date         : 2023-03-10 16:41:47
 * @LastEditors  : songxing
 * @LastEditTime : 2023-03-14 16:29:23
 * @FilePath     : \mermaidworld\Prefabs\playerScore\Script\PlayerScore.ts
 * @Description  : 
 */

import ScoreMgr, { IPlayerScore } from "../GameModule/ScoreMgr"
import { ClientEvents } from "../LocalEvents"




@Component
export default class PlayerScore extends mw.Script implements IPlayerScore {
	enbleS: boolean = false

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	pid = "-1"

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	nickName = ""

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	treasureNum = 0

	onRepProp() {
		console.log("______________________________onRepProp ", this.pid, this.nickName, this.treasureNum)
		if (mw.SystemUtil.isClient())
			Event.dispatchToLocal(ClientEvents.Ev_RefeshScore)
	}

	protected onStart(): void {
		console.log("______________________________PlayerScore ", this.pid, this.nickName)
		if (mw.SystemUtil.isClient())
			ScoreMgr.instance.onPlayerRegiser(this)
	}

}
