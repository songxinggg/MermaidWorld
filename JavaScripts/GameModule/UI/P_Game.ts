
import TipsUI from "../../commonUI/P_Tips";
import { GameConfig } from "../../config/GameConfig";
import { FacadModuleC } from "../../face/facadModule_C";

import { GlobalModule } from "../../GlobalModule";
import { ClientEvents } from "../../LocalEvents";
import { IAAData } from "../../modules/IAA/IAAData";
import { IAAModuleC } from "../../modules/IAA/IAAModuleC";
import { IAAPos } from "../../modules/IAA/IAAPos";
import { SceneDataHelper } from "../../SceneModule/SceneData";
import { Track_Click, Track_Page } from "../../Track/TrackMsg";
import Game_Generate from "../../ui-generate/uiTemple/ui/Game_generate";
import ScoreItem_Generate from "../../ui-generate/uiTemple/ui/ScoreItem_generate";
import { IAAUtils } from "../../util/IAAUtils";
import { scheduler } from "../../util/Scheduler";
import { Utils } from "../../util/Utils";
import ScoreMgr from "../ScoreMgr";
import P_Handbook from "./P_Handbook";
import P_Set from "./P_Set";
export default class P_Game extends Game_Generate {
    private canskill: boolean = true
    
    onStart() {
        const sceneData = DataCenterC.getData(SceneDataHelper)
        const iAAdata = DataCenterC.getData(IAAData)
        this.adCount.text = (Utils.formatString(GameConfig.TextUI.getElement(68).Name, iAAdata.hasCount(IAAPos.Main_Collect)))
        iAAdata.Main_CollectDataChange.add((count: number) => {
            this.adCount.text = (Utils.formatString(GameConfig.TextUI.getElement(68).Name, count))
        }, this)
        /**针对冲刺技能的广告限制 *//////////////////////////////////////////////////////////////////////////////////
        if (IAAUtils.isRewardOpen()) {
            iAAdata.Skill_CountChange.add((skillcount: number) => {
                this.adSkillTxt.visibility = (skillcount == 3) ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
                this.adtipimg.visibility = (skillcount == 3) ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
                this.skillTxt.visibility = (skillcount == 3) ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.HitTestInvisible

                if (skillcount > 3) {
                    this.adSkillTxt.visibility = mw.SlateVisibility.Collapsed
                    this.adtipimg.visibility = mw.SlateVisibility.Collapsed
                    this.skillTxt.visibility = mw.SlateVisibility.HitTestInvisible
                    scheduler.timeStart(() => {
                        this.adSkillTxt.visibility = mw.SlateVisibility.HitTestInvisible
                        this.adtipimg.visibility = mw.SlateVisibility.HitTestInvisible
                        this.skillTxt.visibility = mw.SlateVisibility.Collapsed
                    }, 600)
                }

            })
            let skillcount = iAAdata.hasSkillCount()
            this.adSkillTxt.visibility = (skillcount >= 3) ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
            this.adtipimg.visibility = (skillcount >= 3) ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
            this.skillTxt.visibility = (skillcount >= 3) ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.HitTestInvisible
            this.mAds1.visibility = (mw.SlateVisibility.Visible)
        } else {
            this.adSkillTxt.visibility = mw.SlateVisibility.Collapsed
            this.adtipimg.visibility = mw.SlateVisibility.Collapsed
            this.skillTxt.visibility = mw.SlateVisibility.HitTestInvisible
            this.mAds1.visibility = (mw.SlateVisibility.Collapsed)
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.mNewImg.visibility = sceneData.getNewClothLen() > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
        

        /**冲刺技能按钮 */
        this.skillBtn.onClicked.add(() => {
            if (this.canskill) {
                Track_Click("sprint_btn")
                if (iAAdata.hasSkillCount() >= 3 && IAAUtils.isRewardOpen()) {
                    if (!GlobalModule.SceneModule_C._isSkill) {
                        Track_Click("speedad")
                        ModuleService.getModule(IAAModuleC).showRewardAd(IAAPos.Skill_Num)
                    }
                } else {

                    let skilleff = IAAUtils.isRewardOpen() ? GameConfig.skill.getElement(iAAdata.hasSkillCount() + 1).skillTime : 4
                    GlobalModule.SceneModule_C.onskill(skilleff)
                    let cd = IAAUtils.isRewardOpen() ? GameConfig.skill.getElement(iAAdata.hasSkillCount() + 1).skillCd : 10
                    this.chargeCd(cd)
                    this.canskill = false
                }
            }
        })

        this.fly.onPressed.add(() => {
            Track_Click("up_btn")
            //GlobalModule.SceneModule_C.onCancleFly()
            GlobalModule.SceneModule_C.onFly()
            this.down.enable = (false)
        })


        this.adBtn.onClicked.add(() => {
            Track_Click("getGuid")
            ModuleService.getModule(IAAModuleC).showRewardAd(IAAPos.Main_Collect);
        });

        this.fly.onReleased.add(() => {
            GlobalModule.SceneModule_C.onCancleFly()
            this.down.enable = (true)
        })

        this.down.onPressed.add(() => {
            Track_Click("down_btn")
            //  GlobalModule.SceneModule_C.onCancleFly()
            GlobalModule.SceneModule_C.onDown()
            this.fly.enable = (false)
        })
        this.down.onReleased.add(() => {
            GlobalModule.SceneModule_C.onCancleFly()
            this.fly.enable = (true)
        })


        this.mBtnDress.onClicked.add(() => {
            Track_Click("makeup_btn")
            Utils.playSound(6)
            ModuleService.getModule(FacadModuleC).openFacad();
        })

        this.mBtnHandbook.onClicked.add(() => {
            Track_Click("Illustrated_btn")
            Utils.playSound(6)
            mw.UIService.show(P_Handbook)
        })

        this.mBtnSet.onClicked.add(() => {
            Utils.playSound(6)
            mw.UIService.show(P_Set)
        })

        this.gmAddGold.onClicked.add(() => {
            GlobalModule.SceneModule_C.goToNewMermaid()
        })

        this.gmAddCloth.onClicked.add(() => {
            ModuleService.getModule(FacadModuleC).gm_unlockAllCloth()
        })

        this.addlinster()
        this.setLaguage()
    }

    addlinster() {
        Event.addLocalListener(ClientEvents.Ev_RefeshScore, () => this.scoreChange = true)
        DataCenterC.getData(SceneDataHelper).OnNewClothsChange.add(value => {
            this.mNewImg.visibility = (value > 0 ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed)
        }, null)
    }

    setLaguage() {
        this.adTips.text = (GameConfig.TextUI.getElement(69).Name)
        this.skillTxt.text = GameConfig.TextUI.getElement(24).Name
        this.adSkillTxt.text = GameConfig.TextUI.getElement(24).Name
        this.flyTxt.text = (GameConfig.TextUI.getElement(48).Name)
        this.downTxt.text = (GameConfig.TextUI.getElement(49).Name)
        this.mRankTxt.text = (GameConfig.TextUI.getElement(25).Name)
        this.mRankName.text = (GameConfig.TextUI.getElement(26).Name)
        this.mRankCollectNum.text = (GameConfig.TextUI.getElement(27).Name)
    }

    private scoreTid
    protected onShow(...params: any[]): void {
        if (this.scoreTid)
            scheduler.cancel(this.scoreTid)
        this.scoreTid = scheduler.timeStart(() => {
            if (this.scoreChange)
                this.refreshRank()
        }, 1, -1)
        Track_Page("btn_tip")
    }

    chargeCd(cd: number) {
        this.mskillBar.visibility = (mw.SlateVisibility.HitTestInvisible)
        Utils.DoLerpForValue(1, 0, cd, (value) => {
            this.mskillBar.currentValue = value
        }, () => {
            this.canskill = true
        })
    }

    private scoreChange = true
    private scoreItemArr: ScoreItem_Generate[] = []

    /**更新主界面排行榜 */
    private refreshRank() {
        this.scoreChange = false
        let srcPool = ScoreMgr.instance.srcPool
        srcPool.sort((a, b) => {
            if (a.treasureNum > b.treasureNum ||
                a.treasureNum == b.treasureNum && a.pid > b.pid
            ) return -1
            else return 1
        })
        let count = 0
        srcPool.forEach(src => {
            if (src.pid != "-1") {
                count++
                let item: ScoreItem_Generate
                if (this.scoreItemArr.length >= count)
                    item = this.scoreItemArr[count - 1]
                else {
                    item = mw.UIService.create(ScoreItem_Generate)
                    this.scoreItemArr.push(item)
                    this.mCanvasRank.addChild(item.uiObject)
                    item.uiObject.size = itemSize
                }
                item.mTxtName.text = (src.nickName)
                item.mTxtCount.text = (src.treasureNum.toString())
                item.rootCanvas.visibility = (mw.SlateVisibility.HitTestInvisible)
                if (src.pid == Player.localPlayer.playerId.toString()) {
                    item.mTxtName.fontColor = (new mw.LinearColor(1, 1, 0))
                    item.mTxtCount.fontColor = (new mw.LinearColor(1, 1, 0))
                    console.log(".................1")
                } else {
                    console.log(".................")
                    item.mTxtName.fontColor = (new mw.LinearColor(1, 1, 1))
                    item.mTxtCount.fontColor = (new mw.LinearColor(1, 1, 1))
                }
            }
        })
        for (let i = count; i < this.scoreItemArr.length; i++) {
            this.scoreItemArr[i].rootCanvas.visibility = (mw.SlateVisibility.Collapsed)
        }
        this.mCanvasRank.position = (mw.Vector2.zero)
        this.mCanvasRank.size = (new mw.Vector2(400, 50 * count));
        this.changeFirstEffect()
    }

    private firstPid: string
    private _effcetId1: number = 0
    private _effcetId2: number = 0
    /**刷新第一名特效 */
    async changeFirstEffect() {
        let pid:string
        if (ScoreMgr.instance.srcPool.length > 0) {
            let first = ScoreMgr.instance.srcPool[0]
            if (first.treasureNum > 0 && first.pid != "-1")
                pid = first.pid
            

        }
        if (pid && pid != this.firstPid) {
            let originPid = this.firstPid
            this.firstPid = pid
            Utils.stopEff(this._effcetId1)
            Utils.stopEff(this._effcetId2)
            await Utils.waitForTicks(1)
            let player = Player.getPlayer(Number(pid))
            if (player) {
                this._effcetId1 = Utils.playEffect(8, player.character.gameObjectId)
                this._effcetId2 = Utils.playEffect(7, player.character.gameObjectId)
            }
            if (originPid != this.firstPid && this.firstPid == Player.localPlayer.playerId.toString()) {
                TipsUI.show(GameConfig.TextUI.getElement(70).Name)
            }
            if (originPid != this.firstPid && originPid == Player.localPlayer.playerId.toString()) {
                // TipsUI.show("您的第一名被夺走了，快去夺回来！")
            }


            if (this.firstPid == Player.localPlayer.playerId.toString()) {
                Player.localPlayer.character.maxSwimSpeed = 600
            } else {
                Player.localPlayer.character.maxSwimSpeed = 300
            }
        }
    }

}

const itemSize = new mw.Vector2(400, 50)

