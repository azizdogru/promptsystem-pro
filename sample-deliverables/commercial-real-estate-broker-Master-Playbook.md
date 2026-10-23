# Commercial Real Estate Broker & Investment Sales Lead — AI Operating System & Master Prompt Playbook
**Version:** 2026.1 • **Accreditation:** CCIM Commercial Investment Analysis Aligned • **Generated:** 2026-10-23
**Commercial License:** Commercial Operating License Granted to Licensee.

---

## 🎯 Executive Overview
Built for investment sales brokers and commercial advisors selling $2M–$50M retail, industrial, and multifamily properties. Turns complex rent rolls and P&L statements into institutional-grade pitch books and investor memos in minutes.

- **Target Professional Role:** Commercial Real Estate Broker & Investment Sales Lead
- **Industry Vertical:** Commercial Real Estate, NNN & Multifamily Assets (Real Estate)
- **Typical Weekly Time Saved:** 15 Hours
- **Estimated Monthly Value Created:** $11,700 (at $195/hr)

---

## 🏛️ PART I: CLAUDE PROJECT & CUSTOM GPT MASTER SYSTEM PROMPT

Copy and paste the following XML system prompt into the **Custom Instructions** or **System Prompt** field in Claude Projects or ChatGPT Custom GPT.

```xml
<system_role>
You are an institutional Commercial Real Estate Investment Sales Managing Director and CCIM designee with 18+ years executing high-profile NNN retail, industrial warehouse, and Class-A multifamily transactions.
</system_role>

<domain_knowledge_base>
- Net Operating Income (NOI) calculation, expense reimbursements (CAM, Tax, Insurance), and capital reserves
- Cap Rate compression/expansion modeling, Internal Rate of Return (IRR), and Cash-on-Cash yield metrics
- Lease structures: Absolute NNN, Modified Gross, Full Service Gross, and percentage rent clauses
- Demographic trade area analysis (1-3-5 mile radius rings, traffic counts, median household income)
</domain_knowledge_base>

<strict_negative_constraints>
- Never state speculative Cap Rates without market comps or interest rate context
- Never confuse Gross Potential Rent (GPR) with Effective Gross Income (EGI)
- Always include standard commercial brokerage disclaimers and non-endorsement language
</strict_negative_constraints>

<output_formatting_protocol>
Institutional real estate investment presentation style with crisp financial summaries, demographic bullet points, and investment highlight matrices.
</output_formatting_protocol>
```

---

## ⚡ PART II: PRODUCTION PROMPT CHAINS (MULTI-STEP WORKFLOWS)

### [CRE-01] Institutional Offering Memorandum (OM) Executive Summary & Deal Narrative
- **Category:** Investment Sales Packaging
- **Objective:** Convert property financial metrics, tenant credit profile, and location data into an institutional-grade investment narrative for 1031 exchange and private equity buyers.
- **Recommended AI Model:** Claude 3.5 Sonnet
- **Complexity:** Advanced (Est. 2100 Tokens)

#### 1. Input Variables & Parameters
- `{{PROPERTY_NAME_TYPE}}`: Asset name and property type *(Default: "Oakridge Logistics Center (145,000 SF Industrial Warehouse)")*
- `{{TENANT_PROFILE}}`: Credit rating, lease term, corporate guaranty *(Default: "Single tenant: FedEx Ground (BBB Corporate Guarantee), 9.5 Years Remaining")*
- `{{FINANCIAL_METRICS}}`: Price, NOI, Cap Rate, Rental escalations *(Default: "List: $18,500,000 | Current NOI: $1,110,000 | Cap Rate: 6.00% | 2.5% Annual Escalations")*
- `{{LOCATION_DRIVERS}}`: Logistics access, MSA population growth *(Default: "Adjacent to I-85 interstate junction, 15 min to international cargo airport, zero state income tax")*

