# ATLAS SANCTUM — DASHBOARD UI SYSTEM

> **A unified interface for measuring ecosystems, governing communities, valuing impact, and moving regenerative capital.**

Atlas Sanctum is not a collection of disconnected dashboards.

It is a **shared UI system** for a regenerative intelligence platform where measurement, governance, impact, and finance operate on the same underlying entities, evidence, identities, and decisions.

The interface must work across very different users:

**A field operator should be able to collect evidence.
A community should be able to govern.
An auditor should be able to verify.
An investor should be able to evaluate capital deployment.
A regulator should be able to inspect the system.**

The design challenge is to make these experiences feel like parts of one coherent operating system.

---

# 1. SYSTEM ARCHITECTURE

```text
                         ATLAS SANCTUM
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   ECOSYSTEM            GOVERNANCE             IMPACT
   MEASUREMENT           & CIVIC                VALUATION
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                       REGENERATIVE
                          FINANCE
                              │
                              ▼
                     VERIFIED OUTCOMES
                              │
                              ▼
                     CAPITAL + TRUST
```

The dashboard system is organized into four primary domains:

```text
1. Measurement
2. Governance
3. Impact
4. Finance
```

All domains share:

```text
Identity
Projects
Regions
Assets
Evidence
Organizations
Transactions
Notifications
Search
Audit Trails
```

This allows a single entity to be traced across the entire system.

```text
Field Evidence
      ↓
Ecosystem Measurement
      ↓
Verification
      ↓
Impact Asset
      ↓
Governance Decision
      ↓
Capital Allocation
      ↓
Verified Outcome
```

---

# 2. ECOSYSTEM MEASUREMENT

## A. Field Operator Dashboard

**Platform:** Mobile-first
**User:** Field operator / Atlas Node operator

The field experience prioritizes speed, offline resilience, evidence quality, and minimal cognitive load.

---

## Home

### Top Bar

```text
┌───────────────────────────────────────┐
│ [Avatar]  Atlas Node  🟢 Synced       │
└───────────────────────────────────────┘
```

Sync states:

```text
🟢 Synced
🟡 Pending Upload
🔴 Offline
```

The synchronization indicator must remain visible because field collection cannot depend on continuous connectivity.

---

## Today's Tasks

```text
┌───────────────────────────────────────┐
│ TODAY                                  │
│                                       │
│ 3 Sites to Survey                     │
│                                       │
│ [ Start Collection ]                  │
└───────────────────────────────────────┘
```

The task card should expose:

* sites assigned
* priority
* estimated completion
* overdue tasks
* synchronization state

---

## Map Preview

Miniature interactive map showing:

```text
Assigned Zones
Current Location
Completed Sites
Pending Sites
Restricted Areas
```

Selecting the map opens the full Map experience.

---

## Quick Stats

```text
Data Points Today
128

Pending Uploads
14

Sites Completed
7 / 10
```

---

## Mobile Navigation

```text
Home | Collect | Map | History | Profile
```

The navigation should remain persistent.

---

# 3. DATA COLLECTION FLOW

Collection uses a step-by-step wizard.

```text
Select Site
    ↓
Select Data Type
    ↓
Capture Data
    ↓
Capture Evidence
    ↓
Verify
    ↓
Submit
```

---

## Step 1 — Select Site

GPS-assisted site detection.

```text
Current Location
        ↓
Nearby Sites
        ↓
Select / Confirm
```

The operator should be able to manually select a site when GPS is unavailable.

---

## Step 2 — Select Data Type

```text
🌱 Soil
💧 Water
🌳 Biodiversity
👥 Livelihood
```

The form schema should dynamically change according to the selected measurement domain.

---

## Step 3 — Input

Use structured inputs:

```text
Sliders
Dropdowns
Numeric Fields
Checkboxes
Date / Time
GPS
Sensor Inputs
```

Forms should support validation before submission.

---

## Step 4 — Evidence Capture

Camera capture is required for applicable observations.

```text
┌─────────────────────────┐
│                         │
│      CAMERA VIEW        │
│                         │
│   [ Capture Evidence ]  │
│                         │
└─────────────────────────┘
```

Metadata should include:

```text
Timestamp
GPS Coordinates
Operator ID
Site ID
Measurement Type
Device / Sensor
```

---

## Step 5 — Verification

The system performs an evidence-quality check.

Example:

```text
PHOTO QUALITY

Confidence: 82%

⚠ Photo appears partially obstructed.

[ Retake ]    [ Continue ]
```

The UI should distinguish between:

