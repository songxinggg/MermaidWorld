/*
*@Author: zhaomengyao
*@Date:  2022/2/22 13:44:42
*@Description:定义具体的埋点消息
*/
export abstract class AnalyticsUtil {
    /**数据说明 */
    abstract desc: string;
    /**数据体 */
    abstract data: any;
    static NET_MSG_SEND_MGS = "NET_MSG_SEND_MGS";
    static comData; //通用数据
    static msgMap;
    /** 初始化*/
    static init() {
        if (this.msgMap != null)
            return;
        this.msgMap = new Map();
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(AnalyticsUtil.NET_MSG_SEND_MGS, (eventName: string, eventDesc: string, jsonData: string) => {
                mw.RoomService.reportLogInfo(eventName, eventDesc, jsonData);
            });
        }
    }
    /**
     * 设置公共数据，每个埋点数据都会附加的字段，由key,value的形式组织
     * @param comData 公共数据
     */
    static setCommonData(comData) {
        AnalyticsUtil.comData = comData;
    }
    /** 根据类型生成一个埋点数据对象
     * @param MsgClass 埋点数据类
     * @returns 数据对象
     */
    static get(MsgClass) {
        if (this.msgMap == null) {
            this.init();
        }
        if (!AnalyticsUtil.msgMap.has(MsgClass.name)) {
            let msg = new MsgClass();
            msg.data = {};
            if (!AnalyticsUtil.comData) {
                for (const key in AnalyticsUtil.comData) {
                    msg[key] = AnalyticsUtil.comData[key];
                }
            }
            AnalyticsUtil.msgMap.set(MsgClass.name, msg);
        }
        return AnalyticsUtil.msgMap.get(MsgClass.name);
    }
    /**
     * 上传埋点数据到潘多拉
     * @param player 在服务端调用时，指定埋点的玩家，如果不写则全房间玩家都上传
     */
    send(player) {
        let eventName = this.constructor.name.toLowerCase();
        if (eventName.endsWith("$1")) {
            eventName = eventName.substring(0, eventName.length - 2);
        }
        let eventDesc = this.desc;
        let jsonData = {};
        for (const key in this.data) { //潘多拉要求key都要是小写的，value不做要求
            jsonData[key.toLowerCase()] = this.data[key];
        }
        let jsonStr = JSON.stringify(jsonData);
        if (mw.SystemUtil.isClient()) {
            mw.RoomService.reportLogInfo(eventName, eventDesc, jsonStr);
        }
        else {
            if (player == null) {
                Event.dispatchToAllClient(AnalyticsUtil.NET_MSG_SEND_MGS, eventName, eventDesc, jsonStr);
            }
            else {
                Event.dispatchToClient(player, AnalyticsUtil.NET_MSG_SEND_MGS, eventName, eventDesc, jsonStr);
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
export class TS_Tutorial_Start extends AnalyticsUtil {
    desc: string = "出现新人引导时打点";
    data: {};
}

export class TS_Tutorial_Step extends AnalyticsUtil {
    desc: string = "出现新人引导每一步时打点";
    data: { tutorial_step: string };
}


export class TS_Tutorial_End extends AnalyticsUtil {
    desc: string = "新人引导结束时打点";
    data: {};
}
///////////////////////////////////////////////////////////////////////////////////////////////



export class TS_Game_Over extends AnalyticsUtil {
    desc: string = '战斗中的事情'
    data: {};
}



export class TS_Action_click extends AnalyticsUtil {
    desc: string = '点击事件';
    data: { button: string };
}

export class TS_Action_Build extends AnalyticsUtil {
    desc: string = '玩家点击装扮系统内图标次数';
    data: { item_id: number };
}
///////////////////////////////////////////////////////////////////////////////////////////////
export class TS_Action_Pick extends AnalyticsUtil {
    desc: string = '美人鱼获取顺序和数量';
    data: { playtime: number };
}

export class TS_Action_FirstDo extends AnalyticsUtil {
    desc: string = '记录玩家找到第一个美人鱼的时间';
    data: { lifetime: number };
}

export class TS_Task extends AnalyticsUtil {
    desc: string = '记录本次进入装扮系统的时长';
    data: {  };
}

export class TS_Action_Unlock extends AnalyticsUtil {
    desc: string = '被找到人鱼id';
    data: { item_id: number,playTime:number };
}


export class TS_Action_Get_Item extends AnalyticsUtil {
    desc: string = '通过消费获取到的衣服id';
    data: { item_id: number };
}

export class TS_Game_Result extends AnalyticsUtil {
    desc: string = '每成功获得一个新服饰时';
    data: { box: number };
}


export class TS_Page extends AnalyticsUtil{
    desc: string = '广告曝光率探测';
    data: { page_name: string };
}


///////////////////////////////////////////////////点击事件点击事件************************************************************************* */

/**在饰品系统旁点击访问按钮 */
export function Track_Click(str: string) {
    let msg = AnalyticsUtil.get(TS_Action_click);
    msg.data = { button: str }
    msg.send()
}

export function Track_buildAction(id: number) {
    let msg = AnalyticsUtil.get(TS_Action_Build);
    msg.data = { item_id: id }
    msg.send()
}


//////////////////////////////////////////////////////////////TS_Coregameplay_Start////////////////////////////////////////


//////////////////////////////////////////////////////////////TS_Tutorial_start////////////////////////////////////////
/**出现新人引导第一步时打点 */
export function Track_Guide1() {
    let msg = AnalyticsUtil.get(TS_Tutorial_Start);
    msg.data = {};
    msg.send();
}
//////////////////////////////////////////////////////////////TS_Tutorial_Step////////////////////////////////////////
/**新手引导每一步打点 */
export function Track_GuideStep(step: string) {
    let msg = AnalyticsUtil.get(TS_Tutorial_Step);
    msg.data = { tutorial_step: step };
    msg.send();
}
//////////////////////////////////////////////////////////////TS_Tutorial_End////////////////////////////////////////
export function Track_GuideEnd() {
    let msg = AnalyticsUtil.get(TS_Tutorial_End);
    msg.data = {};
    msg.send();
}

//////////////////////////////////////////////////////////////TS_Action_Pick////////////////////////////////////////
/**找到人鱼的间隔时长 */
export function Track_pickTime(pickTime: number) {
    let msg = AnalyticsUtil.get(TS_Action_Pick);
    msg.data = { playtime: pickTime };
    msg.send();
}

/**记录玩家找到第一个美人鱼的时间 */
export function Track_LifeTime(lifetime: number) {
    let msg = AnalyticsUtil.get(TS_Action_FirstDo);
    msg.data = { lifetime: lifetime };
    msg.send();
}

//////////////////////////////////////////////////////////////TS_Game_Over////////////////////////////////////////
/** 每分钟打一次，记录玩家每分钟寻找到的美人鱼数量*/
export function Track_getMermaid_num(mermaid_num: number) {
    let msg = AnalyticsUtil.get(TS_Game_Over);
    msg.data = { kill_player: mermaid_num };
    msg.send();
}
export function Track_DeadTime(player?: mw.Player) {
    let msg = AnalyticsUtil.get(TS_Game_Over);
    //msg.data = { dead: 1 };
}
export function Track_SceneId(sceneId: number, player?: mw.Player) {
    let msg = AnalyticsUtil.get(TS_Game_Over);
    msg.data = { scene_id: sceneId, dead: 1 };
    if (player)
        msg.send(player)
}


//////////////////////////////////////////////////////////////TS_Task////////////////////////////////////////

export function Track_ClothLifeTime(lifetime: number) {
    let msg = AnalyticsUtil.get(TS_Task);
    msg.data = { lifetime: lifetime };
    msg.send();
}

/**每找到一个鱼上报  ，顺便上报该次游玩找到鱼的时间 */
export function Track_MermaidId(ID: number,playTime:number) {
    let msg = AnalyticsUtil.get(TS_Action_Unlock);
    msg.data = { item_id: ID,playTime:playTime };
    msg.send();
}

export function Track_TaskId(ID:number){
    let msg = AnalyticsUtil.get(TS_Task);
    msg.data = { task_id: ID };
    msg.send();
}
////////////////////////////////////////////////////////////ts_action_get_item///////////////////////
export function Track_clothid(ID:number,player:mw.Player){
    let msg = AnalyticsUtil.get(TS_Action_Get_Item);
    msg.data = { item_id: ID };
    msg.send(player);
}

/////////////////////////////////////////////////////////////////////TS_Game_Resulet/////////////////////////////////////////
export function Track_Box(id:number,player:mw.Player){
    let msg = AnalyticsUtil.get(TS_Game_Result);
    msg.data = { box: id };
    msg.send(player);
}



///////////////////////////////////////////////////////////////////////TS_Page/////////////////////////////////////////////////////
export function Track_Page(page_name:string){
    let msg = AnalyticsUtil.get(TS_Page);
    msg.data = { page_name: page_name };
    msg.send();
}



