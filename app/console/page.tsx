import Link from "next/link";
import {AuthorityGraph} from "../../components/AuthorityGraph";
import {activity,agent,principal} from "../../lib/demo-data";
import {walletApi} from "../../lib/openidentity/wallet-api";
export default async function Overview(){
 const liveIdentity=await walletApi.identity(),liveAgents=await walletApi.agents(),liveGrants=await walletApi.grants();
 const p=liveIdentity?{...principal,identity:liveIdentity.identity,sequence:liveIdentity.sequence}:principal;
 const a=liveAgents?.[0]?{...agent,name:liveAgents[0].name,identity:liveAgents[0].identityHex}:agent;
 const grant=liveGrants?.find(g=>g.agentName===a.name)??liveGrants?.[0];
 return <><div className={"live-source "+(liveIdentity?"connected":"reference")}><i/>{liveIdentity?"LIVE WALLET CONNECTED":"REFERENCE DATA · START WALLET API FOR LIVE STATE"}</div>
 <div className="page-heading"><div><span className="overline">OVERVIEW</span><h1>Authority at a glance.</h1><p>Understand who can act, for whom, and why.</p></div><Link className="app-button primary" href="/console/authority">View authority</Link></div>
 <div className="stat-row"><div><span>Human identities</span><strong>1</strong><small>Sequence {p.sequence}</small></div><div><span>AI agents</span><strong>{liveAgents?.length??1}</strong><small>{liveAgents?"live wallet":"reference preview"}</small></div><div><span>Authority records</span><strong>{liveGrants?.length??1}</strong><small>{grant?.capability??"records.read"}</small></div><div><span>Decisions</span><strong>4</strong><small>2 allowed · 2 denied</small></div></div>
 <div className="dashboard-grid"><section className="app-card authority-card-large"><div className="card-head"><div><span>Current authority</span><small>{liveIdentity?"Live wallet state":"Verified reference state"}</small></div><b className="badge verified">VERIFIED</b></div><AuthorityGraph/><div className="detail-pair"><div><span>Principal</span><strong>{p.name}</strong><small>{p.identity.slice(0,18)}…</small></div><div><span>Actor</span><strong>{a.name}</strong><small>{a.identity.slice(0,18)}…</small></div></div></section>
 <section className="app-card"><div className="card-head"><div><span>Recent activity</span><small>Authority decisions</small></div><Link href="/console/activity">View all</Link></div><div className="event-list">{activity.slice(0,5).map(([time,event,result])=><div className="event" key={time+event}><time>{time}</time><div><strong>{event}</strong><small>{result}</small></div><i className={result==="ALLOWED"?"allow":result==="DENIED"?"deny":""}/></div>)}</div></section></div>
 <section className="app-card callout-card"><div><span className="overline">REFERENCE FLOW</span><h2>Human authority → agent → OAuth → existing API.</h2><p>The Console can now read wallet state directly; runtime decision telemetry is the next live source.</p></div><Link className="app-button" href="/#demo">Run visual demo ↗</Link></section></>;
}