
 export class ClientEvents {

    /**更新积分 */
    static readonly Ev_RefeshScore: string = "Ev_RefeshScore"
    /**玩家完成新手引导 */
    static readonly Ev_FinshGuide: string = "Ev_FinshGuide"

    static readonly EV_GuideStep3: string = "EV_GuideStep3"
    /**假如跳过了新手引导点进衣服里去了*/
    static readonly EV_GuideStep4: string = "EV_GuideStep4"
    /**获取到美人鱼*/
    static readonly EV_NewTreasure: string = "EV_NewTreasure"

    
    /**当前是海外状态 */
    static readonly EV_PlayZa:string ="EV_PlayZa"
}

export class ServerEvents {
    static readonly EV_DeletNewCloth: string = "EV_DeletNewCloth"

    static readonly EV_GMaddAllCloth: string = "EV_GMaddAllCloth"
}
