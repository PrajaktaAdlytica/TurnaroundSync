import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Airplane,
  Buildings,
  Truck,
  Clock,
  Stack,
  FileText,
  ShieldCheck,
  Check,
  WarningCircle,
  List,
  X,
  Play,
  Pause,
  CaretDown,
  ArrowLeft,
  CheckCircle,
  LinkSimple,
  MapPin,
  Rows,
  UserCircle,
  MagnifyingGlass,
  Download,
  ArrowCounterClockwise,
  Envelope,
  LockKey,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { products, people, events, faqs } from "./data";
import resourceContent from "./resources.json";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./styles.css";
gsap.registerPlugin(ScrollTrigger);
const icons = {
  timeline: Rows,
  review: WarningCircle,
  coverage: Truck,
  evidence: FileText,
  report: Stack,
};
function Link({ to, children, className = "", ...props }) {
  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );
}
function Button({ to, children, secondary = false, ...p }) {
  return to ? (
    <Link to={to} className={"button " + (secondary ? "secondary" : "")} {...p}>
      {children}
      <ArrowRight size={18} />
    </Link>
  ) : (
    <button className={"button " + (secondary ? "secondary" : "")} {...p}>
      {children}
      <ArrowRight size={18} />
    </button>
  );
}
function Brand({ reversed = false }) {
  return (
    <Link to="/" className="brand" aria-label="TurnaroundSync home">
      <img src={`/brand/logo-horizontal-${reversed ? "white" : "primary"}.svg`} alt="TurnaroundSync" />
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false),
    [menu, setMenu] = useState("");
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenu("");
          setOpen(false);
        }
      }}
    >
      <div className="nav-wrap">
        <Brand />
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          <div className="nav-group">
            <button
              onClick={() => setMenu(menu === "products" ? "" : "products")}
              aria-expanded={menu === "products"}
            >
              Products
              <CaretDown size={12} />
            </button>
            {menu === "products" && (
              <div className="mega">
                {products.map((p) => (
                  <Link to={"/products/" + p.slug} key={p.slug}>
                    <strong>{p.name}</strong>
                    <span>{p.short}</span>
                    <ArrowUpRight />
                  </Link>
                ))}
                <Link to="/products">
                  Explore the suite
                  <ArrowRight />
                </Link>
              </div>
            )}
          </div>
          <Link to="/platform">Platform</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/company">Company</Link>
          <Link to="/sign-in" className="mobile-signin">
            Sign in
          </Link>
        </nav>
        <div className="nav-actions">
          <Link to="/sign-in" className="signin-link">
            Sign in
          </Link>
          <Button to="/shadow-trial">Discuss a trial</Button>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}
