"use client";
import { useMemo, useState } from "react";
import { AuthorityGraph } from "./AuthorityGraph";

type Stage = "none"|"delegated"|"revoked";

export function DemoPanel() {
  const [stage,setStage]=useState<Stage>("none");
  const result=useMemo(()=>{
    if(stage==="none") return {read:"DENIED",del:"DENIED",token:"No delegated authority"};
    if(stage==="delegated") return {read:"200 OK",del:"403 FORBIDDEN",token:"records.read · DPoP-bound"};
    return {read:"DENIED",del:"DENIED",token:"Fresh authority denied"};
  },[stage]);

  return <section className="demo-shell">
    <div className="demo-toolbar">
      <div><span className="eyebrow">LIVE CONCEPT DEMO</span><h2>Authority, not another login screen.</h2></div>
      <div className="demo-actions">
        <button onClick={()=>setStage("delegated")} className="button primary">Delegate records.read</button>
        <button onClick={()=>setStage("revoked")} className="button danger">Revoke authority</button>
        <button onClick={()=>setStage("none")} className="button ghost">Reset</button>
      </div>
    </div>
    <div className="demo-grid">
      <div className="panel">
        <div className="panel-heading"><span>OpenIdentity</span><span className="status-dot">Developer Preview</span></div>
        <AuthorityGraph revoked={stage==="revoked"} />
        <div className="authority-card">
          <div><span>Authority</span><strong>{stage==="delegated" ? "ACTIVE" : stage==="revoked" ? "REVOKED" : "NONE"}</strong></div>
          <div><span>OAuth issuance</span><strong>{result.token}</strong></div>
        </div>
      </div>
      <div className="panel records">
        <div className="panel-heading"><span>Acme Records API</span><span className="status-dot neutral">OAuth only</span></div>
        <div className="record-card">
          <span className="record-id">Customer #123</span>
          <h3>Jane Smith</h3>
          <p>Ordinary downstream API. No OpenIdentity logic lives here.</p>
          <div className="record-actions">
            <div><button className="button soft">GET /records/123</button><span className={result.read.includes("200") ? "result ok":"result denied"}>{result.read}</span></div>
            <div><button className="button soft">DELETE /records/123</button><span className="result denied">{result.del}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}