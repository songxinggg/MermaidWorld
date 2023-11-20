
@Component
export default class Laser extends mw.Script {
	@mw.Property({ displayName: "移动速度" })
	speed: number = 10
	@mw.Property({ displayName: "移动距离" })
	distance: number = 1000
	@mw.Property({ displayName: "停留时间" })
	keepTime: number = 2

	private currentDistance: number

	private isPause: boolean
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		let id = setInterval(() => {
			if (this.gameObject) {
				this.currentDistance = 0
				this.useUpdate = true
				this.isPause = false
				clearInterval(id)
			}
		}, 100)


	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		if (this.isPause)
			return
		if (mw.SystemUtil.isServer()) {
			let loc = this.gameObject.worldTransform.position
			loc.z += dt * this.speed
			this.gameObject.worldTransform.position = loc
			this.currentDistance += dt * Math.abs(this.speed)
			if (this.currentDistance >= this.distance) {
				this.isPause = true
				setTimeout(() => {
					this.isPause = false
				}, this.keepTime * 1000);
				this.speed = -this.speed
				this.currentDistance = 0
			}
		}

	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

}