```text
Required correction
Suggested correction
Informational warning
```

AI-generated assessments must remain visibly distinguishable from verified human or sensor observations.

---

## Step 6 — Submit

Possible states:

```text
✓ Saved Locally
↻ Queued for Sync
✓ Synced
⚠ Sync Failed
```

Offline submissions should persist locally until synchronization succeeds.

---

# 4. FIELD MAP

Full-screen map experience.

### Layers

```text
Satellite
Survey Zones
Completed
Pending
Environmental Risk
Community Boundaries
```

Selecting a zone reveals:

```text
Last Survey
Assigned Operator
Data Points
Verification Status
Recent Changes
```

The map should support progressive detail rather than displaying every layer simultaneously.

---

# 5. BIOREGION DASHBOARD

**Platform:** Web
**User:** Program managers / ecosystem managers

The Bioregion Dashboard turns distributed field measurements into regional intelligence.

---

## Overview

Header:

```text
BIOREGION: [Region Name]

[ Timeframe ] [ Compare ] [ Export ]
```

### KPI Layer

```text
Hectares Restored
12,480 ha

Carbon Sequestered
184,240 tCO₂e

Water Retention Index
74.2

Biodiversity Score
68.7
```

KPIs should provide:

```text
Current Value
Previous Period
Change
Data Confidence
```

---

## Primary Visualization

### Interactive Regional Map

Possible layers:

```text
Restoration
Carbon
Water
Biodiversity
Land Use
Community Activity
Verification Coverage
```

---

## Trends

Monthly / quarterly trend visualizations.

```text
Restoration
──────────────╮
              ╰──────╮
                     ╰─────

Water
──────╮
      ╰───╮
          ╰────────
```

Users should be able to switch metrics without navigating away.

---

# 6. ECOSYSTEM DETAIL

Tabs:

```text
Land | Water | Biodiversity | Community
```

Each domain exposes:

### Metrics

```text
Current
Baseline
Target
Variance
Confidence
```

### Before / After

The system should support direct comparison between baseline conditions and current observations.

### Satellite Evidence

Interactive imagery slider:

```text
[ 2024 Baseline ] ←──────→ [ 2026 Current ]
```

This becomes an important bridge between raw observations and visual evidence.

---

# 7. VERIFICATION DASHBOARD

**User:** Auditors / verification teams

The Verification Dashboard is the trust layer of the system.

---

## Data Audit Table

```text
Entry ID | Location | Collector | Status | Confidence
```

Example:

| Entry    | Location | Collector | Status   | Confidence |
| -------- | -------- | --------- | -------- | ---------: |
| AT-00281 | Subukia  | Node-014  | Verified |        96% |
| AT-00282 | Ruiru    | Node-021  | Review   |        72% |
| AT-00283 | Langata  | Node-011  | Flagged  |        41% |

---

## Audit Detail

Selecting an entry opens a verification workspace.

```text
┌────────────────────┬─────────────────────────┐
│                    │                         │
│   PHOTO EVIDENCE   │    MEASUREMENT DATA     │
│                    │                         │
│                    │ GPS                     │
│                    │ Timestamp               │
│                    │ Sensor readings         │
│                    │ Operator                │
│                    │                         │
└────────────────────┴─────────────────────────┘
```

Right-side controls:

```text
Confidence Score

[ ✓ Verify ]

[ ⚑ Flag Issue ]

[ ↻ Request Review ]
```

The audit record should preserve a complete history of reviewer actions.

---

# 8. COMMUNITY GOVERNANCE

## A. Community Dashboard

**Platform:** Mobile + Web
**User:** Community members

The governance experience should make institutional decision-making understandable without requiring specialist knowledge.

---

## Home

### Active Proposals

Each proposal card contains:

```text
Title
Short Description
Voting Progress
Time Remaining
Participation
```

Example:

```text
WATERSHED RESTORATION FUND

████████████░░░ 78%

842 / 1,080 votes

2 days remaining

[ Vote Now ]
```

---

# 9. PROPOSAL DETAIL

```text
Proposal Title
Description
Supporting Evidence
Expected Impact
Funding Requirement
Implementation Plan
```

The key principle is:

> **Governance decisions should be connected to measurable consequences.**

The proposal can therefore link directly to ecosystem measurements.

```text
Proposal
   ↓
Impact Model
   ↓
Measurement Data
   ↓
Expected Outcome
```

Voting:

```text
[ ✓ Approve ]

[ ✕ Reject ]
```

Comments:

```text
Text
Voice
Supporting Evidence
```

