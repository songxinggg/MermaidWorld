import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","ResGUID","LifeTime","IsLoop","Offset","Rotate","Scale","PS"],["","","","","","","","",""],[1,"拾取到美人鱼特效","197449",1,true,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),null],[2,"换装特效1","197457",1,true,new mw.Vector(0,140,120),new mw.Vector(0,0,0),new mw.Vector(1.2,1.2,1.2),"更换头发、头饰、妆容等部位时播放"],[3,"换装特效2","197884",1,true,new mw.Vector(0,140,-30),new mw.Vector(0,0,0),new mw.Vector(0.5,0.5,0.5),"更换上衣、套装、背部、手持物、拖尾、手套部件时播放"],[4,"换装特效3","20378",1,true,new mw.Vector(0,140,30),new mw.Vector(0,0,0),new mw.Vector(1,1,1),"更换下装、鞋子时播放"],[5,"技能加速时特效","27698",0,true,new mw.Vector(0,0,0),new mw.Vector(0,0,-90),new mw.Vector(1,1,1),null],[6,"已经找到过的人鱼标识","89076",0,true,new mw.Vector(0,0,-30),new mw.Vector(0,0,0),new mw.Vector(1,1,1),null],[7,"第一名的特效","118436",0,true,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),null],[8,"第一名的特效","31266",0,true,new mw.Vector(0,0,100),new mw.Vector(0,0,1),new mw.Vector(1,1,1),null]];
export interface IEffectElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**名字*/
	Name:string
	/**特效资源*/
	ResGUID:string
	/**多少秒后消失*/
	LifeTime:number
	/**是否循环播放*/
	IsLoop:boolean
	/**穿戴偏移*/
	Offset:mw.Vector
	/**穿戴旋转*/
	Rotate:mw.Vector
	/**穿戴缩放*/
	Scale:mw.Vector
	/**备注*/
	PS:string
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}