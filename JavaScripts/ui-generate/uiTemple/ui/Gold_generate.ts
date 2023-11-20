 

 @UIBind('UI/uiTemple/ui/Gold.ui')
 export default class Gold_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mImgGold')
    public mImgGold: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mTxtGold')
    public mTxtGold: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/addGold')
    public addGold: mw.Button=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mchangeGold')
    public mchangeGold: mw.TextBlock=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         //按钮添加点击
         this.addGold.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "addGold");
         })
         this.addGold.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "addGold");
         })
         this.addGold.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "addGold");
         })
         this.addGold.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mTxtGold)
	
         this.setLanguage(this.mchangeGold)
	
 
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
 