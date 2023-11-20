import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1001,"Text_play_text_name1","Mermaid World","海底公主世界"],[1002,"Text_play_text_name2","Save Mermaids","拯救美人鱼"],[1003,"Text_play_text_name3","Settings","设置"],[1004,"Text_play_text_name4","Sound","声音"],[1005,"Text_play_text_name5","Respawn","返回出生点"],[1006,"Text_play_text_name6","Costume","装扮"],[1007,"Text_play_text_name7","Top","上衣"],[1008,"Text_play_text_name8","Bottom","下装"],[1009,"Text_play_text_name9","Dress","套装裙"],[1010,"Text_play_text_name10","Hair","头发"],[1011,"Text_play_text_name11","Shoes","鞋子"],[1012,"Text_play_text_name12","Hand","手持物"],[1013,"Text_play_text_name13","Wings","背部"],[1014,"Text_play_text_name14","Trail","拖尾"],[1015,"Text_play_text_name15","Gloves","手套"],[1016,"Text_play_text_name16","Makeup","妆容"],[1017,"Text_play_text_name17","Complete","完成"],[1018,"Text_play_text_name18","Reset","重置"],[1019,"Text_play_text_name19","Common","普通"],[1020,"Text_play_text_name20","Rare","稀有"],[1021,"Text_play_text_name21","Epic","史诗"],[1022,"Text_play_text_name22","Codex","图鉴"],[1023,"Text_play_text_name23","Respawn","出生点"],[1024,"Text_play_text_name24","Sprint","冲刺"],[1025,"Text_play_text_name25","Leaderboard","排行榜"],[1026,"Text_play_text_name26","Player","姓名"],[1027,"Text_play_text_name27","Score","收集数量"],[1028,"Text_play_text_name28","You Found","恭喜你找到了"],[1029,"Text_play_text_name29","Progress","收集进度"],[1030,"Text_play_text_name30","Mermaid's Gift","美人鱼赠送"],[1031,"Text_play_text_name31","Insufficient Gold","金币不足"],[1032,"Text_play_text_name32","Find mermaid to get this costume","找到美人鱼获得哦！"],[1033,"Text_play_text_name33","Check the mermaids you rescued here","这里可以查看所有你找到的美人鱼哦！"],[1034,"Text_play_text_name34","Your mermaid companions are sealed. You must save them!","天呐！你的美人鱼伙伴被封印了，快去拯救他们吧！"],[1035,"Text_play_text_name35","Find mermaids to rescue them!","找到美人鱼伙伴就可以拯救他们！"],[1036,"Text_play_text_name36","Slide to move","滑动控制移动"],[1037,"Text_play_text_name37","Swipe to move camera","滑动控制视角"],[1038,"Text_play_text_name38","Move","移动"],[1039,"Text_play_text_name39","Use left stick to move","使用左侧摇杆移动到固定位置"],[1040,"Text_play_text_name40","Your mermaid companion gifted you a beautiful costume!","美人鱼伙伴还送了你漂亮的服饰，快去试试吧！"],[1041,"Text_play_text_name41","You already rescued this mermaid","你已找到该美人鱼啦！"],[1042,"Text_play_text_name42","Gold Received","获得了金币"],[1043,"Text_play_text_name43","Save","保存装扮"],[1044,"Text_play_text_name44","Return","返回"],[1045,"Text_play_text_name45","Insufficient Gold","金币不足"],[1046,"Text_play_text_name46","Ariel","爱丽儿"],[1047,"Text_play_text_name47","Alice","爱丽丝"],[1048,"Text_play_text_name48","Elaine ","伊莱恩"],[1049,"Text_play_text_name49","Bonnie","邦妮"],[1050,"Text_play_text_name50","Kelly"," 凯利"],[1051,"Text_play_text_name51","Jessica","杰西卡"],[1052,"Text_play_text_name52","Lisa","丽萨"],[1053,"Text_play_text_name53","Vivian","薇薇安"],[1054,"Text_play_text_name54","Vicky","维姬"],[1055,"Text_play_text_name55","Monica","莫尼卡"],[1056,"Text_play_text_name56","Barbara","巴巴拉"],[1057,"Text_play_text_name57","Sarah","莎拉"],[1058,"Text_play_text_name58","Laura","劳拉"],[1059,"Text_play_text_name59","Irene","艾琳"],[1060,"Text_play_text_name60","Julie","朱莉"],[1061,"Text_play_text_name61","Rachel","瑞琪儿"],[1062,"Text_play_text_name62","Marian"," 玛丽安"],[1063,"Text_play_text_name63","Isabel","伊莎贝尔"],[1064,"Text_play_text_name64","Gina"," 吉娜"],[1065,"Text_play_text_name65","Lillian","莉莲"],[1066,"Text_play_text_name66","Helen","海伦"],[1067,"Text_play_text_name67","June","琼"],[1068,"Text_play_text_name68","Carolyn","卡罗琳"],[1069,"Text_play_text_name69","Donna","唐娜"],[1070,"Text_play_text_name70","Pamela","帕梅拉"],[1071,"Text_play_text_name71","Martha","玛莎"],[1072,"Text_play_text_name72","Eva","伊娃"],[1073,"Text_play_text_name73","Linda ","琳达"],[1074,"Text_play_text_name74","Marian"," 玛丽亚"],[1075,"Text_play_text_name75","Erin","艾琳"],[1076,"Text_play_text_name76","Vera","薇拉"],[1077,"Text_play_text_name77","Emily","艾蜜莉"],[1078,"Text_play_text_name78","Christine","克里斯汀"],[1079,"Text_play_text_name79","Marie","玛丽"],[1080,"Text_play_text_name80","Judy","朱迪"],[1081,"Text_play_text_name81","Teresa","特丽萨"],[1082,"Text_play_text_name82","Olivia","奥莉薇"],[1083,"Text_play_text_name83","Shirley","  雪莉"],[1084,"Text_play_text_name84","Beth"," 贝丝"],[1085,"Text_play_text_name85","Janice","珍妮丝"],[1086,"Text_play_text_name86","Nancy","南希"],[1087,"Text_play_text_name87","Jennifer","珍妮弗"],[1088,"Text_play_text_name88","Rebecca"," 丽贝卡"],[1089,"Text_play_text_name89","Anna"," 安娜"],[1090,"Text_play_text_name90","Lucia"," 露西娅"],[1091,"Text_play_text_name91","Annie","安妮"],[1092,"Text_play_text_name92","Van","瓦恩"],[1093,"Text_play_text_name93","Andrew"," 安德鲁"],[1094,"Text_play_text_name94","Kevin","凯文"],[1095,"Text_play_text_name95","Allen","艾伦"],[1096,"Text_play_text_name96","New Costume!","获得了新服饰！"],[1097,"Text_play_text_name97","Costume","进入装扮界面"],[1098,"Text_play_text_name98","Up","上浮"],[1099,"Text_play_text_name99","Down","下沉"],[1100,"Text_play_text_name100","Your mermaid companions are sealed! You must save them!\nExplore the underwater world, save your friends, and dress up in gorgeous costumes!","天呐！你的美人鱼伙伴们被封印了！快来拯救他们吧！\n在这里你不仅可以探索海底世界，拯救美人鱼，还可以自由装扮哦！"],[1101,"Text_play_text_name101","On","开"],[1102,"Text_play_text_name102","Off","关"],[1103,"Text_play_text_name103","You need to buy this costume","请购买后穿上哦"],[1104,"Text_play_text_name104","Find your companions and obtain more costumes!","快去找美人鱼获得更多漂亮服饰吧！"],[1105,"Text_play_text_name105","Excellent! You found a secret space!","真厉害！找到惊喜空间啦！"],[1106,"Text_play_text_name106","Loading……","等待中......"],[1107,"Text_play_text_name107","Watch Ads","观看广告获取"],[1108,"Text_play_text_name108","Failed to load Ads","广告播放失败"],[1109,"Text_play_text_name109","Loading Ads","广告还未准备好"],[1110,"Text_play_text_name110","You cannot watch more Ads today","已达到今日上限"],[1111,"Text_play_text_name111","You've Rescued All Mermaids","已经找到所有美人鱼啦"],[1112,"Text_play_text_name112","Poseidon sent you his blessing","海洋之神送来祝福！"],[1113,"Text_play_text_name113","Refuse","拒绝祝福"],[1114,"Text_play_text_name114","Receive","接受祝福"],[1115,"Text_play_text_name115","Watch Ads","观看广告可以获得"],[1116,"Text_play_text_name116","Tips ","新的美人鱼提示~"],[1117,"Text_play_text_name117","Tips can help your find mermaids! Watch Ads for more tips!","跟随指引就能找到美人鱼啦，先送你一次啦！下次看广告可以免费获得哦！"],[1118,"Text_play_text_name118","Times:{0}","剩余次数：{0}"],[1119,"Text_play_text_name119","Get Tips ","获得提示"],[1120,"Text_play_text_name120","Sheila","希拉 "],[1121,"Text_play_text_name121","Suzan ","苏珊 "],[1122,"Text_play_text_name122","Macie ","梅茜 "],[1123,"Text_play_text_name123","Leyah ","莱雅 "],[1124,"Text_play_text_name124","Dodla ","多拉 "],[1125,"Text_play_text_name125","Ena ","伊娜 "],[1126,"Text_play_text_name126","Alva ","阿尔娃 "],[1127,"Text_play_text_name127","Amelia ","阿蜜莉雅 "],[1128,"Text_play_text_name128","Aurora ","奥萝拉 "],[1129,"Text_play_text_name129","Beatrice ","碧翠诗"],[1130,"Text_play_text_name130","You Are Now The Most Capable Rescurer!\nYour Devotion Will Be Remembered!","恭喜您成为第一名!\n请继续保持这份荣耀！"],[1131,"Text_play_text_name131","Click anywhere to view","点击任意位置查看"],[1132,"Text_play_text_name132","We have prepared a fun free game for you!","我们为你准备了好玩的免费游戏！"],[1133,"Text_play_text_name133","Get 200 gold coins","获得200金币"],[1134,"Text_play_text_name134","Get 1~20 times","获得1~20倍"],[1135,"Text_play_text_name135","Insufficient physical strength!","体力不足！"],[1136,"Text_play_text_name136","10 minute invincible sprint","10分钟的无敌冲刺"],[1137,"Text_play_text_name137","Obtained {0} times of additional gold coins","获得了{0}倍的额外金币"],[1138,"Text_play_text_name138","Get {0} gold coins","直接领取{0}金币"]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名字索引*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**海底公主世界*/
	get Text_play_text_name1():ILanguageElement{return this.getElement(1001)};
	/**拯救美人鱼*/
	get Text_play_text_name2():ILanguageElement{return this.getElement(1002)};
	/**设置*/
	get Text_play_text_name3():ILanguageElement{return this.getElement(1003)};
	/**声音*/
	get Text_play_text_name4():ILanguageElement{return this.getElement(1004)};
	/**返回出生点*/
	get Text_play_text_name5():ILanguageElement{return this.getElement(1005)};
	/**装扮*/
	get Text_play_text_name6():ILanguageElement{return this.getElement(1006)};
	/**上衣*/
	get Text_play_text_name7():ILanguageElement{return this.getElement(1007)};
	/**下装*/
	get Text_play_text_name8():ILanguageElement{return this.getElement(1008)};
	/**套装裙*/
	get Text_play_text_name9():ILanguageElement{return this.getElement(1009)};
	/**头发*/
	get Text_play_text_name10():ILanguageElement{return this.getElement(1010)};
	/**鞋子*/
	get Text_play_text_name11():ILanguageElement{return this.getElement(1011)};
	/**手持物*/
	get Text_play_text_name12():ILanguageElement{return this.getElement(1012)};
	/**背部*/
	get Text_play_text_name13():ILanguageElement{return this.getElement(1013)};
	/**拖尾*/
	get Text_play_text_name14():ILanguageElement{return this.getElement(1014)};
	/**手套*/
	get Text_play_text_name15():ILanguageElement{return this.getElement(1015)};
	/**妆容*/
	get Text_play_text_name16():ILanguageElement{return this.getElement(1016)};
	/**完成*/
	get Text_play_text_name17():ILanguageElement{return this.getElement(1017)};
	/**重置*/
	get Text_play_text_name18():ILanguageElement{return this.getElement(1018)};
	/**普通*/
	get Text_play_text_name19():ILanguageElement{return this.getElement(1019)};
	/**稀有*/
	get Text_play_text_name20():ILanguageElement{return this.getElement(1020)};
	/**史诗*/
	get Text_play_text_name21():ILanguageElement{return this.getElement(1021)};
	/**图鉴*/
	get Text_play_text_name22():ILanguageElement{return this.getElement(1022)};
	/**出生点*/
	get Text_play_text_name23():ILanguageElement{return this.getElement(1023)};
	/**冲刺*/
	get Text_play_text_name24():ILanguageElement{return this.getElement(1024)};
	/**排行榜*/
	get Text_play_text_name25():ILanguageElement{return this.getElement(1025)};
	/**姓名*/
	get Text_play_text_name26():ILanguageElement{return this.getElement(1026)};
	/**收集数量*/
	get Text_play_text_name27():ILanguageElement{return this.getElement(1027)};
	/**恭喜你找到了*/
	get Text_play_text_name28():ILanguageElement{return this.getElement(1028)};
	/**收集进度*/
	get Text_play_text_name29():ILanguageElement{return this.getElement(1029)};
	/**美人鱼赠送*/
	get Text_play_text_name30():ILanguageElement{return this.getElement(1030)};
	/**金币不足*/
	get Text_play_text_name31():ILanguageElement{return this.getElement(1031)};
	/**找到美人鱼获得哦！*/
	get Text_play_text_name32():ILanguageElement{return this.getElement(1032)};
	/**这里可以查看所有你找到的美人鱼哦！*/
	get Text_play_text_name33():ILanguageElement{return this.getElement(1033)};
	/**天呐！你的美人鱼伙伴被封印了，快去拯救他们吧！*/
	get Text_play_text_name34():ILanguageElement{return this.getElement(1034)};
	/**找到美人鱼伙伴就可以拯救他们！*/
	get Text_play_text_name35():ILanguageElement{return this.getElement(1035)};
	/**滑动控制移动*/
	get Text_play_text_name36():ILanguageElement{return this.getElement(1036)};
	/**滑动控制视角*/
	get Text_play_text_name37():ILanguageElement{return this.getElement(1037)};
	/**移动*/
	get Text_play_text_name38():ILanguageElement{return this.getElement(1038)};
	/**使用左侧摇杆移动到固定位置*/
	get Text_play_text_name39():ILanguageElement{return this.getElement(1039)};
	/**美人鱼伙伴还送了你漂亮的服饰，快去试试吧！*/
	get Text_play_text_name40():ILanguageElement{return this.getElement(1040)};
	/**你已找到该美人鱼啦！*/
	get Text_play_text_name41():ILanguageElement{return this.getElement(1041)};
	/**获得了金币*/
	get Text_play_text_name42():ILanguageElement{return this.getElement(1042)};
	/**保存装扮*/
	get Text_play_text_name43():ILanguageElement{return this.getElement(1043)};
	/**返回*/
	get Text_play_text_name44():ILanguageElement{return this.getElement(1044)};
	/**金币不足*/
	get Text_play_text_name45():ILanguageElement{return this.getElement(1045)};
	/**爱丽儿*/
	get Text_play_text_name46():ILanguageElement{return this.getElement(1046)};
	/**爱丽丝*/
	get Text_play_text_name47():ILanguageElement{return this.getElement(1047)};
	/**伊莱恩*/
	get Text_play_text_name48():ILanguageElement{return this.getElement(1048)};
	/**邦妮*/
	get Text_play_text_name49():ILanguageElement{return this.getElement(1049)};
	/** 凯利*/
	get Text_play_text_name50():ILanguageElement{return this.getElement(1050)};
	/**杰西卡*/
	get Text_play_text_name51():ILanguageElement{return this.getElement(1051)};
	/**丽萨*/
	get Text_play_text_name52():ILanguageElement{return this.getElement(1052)};
	/**薇薇安*/
	get Text_play_text_name53():ILanguageElement{return this.getElement(1053)};
	/**维姬*/
	get Text_play_text_name54():ILanguageElement{return this.getElement(1054)};
	/**莫尼卡*/
	get Text_play_text_name55():ILanguageElement{return this.getElement(1055)};
	/**巴巴拉*/
	get Text_play_text_name56():ILanguageElement{return this.getElement(1056)};
	/**莎拉*/
	get Text_play_text_name57():ILanguageElement{return this.getElement(1057)};
	/**劳拉*/
	get Text_play_text_name58():ILanguageElement{return this.getElement(1058)};
	/**艾琳*/
	get Text_play_text_name59():ILanguageElement{return this.getElement(1059)};
	/**朱莉*/
	get Text_play_text_name60():ILanguageElement{return this.getElement(1060)};
	/**瑞琪儿*/
	get Text_play_text_name61():ILanguageElement{return this.getElement(1061)};
	/** 玛丽安*/
	get Text_play_text_name62():ILanguageElement{return this.getElement(1062)};
	/**伊莎贝尔*/
	get Text_play_text_name63():ILanguageElement{return this.getElement(1063)};
	/** 吉娜*/
	get Text_play_text_name64():ILanguageElement{return this.getElement(1064)};
	/**莉莲*/
	get Text_play_text_name65():ILanguageElement{return this.getElement(1065)};
	/**海伦*/
	get Text_play_text_name66():ILanguageElement{return this.getElement(1066)};
	/**琼*/
	get Text_play_text_name67():ILanguageElement{return this.getElement(1067)};
	/**卡罗琳*/
	get Text_play_text_name68():ILanguageElement{return this.getElement(1068)};
	/**唐娜*/
	get Text_play_text_name69():ILanguageElement{return this.getElement(1069)};
	/**帕梅拉*/
	get Text_play_text_name70():ILanguageElement{return this.getElement(1070)};
	/**玛莎*/
	get Text_play_text_name71():ILanguageElement{return this.getElement(1071)};
	/**伊娃*/
	get Text_play_text_name72():ILanguageElement{return this.getElement(1072)};
	/**琳达*/
	get Text_play_text_name73():ILanguageElement{return this.getElement(1073)};
	/** 玛丽亚*/
	get Text_play_text_name74():ILanguageElement{return this.getElement(1074)};
	/**艾琳*/
	get Text_play_text_name75():ILanguageElement{return this.getElement(1075)};
	/**薇拉*/
	get Text_play_text_name76():ILanguageElement{return this.getElement(1076)};
	/**艾蜜莉*/
	get Text_play_text_name77():ILanguageElement{return this.getElement(1077)};
	/**克里斯汀*/
	get Text_play_text_name78():ILanguageElement{return this.getElement(1078)};
	/**玛丽*/
	get Text_play_text_name79():ILanguageElement{return this.getElement(1079)};
	/**朱迪*/
	get Text_play_text_name80():ILanguageElement{return this.getElement(1080)};
	/**特丽萨*/
	get Text_play_text_name81():ILanguageElement{return this.getElement(1081)};
	/**奥莉薇*/
	get Text_play_text_name82():ILanguageElement{return this.getElement(1082)};
	/**  雪莉*/
	get Text_play_text_name83():ILanguageElement{return this.getElement(1083)};
	/** 贝丝*/
	get Text_play_text_name84():ILanguageElement{return this.getElement(1084)};
	/**珍妮丝*/
	get Text_play_text_name85():ILanguageElement{return this.getElement(1085)};
	/**南希*/
	get Text_play_text_name86():ILanguageElement{return this.getElement(1086)};
	/**珍妮弗*/
	get Text_play_text_name87():ILanguageElement{return this.getElement(1087)};
	/** 丽贝卡*/
	get Text_play_text_name88():ILanguageElement{return this.getElement(1088)};
	/** 安娜*/
	get Text_play_text_name89():ILanguageElement{return this.getElement(1089)};
	/** 露西娅*/
	get Text_play_text_name90():ILanguageElement{return this.getElement(1090)};
	/**安妮*/
	get Text_play_text_name91():ILanguageElement{return this.getElement(1091)};
	/**瓦恩*/
	get Text_play_text_name92():ILanguageElement{return this.getElement(1092)};
	/** 安德鲁*/
	get Text_play_text_name93():ILanguageElement{return this.getElement(1093)};
	/**凯文*/
	get Text_play_text_name94():ILanguageElement{return this.getElement(1094)};
	/**艾伦*/
	get Text_play_text_name95():ILanguageElement{return this.getElement(1095)};
	/**获得了新服饰！*/
	get Text_play_text_name96():ILanguageElement{return this.getElement(1096)};
	/**进入装扮界面*/
	get Text_play_text_name97():ILanguageElement{return this.getElement(1097)};
	/**上浮*/
	get Text_play_text_name98():ILanguageElement{return this.getElement(1098)};
	/**下沉*/
	get Text_play_text_name99():ILanguageElement{return this.getElement(1099)};
	/**天呐！你的美人鱼伙伴们被封印了！快来拯救他们吧！
在这里你不仅可以探索海底世界，拯救美人鱼，还可以自由装扮哦！*/
	get Text_play_text_name100():ILanguageElement{return this.getElement(1100)};
	/**开*/
	get Text_play_text_name101():ILanguageElement{return this.getElement(1101)};
	/**关*/
	get Text_play_text_name102():ILanguageElement{return this.getElement(1102)};
	/**请购买后穿上哦*/
	get Text_play_text_name103():ILanguageElement{return this.getElement(1103)};
	/**快去找美人鱼获得更多漂亮服饰吧！*/
	get Text_play_text_name104():ILanguageElement{return this.getElement(1104)};
	/**真厉害！找到惊喜空间啦！*/
	get Text_play_text_name105():ILanguageElement{return this.getElement(1105)};
	/**等待中......*/
	get Text_play_text_name106():ILanguageElement{return this.getElement(1106)};
	/**观看广告获取*/
	get Text_play_text_name107():ILanguageElement{return this.getElement(1107)};
	/**广告播放失败*/
	get Text_play_text_name108():ILanguageElement{return this.getElement(1108)};
	/**广告还未准备好*/
	get Text_play_text_name109():ILanguageElement{return this.getElement(1109)};
	/**已达到今日上限*/
	get Text_play_text_name110():ILanguageElement{return this.getElement(1110)};
	/**已经找到所有美人鱼啦*/
	get Text_play_text_name111():ILanguageElement{return this.getElement(1111)};
	/**海洋之神送来祝福！*/
	get Text_play_text_name112():ILanguageElement{return this.getElement(1112)};
	/**拒绝祝福*/
	get Text_play_text_name113():ILanguageElement{return this.getElement(1113)};
	/**接受祝福*/
	get Text_play_text_name114():ILanguageElement{return this.getElement(1114)};
	/**观看广告可以获得*/
	get Text_play_text_name115():ILanguageElement{return this.getElement(1115)};
	/**新的美人鱼提示~*/
	get Text_play_text_name116():ILanguageElement{return this.getElement(1116)};
	/**跟随指引就能找到美人鱼啦，先送你一次啦！下次看广告可以免费获得哦！*/
	get Text_play_text_name117():ILanguageElement{return this.getElement(1117)};
	/**剩余次数：{0}*/
	get Text_play_text_name118():ILanguageElement{return this.getElement(1118)};
	/**获得提示*/
	get Text_play_text_name119():ILanguageElement{return this.getElement(1119)};
	/**希拉 */
	get Text_play_text_name120():ILanguageElement{return this.getElement(1120)};
	/**苏珊 */
	get Text_play_text_name121():ILanguageElement{return this.getElement(1121)};
	/**梅茜 */
	get Text_play_text_name122():ILanguageElement{return this.getElement(1122)};
	/**莱雅 */
	get Text_play_text_name123():ILanguageElement{return this.getElement(1123)};
	/**多拉 */
	get Text_play_text_name124():ILanguageElement{return this.getElement(1124)};
	/**伊娜 */
	get Text_play_text_name125():ILanguageElement{return this.getElement(1125)};
	/**阿尔娃 */
	get Text_play_text_name126():ILanguageElement{return this.getElement(1126)};
	/**阿蜜莉雅 */
	get Text_play_text_name127():ILanguageElement{return this.getElement(1127)};
	/**奥萝拉 */
	get Text_play_text_name128():ILanguageElement{return this.getElement(1128)};
	/**碧翠诗*/
	get Text_play_text_name129():ILanguageElement{return this.getElement(1129)};
	/**恭喜您成为第一名!
请继续保持这份荣耀！*/
	get Text_play_text_name130():ILanguageElement{return this.getElement(1130)};
	/**点击任意位置查看*/
	get Text_play_text_name131():ILanguageElement{return this.getElement(1131)};
	/**我们为你准备了好玩的免费游戏！*/
	get Text_play_text_name132():ILanguageElement{return this.getElement(1132)};
	/**获得200金币*/
	get Text_play_text_name133():ILanguageElement{return this.getElement(1133)};
	/**获得1~20倍*/
	get Text_play_text_name134():ILanguageElement{return this.getElement(1134)};
	/**体力不足！*/
	get Text_play_text_name135():ILanguageElement{return this.getElement(1135)};
	/**10分钟的无敌冲刺*/
	get Text_play_text_name136():ILanguageElement{return this.getElement(1136)};
	/**获得了{0}倍的额外金币*/
	get Text_play_text_name137():ILanguageElement{return this.getElement(1137)};
	/**直接领取{0}金币*/
	get Text_play_text_name138():ILanguageElement{return this.getElement(1138)};

}