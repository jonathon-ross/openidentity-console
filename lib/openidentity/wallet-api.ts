export type LiveIdentity={identity:string;registryObjectId:string;sequence:number;stateHash:string;status:string};
export type LiveAgent={name:string;identityHex:string;publicKeyHex:string;keyReference:string};
export type LiveGrant={grantIdHex:string;agentName:string;rootStateHashHex:string;delegationGeneration:number;registeredAt:number;expiresAt:number;capability:string;status:"ACTIVE"|"EXPIRED"|"STALE_GENERATION"|"INVALID"};
const base=process.env.OPENIDENTITY_WALLET_API_URL??"http://127.0.0.1:9300";
const token=process.env.OPENIDENTITY_WALLET_API_TOKEN;
async function get<T>(path:string):Promise<T|null>{if(!token)return null;try{const r=await fetch(base+path,{headers:{Authorization:"Bearer "+token},cache:"no-store"});if(!r.ok)return null;return await r.json() as T;}catch{return null;}}
export type WalletReady={status:string;locked:boolean};
export type LiveActivity={timestamp:string;type:string;correlationId?:string;verifier?:Record<string,unknown>;transport?:Record<string,unknown>;details?:Record<string,unknown>};
export const walletApi={ready:()=>get<WalletReady>("/ready"),identity:()=>get<LiveIdentity>("/v1/identity"),agents:()=>get<LiveAgent[]>("/v1/agents"),grants:()=>get<LiveGrant[]>("/v1/authority"),activity:()=>get<LiveActivity[]>("/v1/activity")};