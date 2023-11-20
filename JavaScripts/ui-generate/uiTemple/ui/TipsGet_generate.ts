 

 @UIBind('UI/uiTemple/ui/TipsGet.ui')
 export default class TipsGet_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mAds/text')
    public text: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds/text_1')
    public text_1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds/mTimeCount')
    public mTimeCount: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds')
    public mAds: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas/mBtnClose')
    public mBtnClose: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas/mTitle')
    public mTitle: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas/mImgFish')
    public mImgFish: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas/mTxtQuality')
    public mTxtQuality: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas/mTxtName')
    public mTxtName: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mcanvas')
    public mcanvas: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/adCanvas/adbtn')
    public adbtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/adCanvas/adtext')
    public adtext: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/adCanvas/getCoin')
    public getCoin: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/adCanvas/text_get')
    public text_get: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/adCanvas')
    public adCanvas: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mPlayAds')
    public mPlayAds: mw.Button=undefined;
    

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
	
         this.adbtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "adbtn");
         })
         this.adbtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "adbtn");
         })
         this.adbtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "adbtn");
         })
         this.adbtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.getCoin.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "getCoin");
         })
         this.getCoin.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "getCoin");
         })
         this.getCoin.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "getCoin");
         })
         this.getCoin.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
         this.setLanguage(this.mBtnClose);
	
         this.setLanguage(this.adbtn);
	
         this.setLanguage(this.getCoin);
	
         //文本多语言
         this.setLanguage(this.text)
	
         this.setLanguage(this.text_1)
	
         this.setLanguage(this.mTimeCount)
	
         this.setLanguage(this.mTitle)
	
         this.setLanguage(this.mTxtQuality)
	
         this.setLanguage(this.mTxtName)
	
         this.setLanguage(this.adtext)
	
         this.setLanguage(this.text_get)
	
 
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
 