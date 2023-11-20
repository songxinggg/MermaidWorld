import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","ResGUID","IsLoop","Volume","PS","ResName"],["","","","","","",""],[1,"海洋场景BGM","45287",0,1,"在大厅（海洋场景）时播放",null],[2,"装扮界面BGM","97141",0,1,"进入装扮界面时播放",null],[3,"寻获美人鱼音效","47413",1,1,"寻获美人鱼时播放",null],[4,"奖励弹出音效","29189",1,1,"美人鱼奖励弹出时播放",null],[5,"奖励获得音效","47431",1,1,"奖励飞到图标处后播放",null],[6,"按钮点击音效","24954",1,1,"通用，点击任意按钮播放",null],[7,"游泳音效","97140",1,1,"游泳时播放",null],[8,"冲刺音效","39815",1,1,"冲刺时播放",null],[9,"换装音效1","13873",1,1,"更换上装、下装、套装时播放",null],[10,"换装音效2","13827",1,1,"更换其余换装部件时播放",null]];
export interface IAudioElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**名字*/
	Name:string
	/**音频资源*/
	ResGUID:string
	/**是否循环*/
	IsLoop:number
	/**音量大小*/
	Volume:number
	/**备注*/
	PS:string
	/**资源名字*/
	ResName:string
 } 
export class AudioConfig extends ConfigBase<IAudioElement>{
	constructor(){
		super(EXCELDATA);
	}

}