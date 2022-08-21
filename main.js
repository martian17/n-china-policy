let bbb = `Currently, the policy of the United States on the Taiwan question is that the US recognizes that polities on both sides of the Taiwan Strait hold that there is only one China and that Taiwan is part of China. In the current tense international climate, it may be useful to considers alternatives to that policy.`

let policies = `Two Chinas Policy: The United States recognizes the independence of Taiwan as a sovereign state, separate from the People's Republic of China.
Three Chinas Policy: The US recognizes Taiwan, Hong Kong, and the mainland as independent states.
Four Chinas Policy: The US recognizes Taiwan, Hong Kong, Macau, and the mainland as independent states.
One China Policy (Retro 1978): The US switches its diplomatic recognition back from the PRC to the ROC.
One China Policy (Retro 1911): The US recognizes the Qing Dynasty as the legitimate government of China and finds some schmuck to play Emperor-in-Exile.
Many Chinas Policy: The US recognizes the sovereign independence of every Chinese province.
Too Many Chinas Policy: Hong Kong makes a perfectly fine citystate, so why not let everyone do that? The US recognizes every Chinese municipality as its own independent state.
1436506450 Chinas Policy: The US recognizes the sovereign independence of every Chinese person.
2^1436506450 Chinas Policy: The US recognizes the sovereign independence of every subset of of the set of all Chinese persons.
2^1436506450-1 Chinas Policy: Same as above, but not including the empty set, beeause that doesn't even make sense because it's already claimed by Germany.
Infinite Chinas Policy (Countable): The US recognizes that (1) The PRC is a China and (2) for every China c, the successor S(c) is also a China, and (3) for every China c, c != S(C).
Infinite Chinas Policy (Uncountable): The US recognizes that the set C of all Chinas is an ordered field, and that every non-empty subset of C with an upper bound in C has a least upper bound in C.
No Chinas Policy: The United States embraces mereological nihilism and recognizes only atoms and the void.`
.split("\n").map(l=>[l.split(":")[0],l.split(":").slice(1).join(":")]);

console.log(policies);

let body = new ELEM(document.body);

body.add("h1",0,"Suggested Alternatives to the One China Policy");

body.add("p",0,bbb);

//first construct the current list of policies
for(let [name,content] of policies){
    let b = body.add("div",0,0,"margin:20px 0px;");
    b.add("b",0,name+": ");
    b.add("span",0,content);
}

//finally, we generate an infinite scroll section where more and more policies will be displayed

class China{
    constructor(names){
        this.names = names;
    }
    getNthSubset(n){
        let upper = Math.floor(n/4294967296);
        let lower = n%4294967296;
        //getting bits
        let bits = [];
        for(let i = 0; i < 32; i++){
            bits.push((lower>>>i)&1);
        }
        for(let i = 0; i < 32; i++){
            bits.push((upper>>>i)&1);
        }
        //console.log(bits);
        let names = this.names;
        let ret = [];
        for(let i = 0; i < names.length; i++){
            if(bits[i] === 1)ret.push(names[i]);
        }
        return ret;
    }
    getNthContent(n){
        let subset = this.getNthSubset(n);
        let content = "The US recognizes ";
        if(subset.length > 3){
            let last = subset.pop();
            content += subset.join(", ");
            content += " and "+last;
        }else{
            content += subset.join(" and ");
        }
        content += ` as independent state${subset.length == 1 ? "" : "s"}.`;
        let name = `${subset.length} china policy (subset no. ${i})`
        return [name,content];
    }
}

let china = new China(["Anhui Province","Beijing Municipality","Chongqing Municipality","Fujian Province","Guangdong Province","Gansu Province","Guangxi Zhuang Autonomous Region","Guizhou Province","Henan Province","Hubei Province","Hebei Province","Hainan Province","Hong Kong Special Administrative Region","Heilongjiang Province","Hunan Province","Jilin Province","Jiangsu Province","Jiangxi Province","Liaoning Province","Macau Special Administrative Region","Inner Mongolia Autonomous Region","Ningxia Hui Autonomous Region","Qinghai Province","Sichuan Province","Shandong Province","Shanghai Municipality","Shaanxi Province","Shanxi Province","Tianjin Municipality","Taiwan Province","Xinjiang Uyghur Autonomous Region","Tibet Autonomous Region","Yunnan Province","Zhejiang Province"]);


let container = body.add("div",0);

//display first 10

let i = 1;

for(; i <= 100; i++){
    let [name,content] = china.getNthContent(i);
    
    let b = body.add("div",0,0,"margin:20px 0px;");
    b.add("b",0,name+": ");
    b.add("span",0,content);
}

//setup infinite scroll event
//processing lock
let processing = false;
setInterval(async ()=>{
    if(processing || window.scrollY+1000 < document.body.scrollHeight)return;
    processing = true;
    let limit = i+10;
    for(; i < limit; i++){
        let [name,content] = china.getNthContent(i);
        
        let b = body.add("div",0,0,"margin:20px 0px;");
        b.add("b",0,name+": ");
        b.add("span",0,content);
    }
    processing = false;
},100);


















