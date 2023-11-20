

import { GameConfig } from "../config/GameConfig";



export class SceneDataHelper extends Subdata{
	@Decorator.persistence()
	public treasure: number[] = []

	@Decorator.persistence()
	public newCloths: number[] = []
	public readonly OnNewClothsChange: mw.Action1<number> = new mw.Action1()

	public readonly OnNewClothItemChange: mw.Action1<number> = new mw.Action1()

	public constructor() {
		super();
	}

	public get dataName(): string{
		return "SceneData"
	}

	initDefaultData() {
		super.initDefaultData();
		this.treasure = []
		this.newCloths = []
	}
	/**
	 * 获得宝物
	 * @param qid 宝物id
	 * @returns 是不是新宝物
	 */
	public takeTreasure(qid: number): boolean {
		if (this.treasure.includes(qid)) {
			return false
		} else {
			this.treasure.push(qid)
			return true
		}
	}

	public getTreasureNum(): number {
		return this.treasure.length
	}

	public isGetTreasure(qid: number) {
		return this.treasure.includes(qid)
	}


	//添加新衣服
	public addNewCloth(qid: number) {
		this.newCloths.push(qid)
	}

	//删除一件衣服
	public deleteCloth(qid: number) {
		if (this.newCloths.includes(qid))
			this.newCloths.splice(this.newCloths.indexOf(qid), 1)
	}

	//是否有这件衣服
	public isHaveNewCloth(qid: number) {
		return this.newCloths.includes(qid)
	}

	/**特意清除某个鱼的数据,否则清理全部 */
	public resetAllTreasure(id?: number) {
		if (id) {
			if (this.treasure.includes(id))
				this.treasure.splice(this.treasure.indexOf(id), 1)
		} else
			this.treasure = []
	}




	public getNewClothLen() {
		return this.newCloths.length
	}
	//是否有这个类型的新衣服
	public isHaveNewClothType(type: number) {
		for (let index = 0; index < this.newCloths.length; index++) {
			const element = this.newCloths[index];
			if (GameConfig.RoleAvatar.getElement(element).type == type) {
				return true
			}
		}
		return false
	}
}