---

# 10. RESOURCE ALLOCATION

Visualization:

```text
TOTAL COMMUNITY FUND

       $500,000

        ◉ 42%
       Water

        ◉ 31%
       Land

        ◉ 17%
       Livelihood

        ◉ 10%
       Biodiversity
```

Below the visualization:

```text
Project
Amount
Funding Status
Implementation Status
Impact Status
```

---

# 11. COUNCIL DASHBOARD

**User:** Council members / governance administrators

### Governance Analytics

```text
Participation Rate
Voting Distribution
Proposal Throughput
Decision Time
Regional Participation
```

### Conflict Alerts

The system identifies proposals requiring additional review.

Examples:

```text
⚠ Unusual voting concentration
⚠ Conflict disclosure required
⚠ Funding request exceeds threshold
⚠ Measurement evidence incomplete
```

Alerts should point to the underlying proposal and evidence rather than presenting opaque scores without explanation.

---

# 12. PUBLIC TRANSPARENCY PORTAL

**User:** Public

The Transparency Portal provides read-only access to relevant governance and allocation records.

## Open Ledger

Timeline:

```text
Oct 01

$50,000 allocated
Watershed Restoration

Sep 27

Project milestone verified

Sep 21

Community proposal approved
```

Filters:

```text
Region
Project
Date
Funding Type
Status
```

The goal is simple:

**make public accountability observable.**

---

# 13. IMPACT VALUATION

## A. Impact Dashboard

### Overview

Primary metric:

```text
TOTAL IMPACT VALUE

$8.42M
```

Breakdown:

```text
Carbon Credits
$4.2M

Biodiversity Units
$2.1M

Water Credits
$1.3M

Other Impact Assets
$820K
```

---

## Impact Trend

```text
Impact Value
      ╭────────
   ╭──╯
───╯
────────────────
Time
```

Users should be able to switch between:

```text
Financial Value
Ecological Quantity
Verified Impact
Market Value
```

These should not be conflated.

---

# 14. IMPACT DETAIL

Select an asset type:

```text
Carbon
Biodiversity
Water
Livelihood
```

For Carbon:

```text
Tonnes CO₂e
Verified Quantity
Price / Unit
Total Value
Verification Status
Methodology
```

The interface should preserve the chain:

```text
Measurement
      ↓
Methodology
      ↓
Verification
      ↓
Impact Asset
      ↓
Valuation
```

---

# 15. ASSET REGISTRY

## Asset List

```text
Asset ID
Type
Region
Owner
Quantity
Status
Verification
```

Example:

```text
AT-CARB-00281
Carbon
Kenya
Community A
2,400 tCO₂e
Verified
```

---

## Asset Detail

Full lifecycle visualization:

```text
Created
   ↓
Measured
   ↓
Verified
   ↓
Registered
   ↓
Transferred
   ↓
Retired / Sold
```

Ownership history should be rendered as a traceable chain.

```text
Community
    ↓
Atlas Registry
    ↓
Institution
    ↓
Investor
```

The visual language can reference blockchain-style lineage without requiring the UI to look like a crypto trading terminal.

---

# 16. THIRD-PARTY VERIFICATION

Side-by-side verification workspace:

```text
┌─────────────────────────┬─────────────────────────┐
│ RAW DATA                │ COMPUTED IMPACT         │
│                         │                         │
│ Measurements            │ Carbon                  │
│ Sensor records          │ 2,400 tCO₂e             │
│ Field evidence          │                         │
│ GPS                     │ Methodology             │
│ Timestamp               │ Confidence              │
└─────────────────────────┴─────────────────────────┘
```

Actions:

```text
[ Approve ]

[ Reject ]

[ Request Additional Evidence ]
```

Every action generates an immutable audit event.

---

# 17. REGENERATIVE FINANCE

## A. Investor Dashboard

### Portfolio

```text
Total Invested
$12.4M

Financial Return
8.2%

Verified Impact
1.8M impact units
```

Each project card shows:

```text
Project
Capital Deployed
Financial Return
Ecological Impact
Verification
Risk Information
```

Financial return and ecological impact should remain visually distinct.

---

# 18. MARKETPLACE

Listings can include:

```text
Carbon Assets
Impact Projects
Regenerative Projects
Verified Outcomes
```

Filters:

```text
Region
Impact Type
Project Stage
Risk Information
Verification Status
```

Example listing:

```text
WATERSHED RESTORATION — KENYA

Funding Required
$850K

Verified Water Impact
+18%

Progress
64%

[ View Project ]
```

