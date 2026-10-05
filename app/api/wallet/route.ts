import {NextRequest,NextResponse} from "next/server";
const base=process.env.OPENIDENTITY_WALLET_API_URL??"http://127.0.0.1:9300";
function headers(){const token=process.env.OPENIDENTITY_WALLET_API_TOKEN;if(!token)throw new Error("Wallet API token not configured");return {"Authorization":"Bearer "+token,"Content-Type":"application/json"};}
async function forward(path:string,body?:unknown){try{const r=await fetch(base+path,{method:"POST",headers:headers(),body:body===undefined?undefined:JSON.stringify(body),cache:"no-store"});const text=await r.text();let data:unknown={};try{data=text?JSON.parse(text):{};}catch{data={message:text};}return NextResponse.json(data as object,{status:r.status});}catch(e){return NextResponse.json({error:"wallet_api_unreachable",message:e instanceof Error?e.message:"Wallet API unreachable"},{status:502});}}
export async function POST(req:NextRequest){const body=await req.json();const action=body.action;
 if(action==="unlock")return forward("/v1/unlock",{password:body.password});
 if(action==="lock")return forward("/v1/lock");
 if(action==="createAgent")return forward("/v1/agents",{name:body.name});
 if(action==="delegate")return forward("/v1/authority",{agentName:body.agentName,capability:body.capability,lifetimeSeconds:body.lifetimeSeconds});
 if(action==="resetDelegations")return forward("/v1/delegations/reset",{});
 return NextResponse.json({error:"unsupported_action"},{status:400});
}