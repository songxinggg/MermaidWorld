

import { SceneDataHelper } from "../../SceneModule/SceneData";
import { GameConfig } from "../../config/GameConfig";
import HandbookItem_Generate from "../../ui-generate/uiTemple/ui/HandbookItem_generate";
import Handbook_Generate from "../../ui-generate/uiTemple/ui/Handbook_generate";
import { Utils } from "../../util/Utils";


export default class P_Handbook extends Handbook_Generate {
    private itemMap: Map<number, HandbookItem_Generate>

    onStart() {
        this.mTitle.text = (GameConfig.TextUI.getElement(22).Name)
        this.mDes.text = (GameConfig.TextUI.getElement(33).Name)


        this.mBtnClose.onClicked.add(() => { mw.UIService.hideUI(this); Utils.playSound(6) })
        this.itemMap = new Map()
        let vCount = Math.ceil(GameConfig.MermaidMgr.getAllElement().length / 2)
        this.mCanvas.size = (new mw.Vector2(948, vCount * (242 + 50)))
        GameConfig.MermaidMgr.getAllElement().forEach(cfg => {
            let item: HandbookItem_Generate = mw.UIService.create(HandbookItem_Generate)
            this.mCanvas.addChild(item.uiObject)
            item.uiObject.size = (new mw.Vector2(348, 242))
            this.itemMap.set(cfg.id, item)
        })
    }

    onShow(...params: any[]) {
        const sceneData = DataCenterC.getData(SceneDataHelper)
        this.itemMap.forEach((item, qid) => {
            let has = sceneData.isGetTreasure(qid)
            item.mTxtName.visibility = (has ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed)
            item.mTxtQuality.visibility = (has ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed)
            if (has) {
                let congfig = GameConfig.MermaidMgr.getElement(qid)
                item.mTxtQuality.text = (GameConfig.TextUI.getElement(18 + congfig.Qulaity).Name)
                item.mTxtName.text = (congfig.Name)
                item.mImgIcon.imageGuid = (congfig.icon.toString())
                item.mImgIcon.size = (new mw.Vector2(128))
            }
        })
        this.mCollcetNum.text = (sceneData.getTreasureNum() + "/" + GameConfig.MermaidMgr.getAllElement().length)
        this.mCollectBar.currentValue = (sceneData.getTreasureNum() / GameConfig.MermaidMgr.getAllElement().length)
    }
}
