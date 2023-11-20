import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","skillTime","skillCd"],["","",""],[1,20,25],[2,20,40],[3,20,60]];
export interface IskillElement extends IElementBase{
 	/**qid*/
	id:number
	/**冲刺技能维持时间*/
	skillTime:number
	/**冲刺技能CD*/
	skillCd:number
 } 
export class skillConfig extends ConfigBase<IskillElement>{
	constructor(){
		super(EXCELDATA);
	}

}