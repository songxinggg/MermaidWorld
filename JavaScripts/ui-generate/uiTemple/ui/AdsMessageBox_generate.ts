 

 @UIBind('UI/uiTemple/ui/AdsMessageBox.ui')
 export default class AdsMessageBox_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/title')
    public title: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetGuid/adTxt1')
    public adTxt1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetGuid/adMermaidTxt')
    public adMermaidTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetGuid')
    public mGetGuid: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetCoin/adGold')
    public adGold: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetCoin/adTxt2')
    public adTxt2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetCoin')
    public mGetCoin: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetRounCoin/adtxT3')
    public adtxT3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetRounCoin/adtxT3_1')
    public adtxT3_1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetRounCoin')
    public mGetRounCoin: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetSkill/adSkillTip')
    public adSkillTip: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetSkill/adTxt4')
    public adTxt4: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetSkill/adTxt4_1')
    public adTxt4_1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent/mGetSkill')
    public mGetSkill: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mContent')
    public mContent: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/adImg')
    public adImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/mShowAds/adApacet')
    public adApacet: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/mShowAds')
    public mShowAds: mw.Button=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/mClose/adNo')
    public adNo: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/mClose')
    public mClose: mw.Button=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton/adCount')
    public adCount: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButton')
    public mButton: mw.Canvas=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         //按钮添加点击
         this.mShowAds.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mShowAds");
         })
         this.mShowAds.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mShowAds");
         })
         this.mShowAds.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mShowAds");
         })
         this.mShowAds.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mClose.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mClose");
         })
         this.mClose.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mClose");
         })
         this.mClose.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mClose");
         })
         this.mClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.title)
	
         this.setLanguage(this.adTxt1)
	
         this.setLanguage(this.adMermaidTxt)
	
         this.setLanguage(this.adGold)
	
         this.setLanguage(this.adTxt2)
	
         this.setLanguage(this.adtxT3)
	
         this.setLanguage(this.adtxT3_1)
	
         this.setLanguage(this.adSkillTip)
	
         this.setLanguage(this.adTxt4)
	
         this.setLanguage(this.adTxt4_1)
	
         this.setLanguage(this.adApacet)
	
         this.setLanguage(this.adNo)
	
         this.setLanguage(this.adCount)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/mContent/mGetCoin/MWTextBlock_2_1") as mw.TextBlock);
	
 
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
 