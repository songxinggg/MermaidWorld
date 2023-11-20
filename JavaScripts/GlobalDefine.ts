


export namespace globalVas {
    //region 双端通用
    //是否发布Online
    export let g_IsOnline: boolean = false;
    //否打印普通debug信息
    export let g_IsDebug: boolean = true;
    //游戏是否是暂停状态
    export let g_GameIsPause: boolean = false;
    //语言 -1:自动,0:英文,1:中文
    export const g_Language: number = -1;
    /**是否处于重连状态 */
    export let g_IsReconnectState: boolean = false;
    export function getSystemLanguageIndex(): number {
        if (g_Language != -1)
            return g_Language
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }

    //endregion 


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**一个唯一编号，累+ */
    let g_s_UnitBaseGuid = 0;
    /**调用这个获取一个中的唯一id */
    export function getGuid() {
        return g_s_UnitBaseGuid++;
    }

    /************************战斗相关**************************** */

    export const LobbyStartPoint = new mw.Vector(-734, -3340, 10487)

    /************************IAA**************************** */
    /**开局多少秒后没捡到新鱼弹出广告提示 */
    export const firstNewTreasureTime = 300

    /**开局newTreasureTime秒后每隔多少秒没捡到鱼给提示 */
    export const newTreasureTime = 60

    /**第一次插屏广告的时间 */
    export const fistAdTime: number = 420
    /**每隔多少秒一次插屏广告 */
    export const adTime: number = 180
}

