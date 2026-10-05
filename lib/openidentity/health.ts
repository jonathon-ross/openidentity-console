export type ServiceHealth={name:string,status:"ready"|"unreachable"|"unconfigured";detail:string};
async function probe(name:string,url:string|undefined,token?:string):Promise<ServiceHealth>{if(!url)return{name,status:"unconfigured",detail:"Not configured"};try{const headers:Record<string,string>={};if(token)headers.Authorization="Bearer "+token;const r=await fetch(url,{headers,cache:"no-store",signal:AbortSignal.timeout(1500)});return{name,status:r.ok?"ready":"unreachable",detail:r.ok?"Ready":"HTTP "+r.status};}catch{return{name,status:"unreachable",detail:"Not reachable"};}}
export async function serviceHealth():Promise<ServiceHealth[]>{return Promise.all([
 probe("Wallet API",(process.env.OPENIDENTITY_WALLET_API_URL??"http://127.0.0.1:9300")+"/ready",process.env.OPENIDENTITY_WALLET_API_TOKEN),
 probe("Verifier",process.env.OPENIDENTITY_VERIFIER_URL?process.env.OPENIDENTITY_VERIFIER_URL+"/ready":undefined,process.env.OPENIDENTITY_VERIFIER_TOKEN),
 probe("Sui Transport",process.env.OPENIDENTITY_SUI_TRANSPORT_URL?process.env.OPENIDENTITY_SUI_TRANSPORT_URL+"/ready":undefined,process.env.OPENIDENTITY_SUI_TRANSPORT_TOKEN),
 probe("Authorization Server","http://127.0.0.1:9000/.well-known/openid-configuration")
]);}