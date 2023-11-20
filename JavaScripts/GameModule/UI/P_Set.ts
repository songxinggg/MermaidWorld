

import { GameConfig } from "../../config/GameConfig";
import Set_Generate from "../../ui-generate/uiTemple/ui/Set_generate";
import { Utils } from "../../util/Utils";
import { GameModule_C } from "../GameModule_C";

export default class P_Set extends Set_Generate {
    private bOpen = true

    onStart() {
        this.mBtnOpen.text = (GameConfig.TextUI.getElement(51).Name)
        this.mSound.text = (GameConfig.TextUI.getElement(4).Name)
        this.mBtnReturnLobby.text = (GameConfig.TextUI.getElement(5).Name)
        this.mBtnClose.onClicked.add(() => { mw.UIService.hideUI(this); Utils.playSound(6) })
        this.mBtnOpen.onClicked.add(() => {
            Utils.playSound(6)
            this.bOpen = !this.bOpen
            this.mBtnOpen.text = (this.bOpen ? GameConfig.TextUI.getElement(51).Name : GameConfig.TextUI.getElement(52).Name)
            mw.SoundService.BGMVolumeScale = this.bOpen ? 1 : 0
            mw.SoundService.volumeScale = this.bOpen ? 1 : 0
        })

        this.mBtnReturnLobby.onClicked.add(() => {
            ModuleService.getModule(GameModule_C).return2LobbyPos()
        })
    }

}
