import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
﻿
@Component
export default class DieTrigger extends mw.Script {
	@mw.Property({ displayName: "存档点" })
	setDeadId: number = 1
	@mw.Property({ displayName: "复活点" })
	pos: mw.Vector = mw.Vector.zero
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (mw.SystemUtil.isClient()) {
			let id = setInterval(() => {
				if (this.gameObject) {
					clearInterval(id)
					this.initTrigger()
				}
			}, 100)


		}
	}

	initTrigger() {
		let trigger = this.gameObject as mw.Trigger
		trigger.onEnter.add((go) => {
			try {
				if (PlayerManagerExtesion.isCharacter(go)&&go.gameObjectId ==Player.localPlayer.character.gameObjectId) {
					let character = go as mw.Character
					character.ragdollEnabled =(true)
					// Track_DeadTime(character.player)
					// Track_SceneId(this.setDeadId, character.player)
					setTimeout(() => {
						character.worldTransform.position = this.pos.clone()
						character.ragdollEnabled=(false)
					}, 2000);



				}
			} catch (e) {
				console.error("..............." + e)
			}

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
