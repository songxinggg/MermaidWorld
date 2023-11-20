/**
 * @Author       : songxing
 * @Date         : 2023-05-15 17:05:50
 * @LastEditors  : songxing
 * @LastEditTime : 2023-05-19 09:32:31
 * @FilePath     : \mermaidworld\JavaScripts\scriptPrefab\Lightn.ts
 * @Description  : 
 */

@Component
export default class Lightn extends mw.Script {
	private effs: mw.Effect[]



	private dieTrigger: mw.Trigger
	@mw.Property({ displayName: "特效播放时长" })
	private effTime: number = 10

	@mw.Property({ displayName: "暂停时长" })
	private pauseTime: number = 2

	@mw.Property({ displayName: "唯一ID" })
	private id: number = 1

	private currentTime: number = 0
	private isPause: boolean
	initOver: boolean = false
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		const inter = setInterval(() => {
			if (!this.initOver) {
				if (this.gameObject) {
					this.initOver = true
					this.init()
				}
				if (this.initOver) {
					clearInterval(inter)
					this.useUpdate = true
				}
			}
		}, 100)
	}

	init() {
		if (mw.SystemUtil.isClient()) {
			this.effs = []
			let eff1 = this.gameObject.getChildByName("shandian1") as mw.Effect//MW.GameObject.spawnGameObject("101412") as mw.Effect
			this.effs.push(eff1)
			let eff2 = this.gameObject.getChildByName("shandian2") as mw.Effect//MW.GameObject.spawnGameObject("101412") as mw.Effect
			this.effs.push(eff2)
			let eff3 = this.gameObject.getChildByName("shandian3") as mw.Effect//MW.GameObject.spawnGameObject("101412") as mw.Effect
			this.effs.push(eff3)

			
			Event.addServerListener("PlayeEffect" + this.id, () => {
				this.playEffect()
			})
		}

		if (mw.SystemUtil.isServer()) {
		    this.dieTrigger = this.gameObject.getChildByName("触发器") as mw.Trigger
			this.currentTime = 0
			this.isPause = false
		}

	}

	public playEffect() {
		if (mw.SystemUtil.isClient()) {
			if (this.initOver) {
				this.effs.forEach((eff) => {
					eff.loop=(true)
					eff.play()
					setTimeout(() => {
						eff.stop()
					}, this.effTime * 1000);
				})
			}

		}
	}


	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		if (mw.SystemUtil.isServer() && !this.isPause) {
			this.currentTime += dt
			if (this.currentTime >= this.pauseTime) {
				Event.dispatchToAllClient("PlayeEffect" + this.id)
				if (this.dieTrigger) {
					this.dieTrigger.enabled = true
				}
				
				this.currentTime = 0
				this.isPause = true
				setTimeout(() => {
					if (this.dieTrigger) {
						this.dieTrigger.enabled = false
					}
				}, this.effTime * 1000);
			}
		}
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

}
