

import SceneModule_C from "./SceneModule/SceneModule_C";
import SceneModule_S from "./SceneModule/SceneModule_S";



export class GlobalModule {

    static get SceneModule_C() {
        return ModuleService.getModule(SceneModule_C)
    }

    static get SceneModule_S() {
        return ModuleService.getModule(SceneModule_S)
    }

}