function Label() {
  return (
    <Eyebrow>
      Concept preview <span>·</span> Synthetic data
    </Eyebrow>
  );
}
function Boundary() {
  return (
    <div className="boundary">
      <ShieldCheck size={18} />
      <span>Advisory review. Never aircraft control.</span>
    </div>
  );
}
function Heading({ kicker, title, desc }) {
  return (
    <div className="section-heading reveal">
      <div>
        <Eyebrow>{kicker}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {desc && <p>{desc}</p>}
    </div>
  );
}
function HeroEvidence({ phase, onChoose }) {
  const phases = ["Collect the evidence", "Expose the difference", "Keep judgment human"];
  return <div className={`hero-evidence phase-${phase}`}>
    <div className="hero-observation"><span className="observation-cross">+</span><span>AV-07 / BAGGAGE HANDOFF<small>Illustrative stand · synthetic replay</small></span></div>
    <div className="evidence-console">
      <div className="console-top"><span><i /> SYNTHETIC REPLAY</span><Link to="#hero-story-end" className="skip-hero">Skip story <ArrowRight size={12}/></Link></div>
      <div className="console-title"><span>0{phase + 1}</span><h3>{phases[phase]}</h3><span className="console-date">20 OCT 2026 · UTC</span></div>
      <div className="console-tracks" aria-label="Synthetic baggage completion assertions: handler 10:16, airline 10:19, airport unknown">
        <div className="console-scale"><span>EVENT SOURCE</span><span>10:15</span><span>10:20</span></div>
        {[[Truck,'Handler','10:16','SYN-BAG-H02'],[Airplane,'Airline','10:19','SYN-BAG-A02'],[Buildings,'Airport','Unknown','SYN-APT-03']].map(([Icon,name,time,source],i) => <div className={`console-track lane-${i}`} key={name}>
          <span className="console-source"><Icon size={16}/>{name}</span><div className="console-rail"><span className="rail-fill"/><span className="rail-event"><i/><b>{time}</b></span></div><span className="console-ref">{source}</span>
        </div>)}
      </div>
      <div className="console-finding">
        <span className="finding-icon">{phase === 0 ? <Stack size={20}/> : phase === 1 ? <WarningCircle size={20}/> : <UserCircle size={22}/>}</span>
        <div><strong>{phase === 0 ? 'One event. Every source preserved.' : phase === 1 ? '3 minutes apart. Neither overwritten.' : 'N. Rao · Review pending'}</strong><p>{phase === 0 ? 'Completion is absent from the airport record.' : phase === 1 ? 'A mismatch to investigate, not an automatic correction.' : 'Fictional dispatcher · Acknowledgment required.'}</p></div>
        <Link to="/demo" aria-label="Open synthetic dispatcher review"><ArrowUpRight size={20}/></Link>
      </div>
      <div className="console-chapters">{['Sources','Discrepancy','Human review'].map((label,i) => <button key={label} onClick={() => onChoose(i)} aria-pressed={phase === i}><span>0{i+1}</span>{label}<i key={phase} /></button>)}</div>
    </div>
  </div>;
}
function HomeHero() {
  const root = useRef(null);
  const [phase, setPhase] = useState(0);
  const [scrollStory, setScrollStory] = useState(false);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1000px) and (min-height: 650px)", mobile: "(max-width: 999px), (max-height: 649px)", reduced: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      if (conditions.reduced) { setPhase(2); return; }
      const desktop = conditions.desktop;
      setScrollStory(desktop);
      const scope = gsap.utils.selector(root);
      const lines = scope(".stand-connection");
      lines.forEach(line => { const length = line.getTotalLength(); gsap.set(line, { strokeDasharray: length, strokeDashoffset: length }); });
      const tl = gsap.timeline({ scrollTrigger: {
        id: "heroStory", trigger: desktop ? root.current : scope(".hero-art")[0],
        start: desktop ? "top 80px" : "top 65%",
        end: desktop ? "+=2100" : "bottom 35%", pin: desktop,
        scrub: .8, invalidateOnRefresh: true,
        onUpdate: self => setPhase(self.progress < .32 ? 0 : self.progress < .52 ? 1 : 2),
      }});
      tl.fromTo(scope(".scene-camera"), { scale: 1, xPercent: 0, yPercent: 0 }, { scale: desktop ? 1.28 : 1.1, xPercent: desktop ? -7 : -2, yPercent: desktop ? 5 : 0, duration: 1, ease: "none" }, 0)
        .fromTo(scope(".source-beacon"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .07, duration: .16, ease: "power2.out" }, .08)
        .to(lines, { strokeDashoffset: 0, duration: .3, stagger: .08, ease: "none" }, .15)
        .fromTo(scope(".stand-target"), { opacity: 0, scale: .4, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: .18, stagger: .05 }, .38)
        .fromTo(scope(".scene-discrepancy"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .16 }, .55)
        .to(scope(".story-progress-fill"), { scaleX: 1, duration: 1, ease: "none" }, 0);
      if (desktop) {
        tl.fromTo(scope(".evidence-console"), { opacity: 0, y: 100, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: .25, ease: "power2.out" }, .5)
          .to(scope(".hero-copy"), { y: -18, duration: 1, ease: "none" }, 0);
      }
      if (desktop) {
        const straight = [
          "M80 210 L180 210 Q180 210 205 210 L410 210 Q440 210 440 210 L740 210",
          "M80 300 L180 300 Q180 300 205 300 L410 300 Q440 300 440 300 L740 300",
          "M80 390 L180 390 Q180 390 205 390 L410 390 Q440 390 440 390 L740 390"
        ];
        tl.to(scope(".hero-copy, .evidence-console, .hero-observation, .hero-bottom"), { opacity: 0, duration: .18 }, 1)
          .to(scope(".hero-plane, .scene-discrepancy, .stand-target, .source-beacon"), { opacity: 0, duration: .23 }, 1)
          .to(root.current, { backgroundColor: "#1b2521", duration: .35 }, 1)
          .to(scope(".hero-art"), { width: "100%", height: "100%", duration: .4, ease: "power2.inOut" }, 1)
          .to(scope(".scene-camera"), { scale: 1, xPercent: 0, yPercent: 0, height: "100%", duration: .4, ease: "power2.inOut" }, 1)
          .set(lines, { strokeDasharray: "none", strokeDashoffset: 0 }, 1)
          .to(lines, { stroke: "#b9c6bd", duration: .25 }, 1);
        lines.forEach((line, i) => tl.to(line, { attr: { d: straight[i] }, duration: .4, ease: "power2.inOut" }, 1));
        tl.fromTo(scope(".handoff-timeline"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .2 }, 1.32)
          .to(lines, { opacity: 0, duration: .12 }, 1.32);
      }
      return () => { setScrollStory(false); };
    }, root);
    return () => mm.revert();
  }, []);
  const choosePhase = (index) => {
    const story = ScrollTrigger.getById("heroStory");
    if (story && scrollStory) window.scrollTo({ top: story.start + (story.end - story.start) * [.2, .43, .62][index], behavior: "smooth" });
    else setPhase(index);
  };
  return (<>

    <section ref={root} className={`home-hero cinematic-hero story-phase-${phase}`} aria-label="From stand evidence to dispatcher review">
      <div className="hero-copy">
        <Label />
        <h1 className="hero-title">
          Every handoff.
          <br />
          In perspective.
        </h1>
        <h3>Three sources. One reviewable turnaround.</h3>
        <p>
          Explore a proposed workbench for reconciling airline, ground handler
          and airport events. Every discrepancy has a source. Every judgment
          stays human.
        </p>
        <div className="button-row">
          <Button to="/demo">Explore the replay</Button>
          <Button to="/shadow-trial" secondary>
            Discuss a shadow trial
          </Button>
        </div>
        <Boundary />
        <div className="hero-story-caption"><span>0{phase + 1} / 03</span><p>{["Follow the evidence to the stand.", "The same event. Three minutes apart.", "A clear question. A human decision."][phase]}</p><Link to="#hero-story-end">Skip sequence <ArrowRight size={13}/></Link></div>
      </div>
      <div className="hero-art">
        <div className="scene-camera">
        <img
          className="hero-plane"
          src="/images/apron-ivory.webp"
          alt="Illustrative unbranded aircraft on a fictional ivory stand model"
        />
        <svg className="stand-connections" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="stand-connection connection-airline" d="M180 105 L180 190 Q180 215 205 215 L410 215 Q440 215 440 245 L440 280"/>
          <path className="stand-connection connection-handler" d="M625 135 L625 205 Q625 230 600 230 L550 230 Q525 230 525 255 L525 355"/>
          <path className="stand-connection connection-airport" d="M220 365 L220 320 Q220 300 245 300 L290 300 Q315 300 315 325 L315 390"/>
          <circle className="stand-target" cx="440" cy="280" r="9"/>
          <circle className="stand-target" cx="525" cy="355" r="9"/>
          <circle className="stand-target" cx="315" cy="390" r="9"/>
        </svg>
        <div className="source-beacon beacon-airline"><Airplane size={15}/><span>AIRLINE<small>10:19 · source assertion</small></span></div>
        <div className="source-beacon beacon-handler"><Truck size={15}/><span>HANDLER<small>10:16 · source assertion</small></span></div>
        <div className="source-beacon beacon-airport"><Buildings size={15}/><span>AIRPORT<small>Completion unknown</small></span></div>
        <div className="scene-discrepancy"><span>Δ 03 MIN</span><small>Baggage completion mismatch</small></div>
        </div>
        <HeroEvidence phase={phase} onChoose={choosePhase}/>
      </div>
      <div className="handoff-timeline" aria-hidden="true">
        <Eyebrow>THE SAME EVIDENCE · A SHARED TIMELINE</Eyebrow>
        <h2>Every source keeps its place.</h2>
        <Timeline />
        <p>Keep scrolling to investigate the difference <ArrowRight size={15}/></p>
      </div>
      <div className="hero-bottom">
        <span className="story-progress"><i className="story-progress-fill"/></span>
        <span>Built around the evidence.</span>
        <span>
          SCROLL TO FOLLOW THE HANDOFF <ArrowRight size={14} />
        </span>
      </div>
    </section><div id="hero-story-end" tabIndex="-1"/></>
  );
}
const sourceRows = [
  ["Airline", Airplane, "10:19", "SYN-BAG-A02"],
  ["Ground handler", Truck, "10:16", "SYN-BAG-H02"],
  ["Airport", Buildings, "Unknown", "SYN-APT-03"],
];
function Timeline({ compact = false, reviewState = "Review pending" }) {
  return (
    <div className={"timeline " + (compact ? "compact" : "")}>
      <div className="timeline-scale">
        <span>20 OCT 2026 · UTC</span>
        {["10:10", "10:15", "10:20", "10:25"].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      {sourceRows.map(([name, Icon, time, ref], i) => (
        <div className="time-row" key={name}>
          <div className="time-name">
            <Icon size={23} />
            <div>
              {name}
              <small>{ref}</small>
            </div>
          </div>
          <div className="time-track">
            <div className={"event-marker event-" + i}>
              <span className="event-dot" />
              <strong>{time}</strong>
              <small>
                {i === 2 ? "Source incomplete" : "Baggage completion"}
              </small>
            </div>
          </div>
        </div>
      ))}
      <div className="timeline-note">
        <WarningCircle size={17} />
        <span>Catering expected 10:18. No completion assertion at 10:22.</span>
        <span className="status">{reviewState} · N. Rao</span>
      </div>
    </div>
  );
}
function Incident() {
  const [step, setStep] = useState(0);
  const ref = useRef();
  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.to(".incident-rail", {
            xPercent: -66.666,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82px",
              end: "+=1400",
              pin: true,
              scrub: 1,
              onUpdate: (s) => setStep(Math.min(2, Math.floor(s.progress * 3))),
            },
          });
        }, ref);
        return () => ctx.revert();
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <section className="incident dark" ref={ref}>
      <div className="wrap">
        <Heading
          kicker="01 / THE DISCREPANCY"
          title="One stand. Three versions of events."
          desc="A difference in the records is a question to investigate. Follow the source trail without changing the operation."
        />
        <div className="incident-controls">
          <span>
            {
              [
                "01 Sources arrive",
                "02 A mismatch appears",
                "03 Judgment stays human",
              ][step]
            }
          </span>
          <Link to="#evidence">
            Skip the sequence <ArrowRight />
          </Link>
        </div>
        <div className="incident-window">
          <div className="incident-rail">
            <article>
              <Timeline />
            </article>
            <article>
              <div className="mismatch">
                <div>
                  <Eyebrow>HANDLER ASSERTION</Eyebrow>
                  <strong>10:16</strong>
                </div>
                <div className="delta">
                  <WarningCircle />
                  <span>
                    3 min
                    <br />
                    difference
                  </span>
                </div>
                <div>
                  <Eyebrow>AIRLINE ASSERTION</Eyebrow>
                  <strong>10:19</strong>
                </div>
              </div>
              <p className="centered">
                Two timestamps. Both retained. No automatic correction.
              </p>
            </article>
            <article>
              <div className="human-scene">
                <UserCircle size={64} weight="thin" />
                <div>
                  <Eyebrow>N. RAO · FICTIONAL DISPATCHER</Eyebrow>
                  <h3>Review pending.</h3>
                  <p>
                    Examine the source, acknowledge the item, record the
                    reasoning.
                  </p>
                  <Button to="/demo">Open the review</Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
