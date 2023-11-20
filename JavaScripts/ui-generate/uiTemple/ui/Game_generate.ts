 

 @UIBind('UI/uiTemple/ui/Game.ui')
 export default class Game_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mBtnHandbook')
    public mBtnHandbook: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBtnSet')
    public mBtnSet: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBtnDress')
    public mBtnDress: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mRankTxt')
    public mRankTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mRankName')
    public mRankName: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/mRankCollectNum')
    public mRankCollectNum: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/scrollBox/mCanvasRank')
    public mCanvasRank: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_3/scrollBox')
    public scrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mNewImg')
    public mNewImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/skillBtn')
    public skillBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/skillTxt')
    public skillTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/adtipimg')
    public adtipimg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/adSkillTxt')
    public adSkillTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_1/mskillBar')
    public mskillBar: mw.ProgressBar=undefined;
    @UIWidgetBind('MWCanvas_2147482460/fly')
    public fly: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/down')
    public down: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/gmAddGold')
    public gmAddGold: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/gmAddCloth')
    public gmAddCloth: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/flyTxt')
    public flyTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/downTxt')
    public downTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adBtn')
    public adBtn: mw.Button=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adImgsss')
    public adImgsss: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adTips')
    public adTips: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adCount')
    public adCount: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adtip')
    public adtip: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1/adImg')
    public adImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mAds1')
    public mAds1: mw.Canvas=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mBtnHandbook.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnHandbook");
         })
         this.mBtnHandbook.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnHandbook");
         })
         this.mBtnHandbook.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnHandbook");
         })
         this.mBtnHandbook.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnSet.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSet");
         })
         this.mBtnSet.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSet");
         })
         this.mBtnSet.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSet");
         })
         this.mBtnSet.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnDress.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnDress");
         })
         this.mBtnDress.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnDress");
         })
         this.mBtnDress.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnDress");
         })
         this.mBtnDress.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.skillBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "skillBtn");
         })
         this.skillBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "skillBtn");
         })
         this.skillBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "skillBtn");
         })
         this.skillBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.fly.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "fly");
         })
         this.fly.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "fly");
         })
         this.fly.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "fly");
         })
         this.fly.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.down.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "down");
         })
         this.down.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "down");
         })
         this.down.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "down");
         })
         this.down.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.gmAddGold.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "gmAddGold");
         })
         this.gmAddGold.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "gmAddGold");
         })
         this.gmAddGold.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "gmAddGold");
         })
         this.gmAddGold.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.gmAddCloth.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "gmAddCloth");
         })
         this.gmAddCloth.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "gmAddCloth");
         })
         this.gmAddCloth.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "gmAddCloth");
         })
         this.gmAddCloth.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.adBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "adBtn");
         })
         this.adBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "adBtn");
         })
         this.adBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "adBtn");
         })
         this.adBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mBtnHandbook);
	
         this.setLanguage(this.mBtnSet);
	
         this.setLanguage(this.mBtnDress);
	
         this.setLanguage(this.skillBtn);
	
         this.setLanguage(this.fly);
	
         this.setLanguage(this.down);
	
         this.setLanguage(this.gmAddGold);
	
         this.setLanguage(this.gmAddCloth);
	
         //文本多语言
         this.setLanguage(this.mRankTxt)
	
         this.setLanguage(this.mRankName)
	
         this.setLanguage(this.mRankCollectNum)
	
         this.setLanguage(this.skillTxt)
	
         this.setLanguage(this.adSkillTxt)
	
         this.setLanguage(this.flyTxt)
	
         this.setLanguage(this.downTxt)
	
         this.setLanguage(this.adTips)
	
         this.setLanguage(this.adCount)
	
 
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
 