/**
 * @Author       : songxing
 * @Date         : 2023-02-05 10:49:37
 * @LastEditors  : songxing
 * @LastEditTime : 2023-03-14 16:27:05
 * @FilePath     : \mermaidworld\JavaScripts\Rotation.ts
 * @Description  : 
 */

@Component
export default class Rotation extends mw.Script {
    @mw.Property({displayName:"旋转速度"})
	speed:number=20

	@mw.Property({displayName:"旋转轴x,y,z"})
	rotationAixs:string="z"

	@mw.Property({displayName:"是否开启角度限制"})
	rotationLimit:boolean=false

	@mw.Property({displayName:"最大限制角度"})
	limitMaxNum:number=0
	@mw.Property({displayName:"最小限制角度"})
	limitMinNum:number=-90
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
     if(mw.SystemUtil.isServer()){
		this.useUpdate=true
		this.currentAixsNum=this.gameObject.worldTransform.rotation[this.rotationAixs]
	 }
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	private currentAixsNum:number
	protected onUpdate(dt: number): void {
      if(mw.SystemUtil.isServer()){
		let rot=this.gameObject.worldTransform.rotation
		rot[this.rotationAixs]+=this.speed*dt
			this.gameObject.worldTransform.rotation=rot
		if(this.rotationLimit){
			if(rot[this.rotationAixs]<this.limitMinNum||rot[this.rotationAixs]>this.limitMaxNum){
              this.speed=-this.speed
			  this.currentAixsNum=0
			}
		}
		
	  }
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

}
