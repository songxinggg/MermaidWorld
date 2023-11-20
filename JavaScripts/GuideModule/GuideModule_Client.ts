


import { GuideDataHelper, GuideModuleC, GuideModuleS, GuideModuleView } from "module_guide";
import { GameAssets } from "../GameAssets";
import P_Game from "../GameModule/UI/P_Game";
import { GlobalModule } from "../GlobalModule";
import { ClientEvents } from "../LocalEvents";
import { Track_Guide1, Track_GuideEnd, Track_GuideStep } from "../Track/TrackMsg";
import { GameConfig } from "../config/GameConfig";

import { IAAUtils } from "../util/IAAUtils";
import { scheduler } from "../util/Scheduler";
import UI_GuideControll from "./UI_GuideControll";
import GuideTipsUI_Generate from "../ui-generate/uiTemple/ui/GuideTipsUI_generate";
import GuideDieTips_Generate from "../ui-generate/uiTemple/ui/GuideDieTips_generate";
import GuideEndUI_Generate from "../ui-generate/uiTemple/ui/GuideEndUI_generate";
import { FacadMainUI } from "../face/facadMainUI";
import { FacadModuleC } from "../face/facadModule_C";

export class GuideHelper {

    private static _instance: GuideHelper;

    public static get instance(): GuideHelper {
        if (!this._instance) {
            this._instance = new GuideHelper();
        }
        return this._instance;
    }
    private _tipsPool: GuideTipsUI_Generate[] = [];
    private _tipsMap: Map<number, GuideTipsUI_Generate> = new Map();

    private _guiedeModule: GuideModuleC

    private guideTimer: number
    private init(): void {

        Event.addLocalListener(ClientEvents.EV_GuideStep4, () => {   //
            scheduler.cancel(this.guideTimer)
            Track_GuideStep("step3")
            Track_GuideStep("step4")
            this._guiedeModule.triggerGuide(4)
        })


        Event.addLocalListener(ClientEvents.EV_GuideStep3, () => {
            mw.UIService.hide(UI_GuideControll)
            this.guideTimer = scheduler.timeStart(() => {
                Track_GuideStep("step3")
                this._guiedeModule.triggerGuide(3)
            }, 7)

        })

        this._guiedeModule.reSetToTargetPosDistance(300);
        this._guiedeModule.setGuideArrowGuid(GameAssets.arrowModel, GameAssets.arrowMat, "197483")
        this._guiedeModule.reSetCharGo(Player.localPlayer.character)
        this._guiedeModule.guideComplateAction.add((guideId: number) => {
            if (guideId == 6) {
                Track_GuideEnd()
                scheduler.timeStart(() => {
                    Event.dispatchToLocal(ClientEvents.Ev_FinshGuide)
                }, 3)
            }
        })
    }



    public beginGuide() {
        this._guiedeModule = ModuleService.getModule(GuideModuleC);
        let guideID = this._guiedeModule.getCurGuideId()

        if(guideID == 0) guideID = 1;
        console.log("当前的引导id" + guideID)
        if (guideID >= 4) {
            return
        } else {
            GlobalModule.SceneModule_C.resetAllTreasure()
            this._guiedeModule.resetAllGuideDB().then(() => {
                guideID = 1;
            });
        }
        
        this.setGuideEvent();
        this.init();
        console.log("开始引导",guideID)
        this._guiedeModule.triggerGuide(guideID);
    }








