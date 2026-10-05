import Link from "next/link";
import "./console.css";import {walletApi} from "../../lib/openidentity/wallet-api";import {WalletLockControl} from "../../components/WalletControls";
const nav=[["/console","Overview"],["/console/identities","Identities"],["/console/agents","Agents"],["/console/authority","Authority"],["/console/activity","Activity"],["/console/developer","Developer"]];
export default async function ConsoleLayout({children}:{children:React.ReactNode}){const ready=await walletApi.ready();const locked=ready?.locked??true;return <div className="app-shell">
 <aside className="app-sidebar"><Link href="/" className="app-brand"><span>OI</span><div><strong>OpenIdentity</strong><small>Developer Preview</small></div></Link>
 <nav>{nav.map(([href,label])=><Link key={href} href={href}>{label}<span>→</span></Link>)}</nav>
 <div className="sidebar-foot"><div className="secure-mark"><i/>Local preview</div><small>No private-key provider connected</small></div></aside>
 <div className="app-workspace"><header className="app-header"><div><span className="workspace-label">AUTHORITY CONTROL PLANE</span><strong>Developer Preview</strong></div><div className="header-actions"><span className={"lock-state "+(locked?"locked":"unlocked")}><i/>{locked?"LOCKED":"UNLOCKED"}</span><WalletLockControl locked={locked}/><Link href="/#demo">Reference demo</Link><div className="avatar">JR</div></div></header><main className="app-content">{children}</main></div>
 </div>}