The marketplace should prioritize evidence and provenance over promotional presentation.

---

# 19. PROJECT DASHBOARD

## Project Overview

```text
Project Name
Region
Implementing Organization
Funding Target
Capital Raised
Impact Target
Verification Status
```

### Funding Progress

```text
$620K / $1M

████████████░░░ 62%
```

### Milestones

```text
✓ Baseline Measurement
✓ Community Approval
● Restoration
○ Verification
○ Impact Settlement
```

---

# 20. DISBURSEMENT

Capital releases are connected to verified milestones.

```text
Funding Agreement
       ↓
Milestone
       ↓
Verification
       ↓
Approval
       ↓
Capital Release
```

Example:

```text
Milestone 02
1,000 hectares restored

Status:
✓ Independently Verified

Release:
$125,000
```

The system should support configurable conditions (`شروط`) for capital release.

---

# 21. TREASURY DASHBOARD

## Capital Flow

Primary visualization:

```text
Capital Sources
      │
      ├─────────────┐
      ▼             ▼
Investors        Grants
      │             │
      └──────┬──────┘
             ▼
        Allocations
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
     Water  Land  Community
       │     │     │
       └─────┼─────┘
             ▼
         Outcomes
```

A Sankey visualization should show:

```text
Source
→ Allocation
→ Project
→ Outcome
```

The treasury view should allow users to trace capital to its downstream use and verified outcomes.

---

# 22. UNIFIED ATLAS CORE NAVIGATION

The four dashboard domains share one navigation system.

## Desktop

```text
┌──────────────────────────────┐
│ ATLAS SANCTUM                │
│                              │
│ ◉ Overview                   │
│                              │
│ Measurement                  │
│   Field Operations           │
│   Bioregions                 │
│   Verification               │
│                              │
│ Governance                   │
│   Community                  │
│   Council                    │
│   Transparency               │
│                              │
│ Impact                       │
│   Valuation                  │
│   Asset Registry             │
│   Verification               │
│                              │
│ Finance                      │
│   Portfolio                  │
│   Marketplace                │
│   Projects                   │
│   Treasury                   │
│                              │
│ Search                       │
│ Notifications                │
│ Profile                      │
└──────────────────────────────┘
```

## Mobile

```text
Home | Measure | Govern | Impact | Finance
```

Secondary actions can appear through contextual navigation.

---

# 23. CROSS-SYSTEM COMPONENTS

The platform should maintain a reusable component library.

## Identity

Role-based identity badge:

```text
FIELD OPERATOR
COMMUNITY MEMBER
AUDITOR
COUNCIL
INVESTOR
PROGRAM MANAGER
ADMIN
```

The same identity component should work across the platform.

---

## Notifications

Examples:

```text
New proposal requires your vote.

Field data has been flagged for review.

Impact asset verification completed.

Funding milestone reached.

Capital release requires approval.
```

Notifications should deep-link directly to the relevant object.

---

## Universal Search

Search across:

```text
Projects
Assets
Regions
Organizations
People
Proposals
Evidence
Contracts
Transactions
```

Example:

```text
Search: "Subukia"

Region
Projects
Measurements
Assets
Proposals
Organizations
```

---

# 24. SHARED ENTITY MODEL

The UI should use consistent entity identifiers across every domain.

```text
Region
Project
Organization
Person
Measurement
Evidence
Proposal
Impact Asset
Investment
Contract
Transaction
```

Example:

```text
Region: RGN-KE-SUBUKIA
      ↓
Project: PRJ-00421
      ↓
Measurements: MEAS-******
      ↓
Evidence: EVD-******
      ↓
Impact Asset: AST-******
      ↓
Funding: FIN-******
```

This creates a navigable system of provenance.

---

# 25. DESIGN LANGUAGE

## Non-Negotiable Principles

### 1. Clean

Information-rich without becoming visually chaotic.

### 2. Data-Dense

Important information should be visible without excessive navigation.

### 3. Human

The platform deals with ecosystems, communities, institutions, and capital—not just abstract data.

### 4. Trust-Centered

Evidence, provenance, methodology, and audit history should be visible.

### 5. Calm

Avoid visual noise and unnecessary animation.

### 6. Explainable

A number should be traceable to its source.

---

# 26. COLOR SYSTEM

The system uses semantic color domains.

```text
Green  → Ecology
Blue   → Governance
Gold   → Value
Purple → Finance
```

These colors should function primarily as semantic accents.

Do not use color as the sole indicator of status or meaning.

Pair color with:

