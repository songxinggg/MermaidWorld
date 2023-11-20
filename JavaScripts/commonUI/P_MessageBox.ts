

import MessageBox_Generate from "../ui-generate/uiTemple/ui/MessageBox_generate";



/**二次确认框*/
export default class MessagesBox extends MessageBox_Generate {
    private static _instance: MessagesBox;
    private resListener: Function;//保存的结果回调方法

    private static get instance(): MessagesBox {
        if (MessagesBox._instance == null) {
            MessagesBox._instance = mw.UIService.create(MessagesBox)
        }
        return MessagesBox._instance;
    }

  

    onStart() {
        this.mOK_btn.onClicked.add(() => {
            mw.UIService.hideUI(this);
            if (this.resListener != null) {
                this.resListener();
            }
        });
        this.mYes_btn.onClicked.add(() => {
            mw.UIService.hideUI(this);
            this.resListener(true);
        });
        this.mNo_btn.onClicked.add(() => {
            mw.UIService.hideUI(this);
            this.resListener(false);
        });
    }

    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     */
    public static showOneBtnMessage(title: string, content: string, resListener?: () => void, okStr: string = "确定") {
        mw.UIService.show(this);
        MessagesBox.instance.showMsg1(title, content, resListener, okStr);
    }

    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param yListener “是”回调事件
     * @param nListener “否”回调事件
     */
    public static showTwoBtnMessage(title: string, content: string, resListener: (res: boolean) => void, yesStr: string = "是", noStr = "否") {
        mw.UIService.show(this);
        MessagesBox.instance.showMsg2(title, content, resListener, yesStr, noStr);
    }

    private showMsg1(title: string, content: string, resListener: () => void, okStr: string) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Hidden);
        this.mNo_btn.visibility = (mw.SlateVisibility.Hidden);
        this.mOK_btn.visibility = (mw.SlateVisibility.Visible);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mOK_btn.text = (okStr);
    }

    private showMsg2(title: string, content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Visible);
        this.mNo_btn.visibility = (mw.SlateVisibility.Visible);
        this.mOK_btn.visibility = (mw.SlateVisibility.Hidden);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mYes_btn.text = (yesStr);
        this.mNo_btn.text = (noStr);
    }
}