function EvidenceTable() {
  return (
    <div className="evidence-table">
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Airline</th>
            <th>Handler</th>
            <th>Airport</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Baggage complete", "10:19", "10:16", "—"],
            ["Catering complete", "—", "—", "—"],
            ["Observed at", "10:20", "10:17", "10:10"],
          ].map((r, i) => (
            <tr key={r[0]} className={i === 0 ? "disputed" : ""}>
              {r.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-foot">
        20 OCT 2026 · UTC · SYNTHETIC <span>— Unknown</span>
      </div>
    </div>
  );
}
function ReviewCard() {
  return (
    <div className="review-card">
      <span className="status">Pending review</span>
      <h4>Stand handoff timing differs across sources.</h4>
      <div className="person">
        <span>NR</span>
        <div>
          <strong>N. Rao</strong>
          <small>Fictional dispatcher</small>
        </div>
        <Link to="/demo">
          Review <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
function ReportCard() {
  return (
    <Link to="/demo/reports/AV07" className="report-card">
      <div>
        <FileText size={28} />
        <span className="tiny">READ-ONLY · ILLUSTRATIVE</span>
      </div>
      <h4>After-action evidence</h4><div className="report-preview"><div><strong>Turnaround Review</strong><small>AV-07 · 20 Oct 2026</small><span>Source discrepancy</span><span>Reviewer acknowledgment</span><span>Unresolved evidence</span></div><img src="/images/apron-ivory.webp" alt="Illustrative stand in a synthetic report" loading="lazy"/></div>
      <p>Source references, unresolved questions and the review record.</p>
      <span>
        Read the sample report <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
function Evidence() {
  return (
    <section id="evidence" className={"section rich-evidence "+(location.pathname.startsWith("/products/")?"night-evidence":location.pathname==="/"?"ivory-evidence":"atlas-evidence")}>
      <div className="wrap">
        <Heading
          kicker="02 / THE WORKBENCH"
          title={
            <>
              A complete view,
              <br />
              built for human judgment.
            </>
          }
          desc="A proposed workspace for comparing what the records say. Sources stay attached, uncertainty stays visible, and a person owns the next step."
        />
        <div className="evidence-grid">
          <article className="panel reveal">
            <h3>Evidence comparison</h3>
            <p>The same event, seen across three sources.</p>
            <EvidenceTable />
          </article>
          <article className="panel reveal">
            <h3>Source provenance</h3>
            <p>Follow every assertion back to its origin.</p>
            <div className="provenance-network">
              <div className="network-sources">{sourceRows.map(([n,I,t,r])=><div key={n}><I size={29} weight="fill"/><span>{n}<small>{r}</small></span></div>)}</div>
              <svg className="network-lines" viewBox="0 0 180 240" fill="none" aria-hidden="true"><path d="M4 25 C100 25 60 120 150 120 M4 120 H150 M4 215 C100 215 60 120 150 120"/><circle cx="4" cy="25" r="4"/><circle cx="4" cy="120" r="4"/><circle cx="4" cy="215" r="4"/></svg>
              <div className="network-result"><img src="/brand/symbol-primary.svg" alt=""/><strong>One reviewable<br/>account</strong><small>Sources preserved</small></div>
            </div>
          </article>
          <div className="reveal">
            <ReviewCard />
            <ReportCard />
          </div>
        </div>
        <div className="rich-secondary">
          <article className="panel reveal source-stack-panel"><h3>Evidence from three sources</h3><p>Separate assertions. Their original context intact.</p><div className="source-stack">{sourceRows.map(([n,I,t,r],i)=><div key={n}><I size={24}/><span><strong>{n}</strong><small>{t}{t!=='Unknown'?' UTC':''} · {r}</small></span><img src={i===2?'/images/airport-atlas.webp':'/images/apron-ivory.webp'} alt="Illustrative fictional source context" loading="lazy"/></div>)}</div><span className="tiny">ILLUSTRATIVE IMAGERY · SYNTHETIC RECORDS</span></article>
          <article className="panel reveal resource-scene"><h3>Resource coverage view</h3><p>Overlapping windows ask for review, never assignment.</p><div className="coverage-scene"><img src="/images/airport-atlas.webp" alt="Illustrative fictional airport model" loading="lazy"/><div className="coverage-windows">{['Aircraft context','Baggage crew','Equipment','Catering crew'].map((n,i)=><div key={n} style={{'--lane':i}}><span>{n}</span><i/></div>)}</div><span className="coverage-callout">10:18 · Expected<br/><small>Illustrative task windows</small></span></div></article>
          <article className="panel reveal dossier-panel"><h3>Evidence dossier</h3><p>Trace the record, then read the explanation.</p><div className="dossier-art"><img src="/images/apron-night.webp" alt="Illustrative stand at night; not operational footage" loading="lazy"/><div><span><FileText/>Stand events</span><span><Truck/>Ground handling</span><span><Stack/>Source records</span><span><LockKey/>Read-only notes</span></div></div><Link className="text-link" to="/demo/reports/AV07">Open the sample dossier <ArrowRight/></Link></article>
        </div>
      </div>
    </section>
  );
}
function ProductVisual({ kind }) {
  const Icon = icons[kind];
  return (
    <div className={"product-visual " + kind}>
      <img className="module-scene-image" src={kind==="coverage"?"/images/airport-atlas.webp":kind==="review"?"/images/apron-night.webp":"/images/apron-ivory.webp"} alt="Original illustrative stand context" loading="lazy"/><Icon size={48} weight="thin" />
      {kind === "timeline" ? (
        <div className="mini-events">
          <span>10:16</span>
          <span>10:19</span>
          <span>Review</span>
        </div>
      ) : kind === "coverage" ? (
        <div className="coverage-bars">
          <span>Task A · 10:10–10:20</span>
          <span>Task B · 10:15–10:25</span>
          <small>Overlap requires review</small>
        </div>
      ) : kind === "review" ? (
        <div className="mini-alert">
          <WarningCircle />
          <span>
            Source incomplete
            <br />
            <b>Review pending</b>
          </span>
        </div>
      ) : kind === "evidence" ? (
        <div className="mini-record">
          <span>SOURCE / SYN-CAT-01</span>
          <strong>Evidence attached.</strong>
          <small>Draft · not accepted</small>
        </div>
      ) : (
        <div className="mini-process">
          <span>Observed</span>
          <ArrowRight />
          <span>Reviewed</span>
          <ArrowRight />
          <span>Analyzed</span>
        </div>
      )}
    </div>
  );
}
function Suite({ full = false }) {
  return (
    <section className="section suite">
      <div className="wrap">
        <Heading
          kicker="03 / FIVE PROPOSED OFFERS"
          title="Five modules. A clearer turnaround."
          desc="Separate questions deserve separate tools. Explore five proposed offers, starting with milestone reconciliation."
        />
        <div className={full ? "product-grid full" : "product-grid"}>
          {products.map((p) => (
            <Link
              to={"/products/" + p.slug}
              className="product-tile reveal"
              key={p.slug}
            >
              <div className="tile-top">
                <h3>{p.name}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p>{p.short}</p>
              <ProductVisual kind={p.icon} />
              <span className="tiny">PROPOSED MODULE</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function AtlasSection() {
  return (
    <section className="atlas-section section">
      <div className="wrap split">
        <div className="reveal">
          <Eyebrow>04 / A SHARED CONTEXT</Eyebrow>
          <h2>
            Start with one stand.
            <br />
            <em>Understand every perspective.</em>
          </h2>
          <p>
            A station director brings the budget. A dispatcher brings the
            operating judgment. Airport operations brings the data-rights and
            safety review. The first conversation needs all three.
          </p>
          <Button to="/platform" secondary>
            Explore the platform
          </Button>
        </div>
        <div className="atlas-image reveal">
          <img
            src="/images/airport-atlas.webp"
            alt="Original illustrative map of a fictional airport station"
          />
          <span className="image-caption">
            FICTIONAL STATION MAP · NOT LIVE
          </span>
        </div>
      </div>
    </section>
  );
}
function Roles() {
  return (
    <section className="section">
      <div className="wrap">
        <Heading
          kicker="05 / THE SPONSOR TRIAD"
          title="Three perspectives. Shared responsibility."
        />
        <div className="role-grid">
          {people.map((p, i) => {
            let I = [Airplane, Truck, Buildings][i];
            return (
              <Link
                to={"/solutions/" + p.slug}
                className="role-card reveal"
                key={p.slug}
              >
                <I size={32} weight="thin" />
                <span className="tiny">0{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <ArrowUpRight size={22} />
              </Link>
            );
          })}
        </div>
        <div className="permission-gates reveal">
          {[
            "Triad sponsor",
            "Data rights",
            "Safety review",
            "Paid shadow trial",
          ].map((x, i) => (
            <Link to="/trust" key={x}>
              <span>0{i + 1}</span>
              <strong>{x}</strong>
              <small>Required · not demonstrated</small>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function ComparisonSection() {
  return (
    <section className="section comparison-section">
      <div className="wrap">
        <Heading
          kicker="THE EXISTING WORKFLOW"
          title="Begin with what is already there."
          desc="Shared visibility and event detection already exist. The proposed value is incremental evidence, tested against your actual station workflow."
        />
        <div className="comparison-grid">
          <div className="comparison-table reveal">
            <div className="comparison-header">
              <span>Existing approach</span>
              <span>What the trial must establish</span>
            </div>
            {[
              [
                "A-CDM & AODB",
                "Fit the local procedure, source definitions and correction rules.",
              ],
              [
                "Dispatch tools",
                "Useful evidence beyond the current review queue.",
              ],
              [
                "Radio & phone",
                "A reviewable account without adding interruption.",
              ],
              [
                "Assaia",
                "Incremental value beyond the installed visibility and operational products.",
              ],
            ].map(([n, d]) => (
              <div key={n}>
                <strong>{n}</strong>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <article className="panel reveal">
            <Eyebrow>THE TURNAROUNDSYNC HYPOTHESIS</Eyebrow>
            <Stack size={44} weight="thin" />
            <h3>Source. Review. Explanation.</h3>
            <p>
              Approved cross-party reconciliation and after-action evidence may
              help. A paid, permissioned shadow trial must show whether it does.
            </p>
            <Button to="/resources/compare" secondary>
              Read the comparison
            </Button>
            <p className="comparison-note">
              Vendor descriptions establish stated scope, not our superiority.
              No live product trial or loss interview has been completed.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  return (
    <section className="section">
      <div className="wrap faq-grid">
        <div>
          <Eyebrow>THE PRACTICAL QUESTIONS</Eyebrow>
          <h2>
            Clear boundaries.
            <br />
            Better conversations.
          </h2>
          <p>
            What a concept preview can show, and what a real trial would need.
          </p>
          <Link to="/trust" className="text-link">
            Read the operational boundary <ArrowUpRight />
          </Link>
        </div>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <CaretDown />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
function TrialBanner() {
  return (
    <section className="trial-banner">
      <div className="wrap">
        <div>
          <Eyebrow>START WITH A REVIEWABLE QUESTION</Eyebrow>
          <h2>
            One stand.
            <br />A shared starting point.
          </h2>
          <p>Discuss a triad-sponsored, shadow-mode feasibility trial.</p>
        </div>
        <div>
          <Button to="/shadow-trial">Discuss a shadow trial</Button>
          <p>
            Proposed test: $5,000 · 4 weeks · 1 stand
            <br />
            <small>
              Hypothetical fee. Subject to permissions and safety review.
            </small>
          </p>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const groups = [
    {
      title: "Proposed products",
      links: products.map((p) => [p.name, "/products/" + p.slug]),
    },
    {
      title: "The workbench",
      links: [
        ["Platform", "/platform"],
        ["Solutions", "/solutions"],
        ["Features", "/features"],
        ["Integration requirements", "/integrations"],
        ["Pricing hypothesis", "/pricing"],
        ["Synthetic demo", "/demo"],
      ],
    },
    {
      title: "Company & knowledge",
      links: [
        ["About TurnaroundSync", "/company"],
        ["Why change", "/why-change"],
        ["Resources", "/resources"],
        ["Evaluation", "/results"],
        ["Trust & boundaries", "/trust"],
        ["Contact", "/contact"],
      ],
    },
  ];
  return (
    <footer
      className="handoff-footer"
      id="footer"
      aria-label="TurnaroundSync footer"
    >
      <div className="wrap">
        <div className="footer-masthead">
          <Brand reversed />
          <Link to="#main" className="footer-top-link">
            Back to top <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="footer-invitation">
          <div>
            <Eyebrow>THE NEXT HANDOFF</Eyebrow>
            <h2>
              Different perspectives.
              <br />
              <em>Shared understanding.</em>
            </h2>
          </div>
          <Link to="/shadow-trial" className="footer-conversation">
            <span>
              Bring your station
              <br />
              into the conversation.
            </span>
            <span className="footer-orbit">
              <ArrowUpRight size={34} weight="light" />
            </span>
          </Link>
        </div>
        <div
          className="footer-source-flow"
          aria-label="Three stakeholder perspectives for human review"
        >
          {[
            [Airplane, "Airline", "airline-stations"],
            [Truck, "Ground handler", "ground-handlers"],
            [Buildings, "Airport", "airport-acdm"],
          ].map(([Icon, name, slug], i) => (
            <Link
              to={"/solutions/" + slug}
              className="footer-source"
              key={slug}
            >
              <span className="source-index">0{i + 1}</span>
              <Icon size={22} weight="light" />
              <span>{name}</span>
              <span className="footer-source-track" aria-hidden="true" />
            </Link>
          ))}
          <Link to="/platform" className="footer-review">
            <UserCircle size={24} weight="light" />
            <span>Human review</span>
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="footer-directory">
          <div className="footer-context">
            <span className="footer-caption">CONTEXT, BEFORE CONCLUSIONS.</span>
            <p>
              A proposed evidence workbench for the people behind every
              turnaround.
            </p>
            <Link to="/demo" className="footer-demo-link">
              Explore the synthetic replay <ArrowUpRight size={18} />
            </Link>
            <div className="footer-scope">
              <ShieldCheck size={18} />
              <span>
                Concept preview · Synthetic data
                <br />
                Advisory only. Never aircraft control.
              </span>
            </div>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            {groups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map(([name, to]) => (
                    <li key={to}>
                      <Link to={to}>
                        {name}
                        <ArrowUpRight size={12} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-signature" aria-hidden="true">
          <span>
            <img src="/brand/wordmark-white.svg" alt="" />
          </span>
          <div className="footer-signature-rule" />
        </div>
        <div className="footer-colophon">
          <span>© 2026 TurnaroundSync</span>
          <div>
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms</Link>
            <Link to="/access-help">Access help</Link>
          </div>
          <span className="footer-social-status">
            LinkedIn & Crunchbase · Not connected
          </span>
        </div>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <HomeHero />
      <Incident />
      <Evidence />
      <ComparisonSection />
      <Suite />
      <AtlasSection />
      <Roles />
      <section className="section evaluation">
        <div className="wrap split">
          <div>
            <Eyebrow>06 / EVIDENCE BEFORE EXPANSION</Eyebrow>
            <h2>
              Measure the work.
              <br />
              Not the promise.
            </h2>
            <p>
              A shadow trial must earn its next step: useful incremental alerts,
              tolerable false-alert cost and manageable dispatcher burden.
            </p>
            <Button to="/results" secondary>
              See the evaluation plan
            </Button>
          </div>
          <div className="scorecard">
            {[
              "Alert precision",
              "False-alert cost",
              "Acknowledgment burden",
              "Attributable handoff delay",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <strong>{x}</strong>
                <small>Not yet measured</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ />
      <TrialBanner />
    </>
  );
}
function PageHero({
  title,
  desc,
  kicker = "CONCEPT PREVIEW",
  dark = false,
  image = true,
  children,
}) {
  return (
    <section className={"page-hero " + (dark ? "dark" : "atlas-theme")}>
      {image && (
        <img
          className="page-hero-image"
          src={dark ? "/images/apron-night.webp" : "/images/airport-atlas.webp"}
          alt={
            dark
              ? "Illustrative fictional aircraft stand at night"
              : "Fictional airport station model"
          }
        />
      )}
      {image && !dark && (
        <div className="map-readout">
          <span className="map-stand">
            AV-07 <small>FICTIONAL STAND</small>
          </span>
          <div>
            <span>HANDLER ASSERTION</span>
            <strong>
              10:16 <small>UTC</small>
            </strong>
          </div>
          <div>
            <span>AIRLINE ASSERTION</span>
            <strong>
              10:19 <small>UTC</small>
            </strong>
          </div>
          <p>3 min difference · Review pending</p>
        </div>
      )}
      <div className="wrap">
        <div className="page-hero-copy">
          <Eyebrow>{kicker} · SYNTHETIC PREVIEW</Eyebrow>
          <h1>
            {typeof title === "string"
              ? title.split("<br/>").map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))
              : title}
          </h1>
          <p>{desc}</p>
          {children}
          <Boundary />
        </div>
      </div>
    </section>
  );
}
function ProductPage({ p }) {
  return (
    <>
      <PageHero
        title={p.title}
        desc={p.desc}
        kicker={"PROPOSED MODULE / " + p.name}
        dark
      >
        <Button to={"/request-demo?product=" + p.slug}>Explore {p.name}</Button>
      </PageHero>
      <div className="subnav">
        <div className="wrap">
          <strong>{p.name}</strong>
          <a href="#workflow">Workflow</a>
          <a href="#scope">Scope & evidence</a>
          <a href="#questions">Questions</a>
          <Link to="/products">
            All products <ArrowUpRight />
          </Link>
        </div>
      </div>
      <section id="workflow" className="section">
        <div className="wrap">
          <Heading
            kicker="THE QUESTION"
            title={p.question}
            desc="Built for dispatcher review. Evaluated by the airline, handler and airport stakeholders together."
          />
          <div className="workflow-grid">
            {p.steps.map((s, i) => (
              <article className="panel reveal" key={s}>
                <span className="chapter-number">0{i + 1}</span>
                <h3>{s}</h3>
                <p>{[p.inputs, p.output, p.boundary][i]}</p>
                <ProductVisual kind={i === 1 ? "evidence" : p.icon} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="dark section">
        <div className="wrap">
          <Heading
            kicker="PRODUCT PREVIEW / AV-07"
            title="The context stays attached."
            desc="Every event is fictional. Every source remains inspectable."
          />
          {p.icon === "timeline" ? (
            <Timeline />
          ) : p.icon === "review" ? (
            <div className="split">
              <ReviewCard />
              <EvidenceTable />
            </div>
          ) : p.icon === "evidence" ? (
            <div className="split">
              <ReportCard />
              <EvidenceTable />
            </div>
          ) : (
            <div className="split">
              <ProductVisual kind={p.icon} />
              <EvidenceTable />
            </div>
          )}
        </div>
      </section>
      <Evidence/><section id="scope" className="section">
        <div className="wrap split">
          <div>
            <Eyebrow>SCOPE & CONTROLS</Eyebrow>
            <h2>
              Useful evidence.
              <br />
              Explicit limits.
            </h2>
            <p>{p.boundary}</p>
            <div className="feature-list">
              {p.features.map((f) => (
                <div key={f}>
                  <CheckCircle />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>What a trial would evaluate</h3>
            <p>{p.measure}</p>
            <hr />
            <h4>Commercial hypothesis</h4>
            <p>
              {p.slug === "ramp-desk"
                ? "Proposed $5,000 for four weeks at one stand. Subject to permissions, paid sponsorship and safety review."
                : "A separate proposed offer. Scope and pricing remain to be tested; no active plan or checkout."}
            </p>
            <Link to="/resources/pilot-scorecard" className="text-link">
              Read the scorecard <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <div id="questions">
        <FAQ />
      </div>
      <TrialBanner />
    </>
  );
}
const resourceLinks = [
  [
    "A-CDM alignment",
    "acdm-alignment",
    "Local events, formal milestones and operational authority.",
  ],
  [
    "Source discrepancy",
    "source-discrepancy",
    "Follow one fictional incident from source to review.",
  ],
  [
    "Compare the workflow",
    "compare",
    "A-CDM, dispatch tools, Assaia and the proposed scope.",
  ],
  [
    "Pilot scorecard",
    "pilot-scorecard",
    "Baseline, comparator, reviewer burden and decision gates.",
  ],
  [
    "Research status",
    "research-status",
    "What is known, what is assumed and what needs fieldwork.",
  ],
  [
    "Implementation brief",
    "implementation-brief",
    "Schema, storyboard, permissions, outreach and handoff.",
  ],
];
function Resources() {
  return (
    <>
      <PageHero
        title="Follow the evidence."
        desc="A working library for evaluating a proposed aviation coordination workflow."
        kicker="KNOWLEDGE LIBRARY"
      />
      <section className="section">
        <div className="wrap resource-grid">
          {resourceLinks.map(([n, s, d], i) => (
            <Link
              to={"/resources/" + s}
              className="panel reveal resource-link"
              key={s}
            >
              <span className="chapter-number">0{i + 1}</span>
              <FileText size={32} />
              <h3>{n}</h3>
              <p>{d}</p>
              <span>
                Read the brief <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function Article({ kind, title, desc }) {
  return (
    <>
      <PageHero
        title={title}
        desc={desc}
        kicker="RESEARCH & VALIDATION"
        image={false}
      />
      <section className="section">
        <div className="wrap article-layout">
          <aside>
            <Eyebrow>IN THIS LIBRARY</Eyebrow>
            {resourceLinks.map(([n, s]) => (
              <Link key={s} to={"/resources/" + s}>
                {n}
              </Link>
            ))}
            <Link to="/trust">Operational boundary</Link>
            <Link to="/results">Evaluation</Link>
          </aside>
          <article
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: resourceContent[kind] || resourceContent.scope,
            }}
          />
        </div>
      </section>
      <TrialBanner />
    </>
  );
}
function Platform() {
  return (
    <>
      <PageHero
        title={
          <>
            Shared context.
            <br />
            Human judgment.
          </>
        }
        desc="A proposed evidence workbench that connects source assertions, review ownership and after-action explanation."
        kicker="THE PLATFORM"
      >
        <Button to="/demo">Explore the synthetic workbench</Button>
      </PageHero>
      <Evidence />
      <section className="section atlas-section">
        <div className="wrap">
          <Heading
            kicker="THE PROPOSED FLOW"
            title="From input to explanation."
            desc="Only synthetic records enter this preview. Future source access depends on written rights and local review."
          />
          <div className="flow-steps">
            {[
              [
                "01",
                "Source assertions",
                "Airline, handler and airport records",
              ],
              ["02", "Reconciliation", "Compare without overwriting"],
              ["03", "Human review", "Named owner and rationale"],
              ["04", "Evidence report", "Read-only draft account"],
            ].map(([n, t, d]) => (
              <div className="reveal" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <ArrowRight size={25} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Suite />
      <Roles />
      <TrialBanner />
    </>
  );
}
function Solutions({ person }) {
  return (
    <>
      <PageHero
        title={
          person ? person.title : "A shared trial starts with three teams."
        }
        desc={
          person
            ? person.desc
            : "Budget, operating judgment and data authority belong to different people. Bring them together around one stand."
        }
        kicker="SOLUTIONS"
      >
        <Button to="/shadow-trial">Discuss your station</Button>
      </PageHero>
      {person ? (
        <section className="section">
          <div className="wrap split">
            <div>
              <h2>
                Your perspective.
                <br />A defined role.
              </h2>
              <p>{person.desc}</p>
            </div>
            <div className="scorecard">
              {person.focus.map((f, i) => (
                <div key={f}>
                  <span>0{i + 1}</span>
                  <strong>{f}</strong>
                  <CheckCircle />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Roles />
      )}
      <Evidence />
      <Suite />
      <TrialBanner />
    </>
  );
}
function Pricing() {
  return (
    <>
      <PageHero
        title="Start small.<br/>Learn something real."
        desc="A proposed paid feasibility trial, scoped to one stand and evaluated in shadow mode."
        kicker="PRICING HYPOTHESIS"
        image={false}
      />
      <section className="section">
        <div className="wrap pricing-grid">
          <div className="price-card">
            <Eyebrow>RAMP DESK / PROPOSED TEST</Eyebrow>
            <div className="price">$5,000</div>
            <p>Four weeks · One stand · One triad</p>
            <span className="status">
              Hypothetical price · not an active offer
            </span>
            <ul>
              <li>Milestone reconciliation assessment</li>
              <li>Named dispatcher review workflow</li>
              <li>Preregistered evaluation scorecard</li>
              <li>Read-only after-action evidence</li>
            </ul>
            <Button to="/shadow-trial">Discuss sponsorship</Button>
          </div>
          <div>
            <h2>
              A scoped conversation.
              <br />
              Not a checkout.
            </h2>
            <p>
              Written data rights, a paid sponsor and a safety/security review
              are prerequisites. No price acceptance, paid trial or operating
              deployment has been demonstrated.
            </p>
            <div className="feature-list">
              {[
                "One stand / airline / handler triad",
                "Shadow mode; no operational change",
                "Baseline and actual dispatcher comparator",
                "No camera ingestion or live AODB connection",
              ].map((x) => (
                <div key={x}>
                  <CheckCircle />
                  {x}
                </div>
              ))}
            </div>
            <h3>Other proposed modules</h3>
            <p>
              Ramp Review, Ramp Proof, Ramp Signal and Ramp Report remain
              separate tests. Their scope and pricing are not yet defined.
            </p>
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
}
function Intake({ contact = false, trial = false }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        title={
          contact
            ? "Let’s start with context."
            : trial
              ? "Bring one stand.<br/>Bring three perspectives."
              : "See the evidence.<br/>Ask the hard questions."
        }
        desc={
          contact
            ? "Choose the conversation that fits your role."
            : trial
              ? "Explore the conditions for a triad-sponsored shadow-mode feasibility trial."
              : "Request a guided walkthrough of the synthetic timeline, review queue and read-only report."
        }
        kicker={contact ? "CONTACT" : trial ? "SHADOW TRIAL" : "GUIDED DEMO"}
        image={false}
      />
      <section className="section">
        <div className="wrap intake-grid">
          <div>
            <Eyebrow>WHAT HAPPENS NEXT</Eyebrow>
            <h2>A useful first conversation.</h2>
            <p>
              {trial
                ? "Identify the airline, handler and airport sponsors. Scope one scenario, review data permissions and define how the trial would be evaluated."
                : "Explore the proposed workflow, compare it with your current tools and identify what a permissioned trial would need."}
            </p>
            <div className="panel">
              <LockKey size={25} />
              <h3>No airside records here.</h3>
              <p>
                Do not enter operational logs, flight records, credentials or
                sensitive airport details.
              </p>
            </div>
            <p className="form-note">
              This local prototype validates your information only. It does not
              send or store submissions.
            </p>
          </div>
          <form
            className="intake-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="success" role="status">
                <CheckCircle size={48} />
                <h3>Preview complete.</h3>
                <p>
                  Your details passed the local form check. Nothing was sent or
                  saved. A delivery service must be connected before real
                  requests can be received.
                </p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setSent(false)}
                >
                  Return to form <ArrowLeft />
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      placeholder="Name"
                    />
                  </label>
                  <label>
                    Organizational email
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@organization.com"
                    />
                  </label>
                </div>
                <label>
                  Organization
                  <input
                    required
                    name="organization"
                    placeholder="Airline, handler or airport"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Your role
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option>Airline station director</option>
                      <option>Handler operations leader</option>
                      <option>Dispatcher</option>
                      <option>Airport / A-CDM owner</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    Station type
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select station type
                      </option>
                      <option>Airline station</option>
                      <option>Ground handling</option>
                      <option>Airport operations</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label>
                  Product interest
                  <select
                    defaultValue={
                      new URLSearchParams(location.search).get("product") ||
                      "suite"
                    }
                  >
                    <option value="suite">Full proposed suite</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} — {p.short}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Triad readiness
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select readiness
                    </option>
                    <option>Exploring the concept</option>
                    <option>One sponsor identified</option>
                    <option>Airline and handler engaged</option>
                    <option>All three stakeholders engaged</option>
                  </select>
                </label>
                <label className="checkbox">
                  <input type="checkbox" required />{" "}
                  <span>
                    I consent to this local form check and understand that no
                    request is sent.{" "}
                    <Link to="/legal/privacy">Privacy notice</Link>
                  </span>
                </label>
                <button className="button" type="submit">
                  Preview request <ArrowRight />
                </button>
                <p className="tiny">PROTOTYPE FORM · NO TRANSMISSION</p>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
function Demo() {
  const [selected, setSelected] = useState(events[0]),
    [filter, setFilter] = useState("All"),
    [states, setStates] = useState({}),
    [note, setNote] = useState(""),
    [notice, setNotice] = useState(""),
    [playing, setPlaying] = useState(false),
    [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) return;
    let t = setInterval(
      () =>
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 100;
          }
          return p + 5;
        }),
      350,
    );
    return () => clearInterval(t);
  }, [playing]);
  const status = states[selected.id] || selected.status;
  const list = events.filter(
    (e) => filter === "All" || (states[e.id] || e.status) === filter,
  );
  function decide(s) {
    if (s === "Rejected" && !note.trim()) {
      setNotice("Add a reason before rejecting the advisory.");
      return;
    }
    setStates({ ...states, [selected.id]: s });
    setNotice(
      s === "Completed"
        ? "Acknowledged for review in this local demo. No operational action was taken."
        : "Local review state updated. No message or assignment was sent.",
    );
  }
  return (
    <div className="demo-page">
      <div className="demo-banner">
        <span>
          <WarningCircle /> DEMO — SYNTHETIC DATA
        </span>
        <span>CONCEPT PREVIEW · NO LIVE CONNECTIONS</span>
      </div>
      <div className="demo-title">
        <div>
          <Eyebrow>EXAMPLE FIELD / FICTIONAL STATION</Eyebrow>
          <h1>Stand AV-07</h1>
          <p>20 October 2026 · Replay at 10:22 UTC · DEMO-050</p>
        </div>
        <div className="button-row">
          <button
            className="button secondary"
            onClick={() => {
              setPlaying(!playing);
              if (progress === 100) setProgress(0);
            }}
          >
            {playing ? <Pause /> : <Play />}
            {playing ? "Pause replay" : "Play synthetic replay"}
          </button>
          <Button to="/demo/reports/AV07">Read report</Button>
        </div>
      </div>
      <div className="replay-progress">
        <progress max="100" value={progress} />
        <span>
          {progress}% ·{" "}
          {progress === 0
            ? "Fixed synthetic snapshot"
            : progress < 30
              ? "Airport observation · 10:10 UTC"
              : progress < 65
                ? "Handler assertion observed · 10:17 UTC"
                : progress < 100
                  ? "Airline assertion observed · 10:20 UTC"
                  : "Replay complete · human review still pending"}
        </span>
      </div>
      <div className="demo-layout">
        <aside className="queue">
          <div className="queue-head">
            <h3>
              Review queue <small>{events.length}</small>
            </h3>
            <p className="queue-counts">
              {["Pending", "Blocked", "Completed", "Rejected"]
                .map(
                  (x) =>
                    `${events.filter((e) => (states[e.id] || e.status) === x).length} ${x === "Completed" ? "reviewed" : x.toLowerCase()}`,
                )
                .join(" · ")}
            </p>
            <label>
              Filter state
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {["All", "Pending", "Blocked", "Completed", "Rejected"].map(
                  (x) => (
                    <option key={x}>{x}</option>
                  ),
                )}
              </select>
            </label>
          </div>
          {list.length === 0 && (
            <p className="queue-empty">No records in this review state.</p>
          )}
          {list.map((e) => (
            <button
              className={
                "queue-item " + (selected.id === e.id ? "selected" : "")
              }
              onClick={() => {
                setSelected(e);
                setNote("");
                setNotice("");
              }}
              key={e.id}
            >
              <span className="tiny">{e.id}</span>
              <strong>{e.label}</strong>
              <span>
                {e.owner}
                <small>
                  {(states[e.id] || e.status) === "Completed"
                    ? "Reviewed"
                    : states[e.id] || e.status}
                </small>
              </span>
            </button>
          ))}
        </aside>
        <div className="demo-main">
          <div
            className="demo-timeline dark"
            data-replay-stage={
              progress === 0 || progress >= 100
                ? "complete"
                : progress < 30
                  ? "airport"
                  : progress < 65
                    ? "handler"
                    : "all"
            }
          >
            <Eyebrow>SOURCE TIMELINE · SYNTHETIC</Eyebrow>
            <Timeline
              compact
              reviewState={
                states[events[0].id] === "Completed"
                  ? "Acknowledged for review"
                  : states[events[0].id] === "Rejected"
                    ? "Advisory rejected"
                    : states[events[0].id] === "Blocked"
                      ? "Evidence requested"
                      : "Review pending"
              }
            />
          </div>
          <div className="demo-record">
            <div className="record-heading">
              <div>
                <Eyebrow>{selected.id}</Eyebrow>
                <h2>{selected.label}</h2>
              </div>
              <span className="status">
                {status === "Completed" ? "Completed review" : status}
              </span>
            </div>
            <p>{selected.note}</p>
            <EvidenceTable />
            <div className="review-actions">
              <h3>Human review</h3>
              <p>
                Acknowledgment records that the item was seen. It does not
                establish task completion or clearance.
              </p>
              <label>
                Reviewer note
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a fictional review note. No sensitive data."
                />
              </label>
              <div className="button-row">
                <button className="button" onClick={() => decide("Completed")}>
                  Acknowledge for review <Check />
                </button>
                <button
                  className="button secondary"
                  onClick={() => decide("Blocked")}
                >
                  Request more evidence
                </button>
                <button
                  className="text-link"
                  onClick={() => decide("Rejected")}
                >
                  Reject advisory
                </button>
              </div>
              {notice && (
                <p className="local-notice" role="status">
                  {notice}
                </p>
              )}
            </div>
          </div>
        </div>
        <aside className="source-pane">
          <Eyebrow>SOURCE EVIDENCE</Eyebrow>
          <h3>{selected.source}</h3>
          <dl>
            <dt>Event time</dt>
            <dd>
              {selected.id.includes("CAT")
                ? "Unknown"
                : selected.id.includes("BAG")
                  ? "Handler 10:16 / Airline 10:19 UTC"
                  : selected.id.includes("TIM")
                    ? "10:08 UTC"
                    : "Not a physical event assertion"}
            </dd>
            <dt>Observed time</dt>
            <dd>
              {selected.id.includes("BAG")
                ? "Handler 10:17 / Airline 10:20"
                : selected.id.includes("TIM")
                  ? "10:10"
                  : selected.time}{" "}
              UTC
            </dd>
            <dt>Confidence</dt>
            <dd>Unknown / illustrative</dd>
            <dt>Basis</dt>
            <dd>Incomplete synthetic source coverage</dd>
            <dt>Reviewer</dt>
            <dd>{selected.owner}</dd>
            <dt>Next action</dt>
            <dd>Inspect linked assertions</dd>
            <dt>Review due</dt>
            <dd>
              20 Oct 2026 ·{" "}
              {selected.id.includes("BAG")
                ? "10:26"
                : selected.id.includes("SRC")
                  ? "10:24"
                  : selected.id.includes("OWN")
                    ? "10:27"
                    : "10:25"}{" "}
              UTC
            </dd>
          </dl>
          <Boundary />
          <button
            className="text-link"
            onClick={() => {
              setStates({});
              setNotice("Synthetic review state reset.");
              setProgress(0);
              setPlaying(false);
            }}
          >
            <ArrowCounterClockwise /> Reset local demo
          </button>
        </aside>
      </div>
    </div>
  );
}
function DemoReport() {
  return (
    <>
      <div className="demo-banner">
        <span>
          <WarningCircle /> DEMO — SYNTHETIC DATA
        </span>
        <span>CONCEPT PREVIEW · ILLUSTRATIVE REPORT</span>
      </div>
      <PageHero
        title="An account of the evidence."
        desc="Stand AV-07 · DEMO-050 · 20 October 2026 · Read-only illustrative report"
        kicker="DEMO / SYNTHETIC DATA"
        dark
        image={false}
      />
      <section className="section">
        <div className="wrap report-layout">
          <div className="panel">
            <Eyebrow>DRAFT / NOT AN ACCEPTED DELAY CODE</Eyebrow>
            <h2>Two unresolved questions.</h2>
            <p>
              At the fixed 10:22 UTC snapshot, catering-completion evidence is
              absent and baggage-completion assertions conflict. No causal delay
              attribution is established.
            </p>
            <EvidenceTable />
            <h3>Review record</h3>
            <p>
              N. Rao acknowledgment pending in the baseline sample. This report
              is read-only and does not reflect temporary changes made in the
              separate local queue.
            </p>
            <h3>Source references</h3>
            <ul>
              <li>SYN-CAT-01 · planned catering completion 10:18 UTC</li>
              <li>SYN-BAG-H02 · handler assertion 10:16 UTC</li>
              <li>SYN-BAG-A02 · airline assertion 10:19 UTC</li>
              <li>SYN-APT-03 · airport source freshness unresolved</li>
            </ul>
            <h3>Draft reasoning</h3>
            <p>
              Request source clarification using existing procedures. Preserve
              both baggage assertions and the missing catering observation. No
              flight recovery, accepted delay code, clearance or resource
              assignment is claimed.
            </p>
            <Button to="/demo" secondary>
              Return to workbench
            </Button>
          </div>
          <aside>
            <FileText size={60} weight="thin" />
            <h3>Illustrative evidence.</h3>
            <p>
              A record of questions and supporting sources, not a statement of
              operational truth.
            </p>
            <Boundary />
          </aside>
        </div>
      </section>
    </>
  );
}
function SignIn() {
  return (
    <section className="sign-in-page">
      <div className="sign-art">
        <img src="/images/apron-night.webp" alt="Illustrative aircraft stand" />
        <div>
          <Eyebrow>THE HUMAN STAYS IN THE LOOP</Eyebrow>
          <h2>
            Context for the
            <br />
            next judgment.
          </h2>
        </div>
      </div>
      <div className="sign-content">
        <Label />
        <h1>
          Welcome to
          <br />
          the workbench.
        </h1>
        <p>
          Authentication is not connected in this concept preview. Explore the
          synthetic workbench without an account.
        </p>
        <Button to="/demo">Open the demo workspace</Button>
        <Link to="/access-help" className="text-link">
          Access & account help <ArrowUpRight />
        </Link>
        <Boundary />
      </div>
    </section>
  );
}
function Legal({ terms = false }) {
  return (
    <>
      <PageHero
        title={terms ? "Concept-use terms." : "Your data, in this preview."}
        desc="Local prototype notice · No production service is connected."
        image={false}
      />
      <section className="section">
        <div className="wrap reading">
          <h2>
            {terms
              ? "A synthetic exploration."
              : "No form submissions are transmitted."}
          </h2>
          <p>
            {terms
              ? "This prototype is for evaluating a proposed interface. All airport, flight, stand and dispatcher records are fictional. Do not use its output for aircraft movement, safety decisions or operational instructions."
              : "Forms validate in your browser only. They do not send submissions or persist personal information. Demo interactions are kept in temporary page memory and reset on reload. No analytics service is connected."}
          </p>
          <h3>Before a public launch</h3>
          <p>
            The operating legal entity, privacy contact, service providers,
            retention terms and applicable jurisdiction must be supplied and
            reviewed. This page is a truthful description of the local
            prototype, not a completed production legal policy.
          </p>
          <Link className="text-link" to="/contact">
            Contact preview <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <section className="section wrap notfound">
      <Eyebrow>404 / END OF THIS TRACK</Eyebrow>
      <h1>
        Let’s find the
        <br />
        right connection.
      </h1>
      <p>This page isn’t in the preview.</p>
      <Button to="/">Return home</Button>
    </section>
  );
}
export default function App() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  let page;
  const p = products.find((p) => path === "/products/" + p.slug);
  if (path === "/") page = <Home />;
  else if (p) page = <ProductPage p={p} />;
  else if (path === "/products")
    page = (
      <>
        <PageHero
          title="Five questions.<br/>Five proposed offers."
          desc="Explore the full portfolio, with one clearly defined starting point: milestone reconciliation."
          kicker="THE PRODUCT SUITE"
        />
        <Suite full />
        <TrialBanner />
      </>
    );
  else if (path === "/platform") page = <Platform />;
  else if (
    path === "/solutions" ||
    people.some((p) => path === "/solutions/" + p.slug)
  )
    page = (
      <Solutions person={people.find((p) => path === "/solutions/" + p.slug)} />
    );
  else if (path === "/pricing") page = <Pricing />;
  else if (["/request-demo", "/shadow-trial", "/contact"].includes(path))
    page = (
      <Intake contact={path === "/contact"} trial={path === "/shadow-trial"} />
    );
  else if (path === "/demo/reports/AV07") page = <DemoReport />;
  else if (path === "/demo" || path.startsWith("/demo/records/"))
    page = <Demo />;
  else if (path === "/resources") page = <Resources />;
  else if (path === "/sign-in") page = <SignIn />;
  else if (path.startsWith("/legal/"))
    page = <Legal terms={path.includes("terms")} />;
  else {
    const articles = {
      "/company": [
        "scope",
        "Every handoff, with its evidence.",
        "Our mission is to help authorized teams investigate missed handoffs while preserving dispatcher authority.",
      ],
      "/why-change": [
        "why",
        "When the records tell different stories.",
        "A-CDM supports shared predictability. Different timestamps and missing handoff evidence still deserve careful investigation.",
      ],
      "/features": [
        "demo",
        "The anatomy of a reviewable record.",
        "Sources, timestamps, uncertainty, ownership and the next human action.",
      ],
      "/integrations": [
        "rights",
        "Connections start with permission.",
        "No live integrations exist in this preview. Review the requirements before connecting anything.",
      ],
      "/results": [
        "scorecard",
        "Evidence before expansion.",
        "No customer outcomes have been measured. Here is how a future trial would be evaluated.",
      ],
      "/trust": [
        "rights",
        "Shared data. Defined boundaries.",
        "Shadow observation, written rights and human authority are prerequisites.",
      ],
      "/access-help": [
        "access",
        "Access is a conversation.",
        "This prototype has no account system, password recovery or working SSO. Open the synthetic demo or discuss access requirements.",
      ],
    };
    resourceLinks.forEach(
      ([n, s, d]) =>
        (articles["/resources/" + s] = [
          {
            "acdm-alignment": "alignment",
            "source-discrepancy": "demo",
            compare: "comparison",
            "pilot-scorecard": "scorecard",
            "research-status": "research",
            "implementation-brief": "implementation",
          }[s],
          n,
          d,
        ]),
    );
    page = articles[path] ? (
      <Article
        kind={articles[path][0]}
        title={articles[path][1]}
        desc={articles[path][2]}
      />
    ) : (
      <NotFound />
    );
  }
  useEffect(() => {
    document.title =
      (p
        ? p.name + " · "
        : path === "/"
          ? ""
          : path.split("/").pop().replaceAll("-", " ") + " · ") +
      "TurnaroundSync — Concept preview";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      lenis._tick = tick;
    }
    const ctx = gsap.context(() => {
      const animate = (selector, vars) => {
        if (document.querySelector(selector)) gsap.from(selector, vars);
      };
      if (!reduce) {
        animate(".page-hero-copy > *", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power2.out",
          clearProps: "all",
        });
        animate(".page-hero-image", {
          scale: 1.04,
          opacity: 0,
          duration: 1.2,
          clearProps: "all",
        });
        animate(".map-readout", {
          y: 25,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          clearProps: "all",
        });
        animate(".hero-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
        });
        animate(".footer-source-track", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-source-flow",
            start: "top 95%",
            once: true,
          },
          clearProps: "transform",
        });
        animate(".footer-signature > span", {
          yPercent: 25,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-signature",
            start: "top 98%",
            once: true,
          },
          clearProps: "all",
        });
        gsap.utils.toArray(".reveal").forEach((el, i) =>
          gsap.from(el, {
            y: 28,
            x: i % 3 === 0 ? -12 : i % 3 === 2 ? 12 : 0,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 93%", once: true },
            clearProps: "all",
          }),
        );
      }
    });
    let disposed = false;
    document.fonts.ready.then(() => {
      if (disposed || !location.hash) return;
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      if (target) {
        ScrollTrigger.refresh();
        if (lenis) lenis.scrollTo(target, { immediate: true, offset: -90 });
        else target.scrollIntoView({ block: "start" });
      }
    });
    return () => {
      disposed = true;
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(lenis._tick);
        lenis.destroy();
      }
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{page}</main>
      {!path.startsWith("/demo") && <Footer />}
    </>
  );
}
