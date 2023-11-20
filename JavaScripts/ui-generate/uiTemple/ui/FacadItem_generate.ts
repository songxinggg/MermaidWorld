 

 @UIBind('UI/uiTemple/ui/FacadItem.ui')
 export default class FacadItem_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mBtnSelect')
    public mBtnSelect: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mImgBG')
    public mImgBG: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mIconStroke')
    public mIconStroke: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mImgIcon')
    public mImgIcon: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/quliaty')
    public quliaty: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mSelect')
    public mSelect: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/seedbtn')
    public seedbtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mermaidSeed')
    public mermaidSeed: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBuyCon/mbtnUse')
    public mbtnUse: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBuyCon/mPrice')
    public mPrice: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBuyCon/mImgGold')
    public mImgGold: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBuyCon')
    public mBuyCon: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mnewImg')
    public mnewImg: mw.Image=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mBtnSelect.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSelect");
         })
         this.mBtnSelect.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSelect");
         })
         this.mBtnSelect.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSelect");
         })
         this.mBtnSelect.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.seedbtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "seedbtn");
         })
         this.seedbtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "seedbtn");
         })
         this.seedbtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "seedbtn");
         })
         this.seedbtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mbtnUse.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mbtnUse");
         })
         this.mbtnUse.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mbtnUse");
         })
         this.mbtnUse.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mbtnUse");
         })
         this.mbtnUse.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mBtnSelect);
	
         this.setLanguage(this.seedbtn);
	
         this.setLanguage(this.mbtnUse);
	
         //文本多语言
         this.setLanguage(this.quliaty)
	
         this.setLanguage(this.mermaidSeed)
	
         this.setLanguage(this.mPrice)
	
 
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
 