/**
 * @Author       : songxing
 * @Date         : 2023-03-10 16:41:47
 * @LastEditors  : songxing
 * @LastEditTime : 2023-03-14 16:23:55
 * @FilePath     : \mermaidworld\JavaScripts\commonUI\P_Tips.ts
 * @Description  : 
 */
import TipsGet_Generate from "../ui-generate/uiTemple/ui/TipsGet_generate";
import Tips_Generate from "../ui-generate/uiTemple/ui/Tips_generate";


/**
 * 系统提示
 * 一个顶一个向上跳动，然后消失，最多三条
 */
export default class TipsUI extends Tips_Generate {
    private static readonly Y_OVER = 150;
    private static readonly MOVE_SPEED = 500;
    private static readonly KEEP_TIME = 1;
    private static _instance: TipsUI;
    private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
    private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
    private contentArr: string[] = []
    private cellHeight = 100
    private cellStartX = 0
    private cellStartY = 0

    private static get instance(): TipsUI {
        if (this._instance == null) {
            this._instance = mw.UIService.create(TipsUI)
        }
        return this._instance;
    }

    

    onAwake() {
        Event.addServerListener("Event_ShowTips", (content: string) => {
            TipsUI.show(content);
        });
    }

    onStart() {
        this.canUpdate=true
        this.cellStartX = this.mCell1.position.x
        this.cellStartY = this.mCell1.position.y
        this.cellHeight = this.mCell1.size.y
        this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = (mw.SlateVisibility.Hidden);
        }
    }

    //隐藏的对象不参与UI布局，所以要布局完成后再隐藏
    onLayout() {

    }

    /**
     * 显示系统提示
     * @param msg 提示内容
     */
    public static show(msg: string) {
        mw.UIService.showUI(this.instance);
        TipsUI.instance.showMsg(msg);
    }

    // TODO 架构TODO 这一个show，一个showToClient 啥区别~得写在注释里面吧
    /**
     * 在客户端显示
     * @param player 玩家
     * @param content 内容
     */
    public static showToClient(player: mw.Player, content: string) {
        Event.dispatchToClient(player, "Event_ShowTips", content);
    }

    private showMsg(content: string) {
       
       this.contentArr.push(content)
    }

    onUpdate(dt: number) {
        if (this.contentArr.length > 0 && this.freeCellArr.length > 0) {
            let content = this.contentArr.shift()
            let cell = this.freeCellArr.shift()
            let text: mw.TextBlock = cell.findChildByPath('Content_txt') as mw.TextBlock ;
            text.text = (content);
            cell["stopTime"] = 0;
            cell.position=(new mw.Vector2(this.cellStartX, this.cellStartY));
            cell.visibility = (mw.SlateVisibility.Visible);
            this.activeCellArr.push(cell)
        }

        let hide = false
        let targetY
        let curPos
        for (let i = 0; i < this.activeCellArr.length; i++) {
            let cell = this.activeCellArr[i];
            if (i == 0)
                targetY = TipsUI.Y_OVER
            else
                targetY = Math.max(TipsUI.Y_OVER + this.cellHeight * i, curPos.y + this.cellHeight)
            curPos = cell.position;
            if (curPos.y > targetY) {
                curPos.y -= TipsUI.MOVE_SPEED * dt;
                cell.position=(curPos);
            } else {
                if (i == 0) {
                    cell["stopTime"] += dt;
                    if (cell["stopTime"] >= TipsUI.KEEP_TIME) {
                        cell.visibility = (mw.SlateVisibility.Collapsed);
                        hide = true
                    }
                }
            }
        }
        if (hide) {
            let cell = this.activeCellArr.shift()
            this.freeCellArr.push(cell)
        }
    }
}