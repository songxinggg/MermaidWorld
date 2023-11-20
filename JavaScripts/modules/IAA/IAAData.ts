
import { IAAPos } from "./IAAPos";



class ADLimit {
    pos: IAAPos;
    count: number;
}


export class IAAData extends Subdata {

    @Decorator.persistence()
    public limits: ADLimit[] = [
        { pos: IAAPos.Main_Collect, count: 5 },
        { pos: IAAPos.Time_Collect, count: 5 },
        { pos: IAAPos.Cloth_Gold, count: 20 },
        { pos: IAAPos.Cloth_Buy, count: 999 },
        { pos: IAAPos.Round_Gold, count: 999 },
        { pos: IAAPos.Skill_Num, count: 999 }];

    @Decorator.persistence()
    public lastRefreshDay: number = 0;

    @Decorator.persistence()
    public skillnum: number = 0;

    public readonly Main_CollectDataChange: mw.Action1<number> = new mw.Action1()
    public readonly Cloth_BuyDataChange: mw.Action1<number> = new mw.Action1()

    public readonly Skill_CountChange: mw.Action1<number> = new mw.Action1()

    public get dataName(): string{
		return "IAADataInfo"
	}


    protected initDefaultData(): void {
        this.limits = [];
        this.limits.push({ pos: IAAPos.Main_Collect, count: 5 });
        this.limits.push({ pos: IAAPos.Time_Collect, count: 5 });
        this.limits.push({ pos: IAAPos.Cloth_Gold, count: 20 });
        this.limits.push({ pos: IAAPos.Cloth_Buy, count: 999 });
        this.limits.push({ pos: IAAPos.Round_Gold, count: 999 });
        this.limits.push({ pos: IAAPos.Skill_Num, count: 999 });
        this.lastRefreshDay = new Date().getDate();
        this.skillnum = 0;
    }

    override onDataInit() {
        if (this.version != this.currentVersion) {
            switch (this.version) {
                case 1:
                    this.currentVersion = 2;
                    this.limits.push({ pos: IAAPos.Round_Gold, count: 999 });
                    this.limits.push({ pos: IAAPos.Skill_Num, count: 999 });
                    break;
            }
        }
    }

    /**
     * 重置广告次数，需要判断时间
     */
    public resetDate() {
        const date = new Date().getDate();
        if (this.lastRefreshDay != date) {
            this.lastRefreshDay = date;
            this.limits.forEach(limit => {
                switch (limit.pos) {
                    case IAAPos.Main_Collect:
                        limit.count = 5;
                        break;
                    case IAAPos.Time_Collect:
                        limit.count = 5;
                        break;
                    case IAAPos.Cloth_Gold:
                        limit.count = 20;
                        break;
                    case IAAPos.Cloth_Buy:
                        limit.count = 999;
                        break;
                    case IAAPos.Round_Gold:
                        limit.count = 999;
                        break;
                    case IAAPos.Skill_Num:
                        limit.count = 999;
                        break;
                    default:
                        break;
                }
            });
            this.skillnum = 0
            this.save(true);
        }
    }
    /**
     * 有多少次数
     * @param pos 
     * @returns 
     */
    public hasCount(pos: IAAPos): number {
        return this.limits.find(i => i.pos == pos).count;
    }


    /**
    * 技能使用了有多少次数
    * @param pos 
    * @returns 
    */
    public hasSkillCount(): number {
        return this.skillnum || 0
    }

    /**
     * 增加技能使用次数
     */
    public addSkillCount() {
        this.skillnum++
    }

    /**
     * 减少次数
     * @param pos 
     */
    public reduceCount(pos: IAAPos) {
        const limit = this.limits.find(i => i.pos == pos);
        if (limit) {
            limit.count--;

        }
    }
}