


export class GameDataHelper extends Subdata{

	@Decorator.persistence()
	public gold: number = 0

	public readonly OnGoldNumChange: mw.Action2<number, number> = new mw.Action2();  //金币变化调用
	public constructor() {
		super();
	}

	initDefaultData() {
		super.initDefaultData();
		this.gold = 0
	}

	public get dataName(): string{
		return "GameData"
	}

	public AddGold(value: number) {
		this.gold += value
	}

	public GetGoldNum(): number {
		return this.gold
	}
}