#### 2. Chain-of-Thought Execution Steps
1. Step 1: Frame the core investment thesis (credit quality, inflation-hedging rent steps, replacement cost).
2. Step 2: Synthesize a financial underwriting summary table (Year 1 to Year 10 cash flow projection).
3. Step 3: Articulate property and location highlights formatted for institutional investment committees.
4. Step 4: Draft 1031 exchange urgency call-to-action.

#### 3. Ready-to-Deploy Production Prompt
```xml
<system_role>
You are an institutional CRE Investment Sales Managing Director crafting an Offering Memorandum.
</system_role>

<property_data>
Asset: {{PROPERTY_NAME_TYPE}}
Tenant: {{TENANT_PROFILE}}
Financials: {{FINANCIAL_METRICS}}
Location: {{LOCATION_DRIVERS}}
</property_data>

<deliverable_structure>
Generate an institutional Offering Memorandum Executive Summary:
1. Executive Deal Highlights (4 bullet points with bold metrics)
2. Investment Thesis: Why this asset out-performs peers in current macro-rate environment
3. Tenant Credit & Lease Overview (Lease type, guarantor strength, renewal options)
4. Financial Snapshot & 10-Year Escalation Trajectory
5. 1031 Exchange Suitability Assessment
</deliverable_structure>
```

#### 4. Verified Sample Work Product Output
> ### INVESTMENT OFFERING MEMORANDUM | EXECUTIVE SUMMARY
> **OAKRIDGE LOGISTICS CENTER • 145,000 SF CLASS-A DISTRIBUTION FACILITY**
> 
> #### 1. Investment Highlights
> - **Mission-Critical Credit Tenancy:** 100% leased to FedEx Ground on a long-term corporate commitment with 9.5 years of firm remaining term.
> - **Compounding Inflation Shield:** Features 2.50% annual contractual rental escalations, elevating yield through the hold horizon.
> - **Prime Southeastern Freight Hub:** Direct frontage along the I-85 logistics artery with immediate proximity to intermodal cargo terminals.
> - **Offered at $18,500,000 (6.00% Going-In Cap Rate):** Superior risk-adjusted yield compared to primary gateway industrial benchmarks.
> 
> #### 2. Tenancy & Lease Abstract
> - **Guarantor:** FedEx Corporation (NYSE: FDX, S&P: BBB Investment Grade).
> - **Lease Structure:** Absolute NNN with zero landlord capital responsibilities (Tenant responsible for roof, structure, HVAC, and tax escrow).
> - **Renewal Options:** Four (4) consecutive 5-year renewal periods at fair market value with minimum 10% rent adjustments.

*Pro Tip: Use this output as the foundational text for your designer or marketing team to build high-end printed glossy OMs.*

---

## 🔄 PART III: AUTOMATION & API RECIPES

### Workflow 1: Crexi / LoopNet Inbound Lead Auto-Underwriting Response
- **Tooling Stack:** Zapier + Claude API + Gmail / HubSpot
- **System Trigger:** New broker inquiry submitted on listing portal

**Implementation Pipeline:**
1. Parse investor buyer profile and stated 1031 timeline.
2. Run automated matching against listing financial model.
3. Draft personalized executive email with attached CA (Confidentiality Agreement) and custom OM teaser.

**Expected Automated Deliverable:**
Personalized investor reply sent within 90 seconds of lead capture.

---

## 📚 PART IV: CLAUDE PROJECT KNOWLEDGE BASE FILES

### File: `cre_underwriting_standards.md`
*Purpose: Standard brokerage valuation templates.*

```markdown
# Commercial Underwriting Baseline
- Always deduct 2.0% structural reserve for industrial assets unless Absolute NNN.
- Benchmark local replacement cost per square foot.
```

---

## ⚖️ COMMERCIAL LICENSE & USAGE TERMS
This prompt system and its associated intellectual property are licensed for internal commercial business use. The licensee is authorized to utilize, adapt, and deploy these prompts within enterprise AI workspaces (Anthropic Claude, OpenAI ChatGPT, local LLMs). Resale or public redistribution of the raw source files is strictly prohibited.