    private setGuideEvent() {
        this.setEventByCfg(1, () => {            //引导第一步  《显示被抓走了UI，点击进行第二步》
            Track_Guide1()
            mw.UIService.hide(P_Game)
            let ui_GuideDieTips = mw.UIService.getUI(GuideDieTips_Generate)
            ui_GuideDieTips.mTips.text = (GameConfig.TextUI.getElement(34).Name)
            mw.UIService.showUI(ui_GuideDieTips)
            Track_GuideStep("step1")
            ui_GuideDieTips.mBtn.onClicked.add(() => {
                mw.UIService.hideUI(ui_GuideDieTips)
                this._guiedeModule.triggerGuide(2)
            })
            return true;
        }, async () => {
            return true
        });

        this.setEventByCfg(2, () => {    //引导第二步  《显示控制界面UI》
            Track_GuideStep("step2")
            mw.UIService.show(UI_GuideControll);
            return true
        })


        this.setEventByCfg(3, () => {     //第三步  《显示gameUI》
            Track_GuideStep("step4")
            mw.UIService.show(P_Game)
            return true;
        }, () => {
            this._guiedeModule.triggerGuide(4)
            return true
        })

        mw.UIService.getUI(FacadMainUI)
        this.setEventByCfg(4, () => {   //第四步  《引导装备第一件衣服》
            Track_GuideStep("step5")
            ModuleService.getModule(FacadModuleC).reqChangeFacadSuitState(2)
            return true
        }, () => {

            console.log("触发引导", IAAUtils.isRewardOpen())
            if (IAAUtils.isRewardOpen()) {   //《判断广告的开关进行不同的引导步骤》
                this._guiedeModule.triggerGuide(5)
            } else {
                this._guiedeModule.triggerGuide(6)
            }
            return true;
        })




        this.setEventByCfg(5, () => {     //第五步引导点击广告按钮
            Track_GuideStep("step6")
            this._guiedeModule.triggerGuide(6)
            return true
        })

        this.setEventByCfg(6, () => {
            GlobalModule.SceneModule_C.resetAllTreasure(29)
            return true
        }, () => {
            scheduler.timeStart(() => {
                let ui_guideEnd = mw.UIService.getUI(GuideEndUI_Generate)
                ui_guideEnd.mTips.text = (GameConfig.TextUI.getElement(54).Name)
                mw.UIService.showUI(ui_guideEnd)
                ui_guideEnd.mBtn.onClicked.add(() => {
                    mw.UIService.hideUI(ui_guideEnd)
                });
                Track_GuideStep("step7")
            }, 3)
            return true;

        })

    }


    setEventByCfg(ID: number, ...func: any[]) {
        let guide = this._guiedeModule.addGuideStageHandle(ID);
        let guideCfg = GameConfig.Guide.getElement(ID);
        let guideUI: mw.UIScript = null;
        if (guideCfg.Uiname) {
            console.log("guideCfg.Uiname___" + guideCfg.Uiname, mw.UIService.instance["createPanelMap"].get(guideCfg.Uiname))
            guideUI = mw.UIService.instance["createPanelMap"].get(guideCfg.Uiname)[0];
        }
        let eventNum = 1;
        let funcNum = 0;
        while (guideCfg["Event" + eventNum] != null) {
            if (guideCfg["Event" + eventNum].length != 1 && guideCfg["Event" + eventNum].indexOf("|") == -1) {
                guide.addBindUI(guideUI[guideCfg["Event" + eventNum]])
            } else if (guideCfg["Event" + eventNum].length == 1) {
                if (func[funcNum]) {
                    guide.addCondition(func[funcNum])
                }
                funcNum++;
            } else {
                let strs = guideCfg["Event" + eventNum].split("|");
                let pos = new mw.Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]));
                guide.addBindWorldPos(pos)
            }
            let _eventNum = eventNum
            let _ID = ID;
            guide.addRunFunc(() => {
                this.addTips(_ID, _eventNum);
                this.removeTips(_ID, _eventNum);
            });
            eventNum++;
        }
    }

    addTips(ID: number, eventNum: number) {
        GameConfig.GuideUI.getAllElement().forEach(_guideUICfg => {
            if (_guideUICfg.StartEvent[0] == ID && _guideUICfg.StartEvent[1] == eventNum) {
                let tips: GuideTipsUI_Generate = this.creatTips()
                tips.mText.text = (_guideUICfg.Text);
                tips.mText.fontSize = (_guideUICfg.TextSize)
                tips.mText.position = (new mw.Vector2(_guideUICfg.TextPos[0], _guideUICfg.TextPos[1]))
                mw.UIService.showUI(tips)
                //tips.uiObject.zOrder=(this._guideUI.uiObject.zOrder + 100);
                this._tipsMap.set(_guideUICfg.ID, tips);
            }
        });
    }

    removeTips(ID: number, eventNum: number) {
        GameConfig.GuideUI.getAllElement().forEach(_guideUICfg => {
            if (_guideUICfg.EndEvent[0] == ID && _guideUICfg.EndEvent[1] == eventNum && this._tipsMap.has(_guideUICfg.ID)) {
                let tips = this._tipsMap.get(_guideUICfg.ID)
                mw.UIService.hideUI(tips)
                this._tipsPool.push(tips)
                this._tipsMap.delete(_guideUICfg.ID);
            }
        });
    }

    creatTips() {
        let tips: GuideTipsUI_Generate = null
        if (this._tipsPool.length == 0) {
            tips = mw.UIService.create(GuideTipsUI_Generate)
        } else {
            tips = this._tipsPool.shift();
        }
        return tips;
    }


}
