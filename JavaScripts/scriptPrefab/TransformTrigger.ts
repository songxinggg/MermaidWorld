import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';

@Component
export default class TransformTrigger extends mw.Script {
    @mw.Property({ displayName: "传送点" })
    pos: mw.Vector =mw.Vector.zero
    @mw.Property({ displayName: "是否需要展示UI" })
    isGoing: boolean = false

    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            let id = setInterval(() => {
                if (this.gameObject) {
                    clearInterval(id)
                    this.initTrigger()
                }
            }, 100)

        }

    }

    initTrigger() {
        (this.gameObject as mw.Trigger).onEnter.add((go) => {
            try {
                if (PlayerManagerExtesion.isCharacter(go) && go.gameObjectId == Player.localPlayer.character.gameObjectId) {

                    Player.localPlayer.character.worldTransform.position = this.pos.clone()
                    if (this.isGoing)
                        Event.dispatchToLocal("EnterHideLevel")


                }
            } catch (e) {
                console.error("........." + e)
            }

        })
    }


}

