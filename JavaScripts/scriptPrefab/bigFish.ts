import { SpawnManager,SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';

@Component
export default class bigFish extends mw.Script {
	@mw.Property()
	speed: number = 10
	@mw.Property()
	distance: number = 1000
	@mw.Property()
	triggerSize: number[] = [1.5, 1.5, 1.5]
	@mw.Property()
	impulse: number = 2000
	private trigger: mw.Trigger

	private currentDistance: number
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if(mw.SystemUtil.isServer()){
			this.trigger = SpawnManager.wornSpawn("Trigger",true) as mw.Trigger
			this.trigger.parent = this.gameObject
			this.trigger.localTransform.position = (new mw.Vector(0,100,0))
			this.trigger.worldTransform.scale = new mw.Vector(this.triggerSize[0], this.triggerSize[1], this.triggerSize[2])
			this.trigger.onEnter.add((go) => {
				if (PlayerManagerExtesion.isCharacter(go)) {
					let character = go as mw.Character
					let dir = character.worldTransform.getForwardVector().normalized
					dir.z = 0.1
					character.addImpulse(dir.multiply(-this.impulse), true)
				}
			})
			this.currentDistance = 0
			this.useUpdate = true
		}
		
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		if(mw.SystemUtil.isClient())
		return
		let loc = this.gameObject.worldTransform.position
		loc.z += dt * this.speed
		this.gameObject.worldTransform.position = loc
		this.currentDistance += dt * Math.abs(this.speed)
		if (this.currentDistance >= this.distance) {
			this.speed = -this.speed
			this.currentDistance = 0
		}
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

}
