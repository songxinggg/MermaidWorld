import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Uiname","Event1","Event2","Event3","Event4","Event5"],["","","","","","",""],[1,"P_Game","1","1",null,null,null],[2,"P_Game","1","-694|-4222|10571",null,null,null],[3,"P_Game","1","mBtnDress","1",null,null],[4,"FacadMainUI","mGuideImg","1","mBtnSave","1",null],[5,"P_Game","adImg","1",null,null,null],[6,"P_Game","1","496|-3348|10520","1",null,null]];
export interface IGuideElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**引导的UI名字*/
	Uiname:string
	/**触发事件1*/
	Event1:string
	/**触发事件2*/
	Event2:string
	/**触发事件3*/
	Event3:string
	/**触发事件4*/
	Event4:string
	/**触发事件5*/
	Event5:string
 } 
export class GuideConfig extends ConfigBase<IGuideElement>{
	constructor(){
		super(EXCELDATA);
	}

}