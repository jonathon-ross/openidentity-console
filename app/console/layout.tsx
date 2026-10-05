import Link from "next/link";
import "./console.css";
const nav=[["/console","Overview"],["/console/identities","Identities"],["/console/agents","Agents"],["/console/authority","Authority"],["/console/activity","Activity"],["/console/developer","Developer"]];
export default function ConsoleLayout({children}:{children:React.ReactNode}){return <div className="app-shell">
 <aside className="app-sidebar"><Link href="/" className="app-brand"><span>OI</span><div><strong>OpenIdentity</strong><small>Developer Preview</small></div></Link>
 <nav>{nav.map(([href,label])=><Link key={href} href={href}>{label}<span>→</span></Link>)}</nav>
 <div className="sidebar-foot"><div className="secure-mark"><i/>Local preview</div><small>No private-key provider connected</small></div></aside>
 <div className="app-workspace"><header className="app-header"><div><span className="workspace-label">AUTHORITY CONTROL PLANE</span><strong>Developer Preview</strong></div><div className="header-actions"><Link href="/#demo">Reference demo</Link><div className="avatar">JR</div></div></header><main className="app-content">{children}</main></div>
 </div>}