 

 @UIBind('UI/uiTemple/ui/FacadMain.ui')
 export default class FacadMain_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/basepicture')
    public basepicture: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/intervalLine_up')
    public intervalLine_up: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/intervalLine_down')
    public intervalLine_down: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn1')
    public btn1: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn1')
    public mTextBtn1: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn2')
    public btn2: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn2')
    public mTextBtn2: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn3')
    public btn3: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn3')
    public mTextBtn3: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn4')
    public btn4: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn4')
    public mTextBtn4: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn5')
    public btn5: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn5')
    public mTextBtn5: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn6')
    public btn6: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn6')
    public mTextBtn6: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn7')
    public btn7: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn7')
    public mTextBtn7: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn8')
    public btn8: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn8')
    public mTextBtn8: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn9')
    public btn9: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn9')
    public mTextBtn9: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn10')
    public btn10: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mTextBtn10')
    public mTextBtn10: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg1')
    public mNewImg1: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg2')
    public mNewImg2: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg3')
    public mNewImg3: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg4')
    public mNewImg4: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg5')
    public mNewImg5: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg6')
    public mNewImg6: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg7')
    public mNewImg7: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg8')
    public mNewImg8: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg9')
    public mNewImg9: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/mNewImg10')
    public mNewImg10: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mScrollBox/mContent/mGuideImg')
    public mGuideImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mScrollBox/mContent')
    public mContent: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/mBtnClose')
    public mBtnClose: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/adCanvas/madCoinBtn')
    public madCoinBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/adCanvas/madCoinTxt')
    public madCoinTxt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/adCanvas')
    public adCanvas: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/mTouch')
    public mTouch: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnLeft')
    public btnLeft: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnRight')
    public btnRight: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnReset')
    public btnReset: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/mPos')
    public mPos: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/mBtnSave')
    public mBtnSave: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/MWCanvas_5/mLog')
    public mLog: mw.TextBlock=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.btn1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn1");
         })
         this.btn1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn1");
         })
         this.btn1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn1");
         })
         this.btn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn2.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn2");
         })
         this.btn2.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn2");
         })
         this.btn2.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn2");
         })
         this.btn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn3.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn3");
         })
         this.btn3.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn3");
         })
         this.btn3.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn3");
         })
         this.btn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn4.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn4");
         })
         this.btn4.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn4");
         })
         this.btn4.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn4");
         })
         this.btn4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn5.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn5");
         })
         this.btn5.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn5");
         })
         this.btn5.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn5");
         })
         this.btn5.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn6.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn6");
         })
         this.btn6.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn6");
         })
         this.btn6.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn6");
         })
         this.btn6.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn7.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn7");
         })
         this.btn7.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn7");
         })
         this.btn7.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn7");
         })
         this.btn7.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn8.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn8");
         })
         this.btn8.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn8");
         })
         this.btn8.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn8");
         })
         this.btn8.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn9.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn9");
         })
         this.btn9.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn9");
         })
         this.btn9.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn9");
         })
         this.btn9.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn10.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn10");
         })
         this.btn10.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn10");
         })
         this.btn10.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn10");
         })
         this.btn10.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
	
         this.madCoinBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "madCoinBtn");
         })
         this.madCoinBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "madCoinBtn");
         })
         this.madCoinBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "madCoinBtn");
         })
         this.madCoinBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btnLeft.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btnLeft");
         })
         this.btnLeft.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btnLeft");
         })
         this.btnLeft.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btnLeft");
         })
         this.btnLeft.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btnRight.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btnRight");
         })
         this.btnRight.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btnRight");
         })
         this.btnRight.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btnRight");
         })
         this.btnRight.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btnReset.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btnReset");
         })
         this.btnReset.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btnReset");
         })
         this.btnReset.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btnReset");
         })
         this.btnReset.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtnSave.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtnSave");
         })
         this.mBtnSave.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtnSave");
         })
         this.mBtnSave.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtnSave");
         })
         this.mBtnSave.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.btn1);
	
         this.setLanguage(this.btn2);
	
         this.setLanguage(this.btn3);
	
         this.setLanguage(this.btn4);
	
         this.setLanguage(this.btn5);
	
         this.setLanguage(this.btn6);
	
         this.setLanguage(this.btn7);
	
         this.setLanguage(this.btn8);
	
         this.setLanguage(this.btn9);
	
         this.setLanguage(this.btn10);
	
         this.setLanguage(this.mBtnClose);
	
         this.setLanguage(this.madCoinBtn);
	
         this.setLanguage(this.btnLeft);
	
         this.setLanguage(this.btnRight);
	
         this.setLanguage(this.btnReset);
	
         this.setLanguage(this.mBtnSave);
	
         //文本多语言
         this.setLanguage(this.mTextBtn1)
	
         this.setLanguage(this.mTextBtn2)
	
         this.setLanguage(this.mTextBtn3)
	
         this.setLanguage(this.mTextBtn4)
	
         this.setLanguage(this.mTextBtn5)
	
         this.setLanguage(this.mTextBtn6)
	
         this.setLanguage(this.mTextBtn7)
	
         this.setLanguage(this.mTextBtn8)
	
         this.setLanguage(this.mTextBtn9)
	
         this.setLanguage(this.mTextBtn10)
	
         this.setLanguage(this.madCoinTxt)
	
         this.setLanguage(this.mLog)
	
 
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
 