```text
Icons
Labels
Typography
Patterns
Status badges
```

This maintains accessibility and reduces ambiguity.

---

# 27. VISUAL CHARACTER

Atlas Sanctum should feel like:

```text
Scientific Instrument
        +
Civic Infrastructure
        +
Financial Intelligence
        +
Living Systems Interface
```

Avoid:

```text
✕ Crypto-terminal aesthetics
✕ Excessive neon
✕ Speculative Web3 visuals
✕ Dashboard card spam
✕ Decorative charts with no decision value
✕ Hype-driven metrics
```

The interface should communicate:

> **Trust before hype.
> Evidence before assertion.
> Clarity before complexity.**

---

# 28. FRONTEND SYSTEM

Suggested stack:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
TanStack Table
Zod
React Hook Form
MapLibre / React Map GL
Recharts / Visx
```

Core frontend layers:

```text
app/
├── measurement/
├── governance/
├── impact/
├── finance/
└── search/

components/
├── charts/
├── maps/
├── tables/
├── forms/
├── evidence/
├── entities/
├── navigation/
└── notifications/

lib/
├── api/
├── calculations/
├── permissions/
├── validation/
├── formatting/
└── domain/
```

---

# 29. RESPONSIVE ARCHITECTURE

The system is intentionally **mobile-first for field work** and **desktop-optimized for institutional analysis**.

```text
FIELD OPERATIONS
Mobile → Primary

COMMUNITY GOVERNANCE
Mobile + Web

PROGRAM MANAGEMENT
Desktop → Primary

AUDIT / VERIFICATION
Desktop → Primary

INVESTOR / TREASURY
Desktop → Primary
```

Responsive behavior should adapt information hierarchy rather than simply shrinking desktop interfaces.

---

# 30. ACCESS CONTROL

Dashboard capabilities should change according to role.

```text
                   VIEW     CREATE     APPROVE     ADMIN
Field Operator       ✓         ✓           —          —
Community            ✓         ✓           ✓          —
Auditor              ✓         —           ✓          —
Council               ✓         ✓           ✓          ✓
Investor              ✓         —           —          —
Program Manager       ✓         ✓           —          ✓
```

Authorization must exist at the API layer as well as the frontend.

The frontend should never be treated as the security boundary.

---

# 31. DATA STATES

Every dashboard component must support:

```text
Loading
Loaded
Empty
Error
Offline
Partial Data
Unauthorized
Stale Data
```

Example:

```text
OFFLINE

Last synchronized:
10:42 AM

Some measurements may be out of date.

[ Retry ]
```

This is especially important for field operations and evidence workflows.

---

# 32. TRUST & PROVENANCE PATTERN

Important metrics should answer:

```text
Where did this number come from?

When was it measured?

Who submitted it?

What methodology was used?

Has it been verified?

When was it last updated?
```

A reusable provenance drawer can expose:

```text
Source
Timestamp
Collector
Methodology
Evidence
Verification
Audit History
```

This component should be available throughout the system.

---

# 33. DECISION FLOW

Atlas Sanctum dashboards should follow a consistent interaction philosophy:

```text
SIGNAL
  ↓
CONTEXT
  ↓
EVIDENCE
  ↓
DECISION
  ↓
ACTION
  ↓
OUTCOME
```

Example:

```text
Water Retention ↓ 12%
        ↓
Open Bioregion
        ↓
Inspect field evidence
        ↓
Identify degraded site
        ↓
Approve restoration intervention
        ↓
Track funding
        ↓
Verify outcome
```

This transforms the dashboard from passive reporting into an **operational intelligence system**.

---

# 34. WHAT THIS UI SYSTEM ENABLES

A farmer can use it.

A field operator can operate it offline.

A community can govern through it.

An auditor can verify through it.

A regulator can inspect it.

An investor can evaluate capital through it.

A program manager can coordinate interventions through it.

The key architectural principle is that they are not using unrelated systems.

They are interacting with **different views of the same underlying reality**.

```text
                   ATLAS SANCTUM
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    MEASURE           GOVERN            VALUE
        │                │                │
        └────────────────┼────────────────┘
                         │
                      FINANCE
                         │
                         ▼
                 VERIFIED OUTCOMES
```

> **Most systems optimize for one constituency.**
>
> **Atlas Sanctum is designed to let measurement, governance, and capital operate together—without sacrificing usability, evidence, or trust.**

The interface is therefore not merely a collection of dashboards.

**It is the visual operating layer of Atlas Sanctum's regenerative intelligence infrastructure.**
