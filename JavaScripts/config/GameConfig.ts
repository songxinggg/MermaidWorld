import {ConfigBase, IElementBase} from "./ConfigBase";
import {AssetsConfig} from "./Assets";
import {AudioConfig} from "./Audio";
import {EffectConfig} from "./Effect";
import {GuideConfig} from "./Guide";
import {GuideUIConfig} from "./GuideUI";
import {LanguageConfig} from "./Language";
import {MermaidClothConfig} from "./MermaidCloth";
import {MermaidMgrConfig} from "./MermaidMgr";
import {RoleAvatarConfig} from "./RoleAvatar";
import {skillConfig} from "./skill";
import {TextUIConfig} from "./TextUI";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Audio():AudioConfig{ return this.getConfig(AudioConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get Guide():GuideConfig{ return this.getConfig(GuideConfig) };
	public static get GuideUI():GuideUIConfig{ return this.getConfig(GuideUIConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get MermaidCloth():MermaidClothConfig{ return this.getConfig(MermaidClothConfig) };
	public static get MermaidMgr():MermaidMgrConfig{ return this.getConfig(MermaidMgrConfig) };
	public static get RoleAvatar():RoleAvatarConfig{ return this.getConfig(RoleAvatarConfig) };
	public static get skill():skillConfig{ return this.getConfig(skillConfig) };
	public static get TextUI():TextUIConfig{ return this.getConfig(TextUIConfig) };
}