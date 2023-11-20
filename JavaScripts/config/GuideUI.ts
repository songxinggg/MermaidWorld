import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Text","TextSize","TextPos","StartEvent","EndEvent"],["","Language","","","",""],[1,"Text_play_text_name35",30,[700,80],[2,1],[2,2]],[2,"Text_play_text_name40",30,[700,600],[3,1],[3,2]],[3,"Text_play_text_name117",30,[700,601],[6,1],[6,3]]];
export interface IGuideUIElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**UI中文*/
	Text:string
	/**字体大小*/
	TextSize:number
	/**字体位置*/
	TextPos:Array<number>
	/**触发事件*/
	StartEvent:Array<number>
	/**结束事件*/
	EndEvent:Array<number>
 } 
export class GuideUIConfig extends ConfigBase<IGuideUIElement>{
	constructor(){
		super(EXCELDATA);
	}

}