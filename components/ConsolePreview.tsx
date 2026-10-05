import { activity,agent,principal } from "../lib/demo-data";
import { AuthorityGraph } from "./AuthorityGraph";

export function ConsolePreview() {
  return <section className="console-preview">
    <aside className="sidebar">
      <div className="brand-mark">OI</div>
      <div className="side-item active">Overview</div>
      <div className="side-item">Identities</div>
      <div className="side-item">Agents</div>
      <div className="side-item">Authority</div>
      <div className="side-item">Activity</div>
      <div className="side-item">Developer</div>
    </aside>
    <div className="console-main">
      <div className="console-head"><div><span className="eyebrow">OPENIDENTITY CONSOLE</span><h2>Authority Overview</h2></div><button className="button primary">Run Demo</button></div>
      <div className="metric-grid">
        <div className="metric"><span>Human identities</span><strong>1</strong></div>
        <div className="metric"><span>AI agents</span><strong>1</strong></div>
        <div className="metric"><span>Active delegations</span><strong>1</strong></div>
        <div className="metric"><span>Revoked delegations</span><strong>1</strong></div>
      </div>
      <div className="console-grid">
        <div className="card">
          <div className="card-title"><span>Current Authority</span><span className="verified">Verified</span></div>
          <AuthorityGraph />
          <div className="identity-strip"><div><span>Principal</span><strong>{principal.name}</strong><small>{principal.identity.slice(0,12)}…</small></div><div><span>Actor</span><strong>{agent.name}</strong><small>{agent.identity.slice(0,12)}…</small></div></div>
        </div>
        <div className="card">
          <div className="card-title"><span>Recent Activity</span><span className="muted">reference flow</span></div>
          <div className="activity-list">{activity.map(([time,event,result])=><div className="activity-row" key={time+event}><span>{time}</span><div><strong>{event}</strong><small>{result}</small></div></div>)}</div>
        </div>
      </div>
    </div>
  </section>;
}