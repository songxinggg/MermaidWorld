import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","pos"],["",""],[1,new mw.Vector(0,0,0)],[2,new mw.Vector(100,100,100)],[3,new mw.Vector(1000,1000,1000)],[4,new mw.Vector(1500,1500,1500)]];
export interface IDeadPosElement extends IElementBase{
 	/**qid*/
	ID:number
	/**玩家在该点死亡后返回存档点的位置*/
	pos:mw.Vector
 } 
export class DeadPosConfig extends ConfigBase<IDeadPosElement>{
	constructor(){
		super(EXCELDATA);
	}

}