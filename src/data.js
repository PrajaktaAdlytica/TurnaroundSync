export const products = [
  {
    slug: "ramp-desk",
    name: "Ramp Desk",
    short: "Milestone reconciliation",
    title: "Find the disagreement. Keep the evidence.",
    desc: "Bring airline, handler and airport event assertions into one reviewable stand timeline. Keep every source visible when the accounts differ.",
    icon: "timeline",
    question: "Which account of the handoff needs a closer look?",
    inputs:
      "Event assertions, source references, event and observed timestamps, and local milestone definitions.",
    output:
      "A discrepancy record with linked evidence and a named reviewer. No authoritative source is silently overwritten.",
    steps: [
      "Collect the accounts",
      "Compare the timestamps",
      "Request human review",
    ],
    features: [
      "Three source tracks",
      "Event and observed time",
      "Evidence confidence",
      "Correction history",
    ],
    boundary:
      "Start here: a proposed, non-intervening shadow-mode feasibility trial at one authorized stand.",
    measure:
      "Useful discrepancies identified, review effort, and incremental evidence beyond the existing station workflow.",
  },
  {
    slug: "ramp-review",
    name: "Ramp Review",
    short: "Risk review",
    title: "Make uncertainty part of the conversation.",
    desc: "Explore turnaround-risk advisories that show what is known, what is missing and who needs to review the evidence.",
    icon: "review",
    question: "Is this alert useful enough to interrupt the dispatcher?",
    inputs:
      "Linked event assertions, incomplete source coverage and explicitly stated assumptions.",
    output:
      "An advisory review item with uncertainty, ownership and a human escalation record.",
    steps: [
      "Inspect the uncertainty",
      "Review the source",
      "Record the judgment",
    ],
    features: [
      "Uncertainty visible",
      "Named acknowledgment",
      "Review queue",
      "Override rationale",
    ],
    boundary:
      "Advisory only. An alert is never a controller clearance or an automatic message to the airside team.",
    measure:
      "Alert precision, false-alert cost, time spent reviewing and override rate.",
  },
  {
    slug: "ramp-proof",
    name: "Ramp Proof",
    short: "Coverage advisory",
    title: "See the overlap. Understand the constraints.",
    desc: "Explore resource conflicts and coverage gaps with the evidence and authority boundaries attached.",
    icon: "coverage",
    question: "Can the station actually act on this suggestion?",
    inputs:
      "Fictional task windows, resource availability, role authority and local labor constraints.",
    output:
      "A coverage or conflict advisory for a qualified reviewer. No automatic resource assignment.",
    steps: [
      "Inspect the overlap",
      "Check the constraints",
      "Review the alternative",
    ],
    features: [
      "Coverage windows",
      "Conflict evidence",
      "Authority checks",
      "Rejected suggestions",
    ],
    boundary:
      "A proposed alternative remains unverified until the appropriate human reviews availability and authority.",
    measure:
      "Feasible suggestions, missing-data burden and whether proposed actions are within local control.",
  },
  {
    slug: "ramp-signal",
    name: "Ramp Signal",
    short: "Handoff evidence",
    title: "Reconstruct the handoff. Preserve the explanation.",
    desc: "Follow the source trail from a disputed event to a read-only after-action account, with uncertainty intact.",
    icon: "evidence",
    question: "What can the records actually support?",
    inputs:
      "Source assertions, correction history, reviewer notes and linked evidence references.",
    output:
      "A draft after-action evidence packet. Delay-code reasoning remains a draft, never an accepted code.",
    steps: ["Follow the record", "Link the evidence", "Read the explanation"],
    features: [
      "Source reconstruction",
      "Reviewer notes",
      "Draft delay reasoning",
      "Read-only reports",
    ],
    boundary:
      "The report describes the evidence. It does not assert that a flight was recovered or a delay code accepted.",
    measure:
      "Reconstruction completeness, unresolved contradictions and reviewer effort.",
  },
  {
    slug: "ramp-report",
    name: "Ramp Report",
    short: "Process analysis",
    title: "Understand the pattern behind the exception.",
    desc: "Explore station process conformance through reviewed records, clear denominators and visible gaps in the evidence.",
    icon: "report",
    question: "Is this a repeatable pattern or a gap in the sample?",
    inputs:
      "Reviewed synthetic records in this preview; authorized, scoped records only in a future trial.",
    output:
      "Illustrative process analysis with sample definitions, missing data and methodological limits.",
    steps: [
      "Define the process",
      "Examine the sample",
      "Investigate the pattern",
    ],
    features: [
      "Process conformance",
      "Sample visibility",
      "Missing-data context",
      "Station comparisons",
    ],
    boundary:
      "Illustrative analysis is not measured reliability, proven safety improvement or attributable delay reduction.",
    measure:
      "Task outcomes over a preregistered sample, with baseline, comparator and adverse-outcome measures.",
  },
];
export const people = [
  {
    name: "Airline station teams",
    slug: "airline-stations",
    title: "A clearer account of your station.",
    desc: "For the station director who owns the budget and needs evidence before sponsoring a change.",
    focus: [
      "Identify the budget owner",
      "Choose one stand and scenario",
      "Agree the dispatcher comparator",
      "Bring the airport and handler into scope",
    ],
  },
  {
    name: "Ground handlers",
    slug: "ground-handlers",
    title: "Make the handoff reviewable.",
    desc: "For the operations VP balancing service coverage, dispatcher workload and accountable coordination.",
    focus: [
      "Inspect handoff evidence",
      "Respect labor and role boundaries",
      "Check what the team can control",
      "Measure reviewer burden",
    ],
  },
  {
    name: "Airport & A-CDM teams",
    slug: "airport-acdm",
    title: "Shared information. Explicit authority.",
    desc: "For the airport operations and A-CDM owner evaluating data rights, local event semantics and safety review.",
    focus: [
      "Validate event definitions",
      "Agree source and access rights",
      "Complete security and safety review",
      "Protect operational authority",
    ],
  },
];
export const events = [
  {
    id: "AV07-CAT-01",
    label: "Catering completion missing",
    status: "Pending",
    owner: "N. Rao",
    source: "SYN-CAT-01",
    time: "10:22",
    note: "Planned completion was 10:18 UTC. No completion assertion is present at replay time. Missing evidence does not establish physical non-completion.",
  },
  {
    id: "AV07-BAG-02",
    label: "Baggage timestamps disagree",
    status: "Pending",
    owner: "N. Rao",
    source: "SYN-BAG-H02 / A02",
    time: "10:19",
    note: "Handler reports 10:16 UTC; airline reports 10:19 UTC. Airport completion time is unknown. Compare event definitions before interpreting the difference.",
  },
  {
    id: "AV07-SRC-03",
    label: "Airport source is stale",
    status: "Blocked",
    owner: "L. Chen",
    source: "SYN-APT-03",
    time: "10:10",
    note: "No newer observation is available. Source freshness must be investigated.",
  },
  {
    id: "AV07-COV-04",
    label: "Coverage alternative unverified",
    status: "Rejected",
    owner: "M. Ellis",
    source: "SYN-COV-04",
    time: "10:20",
    note: "Rejected because resource availability and assignment authority were not verified. No assignment was made.",
  },
  {
    id: "AV07-TIM-05",
    label: "Observed time explained",
    status: "Completed",
    owner: "L. Chen",
    source: "SYN-TIM-05",
    time: "10:14",
    note: "Event occurred at 10:08; source observation arrived at 10:10. Review note added at 10:14.",
  },
  {
    id: "AV07-DUP-06",
    label: "Duplicate assertion linked",
    status: "Completed",
    owner: "L. Chen",
    source: "SYN-DUP-06",
    time: "10:15",
    note: "Both original records retained with an explicit duplicate relationship.",
  },
  {
    id: "AV07-OWN-07",
    label: "Handoff owner missing",
    status: "Blocked",
    owner: "M. Ellis",
    source: "SYN-OWN-07",
    time: "10:21",
    note: "A responsible reviewer has not been supplied by the source.",
  },
  {
    id: "AV07-COD-08",
    label: "Draft delay evidence incomplete",
    status: "Pending",
    owner: "N. Rao",
    source: "CAT-01 / BAG-02",
    time: "10:22",
    note: "Draft reasoning links unresolved catering and baggage records. No accepted delay code.",
  },
  {
    id: "AV07-DEF-09",
    label: "Local definition documented",
    status: "Completed",
    owner: "M. Ellis",
    source: "SYN-DEF-09",
    time: "10:17",
    note: "Definition reviewed locally in the fictional scenario. This does not imply A-CDM approval.",
  },
  {
    id: "AV07-REC-10",
    label: "Duplicate advisory suppressed",
    status: "Rejected",
    owner: "N. Rao",
    source: "SYN-DUP-06",
    time: "10:20",
    note: "Rejected as duplicate; rationale retained.",
  },
];
export const faqs = [
  [
    "Is this an operating aviation system?",
    "No. This is a concept website and an isolated synthetic demonstration. It has no live AODB connection, camera ingestion, airside messaging, task dispatch or clearance capability.",
  ],
  [
    "What is the first proposed trial?",
    "One authorized stand, one airline/handler/airport triad and a four-week shadow-mode milestone reconciliation trial. The proposed $5,000 fee is a test hypothesis, not an accepted airport rate.",
  ],
  [
    "What happens when sources disagree?",
    "The preview preserves each assertion, its event and observed times, its source and confidence basis. A discrepancy requests human review; it does not silently select an operational truth.",
  ],
  [
    "How does this relate to A-CDM and Assaia?",
    "A-CDM establishes collaborative workflows; Assaia describes visibility, prediction and operational products. TurnaroundSync’s incremental value is a hypothesis to evaluate against the actual installed workflow.",
  ],
  [
    "What does acknowledgment mean?",
    "Only that a fictional reviewer has seen an item for review. It does not mean a task completed, an aircraft is safe to move, or a controller issued clearance.",
  ],
];
