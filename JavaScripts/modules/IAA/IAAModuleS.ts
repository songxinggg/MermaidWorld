/**
 * @Author       : songxing
 * @Date         : 2023-10-15 09:20:26
 * @LastEditors  : songxing
 * @LastEditTime : 2023-10-15 09:45:17
 * @FilePath     : \mermaidworld\JavaScripts\modules\IAA\IAAModuleS.ts
 * @Description  : 
 */

import { GameModule_S } from "../../GameModule/GameModule_S";
import { FacadModuleS } from "../../face/facadModule_S";
import { IAAData } from "./IAAData";
import { IAAModuleC } from "./IAAModuleC";
import { IAAPos } from "./IAAPos";


export class IAAModuleS extends ModuleS<IAAModuleC, IAAData>{

    /**
     * 广告播放成功
     * @param pos 
     */
    public net_onPlaySuccess(pos: IAAPos, data?: { [key: string]: number | string }) {
        this.currentData.reduceCount(pos);
        this.currentData.save(true)
        switch (pos) {
            case IAAPos.Cloth_Gold:
                ModuleService.getModule(GameModule_S).net_AddGold(200, this.currentPlayer)
                break;
            case IAAPos.Cloth_Buy:
                if (typeof (data.clothId) == "number") {
                    ModuleService.getModule(FacadModuleS).net_BuySuit(data.clothId, this.currentPlayer);
                }
                this.currentData.save(true).Cloth_BuyDataChange.call(this.currentData.hasCount(IAAPos.Cloth_Buy))
                break;
            case IAAPos.Main_Collect:
                this.currentData.save(true).Main_CollectDataChange.call(this.currentData.hasCount(IAAPos.Main_Collect))
                break;

        }
    }

    /**
     * 
     */
    public addSkillCount(player: mw.Player) {
        let data = this.getPlayerData(player)
        data.addSkillCount()
        data.save(true).Skill_CountChange.call(data.hasSkillCount())
    }



    public net_resetDate() {
        this.currentData.resetDate();
        this.currentData.save(true).Main_CollectDataChange.call(this.currentData.hasCount(IAAPos.Main_Collect))
        this.currentData.save(true).Cloth_BuyDataChange.call(this.currentData.hasCount(IAAPos.Cloth_Buy))
        //this.currentData.save(true).Skill_CountChange.call(this.currentData.hasSkillCount())
    }
}