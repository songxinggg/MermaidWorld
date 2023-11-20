import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","mainType","type","name","qulaity","desc","chaMesh","stance","bodyupper","bodylower","hairfront","hairlate","head","gloves","shoe","effectGuid","matGuid","socket","posOffset","scale","rotate","icon","priceIcon","priceType","price"],["","","","","","","","","","","","","","","","","","","","","","","","",""],[1,0,0,"默认装扮",0,null,"Female_Medium","30274","57730","64334","C143714E4D10F570DE6FE688192DEED9",null,"76618","75663","63294",null,null,0,null,null,null,0,0,0,0],[2,0,1,"上衣",2,null,"Female_Medium","30274","0039C01E46651A1D95015593005C4E67",null,null,null,null,null,null,null,null,0,null,null,null,110748,37819,2,0],[3,0,1,"上衣",1,null,"Female_Medium","30274","FBCA9EB14CFFFDB89E6EE9B25EC1230B",null,null,null,null,null,null,null,null,0,null,null,null,110746,37819,1,60],[4,0,1,"上衣",1,null,"Female_Medium","30274","ABAB40AD4F11F163CC96AA9E1A38DD9A",null,null,null,null,null,null,null,null,0,null,null,null,110676,37819,0,0],[5,0,1,"上衣",1,null,"Female_Medium","30274","1CC08A7C48BCB9F3DE25FA8E18094C91",null,null,null,null,null,null,null,null,0,null,null,null,110678,37819,1,60],[6,0,1,"上衣",1,null,"Female_Medium","30274","4C17219547D778DD3A88CB9C9669598E",null,null,null,null,null,null,null,null,0,null,null,null,110749,37819,1,80],[7,0,1,"上衣",1,null,"Female_Medium","30274","E50B8C7B4E04DC09D5579F8B6B0751B5",null,null,null,null,null,null,null,null,0,null,null,null,110731,37819,1,80],[8,0,1,"上衣",1,null,"Female_Medium","30274","2930EAD84932EECE94F067982A2DC8BD",null,null,null,null,null,null,null,null,0,null,null,null,110660,37819,1,100],[9,0,1,"上衣",3,null,"Female_Medium","30274","A4CEC07D45669E42462EAA87FDBC2FB0",null,null,null,null,null,null,null,null,0,null,null,null,110677,37819,2,0],[10,0,1,"上衣",2,null,"Female_Medium","30274","C7730A0B4EF552A20E0A8F8A66753E95",null,null,null,null,null,null,null,null,0,null,null,null,110747,37819,3,100],[11,0,1,"上衣",3,null,"Female_Medium","30274","2CEF71504B43EC97F4C4D6BD56CC96A5",null,null,null,null,null,null,null,null,0,null,null,null,110712,37819,2,0],[102,0,1,"上衣",1,null,"Female_Medium","30274","109839",null,null,null,null,null,null,null,null,0,null,null,null,123179,37819,1,120],[103,0,1,"上衣",1,null,"Female_Medium","30274","111516",null,null,null,null,null,null,null,null,0,null,null,null,123180,37819,1,120],[104,0,1,"上衣",2,null,"Female_Medium","30274","1C4662B046896A4054D42299403A9D47",null,null,null,null,null,null,null,null,0,null,null,null,123208,37819,3,150],[105,0,1,"上衣",1,null,"Female_Medium","30274","119350",null,null,null,null,null,null,null,null,0,null,null,null,123210,37819,1,150],[106,0,1,"上衣",1,null,"Female_Medium","30274","119229",null,null,null,null,null,null,null,null,0,null,null,null,123136,37819,1,180],[107,0,1,"上衣",3,null,"Female_Medium","30274","64774",null,null,null,null,null,null,null,null,0,null,null,null,123220,37819,3,180],[108,0,1,"上衣",1,null,"Female_Medium","30274","E5FEF9D146D683D2BAABF7B9E6664ABF",null,null,null,null,null,null,null,null,0,null,null,null,123169,37819,1,180],[109,0,1,"上衣",2,null,"Female_Medium","30274","D97D727B411475309092BE8B3AC1C5E4",null,null,null,null,null,null,null,null,0,null,null,null,123207,37819,1,200],[110,0,1,"上衣",2,null,"Female_Medium","30274","115849",null,null,null,null,null,null,null,null,0,null,null,null,123167,37819,1,200],[111,0,1,"上衣",3,null,"Female_Medium","30274","D674572544B8F27A6AD5DF90FAE81341",null,null,null,null,null,null,null,null,0,null,null,null,123166,37819,3,220],[12,0,2,"下衣",1,null,"Female_Medium","30274",null,"63AAB5324ABF586BDE0AFAA87AD209D4",null,null,null,null,null,null,null,0,null,null,null,110724,37819,0,0],[13,0,2,"下衣",1,null,"Female_Medium","30274",null,"DF9D8A9C49A2808216371BB503441AC0",null,null,null,null,null,null,null,0,null,null,null,110693,37819,1,30],[14,0,2,"下衣",1,null,"Female_Medium","30274",null,"2C64FD9A48210A52107E979DC8D4F123",null,null,null,null,null,null,null,0,null,null,null,110725,37819,1,60],[15,0,2,"下衣",1,null,"Female_Medium","30274",null,"82E09B1D4F23518EA320F6946CDD2434",null,null,null,null,null,null,null,0,null,null,null,110754,37819,1,80],[16,0,2,"下衣",2,null,"Female_Medium","30274",null,"16350D324C5F02212DF2EF8C9E6F971D",null,null,null,null,null,null,null,0,null,null,null,110716,37819,3,80],[17,0,2,"下衣",1,null,"Female_Medium","30274",null,"C9A67CE64EB40E7B897DCCBB32216C95",null,null,null,null,null,null,null,0,null,null,null,110680,37819,0,0],[18,0,2,"下衣",1,null,"Female_Medium","30274",null,"8B559A2F4115B80D1CEFCEB36F846598",null,null,null,null,null,null,null,0,null,null,null,110717,37819,1,100],[19,0,2,"下衣",1,null,"Female_Medium","30274",null,"B5653F4149B18A2C249EEBB8CA85DAC6",null,null,null,null,null,null,null,0,null,null,null,110752,37819,1,100],[20,0,2,"下衣",2,null,"Female_Medium","30274",null,"FE5EFD9046D9EEC40F2D3B9065211F84",null,null,null,null,null,null,null,0,null,null,null,110727,37819,3,120],[21,0,2,"下衣",1,null,"Female_Medium","30274",null,"61ECE2174A3CB2FD8ECCDE990B6DB591",null,null,null,null,null,null,null,0,null,null,null,110656,37819,1,120],[112,0,2,"下衣",1,null,"Female_Medium","30274",null,"2B34B2C34313FCD5F177FEBDE3AA2110",null,null,null,null,null,null,null,0,null,null,null,123206,37819,1,120],[113,0,2,"下衣",1,null,"Female_Medium","30274",null,"B80A222F4797CFE75CD050BD73043301",null,null,null,null,null,null,null,0,null,null,null,123168,37819,1,140],[114,0,2,"下衣",1,null,"Female_Medium","30274",null,"7443066043939407C13599BE97C8C4DF",null,null,null,null,null,null,null,0,null,null,null,123214,37819,1,140],[115,0,2,"下衣",3,null,"Female_Medium","30274",null,"119227",null,null,null,null,null,null,null,0,null,null,null,123171,37819,3,160],[116,0,2,"下衣",1,null,"Female_Medium","30274",null,"65869",null,null,null,null,null,null,null,0,null,null,null,123219,37819,1,160],[117,0,2,"下衣",1,null,"Female_Medium","30274",null,"06744FE64B35C2C8413A05BAB1103C77",null,null,null,null,null,null,null,0,null,null,null,123134,37819,1,180],[118,0,2,"下衣",2,null,"Female_Medium","30274",null,"64309",null,null,null,null,null,null,null,0,null,null,null,123135,37819,1,180],[119,0,2,"下衣",3,null,"Female_Medium","30274",null,"121054",null,null,null,null,null,null,null,0,null,null,null,123213,37819,3,200],[120,0,2,"下衣",2,null,"Female_Medium","30274",null,"63552",null,null,null,null,null,null,null,0,null,null,null,123175,37819,1,200],[121,0,2,"下衣",2,null,"Female_Medium","30274",null,"116956",null,null,null,null,null,null,null,0,null,null,null,123178,37819,1,200],[22,0,3,"头发",2,null,"Female_Medium","30274",null,null,"2080C59C445AC36846A51BB0739892CC",null,null,null,null,null,null,0,null,null,null,110743,37819,1,60],[23,0,3,"头发",3,null,"Female_Medium","30274",null,null,"515B14E1488F63DAA3911A9D56CFF181",null,null,null,null,null,null,0,null,null,null,110672,37819,2,0],[24,0,3,"头发",1,null,"Female_Medium","30274",null,null,"EF9787354B76C9CB6401A5A263A99F20",null,null,null,null,null,null,0,null,null,null,110671,37819,0,0],[25,0,3,"头发",2,null,"Female_Medium","30274",null,null,"67FCDD7D4923A5BFE0577488744B6E1B",null,null,null,null,null,null,0,null,null,null,110740,37819,3,60],[26,0,3,"头发",1,null,"Female_Medium","30274",null,null,"5032DF6945F009110F14DF922F804743",null,null,null,null,null,null,0,null,null,null,110744,37819,1,60],[27,0,3,"头发",1,null,"Female_Medium","30274",null,null,"56AAE042459E25110219109565F9CEB5",null,null,null,null,null,null,0,null,null,null,110673,37819,1,80],[28,0,3,"头发",3,null,"Female_Medium","30274",null,null,"D63549CB435D50AD36CFC5ADCB841CC4",null,null,null,null,null,null,0,null,null,null,110685,37819,2,0],[29,0,3,"头发",1,null,"Female_Medium","30274",null,null,"F75B3BD346F55277545208AEDFFCBE98",null,null,null,null,null,null,0,null,null,null,110641,37819,1,80],[30,0,3,"头发",3,null,"Female_Medium","30274",null,null,"F050564F497D6877E83E04AA2D39B666",null,null,null,null,null,null,0,null,null,null,110753,37819,2,0,null,null,null,null,null,"头发 ",0],[31,0,3,"头发",2,null,"Female_Medium","30274",null,null,"F5823934407485E55C6D4688BDBD0151",null,null,null,null,null,null,0,null,null,null,110626,37819,3,100,null,null,null,null,null,"脸部 ",1],[122,0,3,"头发",1,null,"Female_Medium","30274",null,null,"2EB3457E43DF526D4D3B31816345717B",null,null,null,null,null,null,0,null,null,null,123235,37819,0,0],[123,0,3,"头发",1,null,"Female_Medium","30274",null,null,"4D1EBA92447043C1A2F644B2E02BD5D9",null,null,null,null,null,null,0,null,null,null,123174,37819,1,100],[124,0,3,"头发",1,null,"Female_Medium","30274",null,null,"0AFDD0924AB9D6ECD5AB1A8334F83A2B",null,null,null,null,null,null,0,null,null,null,123211,37819,1,120],[125,0,3,"头发",1,null,"Female_Medium","30274",null,null,"2D6268CF44ED4F524A374FB90422C6C3",null,null,null,null,null,null,0,null,null,null,123173,37819,1,120],[126,0,3,"头发",2,null,"Female_Medium","30274",null,null,"058131864A8E09C5BC3BFD818117446A",null,null,null,null,null,null,0,null,null,null,123232,37819,1,140],[127,0,3,"头发",3,null,"Female_Medium","30274",null,null,"8B7FB1844E278C58CAD06EB76345C361",null,null,null,null,null,null,0,null,null,null,123216,37819,3,140],[128,0,3,"头发",2,null,"Female_Medium","30274",null,null,"3A52BB72456B21716A0247AC21FDE395",null,null,null,null,null,null,0,null,null,null,123218,37819,1,160],[129,0,3,"头发",3,null,"Female_Medium","30274",null,null,"D64E91714B7ACC64035DD3ADE88387BD",null,null,null,null,null,null,0,null,null,null,123236,37819,1,180],[130,0,3,"头发",3,null,"Female_Medium","30274",null,null,"EE85E60746DAC3425EABD6ABBBE1DBED",null,null,null,null,null,null,0,null,null,null,123209,37819,1,200],[131,0,3,"头发",3,null,"Female_Medium","30274",null,null,"ECC6C0A343527A0D6A763388C300E3EF",null,null,null,null,null,null,0,null,null,null,123192,37819,3,200],[32,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"65867",null,null,0,null,null,null,110764,37819,0,0,null,null,null,null,null,"头部左侧 ",2],[33,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"66371",null,null,0,null,null,null,110655,37819,1,20,null,null,null,null,null,"头部右侧 ",3],[34,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"64208",null,null,0,null,null,null,110696,37819,1,20,null,null,null,null,null,"眼镜 ",4],[35,0,4,"鞋子",2,null,"Female_Medium","30274",null,null,null,null,null,null,"63301",null,null,0,null,null,null,110659,37819,3,30,null,null,null,null,null,"眼睛 ",5],[36,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"67592",null,null,0,null,null,null,110768,37819,1,30,null,null,null,null,null,"面部装饰 ",6],[37,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"60985",null,null,0,null,null,null,110658,37819,1,30,null,null,null,null,null,"嘴部 ",7],[38,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"65660",null,null,0,null,null,null,110697,37819,1,40,null,null,null,null,null,"左肩部 ",8],[39,0,4,"鞋子",2,null,"Female_Medium","30274",null,null,null,null,null,null,"65712",null,null,0,null,null,null,110657,37819,3,40,null,null,null,null,null,"右肩部 ",9],[40,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"67585",null,null,0,null,null,null,110767,37819,1,40,null,null,null,null,null,"左手手套 ",10],[41,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"98596",null,null,0,null,null,null,110695,37819,1,50,null,null,null,null,null,"右手手套 ",11],[132,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"86089",null,null,0,null,null,null,123212,37819,0,0,null,null,null,null,null,"背部装饰 ",12],[133,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"111204",null,null,0,null,null,null,123153,37819,1,50,null,null,null,null,null,"左背 ",13],[134,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"66709",null,null,0,null,null,null,123194,37819,1,60,null,null,null,null,null,"右背 ",14],[135,0,4,"鞋子",2,null,"Female_Medium","30274",null,null,null,null,null,null,"109837",null,null,0,null,null,null,123240,37819,3,60,null,null,null,null,null,"左手 ",15],[136,0,4,"鞋子",1,null,"Female_Medium","30274",null,null,null,null,null,null,"64144",null,null,0,null,null,null,123200,37819,1,60,null,null,null,null,null,"右手 ",16],[137,0,4,"鞋子",2,null,"Female_Medium","30274",null,null,null,null,null,null,"64209",null,null,0,null,null,null,123197,37819,1,80,null,null,null,null,null,"左脚 ",17],[138,0,4,"鞋子",2,null,"Female_Medium","30274",null,null,null,null,null,null,"66365",null,null,0,null,null,null,123162,37819,1,80,null,null,null,null,null,"右脚 ",18],[139,0,4,"鞋子",3,null,"Female_Medium","30274",null,null,null,null,null,null,"111207",null,null,0,null,null,null,123170,37819,1,100,null,null,null,null,null,"臀部 ",19],[140,0,4,"鞋子",3,null,"Female_Medium","30274",null,null,null,null,null,null,"119225",null,null,0,null,null,null,123238,37819,3,100,null,null,null,null,null,"头顶光圈 ",20],[141,0,4,"鞋子",3,null,"Female_Medium","30274",null,null,null,null,null,null,"63540",null,null,0,null,null,null,123226,37819,1,100,null,null,null,null,null,"头顶标题 ",21],[42,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"32608",null,16,[3,0,11],[1.2,1.2,1.2],[-74,-30,-120],110714,37819,0,0],[43,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"32568",null,16,[0,0,0],[1.2,1.2,1.2],[-30,0,200],110699,37819,1,20],[44,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"31939",null,16,[0,0,0],[0.8,0.8,0.8],[-50,15,240],110698,37819,1,20],[45,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"27066",null,16,[8,0,0],[0.8,0.8,0.8],[-74,-30,-120],110703,37819,2,0],[46,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"31618",null,16,[2,-1,0],[1.2,1.2,1.2],[-74,-30,-120],110700,37819,0,0],[47,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"32626",null,16,[0,0,0],[1.5,1.5,1.5],[-74,-30,-120],110701,37819,1,30],[48,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"23559",null,16,[0,0,0],[0.6,0.6,0.6],[60,0,0],110704,37819,2,0],[49,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"32618",null,16,[0,0,0],[0.8,0.8,0.8],[-74,-30,-120],110702,37819,1,30],[50,7,5,"手持物",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"84071",null,16,[0,0,0],[0.4,0.4,0.4],[0,0,-90],110713,37819,3,30],[51,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"23414",null,16,[50,-15,0],[0.6,0.6,0.6],[-74,-30,-120],110738,37819,1,40],[142,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"116498",null,16,[0,0,0],[3,3,3],[0,0,-160],123140,37819,1,40],[143,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"121334",null,16,[0,0,0],[2,2,2],[-74,-30,-130],123145,37819,1,60],[144,7,5,"手持物",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"31944",null,16,[0,0,0],[1,1,1],[-74,-30,-130],123139,37819,3,60],[145,7,5,"手持物",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"84147",null,16,[0,0,0],[0.8,0.8,0.8],[-74,-30,-200],123161,37819,1,60],[146,7,5,"手持物",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"92715",null,16,[0,0,0],[3,3,3],[-74,-30,-150],123242,37819,1,80],[147,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"80345",null,16,[0,0,0],[1,1,1],[-74,-30,-150],123146,37819,3,80],[148,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"32606",null,16,[0,0,0],[0.8,0.8,0.8],[-74,-30,-200],123160,37819,1,80],[149,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"29008",null,16,[0,0,0],[1.2,1.2,1.2],[-74,-30,-150],123203,37819,1,100],[150,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"121320",null,16,[0,0,0],[2,2,2],[-74,-30,-130],123237,37819,1,100],[151,7,5,"手持物",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"23512",null,16,[0,0,0],[1,1,1],[-74,-30,-180],123224,37819,3,100],[52,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42823",null,12,[0,0,10],[0.8,0.8,0.8],[0,0,90],110634,37819,1,60],[53,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42831",null,12,[0,0,10],[0.8,0.8,0.8],[0,0,90],110633,37819,2,0],[54,8,6,"背部装饰",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42811",null,12,[0,0,-10],[0.8,0.8,0.8],[0,0,90],110637,37819,3,60],[55,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42827",null,12,[0,0,30],[0.8,0.8,0.8],[0,0,90],110635,37819,0,0],[56,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42822",null,12,[0,0,10],[0.8,0.8,0.8],[0,0,90],110636,37819,2,0],[57,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42815",null,12,[0,0,30],[0.8,0.8,0.8],[0,0,90],110638,37819,1,80],[58,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42824",null,12,[0,0,30],[0.8,0.8,0.8],[0,0,90],110622,37819,0,0],[59,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42825",null,12,[0,0,10],[0.8,0.8,0.8],[0,0,90],110619,37819,2,0],[60,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42814",null,12,[0,0,30],[0.8,0.8,0.8],[0,0,90],110639,37819,1,80],[61,8,6,"背部装饰",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42826",null,12,[0,0,30],[0.8,0.8,0.8],[0,0,90],110679,37819,3,100],[152,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42807",null,12,[0,0,-10],[0.8,0.8,0.8],[0,0,90],123187,37819,1,100],[153,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42818",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123151,37819,1,120],[154,8,6,"背部装饰",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42806",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123223,37819,1,120],[155,8,6,"背部装饰",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42830",null,12,[0,0,-10],[0.8,0.8,0.8],[0,0,90],123158,37819,3,120],[156,8,6,"背部装饰",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42819",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123244,37819,1,140],[157,8,6,"背部装饰",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42821",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123141,37819,1,140],[158,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42816",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123186,37819,1,180],[159,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42812",null,12,[0,0,-10],[0.8,0.8,0.8],[0,0,90],123137,37819,1,180],[160,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42803",null,12,[0,0,0],[0.8,0.8,0.8],[0,0,90],123225,37819,2,0],[161,8,6,"背部装饰",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"42832",null,12,[0,0,10],[0.8,0.8,0.8],[0,0,90],123157,37819,3,200],[62,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"27393",null,19,[0,0,0],[1,1,1],[0,60,0],110691,37819,0,0],[63,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"4399",null,19,[-10,0,-7],[1,1,1],[0,0,0],110723,37819,1,20],[64,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"30497",null,19,[-10,0,-7],[1,1,1],[0,0,0],110755,37819,0,0],[65,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88796",null,19,[-10,0,-7],[1,1,1],[0,0,0],110719,37819,2,0],[66,9,7,"拖尾",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88797",null,19,[-10,0,-7],[1,1,1],[0,0,0],110686,37819,3,20],[67,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"81694",null,19,[-10,0,-7],[1,1,1],[0,0,0],110718,37819,1,30],[68,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88021",null,19,[-10,0,-7],[1,1,1],[0,0,0],110751,37819,1,30],[69,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"27392",null,19,[-10,0,-7],[1,1,1],[0,0,0],110715,37819,2,0],[70,9,7,"拖尾",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88441",null,19,[-10,0,-7],[1,1,1],[0,0,0],110682,37819,3,40],[71,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"197977",null,19,[-10,0,-7],[1,1,1],[0,60,0],110761,37819,1,40],[162,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88799",null,19,[0,0,-5],[0.5,1,0.5],[20,0,-90],123245,37819,1,40],[163,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88813",null,19,[-10,0,0],[1,1,1],[0,0,0],123182,37819,1,60],[164,9,7,"拖尾",1,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88020",null,19,[-10,0,0],[1,1,1],[0,0,0],123138,37819,1,60],[165,9,7,"拖尾",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"13413",null,19,[-10,0,0],[1,1,1],[0,60,0],123164,37819,3,60],[166,9,7,"拖尾",2,null,"Female_Medium","30274",null,null,null,null,null,null,null,"117244",null,19,[0,0,0],[1,1.5,1],[-90,0,-90],123165,37819,1,80],[167,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88824",null,19,[-10,0,0],[1,1,1],[0,0,0],123156,37819,1,80],[168,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88446",null,19,[-10,0,-7],[1,1,1],[0,0,0],123181,37819,1,100],[169,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"197181",null,19,[-10,0,-7],[1,1.5,1],[0,0,0],123204,37819,1,100],[170,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"198557",null,19,[0,0,20],[0.8,3,0.8],[20,0,-90],123163,37819,1,120],[171,9,7,"拖尾",3,null,"Female_Medium","30274",null,null,null,null,null,null,null,"88822",null,19,[-10,0,0],[1,1,1],[0,0,0],123205,37819,3,120],[72,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"60081",null,null,null,0,null,null,null,110667,37819,0,0],[73,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"62547",null,null,null,0,null,null,null,110661,37819,1,20],[74,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"63308",null,null,null,0,null,null,null,110730,37819,1,20],[75,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"64720",null,null,null,0,null,null,null,110732,37819,0,0],[76,0,8,"手套",3,null,"Female_Medium","30274",null,null,null,null,null,"67591",null,null,null,0,null,null,null,110666,37819,2,0],[77,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"66299",null,null,null,0,null,null,null,110665,37819,1,30],[78,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"67544",null,null,null,0,null,null,null,110737,37819,1,30],[79,0,8,"手套",3,null,"Female_Medium","30274",null,null,null,null,null,"63875",null,null,null,0,null,null,null,110739,37819,2,0],[80,0,8,"手套",2,null,"Female_Medium","30274",null,null,null,null,null,"60991",null,null,null,0,null,null,null,110669,37819,3,20],[81,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"64778",null,null,null,0,null,null,null,110629,37819,1,40],[172,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"6D1A2FD5429F585E5B174DBB7839585E",null,null,null,0,null,null,null,123155,37819,1,40],[173,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"64162D5044E0F1BC1D77D18C04851937",null,null,null,0,null,null,null,123241,37819,1,60],[174,0,8,"手套",1,null,"Female_Medium","30274",null,null,null,null,null,"457188B74C5DF8451B8335903B76D47F",null,null,null,0,null,null,null,123243,37819,1,60],[175,0,8,"手套",2,null,"Female_Medium","30274",null,null,null,null,null,"15F58F1E49FE77C7D0102CA39497F89A",null,null,null,0,null,null,null,123150,37819,3,60],[176,0,8,"手套",2,null,"Female_Medium","30274",null,null,null,null,null,"D451D70B498F3CCA11A46787BDD073C7",null,null,null,0,null,null,null,123149,37819,1,80],[177,0,8,"手套",2,null,"Female_Medium","30274",null,null,null,null,null,"26FFE16F41D995362B420DBBD0E155F8",null,null,null,0,null,null,null,123148,37819,1,80],[178,0,8,"手套",3,null,"Female_Medium","30274",null,null,null,null,null,"7A4E61B64DA3157A71539E984F45DCED",null,null,null,0,null,null,null,123147,37819,3,80],[179,0,8,"手套",2,null,"Female_Medium","30274",null,null,null,null,null,"973F30104054D881BB9199B5EA188FAA",null,null,null,0,null,null,null,123190,37819,1,100],[180,0,8,"手套",3,null,"Female_Medium","30274",null,null,null,null,null,"119226",null,null,null,0,null,null,null,123159,37819,3,100],[181,0,8,"手套",3,null,"Female_Medium","30274",null,null,null,null,null,"F99360564163FDA03E38A09BF848890E",null,null,null,0,null,null,null,123202,37819,1,100],[82,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"ABA52DE9423AA72A891364B9CD09ECC8",null,null,null,null,0,null,null,null,110630,37819,1,60],[83,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"F70F88124D982CF09E0C70BC7CAA797A",null,null,null,null,0,null,null,null,110631,37819,1,60],[84,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"5EA113A54E27CE6DC06605A66E748BD6",null,null,null,null,0,null,null,null,110644,37819,0,0],[85,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"4A6DA6914006A7DAF26BEFB0E3F27EC8",null,null,null,null,0,null,null,null,110688,37819,3,80],[86,0,9,"妆容",3,null,"Female_Medium","30274",null,null,null,null,"11AFB6A249317AA14E8806AAD6E8877C",null,null,null,null,0,null,null,null,110647,37819,2,0],[87,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"6780BA594D91BB6527DAF798F76EFBEC",null,null,null,null,0,null,null,null,110758,37819,1,80],[88,0,9,"妆容",3,null,"Female_Medium","30274",null,null,null,null,"DB56414A43731B0F946F2A89ECD4CA82",null,null,null,null,0,null,null,null,110646,37819,2,0],[89,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"C79A67E84EE1FC05C62B5AB2270EFEC9",null,null,null,null,0,null,null,null,110689,37819,1,80],[90,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"F268991C435E4806846C3486382FCF90",null,null,null,null,0,null,null,null,110645,37819,1,100],[91,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"AAB6DDA1425E1D68B147F7929033D09E",null,null,null,null,0,null,null,null,110722,37819,3,120],[182,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"48FADE9F46F2AF7D7ABA0C8F87365F8A",null,null,null,null,0,null,null,null,123231,37819,0,0],[183,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"FC0A977343A3964DBDCD7B81FD1BEB82",null,null,null,null,0,null,null,null,123198,37819,1,120],[184,0,9,"妆容",1,null,"Female_Medium","30274",null,null,null,null,"D5953E1246ED8243E78AF9BF47C702C4",null,null,null,null,0,null,null,null,123188,37819,1,120],[185,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"4738D94C45A210DD8958E0A5250E26BC",null,null,null,null,0,null,null,null,123195,37819,3,140],[186,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"41F9983444C2A655EC4AEF8A847BCB50",null,null,null,null,0,null,null,null,123152,37819,1,140],[187,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"A6CFB3A143A8F24D7F59C99FBCF02E02",null,null,null,null,0,null,null,null,123199,37819,1,160],[188,0,9,"妆容",2,null,"Female_Medium","30274",null,null,null,null,"652EDFAE40E4CE18A234EB8021572332",null,null,null,null,0,null,null,null,123189,37819,1,180],[189,0,9,"妆容",3,null,"Female_Medium","30274",null,null,null,null,"59B4022543C9B7E3DD5A9888EC842BE2",null,null,null,null,0,null,null,null,123196,37819,1,180],[190,0,9,"妆容",3,null,"Female_Medium","30274",null,null,null,null,"39F0411C488B156FD90FB4ACA891DF1C",null,null,null,null,0,null,null,null,123239,37819,1,200],[191,0,9,"妆容",3,null,"Female_Medium","30274",null,null,null,null,"0DC7BADE4A5C7025A9343EB9786C226D",null,null,null,null,0,null,null,null,123185,37819,3,200],[92,0,10,"套装裙",1,null,"Female_Medium","30274","A0B0006A4068EADA200C7F91A44319A9",null,null,null,null,null,null,null,null,0,null,null,null,110620,37819,0,0],[93,0,10,"套装裙",2,null,"Female_Medium","30274","9622BEE64F93725D68E608A7E64E825A",null,null,null,null,null,null,null,null,0,null,null,null,110621,37819,3,60],[94,0,10,"套装裙",1,null,"Female_Medium","30274","7974DAE84B236A3F2D5027B050FC06CD",null,null,null,null,null,null,null,null,0,null,null,null,110628,37819,1,60],[95,0,10,"套装裙",3,null,"Female_Medium","30274","F6B906DC4D98E8A333F93C92CD357AD3",null,null,null,null,null,null,null,null,0,null,null,null,110625,37819,2,0],[96,0,10,"套装裙",1,null,"Female_Medium","30274","24429AB54F87D4796B3D2B993E04B990",null,null,null,null,null,null,null,null,0,null,null,null,110623,37819,1,80],[97,0,10,"套装裙",1,null,"Female_Medium","30274","84293E0B4F15059D7F2FF7AC091B9824",null,null,null,null,null,null,null,null,0,null,null,null,110624,37819,1,80],[98,0,10,"套装裙",3,null,"Female_Medium","30274","8A4D863D4B4D0FC42846E0A7876CE1C9",null,null,null,null,null,null,null,null,0,null,null,null,110627,37819,2,0],[99,0,10,"套装裙",2,null,"Female_Medium","30274","CB8DD21F4A045C915A20F0B7EFFA13AB",null,null,null,null,null,null,null,null,0,null,null,null,110649,37819,3,100],[100,0,10,"套装裙",3,null,"Female_Medium","30274","45BDB8C541ABC7CE58CC3EA76FBB3930",null,null,null,null,null,null,null,null,0,null,null,null,110759,37819,2,0],[101,0,10,"套装裙",1,null,"Female_Medium","30274","84A4B6FF4BAE47A87937D980DCEF9E26",null,null,null,null,null,null,null,null,0,null,null,null,110736,37819,1,100],[192,0,10,"套装裙",1,null,"Female_Medium","30274","63291",null,null,null,null,null,null,null,null,0,null,null,null,123227,37819,0,0],[193,0,10,"套装裙",1,null,"Female_Medium","30274","5B4EDDB941DF0DEA82294FB48CC3757F",null,null,null,null,null,null,null,null,0,null,null,null,123144,37819,1,120],[194,0,10,"套装裙",1,null,"Female_Medium","30274","63538",null,null,null,null,null,null,null,null,0,null,null,null,123183,37819,1,140],[195,0,10,"套装裙",2,null,"Female_Medium","30274","6C5702D24E6944159F7B6280F54DBF4B",null,null,null,null,null,null,null,null,0,null,null,null,123142,37819,3,160],[196,0,10,"套装裙",2,null,"Female_Medium","30274","63290",null,null,null,null,null,null,null,null,0,null,null,null,123229,37819,1,160],[197,0,10,"套装裙",2,null,"Female_Medium","30274","63871",null,null,null,null,null,null,null,null,0,null,null,null,123222,37819,3,200],[198,0,10,"套装裙",3,null,"Female_Medium","30274","63954",null,null,null,null,null,null,null,null,0,null,null,null,123184,37819,1,180],[199,0,10,"套装裙",3,null,"Female_Medium","30274","60077",null,null,null,null,null,null,null,null,0,null,null,null,54258,37819,1,200],[200,0,10,"套装裙",3,null,"Female_Medium","30274","30EAF9C742297E6C939D5497545E0410",null,null,null,null,null,null,null,null,0,null,null,null,123154,37819,1,200],[201,0,10,"套装裙",3,null,"Female_Medium","30274","7AAAB09D47CF80A3F4FCF083A206A242",null,null,null,null,null,null,null,null,0,null,null,null,123143,37819,3,200]];
export interface IRoleAvatarElement extends IElementBase{
 	/**id*/
	ID:number
	/**主分类(0=外观 ，>=7挂件类)*/
	mainType:number
	/**分类(显示用标签)*/
	type:number
	/**名字*/
	name:string
	/**品质*/
	qulaity:number
	/**简介*/
	desc:string
	/**主mesh*/
	chaMesh:string
	/**姿态*/
	stance:string
	/**上半身*/
	bodyupper:string
	/**下半身*/
	bodylower:string
	/**前发*/
	hairfront:string
	/**后发*/
	hairlate:string
	/**脸部*/
	head:string
	/**手*/
	gloves:string
	/**脚*/
	shoe:string
	/**挂件*/
	effectGuid:string
	/**材质*/
	matGuid:string
	/**挂点*/
	socket:number
	/**相对位置*/
	posOffset:Array<number>
	/**相对缩放*/
	scale:Array<number>
	/**相对旋转*/
	rotate:Array<number>
	/**装备图标*/
	icon:number
	/**价格图标*/
	priceIcon:number
	/**价格类型*/
	priceType:number
	/**价格*/
	price:number
 } 
export class RoleAvatarConfig extends ConfigBase<IRoleAvatarElement>{
	constructor(){
		super(EXCELDATA);
	}

}