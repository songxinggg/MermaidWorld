/*
*@Author: zhaomengyao
*@Date:  2022/2/22 13:42:21
*@Description:定义埋点功能
*/
//埋点
export abstract class MGSMsg {
    private static readonly NetMsg_MGSMsg_Send: string = "NetMsg_MGSMsg_Send";
    private static ComData: any;//通用数据
    private static MsgMap: Map<string, any>;
    /** 初始化
     * @param comData 公共数据(key-value)
     */
    public static Init(comData?: any) {
        if (this.MsgMap != null) return;
        this.MsgMap = new Map();
        MGSMsg.ComData = comData;
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(MGSMsg.NetMsg_MGSMsg_Send, (eventName: string, eventDesc: string, jsonData: string) => {
              mw.RoomService.reportLogInfo(eventName, eventDesc, jsonData);
            });
        }
    }
    /** 生成一个埋点对象
     * @param c 埋点对象类名
     * @returns 埋点对象
     */
    public static Get<T extends MGSMsg>(c: { new(): T }): T {
        if (this.MsgMap == null) {
            this.Init();
        }
        if (!MGSMsg.MsgMap.has(c.name)) {
            let msg = new c();
            msg.data = {};
            if (!MGSMsg.ComData) {
                for (const key in MGSMsg.ComData) {
                    msg[key] = MGSMsg.ComData[key];
                }
            }
            MGSMsg.MsgMap.set(c.name, msg);
        }
        return MGSMsg.MsgMap.get(c.name);
    }

    abstract desc: string;
    abstract data: any;
    /**
     * 上传埋点
     * @param player 在服务端调用时，指定埋点的玩家，如果不写则全房间玩家一起埋
     */
    public Send(player?: mw.Player) {
        let eventName: string = this.constructor.name.toLowerCase();
        let eventDesc: string = this.desc;
        let jsonData: string = JSON.stringify(this.data).toLowerCase();
        if (mw.SystemUtil.isClient()) {
          mw.RoomService.reportLogInfo(eventName, eventDesc, jsonData);
        } else {
            if (player == null) {
                Event.dispatchToAllClient(MGSMsg.NetMsg_MGSMsg_Send, eventName, eventDesc, jsonData);
            } else {
                Event.dispatchToClient(player, MGSMsg.NetMsg_MGSMsg_Send, eventName, eventDesc, jsonData);
            }
        }
    }
}
