export function AuthorityGraph({revoked=false}:{revoked?:boolean}) {
  return <div className="authority-graph">
    <div className="graph-node primary"><span className="node-kicker">Principal</span><strong>Jonathan</strong><small>Human identity</small></div>
    <div className={revoked ? "graph-edge revoked" : "graph-edge"}>
      <span className="edge-line" />
      <span className="edge-label">{revoked ? "revoked" : "records.read"}</span>
    </div>
    <div className="graph-node"><span className="node-kicker">Actor</span><strong>Research Agent</strong><small>AI agent</small></div>
  </div>;
}