 

 @UIBind('UI/uiTemple/ui/Set.ui')
 export default class Set_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mSound')
    public mSound: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mBtnClose')
    public mBtnClose: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mBtnOpen')
    public mBtnOpen: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mBtnReturnLobby')
    public mBtnReturnLobby: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mBtnClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnClose");
         })
         this.mBtnClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnClose");
         })
         this.mBtnClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnClose");
         })
         this.mBtnClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnOpen.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnOpen");
         })
         this.mBtnOpen.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnOpen");
         })
         this.mBtnOpen.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnOpen");
         })
         this.mBtnOpen.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnReturnLobby.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnReturnLobby");
         })
         this.mBtnReturnLobby.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnReturnLobby");
         })
         this.mBtnReturnLobby.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnReturnLobby");
         })
         this.mBtnReturnLobby.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mBtnClose);
	
         this.setLanguage(this.mBtnOpen);
	
         this.setLanguage(this.mBtnReturnLobby);
	
         //文本多语言
         this.setLanguage(this.mSound)
	
 
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
 