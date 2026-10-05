import { DemoPanel } from "../components/DemoPanel";
import { ConsolePreview } from "../components/ConsolePreview";

export default function Home() {
  return <main>
    <nav className="top-nav">
      <a className="logo" href="#"><span>OI</span>OpenIdentity</a>
      <div className="nav-links"><a href="#how">How it works</a><a href="#console">Console</a><a href="#developers">Developers</a></div>
      <a className="button dark" href="#demo">See the demo</a>
    </nav>

    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow">VERIFIABLE AUTHORITY FOR AUTONOMOUS SYSTEMS</span>
        <h1>Give AI agents authority without giving up control.</h1>
        <p>OpenIdentity makes delegated authority explicit, constrained, revocable, and verifiable—while working with the OAuth and identity infrastructure you already use.</p>
        <div className="hero-actions"><a className="button primary large" href="#demo">See OpenIdentity in action</a><a className="text-link" href="#how">Explore the architecture →</a></div>
      </div>
      <div className="hero-visual">
        <div className="visual-caption">WHO AUTHORIZED THIS AGENT?</div>
        <div className="hero-node human"><span>Principal</span><strong>Jonathan</strong></div>
        <div className="hero-link"><i/><b>records.read</b></div>
        <div className="hero-node agent"><span>Actor</span><strong>Research Agent</strong></div>
        <div className="hero-link subtle"><i/><b>OAuth + DPoP</b></div>
        <div className="hero-node api"><span>Resource</span><strong>Existing API</strong></div>
      </div>
    </section>

    <section className="principles">
      <div><span>01</span><h3>Know who authorized every agent.</h3><p>Tie autonomous actions back to the principal from which authority originated.</p></div>
      <div><span>02</span><h3>Delegate less than you possess.</h3><p>Give agents only the capabilities they need, without mirroring a human's full authority.</p></div>
      <div><span>03</span><h3>Revoke authority at its source.</h3><p>Invalidate delegated authority without destroying the agent's identity.</p></div>
      <div><span>04</span><h3>Prove why access was authorized.</h3><p>Preserve verifiable authority state for audit and investigation.</p></div>
    </section>

    <section id="how" className="architecture-section">
      <div className="section-copy"><span className="eyebrow">HOW IT WORKS</span><h2>Keep the IAM you already have.</h2><p>OpenIdentity sits at the authority layer. Existing identity providers authenticate principals. Existing OAuth infrastructure continues to issue and enforce access tokens.</p><div className="callout">Your downstream APIs do not need to understand OpenIdentity.</div></div>
      <div className="stack-diagram">
        <div><span>Existing IAM</span><strong>Entra · Okta · OIDC</strong></div><i/>
        <div className="accent"><span>Authority Layer</span><strong>OpenIdentity</strong></div><i/>
        <div><span>Access Layer</span><strong>OAuth · AuthZEN</strong></div><i/>
        <div><span>Resources</span><strong>Existing applications & APIs</strong></div>
      </div>
    </section>

    <section id="console" className="console-section"><div className="section-heading"><span className="eyebrow">DEVELOPER PREVIEW</span><h2>See authority as a graph, not a pile of permissions.</h2><p>The Console is designed around one question: who or what is allowed to act, for whom, and why?</p></div><ConsolePreview /></section>

    <section id="demo" className="demo-section"><DemoPanel /></section>

    <section id="developers" className="developer-section">
      <div><span className="eyebrow">FOR DEVELOPERS</span><h2>Open protocol. Existing standards.</h2><p>OpenIdentity provides the persistent authority layer underneath OAuth rather than replacing it. Protocol details remain inspectable while product surfaces speak in identities, agents, capabilities, and decisions.</p></div>
      <div className="dev-grid"><div><span>Integration</span><strong>OAuth Token Exchange</strong></div><div><span>Token binding</span><strong>DPoP</strong></div><div><span>Authority</span><strong>Human → Agent</strong></div><div><span>Verification</span><strong>Historical state</strong></div></div>
    </section>

    <footer><div className="logo"><span>OI</span>OpenIdentity</div><p>Verifiable authority for autonomous systems.</p><small>Developer Preview · Built by Paralax Systems</small></footer>
  </main>;
}