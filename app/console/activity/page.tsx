import { walletApi, type LiveActivity } from "../../../lib/openidentity/wallet-api";

type EvidenceView = {
  title: string;
  sub: string;
  result: string;
  tone: "" | "allow" | "deny";
  evidence: Array<[string, string]>;
};

function text(value: unknown): string {
  return value == null ? "—" : String(value);
}

function view(event: LiveActivity): EvidenceView {
  const details = event.details ?? {};
  const verifier = event.verifier ?? {};
  const transport = event.transport ?? {};

  if (event.type === "authority_transition") {
    return {
      title: "Identity authority transition",
      sub: "Verifier acceptance → Sui confirmation",
      result: transport.digest ? "CONFIRMED" : text(verifier.decision ?? "VERIFIED"),
      tone: "allow",
      evidence: [
        ["Correlation", event.correlationId ?? "—"],
        ["Operation", text(verifier.operationHash ?? transport.operationHash)],
        ["Verifier", text(verifier.decision)],
        ["Sui digest", text(transport.digest)],
        ["Object", text(transport.objectId)],
      ],
    };
  }

  if (event.type === "oauth_reference_test") {
    const issued = Number(details.exchangeStatus) === 200;
    return {
      title: "OAuth authority test",
      sub: `${text(details.agent)} · ${text(details.capability)}`,
      result: issued ? "ISSUED" : "DENIED",
      tone: issued ? "allow" : "deny",
      evidence: [
        ["Grant", text(details.grantId)],
        ["Token exchange", text(details.exchangeStatus)],
        ["GET records", details.getStatus == null ? "not attempted" : text(details.getStatus)],
        ["DELETE records", details.deleteStatus == null ? "not attempted" : text(details.deleteStatus)],
      ],
    };
  }

  if (event.type === "authority_issued") {
    return {
      title: "Delegated authority issued",
      sub: `${text(details.agent)} · ${text(details.capability)}`,
      result: "ISSUED",
      tone: "allow",
      evidence: [
        ["Grant", text(details.grantId)],
        ["Generation", text(details.delegationGeneration)],
        ["Expires", text(details.expiresAt)],
      ],
    };
  }

  if (event.type === "delegations_reset") {
    return {
      title: "Delegations reset",
      sub: "Root authority generation advanced",
      result: "REVOKED",
      tone: "deny",
      evidence: [
        ["Identity", text(details.identity)],
        ["Sequence", text(details.sequence)],
        ["StateHash", text(details.stateHash)],
      ],
    };
  }

  if (event.type === "agent_created") {
    return {
      title: "Agent created",
      sub: text(details.agent),
      result: "CREATED",
      tone: "",
      evidence: [["Identity", text(details.identity)]],
    };
  }

  if (event.type === "agent_deleted") {
    return {
      title: "Agent deleted",
      sub: text(details.agent),
      result: "DELETED",
      tone: "",
      evidence: [],
    };
  }

  return {
    title: event.type,
    sub: "OpenIdentity event",
    result: "EVENT",
    tone: "",
    evidence: [],
  };
}

export default async function Activity() {
  const events = await walletApi.activity();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="overline">ACTIVITY</span>
          <h1>Explain every decision.</h1>
          <p>Live evidence from wallet actions, verifier decisions, Sui transport, and OAuth enforcement.</p>
        </div>
      </div>

      {!events ? (
        <section className="app-card empty-state">
          <h2>Live evidence unavailable.</h2>
          <p>Start the Wallet API to inspect correlated activity.</p>
        </section>
      ) : events.length === 0 ? (
        <section className="app-card empty-state">
          <h2>No activity recorded yet.</h2>
          <p>Wallet and authority operations will appear here.</p>
        </section>
      ) : (
        <section className="app-card evidence-stream">
          {events.map((event, index) => {
            const item = view(event);
            return (
              <details className="evidence-event" key={(event.correlationId ?? event.timestamp) + index}>
                <summary>
                  <div className="evidence-dot">
                    <i className={item.tone} />
                    {index < events.length - 1 && <b />}
                  </div>
                  <time>{new Date(event.timestamp).toLocaleString()}</time>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.sub}</small>
                  </div>
                  <span className={"decision " + item.tone}>{item.result}</span>
                  <em>Why? +</em>
                </summary>
                <div className="evidence-detail">
                  <span className="overline">VERIFIABLE EVIDENCE</span>
                  {item.evidence.map(([key, value]) => (
                    <div key={key}>
                      <span>{key}</span>
                      <code>{value}</code>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </section>
      )}
    </>
  );
}
