 

 @UIBind('UI/uiTemple/ui/IAAInsteral.ui')
 export default class IAAInsteral_Generate extends mw.UIScript {
     @UIWidgetBind('RootCanvas/mAds/text')
    public text: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mAds/text_1')
    public text_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mAds/mTimeCount')
    public mTimeCount: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/mAds')
    public mAds: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/mPlayAds')
    public mPlayAds: mw.Button=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         //按钮添加点击
         this.mPlayAds.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mPlayAds");
         })
         this.mPlayAds.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mPlayAds");
         })
         this.mPlayAds.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mPlayAds");
         })
         this.mPlayAds.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.text)
	
         this.setLanguage(this.text_1)
	
         this.setLanguage(this.mTimeCount)
	
 
     }
     
     private setLanguage(ui: mw.StaleButton | mw.TextBlock) {
         let call = mw.UIScript.getBehavior("lan");
         if (call && ui) {
             call(ui);
         }
     }
     
     /**
       * 设置显示时触发
       */
     public show(...params: unknown[]) {
         mw.UIService.showUI(this, this.layer, ...params)
     }
 
     /**
      * 设置不显示时触发
      */
     public hide() {
         mw.UIService.hideUI(this)
     }
 
     protected onStart(): void{};
     protected onShow(...params: any[]): void {};
     protected onHide():void{};
 
     protected onUpdate(dt: number): void {
 
     }
     /**
      * 设置ui的父节点
      * @param parent 父节点
      */
     setParent(parent: mw.Canvas){
         parent.addChild(this.uiObject)
         this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size)
     }
 }
 