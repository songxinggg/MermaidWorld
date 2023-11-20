

import { FacadModuleDataBase } from "module_facad";
import { GuideDataHelper, GuideModuleC, GuideModuleS } from "module_guide";
import { GameAssets } from "./GameAssets";
import { GameDataHelper } from "./GameModule/GameData";
import { GameModule_C } from "./GameModule/GameModule_C";
import { GameModule_S } from "./GameModule/GameModule_S";
import { globalVas } from "./GlobalDefine";
import { SceneDataHelper } from "./SceneModule/SceneData";
import SceneModule_C from "./SceneModule/SceneModule_C";
import SceneModule_S from "./SceneModule/SceneModule_S";
import Loadsing from "./commonUI/P_Loading";
import { GameConfig } from "./config/GameConfig";
import { IAAData } from "./modules/IAA/IAAData";
import { IAAModuleC } from "./modules/IAA/IAAModuleC";
import { IAAModuleS } from "./modules/IAA/IAAModuleS";
import { scheduler } from "./util/Scheduler";
import { FacadModuleC } from "./face/facadModule_C";
import { FacadModuleS } from "./face/facadModule_S";


@Component
export default class GameLauncher extends mw.Script {
    @mw.Property()
    isOnline: boolean = false; //设置存储环境
    @mw.Property()
    isDebug: boolean = true; //设置是否打印普通debug信息
    private getPreLoadIds(): string[] {
        let ret: any[] = [];

        Object.values(GameAssets).forEach((value) => {
            ret = ret.concat(value)
        })

        GameConfig.RoleAvatar.getAllElement().forEach((item) => {
            ret.push(item.bodyupper)
            ret.push(item.bodylower)
            ret.push(item.hairfront)
            ret.push(item.hairlate)
            ret.push(item.head)
            ret.push(item.gloves)
            ret.push(item.shoe)
            ret.push(item.effectGuid)
            ret.push(item.icon)
        })

        GameConfig.MermaidCloth.getAllElement().forEach((item) => {
            ret.push(item.effectGuid)
            ret.push(item.role)
            ret.push(item.upper)
            ret.push(item.hairstyle)
            ret.push(item.glove)
            ret.push(item.matGuid)
        })


        let New: any[] = [];
        ret.forEach(ele => {
            if (ele && ele != "null")
                if (New.indexOf(ele) == -1) {
                    New.push(ele);

                }
        });
        return New;
    }

    /**
     * 游戏开始启动
     */
    async onStart(): Promise<void> {
        globalVas.g_IsOnline = this.isOnline;
        globalVas.g_IsDebug = this.isDebug;
        if (!this.isDebug && this.isOnline) {
            // Debug.setDebugLevel(Debug.LEVEL.OFF);
        }
        if (this.isOnline) {
            DataStorage.setTemporaryStorage(!this.isOnline);
        }



        // let swim = GameObject.findGameObjectById("C3AA4648")
        // let editorstr = SystemUtil.getEditorVersion()
        // let orginScale =swim.worldTransform.scale.clone()

        // if (Number(editorstr.split('.').splice(1, 1)) >= 24) {
        //     swim.worldTransform.scale=new mw.Vector(orginScale.x*2,orginScale.y*2,orginScale.z*2)
        // }
        

        
        


        GameConfig.initLanguage(globalVas.g_Language, (key: string | number) => {
            let element = GameConfig.Language.getElement(key);
            return element ? element.Value : "unknown";
        })
        if (!this.isOnline)
            console.log("GameLauncher: 游戏启动 , need preload:" + this.getPreLoadIds());
        //await this.onInitClientByHand();
        this.onRegisterModule()
        
        this.useUpdate = true;
       
    }

    /**
     * 帧更新
     * @param dt s
     */
    private _time = 0;
    onUpdate(dt: number): void {
        if (!globalVas.g_GameIsPause) {
            if (mw.SystemUtil.isClient() && dt > 0.1) return
            scheduler.tick(dt);
            mw.TweenUtil.TWEEN.update()
        }

    }
    //当注册模块
    onRegisterModule(): void {
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper)
        ModuleService.registerModule(GameModule_S, GameModule_C, GameDataHelper)
        ModuleService.registerModule(SceneModule_S, SceneModule_C, SceneDataHelper)
        ModuleService.registerModule(FacadModuleS, FacadModuleC, FacadModuleDataBase)
        ModuleService.registerModule(IAAModuleS, IAAModuleC, IAAData)
    }


    /**手动初始化游戏 */
    protected async onInitClientByHand() {
       
        let time = 0;
        this.onClientLoading("init Data", time, time == 1)
        scheduler.timeStart(() => {
            time+=0.25
            this.onClientLoading("init Data", time, time>=1) 
        },0.8,4)
    }

    /**
      * 
      * @param msg 显示的提示内容
      * @param progress 进度条进度(0-1)
      * @param completeAotoClose 完成后是否自动关闭
      */
    protected onClientLoading(msg: string, progress: number, completeAotoClose: boolean) {
        Loadsing.showLoading(msg, progress, completeAotoClose);
    }


}