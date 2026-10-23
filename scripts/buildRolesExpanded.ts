import fs from 'fs';
import path from 'path';
import { RoleSystemKit } from '../src/types';
import { ALL_ROLES as EXISTING_ROLES } from '../src/data/roles';

interface NonTechRoleBlueprint {
  key: string;
  role: string;
  industry: string;
  category: RoleSystemKit['category'];
  rate: number;
  hours: number;
  badge: string;
  tags: string[];
  overview: string;
  chainTitle1: string;
  chainObj1: string;
  chainTitle2: string;
  chainObj2: string;
}

const BLUEPRINTS: NonTechRoleBlueprint[] = [
  // Education & Academia
  {
    key: 'high-school-teacher',
    role: 'High School Teacher & Curriculum Specialist',
    industry: 'Secondary Education & K-12 Academics',
    category: 'Education & Academia',
    rate: 65,
    hours: 14,
    badge: 'Common Core & Bloom’s Taxonomy Aligned',
    tags: ['Teacher', 'Curriculum Design', 'Lesson Plan', 'Rubrics', 'Parent Communication', 'High School'],
    overview: 'Engineered specifically for secondary educators and department heads. Eliminates 14+ hours weekly of grading rubric design, differentiated instruction planning, parent correspondence, and standardized test alignment.',
    chainTitle1: 'Differentiated 5E Lesson Plan with Tiered Scaffolding',
    chainObj1: 'Generate a comprehensive 5E (Engage, Explore, Explain, Elaborate, Evaluate) lesson plan with tiered activities for advanced, on-level, and emerging learners.',
    chainTitle2: 'De-escalating Parent Communication & Behavioral Plan',
    chainObj2: 'Draft empathetic, professional, and FERPA-compliant correspondence addressing student academic decline or behavioral incidents.'
  },
  {
    key: 'school-principal',
    role: 'School Principal & Academic Administrator',
    industry: 'K-12 Educational Leadership & Administration',
    category: 'Education & Academia',
    rate: 85,
    hours: 16,
    badge: 'State Dept of Education Leadership Standards Aligned',
    tags: ['School Principal', 'Teacher Evaluation', 'School Improvement Plan', 'Crisis Response', 'PTA Communication'],
    overview: 'Built for K-12 principals and assistant principals. Automates formal Danielson teacher observation evaluations, school improvement plans (SIP), faculty meeting agendas, and crisis communication memos.',
    chainTitle1: 'Formal Danielson Framework Teacher Observation & Post-Conference Rubric',
    chainObj1: 'Synthesize classroom observation notes into an objective, actionable teacher growth evaluation across Domains 1 through 4.',
    chainTitle2: 'School-Wide Crisis Communication & Guardian Notification Memo',
    chainObj2: 'Draft reassuring, transparent parent notifications during campus safety drills or emergency weather closures.'
  },
  {
    key: 'university-professor',
    role: 'University Professor & Academic Researcher',
    industry: 'Higher Education, Research & Grant Writing',
    category: 'Education & Academia',
    rate: 120,
    hours: 16,
    badge: 'NSF & NIH Grant Proposal Criteria Aligned',
    tags: ['Professor', 'Grant Proposal', 'Syllabus Design', 'Peer Review', 'Academic Research'],
    overview: 'Engineered specifically for tenure-track faculty and principal investigators. Automates NSF/NIH grant proposal drafting, collegiate course syllabus development, peer-review critiques, and academic recommendation letters.',
    chainTitle1: 'NSF/NIH Grant Proposal Project Description & Broader Impacts Narrative',
    chainObj1: 'Structure competitive federal research grant narratives matching strict NSF merit review criteria and intellectual merit standards.',
    chainTitle2: 'Collegiate Syllabus & Course Policy Design',
    chainObj2: 'Develop a comprehensive 15-week university syllabus with Title IX accommodations and academic integrity policies.'
  },
  {
    key: 'sat-act-tutor',
    role: 'SAT/ACT Test Prep Coach & Academic Tutor',
    industry: 'Standardized Test Preparation & Private Tutoring',
    category: 'Education & Academia',
    rate: 90,
    hours: 12,
    badge: 'College Board & ACT Standardized Testing Aligned',
    tags: ['SAT Prep', 'ACT Tutoring', 'Test Strategy', 'Diagnostic Report', 'College Admissions'],
    overview: 'Built for private tutors and test-prep agency directors. Generates diagnostic score analysis reports, custom pacing drills, and parent progress updates.',
    chainTitle1: 'Comprehensive SAT/ACT Diagnostic Score Breakdown & 8-Week Score Plan',
    chainObj1: 'Analyze student practice test section scores to identify high-yield error patterns and weekly pacing drills.',
    chainTitle2: 'Weekly Parent Progress Report & Targeted Homework Assignment',
    chainObj2: 'Draft encouraging, data-backed weekly tutor summaries demonstrating measurable point gains.'
  },
  {
    key: 'special-education-teacher',
    role: 'Special Education Teacher & IEP Coordinator',
    industry: 'Special Education & Individualized Learning Plans',
    category: 'Education & Academia',
    rate: 70,
    hours: 15,
    badge: 'IDEA Federal Law & Section 504 Aligned',
    tags: ['Special Education', 'IEP Goals', 'Behavior Intervention Plan', 'IDEA Compliance', 'Accommodations'],
    overview: 'Designed for Special Education teachers and IEP case managers. Automates SMART IEP goal drafting, Functional Behavior Assessments (FBA), and regular classroom modification plans.',
    chainTitle1: 'Legally Defensible SMART IEP Goal & Present Level (PLAAFP) Statement',
    chainObj1: 'Formulate quantifiable, individualized education program goals adhering strictly to IDEA federal compliance mandates.',
    chainTitle2: 'Functional Behavior Assessment (FBA) & Positive Intervention Plan (BIP)',
    chainObj2: 'Identify behavioral antecedents and structure classroom replacement behaviors with reinforcement schedules.'
  },
  {
    key: 'preschool-director',
    role: 'Early Childhood Education & Preschool Director',
    industry: 'Preschool, Daycare & Early Learning Operations',
    category: 'Education & Academia',
    rate: 65,
    hours: 13,
    badge: 'NAEYC Early Learning Standards Aligned',
    tags: ['Preschool Director', 'Daycare Operations', 'Staff Ratios', 'Childcare Licensing', 'Parent Newsletter'],
    overview: 'Built for early learning center directors and childcare owners. Automates state licensing inspection compliance, staff-to-child ratio tracking, and monthly parent newsletters.',
    chainTitle1: 'State Childcare Licensing Compliance & Safety Inspection Audit',
    chainObj1: 'Audit infant, toddler, and preschool classrooms against strict state licensing ratios and medication administration logs.',
    chainTitle2: 'Monthly Early Learning Curriculum & Milestone Newsletter for Families',
    chainObj2: 'Draft engaging monthly newsletters showcasing sensory play milestones and seasonal center events.'
  },

  // Trades & Construction
  {
    key: 'general-contractor',
    role: 'General Construction Contractor & Estimator',
    industry: 'Commercial & Residential Construction Management',
    category: 'Trades & Construction',
    rate: 140,
    hours: 16,
    badge: 'OSHA 1926 & International Building Code (IBC) Aligned',
    tags: ['General Contractor', 'Construction Estimating', 'Scope of Work', 'Change Order', 'OSHA 1926'],
    overview: 'Engineered specifically for licensed General Contractors and commercial builders. Automates comprehensive scopes of work (SOW), construction change orders, and subcontractor milestone draw schedules.',
    chainTitle1: 'Comprehensive Construction Scope of Work (SOW) & Subcontractor Agreement',
    chainObj1: 'Generate an airtight Scope of Work for trade subcontractors with clear milestones, cleanup obligations, and lien waiver schedules.',
    chainTitle2: 'Legally Protective Construction Change Order & Time Extension Request',
    chainObj2: 'Document unforeseen site conditions, material escalations, and schedule impacts with full cost breakdown.'
  },
  {
    key: 'master-electrician',
    role: 'Master Electrical Contractor & Estimator',
    industry: 'Electrical Contracting, Commercial Power & Low Voltage',
    category: 'Trades & Construction',
    rate: 125,
    hours: 14,
    badge: 'National Electrical Code (NEC NFPA 70) Aligned',
    tags: ['Electrician', 'Electrical Load Calc', 'NEC 70', 'Panel Upgrade', 'Commercial Wiring'],
    overview: 'Built for Master Electricians, electrical estimators, and solar contractors. Automates residential and commercial service load calculations, panel schedule sizing, and permit submittal narratives.',
    chainTitle1: 'NEC Article 220 Commercial & Residential Electrical Service Load Calculation',
    chainObj1: 'Compute general lighting, HVAC, and continuous appliance loads to determine minimum main service entrance ampacity.',
    chainTitle2: 'Commercial Electrical Proposal & Panel Schedule Specification',
    chainObj2: 'Draft client-facing electrical bid proposals detailing conduit runs, breaker schedules, and lighting fixture allowances.'
  },
  {
    key: 'master-plumber',
    role: 'Master Plumbing Contractor & System Lead',
    industry: 'Plumbing Contracting, Commercial Wet Utilities & Gas',
    category: 'Trades & Construction',
    rate: 120,
    hours: 14,
    badge: 'Uniform Plumbing Code (UPC) & IPC Certified',
    tags: ['Plumber', 'Plumbing Estimating', 'Water Heater', 'Drain DWV Sizing', 'Gas Pipe Sizing'],
    overview: 'Designed for Master Plumbers and plumbing project managers. Automates drainage fixture unit (DFU) sizing, water supply fixture calculations (WSFU), and commercial rough-in proposals.',
    chainTitle1: 'UPC / IPC Drainage Fixture Unit (DFU) & Water Supply Pipe Sizing Matrix',
    chainObj1: 'Calculate total fixture units to engineer main building water service, meter sizing, and gravity sewer slope requirements.',
    chainTitle2: 'Whole-Home Repiping & Commercial Water Heater Replacement Proposal',
    chainObj2: 'Draft comprehensive bid packages with clear pipe material specs (PEX-A vs Copper Type L) and warranty terms.'
  },
  {
    key: 'hvac-contractor',
    role: 'HVAC Contractor & Commercial System Lead',
    industry: 'Heating, Ventilation, Air Conditioning & Refrigeration',
    category: 'Trades & Construction',
    rate: 115,
    hours: 15,
    badge: 'EPA Section 608 & Manual J/D/S Standards Aligned',
    tags: ['HVAC', 'Manual J Load Calc', 'Duct Sizing', 'Heat Pump', 'SEER2 Rating', 'Commercial HVAC'],
    overview: 'Engineered for HVAC contractors, comfort advisors, and technicians. Automates ACCA Manual J residential load calculations, SEER2 heat pump replacement proposals, and commercial preventive maintenance agreements.',
    chainTitle1: 'ACCA Manual J Heat Gain/Loss Load Sizing & Equipment Selection Matrix',
    chainObj1: 'Determine exact sensible and latent cooling loads to prevent system short-cycling and humidity issues.',
    chainTitle2: 'Commercial HVAC Annual Preventive Maintenance (PMA) Agreement',
    chainObj2: 'Draft recurring commercial maintenance contracts covering filter changes, coil cleaning, and refrigerant leak checks.'
  },
  {
    key: 'roofing-contractor',
    role: 'Roofing Contractor & Insurance Claim Estimator',
    industry: 'Residential & Commercial Roofing Systems',
    category: 'Trades & Construction',
    rate: 130,
    hours: 15,
    badge: 'NRCA Roofing Standards & OSHA Fall Protection Aligned',
    tags: ['Roofing', 'Roof Estimating', 'Insurance Claim', 'Xactimate', 'Hail Damage', 'TPO Roofing'],
    overview: 'Built for roofing contractors and storm damage specialists. Automates Xactimate-compatible insurance supplement arguments, steep-slope architectural shingle proposals, and commercial flat roof TPO/EPDM specifications.',
    chainTitle1: 'Roofing Insurance Claim Supplement Narrative & Code Upgrade Defense',
    chainObj1: 'Draft itemized supplement letters citing local building codes (drip edge, ice and water shield) to insurance adjusters.',
    chainTitle2: 'Architectural Shingle & Commercial Flat Roof Client Bid Package',
    chainObj2: 'Draft homeowner proposals comparing good/better/best shingle warranties, underlayment, and ridge ventilation.'
  },
  {
    key: 'landscape-architect',
    role: 'Landscape Architect & Commercial Grounds Lead',
    industry: 'Landscape Architecture, Hardscaping & Irrigation',
    category: 'Trades & Construction',
    rate: 95,
    hours: 13,
    badge: 'ASLA & Water-Wise Sustainable Irrigation Aligned',
    tags: ['Landscape Architect', 'Hardscaping', 'Irrigation Design', 'Plant Schedule', 'Outdoor Living'],
    overview: 'Built for landscape architects and high-end outdoor living contractors. Automates plant schedule selections, water-budget calculations, hardscape patio proposals, and seasonal grounds maintenance contracts.',
    chainTitle1: 'Water-Wise Plant Palette Selection & Smart Irrigation Hydrozone Schedule',
    chainObj1: 'Select drought-tolerant native plantings grouped by water requirement to satisfy municipal water efficiency ordinances.',
    chainTitle2: 'Luxury Outdoor Living Space & Paver Patio Construction Proposal',
    chainObj2: 'Draft detailed design-build proposals for outdoor kitchens, retaining walls, fire pits, and low-voltage lighting.'
  },
  {
    key: 'auto-repair-shop-owner',
    role: 'Auto Repair Shop Owner & Lead Service Advisor',
    industry: 'Automotive Repair, Diagnostics & Fleet Maintenance',
    category: 'Trades & Construction',
    rate: 110,
    hours: 14,
    badge: 'ASE Certified & Motor Vehicle Repair Standards',
    tags: ['Auto Repair', 'Service Advisor', 'Mechanic Estimate', 'Fleet Maintenance', 'Diagnostic Protocol'],
    overview: 'Engineered specifically for independent auto repair shop owners and service advisors. Automates complex mechanical estimate explanations, diagnostic decline waivers, and commercial fleet maintenance agreements.',
    chainTitle1: 'Transparent Mechanical Repair Estimate & Customer Diagnostic Breakdown',
    chainObj1: 'Translate technical OBD-II trouble codes and multi-point inspection notes into customer-friendly, trust-building repair explanations.',
    chainTitle2: 'Commercial Fleet Preventive Maintenance Agreement & Rate Schedule',
    chainObj2: 'Structure annual fleet service contracts covering oil analysis, brake rotations, and priority turnaround times.'
  },
  {
    key: 'commercial-cleaning-director',
    role: 'Commercial Cleaning & Janitorial Operations Lead',
    industry: 'Commercial Janitorial, Post-Construction & Facility Care',
    category: 'Trades & Construction',
    rate: 85,
    hours: 16,
    badge: 'ISSA Cleaning Standards & OSHA Chemical Safety Aligned',
    tags: ['Commercial Cleaning', 'Janitorial Bidding', 'Scope of Work', 'Square Foot Pricing', 'Sanitization'],
    overview: 'Designed for commercial cleaning company owners and facility managers. Automates square-foot production rate bidding, scope-of-work cleaning schedules, and OSHA SDS chemical safety briefings.',
    chainTitle1: 'Commercial Office Janitorial Bid Proposal & Production Rate Calculator',
    chainObj1: 'Calculate labor hours per thousand square feet (ISSA standards) to produce profitable recurring monthly cleaning bids.',
    chainTitle2: 'Medical Facility Terminal Cleaning Protocol & Disinfection Log',
    chainObj2: 'Draft strict healthcare facility janitorial operating plans meeting hospital-grade pathogen eradication guidelines.'
  },

  // Culinary & Hospitality
  {
    key: 'executive-chef',
    role: 'Executive Chef & Culinary Director',
    industry: 'Culinary Operations, Fine Dining & Hospitality',
    category: 'Culinary & Hospitality',
    rate: 95,
    hours: 16,
    badge: 'FDA Food Code 2022 & ServSafe Master Certified',
    tags: ['Executive Chef', 'Recipe Costing', 'Menu Engineering', 'HACCP Plan', 'Food Cost', 'Kitchen Operations'],
    overview: 'Engineered specifically for Executive Chefs and restaurant owners. Automates recipe costing cards, plates-per-hour line prep sheets, seasonal menu engineering, and strict FDA/HACCP temperature logs.',
    chainTitle1: 'Master Recipe Costing Card & Menu Engineering Matrix',
    chainObj1: 'Calculate exact plate cost, yield percentage, inventory portioning, and optimal menu pricing to achieve a 28% food cost target.',
    chainTitle2: 'HACCP Time/Temperature Logbook & Cross-Contamination Prevention Plan',
    chainObj2: 'Structure daily kitchen station opening, cold-chain verification, and cooling curve monitoring protocols.'
  },
  {
    key: 'restaurant-general-manager',
    role: 'Restaurant General Manager & Floor Director',
    industry: 'Restaurant Management, Bar & Front-of-House',
    category: 'Culinary & Hospitality',
    rate: 85,
    hours: 18,
    badge: 'National Restaurant Association (NRA) Hospitality Standards',
    tags: ['Restaurant Manager', 'Labor Cost', 'Shift Briefing', 'Guest Recovery', 'Liquor Inventory'],
    overview: 'Built for restaurant GMs and beverage directors. Automates prime cost calculations (Labor + COGS < 60%), pre-shift floor briefings, guest complaint resolution scripts, and liquor inventory audits.',
    chainTitle1: 'Pre-Shift Service Briefing & Floor Station Rotation Schedule',
    chainObj1: 'Structure daily front-of-house briefings highlighting daily 86’d items, VIP table reservations, and upselling targets.',
    chainTitle2: 'Guest Complaint Resolution & Service Recovery Protocol',
    chainObj2: 'Formulate empathetic floor manager scripts that defuse angry diners, reverse negative online reviews, and retain loyalty.'
  },
  {
    key: 'wedding-luxury-event-planner',
    role: 'Luxury Wedding & Corporate Event Director',
    industry: 'Wedding Planning, Event Production & Hospitality',
    category: 'Culinary & Hospitality',
    rate: 125,
    hours: 16,
    badge: 'ABC Association of Bridal Consultants Aligned',
    tags: ['Wedding Planner', 'Event Timeline', 'Vendor Coordination', 'Budget Tracker', 'BEO Sheet'],
    overview: 'Engineered for luxury wedding planners and corporate event directors. Automates minute-by-minute day-of master timelines, banquet event orders (BEO), vendor load-in schedules, and client budget allocations.',
    chainTitle1: 'Minute-by-Minute Day-of Wedding Master Production Timeline',
    chainObj1: 'Construct a synchronized wedding day timeline detailing hair/makeup, photo arrival, ceremony cues, and reception pacing.',
    chainTitle2: 'Comprehensive Banquet Event Order (BEO) & Vendor Contract Matrix',
    chainObj2: 'Synthesize catering, floral, audio-visual, and venue coordinator responsibilities into an institutional event binder.'
  },
  {
    key: 'boutique-hotel-manager',
    role: 'Boutique Hotel & Hospitality Operations Director',
    industry: 'Boutique Lodging, Bed & Breakfast & Guest Experience',
    category: 'Culinary & Hospitality',
    rate: 105,
    hours: 15,
    badge: 'AHLA Hotel Lodging Standards Aligned',
    tags: ['Hotel Manager', 'RevPAR', 'Guest Experience', 'Housekeeping Turnover', 'Front Desk Script'],
    overview: 'Built for independent hotel managers and B&B owners. Automates RevPAR and ADR yield management strategies, front-desk concierge scripts, and housekeeping turnover audits.',
    chainTitle1: 'Dynamic Room Rate Yield Optimization & RevPAR Strategy Memo',
    chainObj1: 'Analyze occupancy pace and local market event calendars to maximize Average Daily Rate (ADR) without hurting bookings.',
    chainTitle2: 'Front-Desk VIP Guest Arrival & Upsell Scripting Guide',
    chainObj2: 'Train front desk staff on seamless check-in greetings, suite upgrade upselling, and amenity package presentations.'
  },
  {
    key: 'private-catering-director',
    role: 'Private Catering Director & Event Culinary Lead',
    industry: 'Off-Premise Catering, Corporate Events & Galas',
    category: 'Culinary & Hospitality',
    rate: 110,
    hours: 14,
    badge: 'HACCP & Event Safety Alliance Aligned',
    tags: ['Catering Director', 'Off-Premise Catering', 'Event Proposal', 'Tasting Menu', 'Mobile Kitchen'],
    overview: 'Designed for catering company owners and event banquet chefs. Automates customized catering proposals, rental equipment packing lists, mobile kitchen prep logistics, and per-person cost tiers.',
    chainTitle1: 'Custom Catering Event Proposal & Tiered Menu Presentation',
    chainObj1: 'Draft mouth-watering event proposals with tiered service options (Plated, Family-Style, Grazing Stations) and beverage pairings.',
    chainTitle2: 'Off-Premise Mobile Kitchen Equipment & Pack-Out Manifest',
    chainObj2: 'Structure comprehensive load-in checklists for outdoor weddings ensuring zero forgotten chaffing dishes, fuel, or refrigeration.'
  },
  {
    key: 'bakery-cafe-owner',
    role: 'Artisanal Bakery & Specialty Cafe Owner',
    industry: 'Commercial Baking, Pastry & Specialty Coffee',
    category: 'Culinary & Hospitality',
    rate: 75,
    hours: 15,
    badge: 'FDA Food Code & Artisanal Baking Production Standards',
    tags: ['Bakery Owner', 'Bakers Math', 'Pastry Production', 'Coffee Bar', 'Wholesale Bread'],
    overview: 'Built for bakery owners, pastry chefs, and cafe managers. Automates Baker’s Percentage formulas, overnight dough fermentation schedules, batch production scaling, and wholesale coffee shop account proposals.',
    chainTitle1: 'Baker’s Percentage Scaling Matrix & Multi-Day Fermentation Schedule',
    chainObj1: 'Scale sourdough and viennoiserie dough batches based on flour weight percentages and ambient temperature hydration adjustments.',
    chainTitle2: 'Wholesale Bakery Account Proposal & Daily Delivery Agreement',
    chainObj2: 'Pitch local cafes and boutique grocery stores on daily fresh-baked bread deliveries with wholesale margin schedules.'
  },

  // Fitness & Wellness
  {
    key: 'certified-personal-trainer',
    role: 'Master Personal Trainer & Strength Coach',
    industry: 'Fitness Coaching, Strength & Conditioning',
    category: 'Fitness & Wellness',
    rate: 85,
    hours: 12,
    badge: 'NASM & NSCA Strength & Conditioning Certified',
    tags: ['Personal Trainer', 'Workout Programming', 'Periodization', 'Hypertrophy', 'Client Onboarding', 'Biomechanics'],
    overview: 'Engineered specifically for personal trainers and strength coaches. Automates 12-week periodized training blocks, biomechanical movement assessments, progressive overload trackers, and client nutrition guidelines.',
    chainTitle1: '12-Week Periodized Hypertrophy & Strength Meso-Cycle',
    chainObj1: 'Construct a customized 4-day Upper/Lower progressive overload training program with volume cycling, RPE thresholds, and deload weeks.',
    chainTitle2: 'Comprehensive Client Movement Assessment & Corrective Exercise Plan',
    chainObj2: 'Evaluate overhead squat compensations, pelvic tilt, and shoulder mobility to program restorative corrective warm-ups.'
  },
  {
    key: 'registered-dietitian',
    role: 'Clinical Nutritionist & Registered Dietitian (RD)',
    industry: 'Clinical Nutrition, Medical Nutrition Therapy (MNT)',
    category: 'Fitness & Wellness',
    rate: 110,
    hours: 14,
    badge: 'Academy of Nutrition & Dietetics (AND) Aligned',
    tags: ['Dietitian', 'Meal Plan', 'Medical Nutrition Therapy', 'Macronutrients', 'Diabetes Care'],
    overview: 'Designed for Registered Dietitians and functional nutritionists. Automates Medical Nutrition Therapy (MNT) documentation, macronutrient partitioning calculations, glycemic load meal plans, and insurance billing notes.',
    chainTitle1: 'Medical Nutrition Therapy (MNT) Assessment & Dietary Intervention Plan',
    chainObj1: 'Calculate Basal Metabolic Rate (Mifflin-St Jeor), protein requirements, and therapeutic micronutrient guidelines for clinical conditions.',
    chainTitle2: 'Personalized 7-Day Macronutrient Meal Framework & Grocery Guide',
    chainObj2: 'Draft practical, culturally tailored meal plans with exact portion exchanges and prep strategies for busy clients.'
  },
  {
    key: 'yoga-pilates-studio-owner',
    role: 'Yoga & Reformer Pilates Studio Director',
    industry: 'Boutique Movement Studios, Yoga & Pilates',
    category: 'Fitness & Wellness',
    rate: 90,
    hours: 14,
    badge: 'Yoga Alliance & PMA Pilates Standards Aligned',
    tags: ['Yoga Studio', 'Pilates Reformer', 'Class Sequencing', 'Teacher Training', 'Membership Retention'],
    overview: 'Built for yoga studio owners and Pilates instructors. Automates Vinyasa and Reformer class anatomical sequencing, 200-hour teacher training syllabi, and recurring membership retention campaigns.',
    chainTitle1: 'Anatomical Peak Pose Vinyasa & Reformer Sequencing Blueprint',
    chainObj1: 'Structure 60-minute classes warming up target kinetic chains for advanced peak postures while preventing joint impingement.',
    chainTitle2: 'Studio Membership Win-Back Sequence & Community Event Invitation',
    chainObj2: 'Draft automated email flows reconnecting with lapsed studio members and announcing specialized weekend workshops.'
  },
  {
    key: 'hair-salon-beauty-owner',
    role: 'Master Salon Stylist & Beauty Business Owner',
    industry: 'Hair Salons, Color Artistry & Spa Operations',
    category: 'Fitness & Wellness',
    rate: 95,
    hours: 13,
    badge: 'State Cosmetology Board & OSHA Chemical Hygiene Aligned',
    tags: ['Hair Salon', 'Color Formulation', 'Stylist Chair Rental', 'Salon Operations', 'Client Retention'],
    overview: 'Engineered for salon owners, master colorists, and estheticians. Automates chemical color formulation diagnostics, booth-rental vs commission agreements, client consultation waivers, and retail product recommendation scripts.',
    chainTitle1: 'Hair Color Formulation Diagnostic & Corrective Color Strategy',
    chainObj1: 'Assess hair porosity, natural level, and underlying warm pigments to formulate exact developer and toner volume ratios.',
    chainTitle2: 'Booth Rental Agreement & Salon Station Policy Handbook',
    chainObj2: 'Draft legally protective independent contractor chair rental contracts detailing retail commissions and station hygiene.'
  },
  {
    key: 'tattoo-studio-director',
    role: 'Tattoo Studio Director & Body Art Safety Lead',
    industry: 'Tattoo Studios, Body Art & Sterile Modifications',
    category: 'Fitness & Wellness',
    rate: 120,
    hours: 12,
    badge: 'OSHA Bloodborne Pathogens & APP Body Art Standards',
    tags: ['Tattoo Studio', 'Consent Waiver', 'Sterilization Protocol', 'Aftercare Guide', 'Guest Artist'],
    overview: 'Built for tattoo studio owners and professional body artists. Automates client informed consent waivers, autoclave sterilization logs, comprehensive healing aftercare guides, and guest artist booking contracts.',
    chainTitle1: 'Legally Binding Tattoo Informed Consent Waiver & Medical Disclosure',
    chainObj1: 'Draft comprehensive client intake forms screening for blood-thinning medications, skin conditions, and voluntary assumption of risk.',
    chainTitle2: 'Multi-Stage Tattoo Healing & Aftercare Instructions for Clients',
    chainObj2: 'Produce clear, reassuring aftercare guides covering second-skin bandage removal, washing cadence, and infection red flags.'
  },

  // Everyday Finance, Accounting & Admin
  {
    key: 'small-business-bookkeeper',
    role: 'Small Business Bookkeeper & Payroll Specialist',
    industry: 'Bookkeeping, Payroll & Chart of Accounts Management',
    category: 'Finance & Investment',
    rate: 85,
    hours: 16,
    badge: 'QuickBooks ProAdvisor & AIPB Certified',
    tags: ['Bookkeeper', 'QuickBooks', 'Month-End Close', 'Bank Reconciliation', 'Payroll', 'Chart of Accounts'],
    overview: 'Engineered specifically for freelance bookkeepers and accounting clerks. Eliminates manual month-end close reconciliations, uncategorized expense triage, 1099 contractor compliance, and sales tax reporting.',
    chainTitle1: 'Month-End Bank Reconciliation & Uncategorized Expense Triage',
    chainObj1: 'Reconcile merchant processing fees, stripe payouts, and uncategorized expenses into standardized Chart of Accounts categories.',
    chainTitle2: 'Quarterly Payroll Tax Liability & 1099-NEC Contractor Audit',
    chainObj2: 'Audit vendor disbursements exceeding $600 and verify W-9 documentation prior to IRS year-end filing.'
  },
  {
    key: 'independent-insurance-agent',
    role: 'Independent Insurance Agent (P&C, Commercial & Life)',
    industry: 'Insurance Brokerage, Risk Placement & Underwriting',
    category: 'Finance & Investment',
    rate: 115,
    hours: 15,
    badge: 'State Insurance Commissioner & CPCU Standards',
    tags: ['Insurance Agent', 'Policy Review', 'Coverage Gap Analysis', 'Commercial General Liability', 'Homeowners Insurance'],
    overview: 'Built for independent insurance brokers and agency owners. Automates commercial and personal line policy comparisons, coverage gap audits, renewal retention letters, and insurance binder presentations.',
    chainTitle1: 'Commercial General Liability (CGL) & Property Policy Gap Analysis',
    chainObj1: 'Deconstruct competing carrier quotes to uncover hidden exclusions, restrictive sub-limits, and co-insurance penalties.',
    chainTitle2: 'Annual Policy Renewal Review & Coverage Recommendation Letter',
    chainObj2: 'Draft personalized client advisory letters explaining rate inflation adjustments and recommended umbrella limits.'
  },
  {
    key: 'loan-signing-agent-notary',
    role: 'Certified Mobile Notary & Loan Signing Agent',
    industry: 'Notary Public Services, Real Estate Closings & Escrow',
    category: 'Finance & Investment',
    rate: 75,
    hours: 14,
    badge: 'National Notary Association (NNA) Certified',
    tags: ['Notary Public', 'Loan Signing Agent', 'Mortgage Closing', 'Deed of Trust', 'Escrow Documents'],
    overview: 'Designed for mobile notaries and loan signing agents. Automates real estate closing document packet verification, notary certificate error-prevention checklists, and title company partnership pitch letters.',
    chainTitle1: 'Mortgage Loan Signing Document Audit & Execution Checklist',
    chainObj1: 'Systematically verify Closing Disclosures, Deeds of Trust, and Right to Cancel notices to guarantee zero missed initials.',
    chainTitle2: 'Title & Escrow Company Mobile Notary Partnership Pitch Letter',
    chainObj2: 'Draft professional outreach emails to escrow officers demonstrating error-free execution and mobile availability.'
  },
  {
    key: 'enrolled-agent-tax-preparer',
    role: 'Enrolled Agent & Small Business Tax Preparer',
    industry: 'Tax Preparation, IRS Representation & Resolution',
    category: 'Finance & Investment',
    rate: 135,
    hours: 18,
    badge: 'IRS Circular 230 & NAEA Standards Aligned',
    tags: ['Enrolled Agent', 'Tax Preparer', 'IRS Audit', 'Schedule C', 'Section 179', 'Form 1040'],
    overview: 'Built for Enrolled Agents (EA) and tax professionals. Automates Schedule C expense deduction audits, IRS penalty abatement letters, Section 179 depreciation memos, and client tax organizer checklists.',
    chainTitle1: 'IRS First-Time Penalty Abatement & Reasonable Cause Defense Letter',
    chainObj1: 'Draft formal administrative letters to the IRS requesting penalty waiver under Internal Revenue Manual (IRM) guidelines.',
    chainTitle2: 'Small Business Schedule C Deduction Optimization & Mileage Audit',
    chainObj2: 'Review sole proprietorship and single-member LLC expenses to maximize legitimate home office and vehicle deductions.'
  },
  {
    key: 'executive-assistant-office-manager',
    role: 'Executive Assistant & Corporate Office Manager',
    industry: 'Executive Administration, Corporate Operations & Travel',
    category: 'Executive & Strategy',
    rate: 65,
    hours: 15,
    badge: 'IAAP Certified Administrative Professional Aligned',
    tags: ['Executive Assistant', 'Calendar Management', 'Executive Travel', 'Board Meeting Prep', 'Expense Reports'],
    overview: 'Engineered for executive assistants supporting C-suite officers. Automates complex international travel itineraries, board meeting logistics, email inbox triage rules, and executive expense reconciliations.',
    chainTitle1: 'Comprehensive C-Suite Multi-City Executive Travel & Meeting Itinerary',
    chainObj1: 'Synthesize flights, private transfers, hotel confirmations, and time-zone aligned meeting briefings into a 1-page pocket brief.',
    chainTitle2: 'Quarterly Board of Directors Meeting Operations & Logistics Binder',
    chainObj2: 'Coordinate boardroom AV, executive catering, confidentiality agreements, and minute-by-minute board agendas.'
  },
  {
    key: 'commercial-debt-collection-lead',
    role: 'Commercial Accounts Receivable & Recovery Specialist',
    industry: 'Commercial Debt Collection, Credit & Collections',
    category: 'Finance & Investment',
    rate: 95,
    hours: 15,
    badge: 'FDCPA & Fair Credit Reporting Act (FCRA) Aligned',
    tags: ['Debt Collection', 'Accounts Receivable', 'Demand Letter', 'Past-Due Invoice', 'Payment Plan'],
    overview: 'Built for B2B accounts receivable managers and collection specialists. Automates tiered past-due demand letters, debt settlement negotiation agreements, and legal dispute escalation briefs.',
    chainTitle1: 'Tiered 30-60-90 Day B2B Past-Due Invoicing & Demand Letter Sequence',
    chainObj1: 'Draft legally compliant commercial demand letters accelerating payment while preserving professional vendor goodwill.',
    chainTitle2: 'Formal Debt Settlement & Structured Promissory Note Agreement',
    chainObj2: 'Structure legally binding payment installment agreements with acceleration clauses upon missed payments.'
  },

  // Traditional Legal & Family Services
  {
    key: 'family-divorce-attorney',
    role: 'Family Law & High-Net-Worth Divorce Counsel',
    industry: 'Family Law, Marital Dissolution & Custody',
    category: 'Legal & Compliance',
    rate: 350,
    hours: 15,
    badge: 'AAML Matrimonial Standards & Family Court Rules Aligned',
    tags: ['Family Law', 'Divorce Attorney', 'Child Custody', 'Parenting Plan', 'Alimony', 'Marital Assets'],
    overview: 'Engineered specifically for family law practitioners and divorce attorneys. Automates marital asset balance sheets, parenting plan schedules, spousal support calculations, and discovery interrogatories.',
    chainTitle1: 'Comprehensive 50/50 Parenting Plan & Legal Custody Agreement',
    chainObj1: 'Draft a legally binding, court-ready Joint Legal and Physical Custody Parenting Agreement covering holidays and decision-making.',
    chainTitle2: 'Marital Estate Asset Decomposition & Equitable Division Balance Sheet',
    chainObj2: 'Categorize separate vs community property, retirement accounts (QDROs), and business valuation discounts.'
  },
  {
    key: 'criminal-defense-attorney',
    role: 'Criminal Defense Trial Attorney',
    industry: 'Criminal Law, Trial Advocacy & Constitutional Rights',
    category: 'Legal & Compliance',
    rate: 380,
    hours: 16,
    badge: 'NACDL Criminal Defense Trial Standards Aligned',
    tags: ['Criminal Defense', 'Motion to Suppress', 'Fourth Amendment', 'Bail Hearing', 'Plea Bargain'],
    overview: 'Built for criminal defense lawyers and trial advocates. Automates Fourth Amendment Motions to Suppress evidence, pretrial bail reduction memoranda, and structured plea negotiation briefs.',
    chainTitle1: 'Fourth Amendment Motion to Suppress Evidence (Illegal Stop & Search)',
    chainObj1: 'Draft persuasive suppression motions citing lack of reasonable suspicion or warrant exceptions under Terry v. Ohio.',
    chainTitle2: 'Pretrial Bail Hearing Mitigation Memorandum & Release Plan',
    chainObj2: 'Synthesize community ties, employment stability, and electronic monitoring to secure non-monetary release.'
  },
  {
    key: 'employment-labor-attorney',
    role: 'Employment & Workplace Labor Law Attorney',
    industry: 'Employment Law, Labor Relations & Workplace Disputes',
    category: 'Legal & Compliance',
    rate: 360,
    hours: 15,
    badge: 'EEOC & Title VII Civil Rights Standards Aligned',
    tags: ['Employment Law', 'Severance Agreement', 'EEOC Response', 'Non-Compete', 'FLSA Wage Dispute'],
    overview: 'Engineered for employment lawyers representing employers or executives. Automates separation and severance agreements, EEOC position statements, wage-and-hour compliance audits, and non-compete reviews.',
    chainTitle1: 'Executive Separation & Comprehensive General Release Agreement',
    chainObj1: 'Draft enforceable severance agreements with ADEA 21-day review periods, non-disparagement, and trade secret protections.',
    chainTitle2: 'Formal EEOC Position Statement & Workplace Investigation Defense',
    chainObj2: 'Structure employer responses to discrimination charges demonstrating legitimate, non-discriminatory business reasons.'
  },
  {
    key: 'immigration-law-attorney',
    role: 'Immigration Attorney & Business Visa Strategist',
    industry: 'Immigration Law, Employment Visas & Naturalization',
    category: 'Legal & Compliance',
    rate: 320,
    hours: 16,
    badge: 'AILA American Immigration Lawyers Association Aligned',
    tags: ['Immigration Law', 'EB-1 Visa', 'H-1B Visa', 'O-1 Extraordinary Ability', 'USCIS Petition', 'RFE Response'],
    overview: 'Designed for immigration attorneys and corporate global mobility leads. Automates O-1/EB-1 extraordinary ability petition letters, H-1B specialty occupation RFE responses, and immigrant visa cover letters.',
    chainTitle1: 'EB-1A / O-1 Extraordinary Ability Petition Cover Letter & Evidence Matrix',
    chainObj1: 'Map candidate publications, judging roles, and major media coverage directly to the 8 regulatory USCIS criteria.',
    chainTitle2: 'USCIS Request for Evidence (RFE) Rebuttal on Specialty Occupation',
    chainObj2: 'Draft authoritative RFE responses citing O*NET occupational benchmarks and expert opinion letters.'
  },
  {
    key: 'estate-planning-probate-attorney',
    role: 'Estate Planning, Trust & Probate Attorney',
    industry: 'Estate Planning, Revocable Living Trusts & Wealth Transfer',
    category: 'Legal & Compliance',
    rate: 340,
    hours: 14,
    badge: 'ACTEC Estate Planning & Uniform Probate Code Aligned',
    tags: ['Estate Planning', 'Living Trust', 'Last Will', 'Power of Attorney', 'Healthcare Directive', 'Probate'],
    overview: 'Built for estate planning attorneys and probate specialists. Automates Revocable Living Trust summaries, pour-over wills, durable financial powers of attorney, and statutory probate petitions.',
    chainTitle1: 'Revocable Living Trust Portfolio Executive Summary & Funding Guide',
    chainObj1: 'Produce clear client-facing summaries explaining trustee succession, incapacity provisions, and bank account retitling.',
    chainTitle2: 'Comprehensive Advance Health Care Directive & Financial Power of Attorney',
    chainObj2: 'Draft court-recognized medical power of attorney documents with HIPAA releases and end-of-life wishes.'
  },

  // Everyday Healthcare & Clinical Services
  {
    key: 'veterinarian-animal-clinic',
    role: 'Veterinarian & Animal Hospital Medical Director',
    industry: 'Veterinary Medicine & Companion Animal Practice',
    category: 'Healthcare & Clinical',
    rate: 175,
    hours: 15,
    badge: 'AVMA & AAHA Veterinary Hospital Accreditation Aligned',
    tags: ['Veterinarian', 'SOAP Notes', 'Companion Animal', 'Surgery Discharge', 'Pharmacology', 'AAHA Standards'],
    overview: 'Engineered specifically for veterinarians and animal hospital owners. Automates veterinary SOAP notes, surgical post-operative discharge instructions, drug dosage calculations, and client treatment estimates.',
    chainTitle1: 'Veterinary Clinical SOAP Note & Canine Surgical Discharge Protocol',
    chainObj1: 'Generate an AAHA-compliant veterinary clinical SOAP note and customized client post-op recovery instructions.',
    chainTitle2: 'Weight-Based Veterinary Anesthetic Protocol & Multi-Modal Pain Management Plan',
    chainObj2: 'Calculate precise pre-med, induction, and post-operative analgesic dosages based on patient weight and bloodwork.'
  },
  {
    key: 'family-dentist-orthodontist',
    role: 'Family Dentist & Orthodontic Practice Owner',
    industry: 'General Dentistry, Orthodontics & Oral Healthcare',
    category: 'Healthcare & Clinical',
    rate: 240,
    hours: 14,
    badge: 'ADA American Dental Association Clinical Guidelines',
    tags: ['Dentist', 'Dental SOAP Notes', 'Case Acceptance', 'Invisalign Treatment Plan', 'Dental Insurance Appeal'],
    overview: 'Built for general dentists, cosmetic dentists, and orthodontists. Automates clinical dental charting, comprehensive treatment plan presentations, insurance denial appeal letters, and post-extraction instructions.',
    chainTitle1: 'Comprehensive Dental Treatment Plan & Multi-Option Case Acceptance Narrative',
    chainObj1: 'Present restorative treatment options (implants vs bridge) in compelling, clear patient language that boosts case acceptance.',
    chainTitle2: 'Dental Insurance Pre-Authorization Denial Appeal Letter',
    chainObj2: 'Draft formal clinical appeals citing radiographic evidence and ADA clinical necessity guidelines for crown/bone-graft coverage.'
  },
  {
    key: 'community-pharmacist',
    role: 'Independent Retail & Clinical Pharmacist',
    industry: 'Community Pharmacy, Dispensing & Drug Utilization',
    category: 'Healthcare & Clinical',
    rate: 130,
    hours: 14,
    badge: 'APhA & DEA Title 21 Controlled Substances Aligned',
    tags: ['Pharmacist', 'Drug Interaction', 'MTM Consultation', 'Prescription Transfer', 'Immunization'],
    overview: 'Designed for independent retail pharmacists and pharmacy managers. Automates Drug-Drug Interaction (DDI) clinical intervention notes, Medication Therapy Management (MTM) reviews, and physician prescription clarification faxes.',
    chainTitle1: 'Clinical Drug-Drug Interaction (DDI) Triage & Prescriber Clarification Memo',
    chainObj1: 'Identify high-risk pharmacological interactions and formulate alternative drug recommendations for the prescribing physician.',
    chainTitle2: 'Comprehensive Medication Therapy Management (MTM) Patient Action Plan',
    chainObj2: 'Draft personalized medication schedules and adherence strategies for polypharmacy geriatric patients.'
  },
  {
    key: 'chiropractor-spine-wellness',
    role: 'Doctor of Chiropractic (DC) & Rehabilitation Lead',
    industry: 'Chiropractic Medicine, Spinal Alignment & Physical Rehab',
    category: 'Healthcare & Clinical',
    rate: 140,
    hours: 14,
    badge: 'ACA American Chiropractic Association Standards',
    tags: ['Chiropractor', 'Spinal Exam', 'SOAP Note', 'Personal Injury Medical Lien', 'Posture Rehab'],
    overview: 'Built for chiropractors and sports rehab directors. Automates initial spinal examination documentation, PI (Personal Injury) medical lien narrative reports, and home postural exercise routines.',
    chainTitle1: 'Personal Injury (PI) Motor Vehicle Collision Narrative Report & Causation Brief',
    chainObj1: 'Draft comprehensive medical narrative reports establishing collision biomechanics, objective spinal subluxations, and future care prognosis for attorneys.',
    chainTitle2: 'Daily Subluxation SOAP Progress Note & Spinal Adjustment Record',
    chainObj2: 'Record standardized orthopedic test findings, segment listings, and therapeutic modality codes.'
  },
  {
    key: 'optometrist-eye-care',
    role: 'Doctor of Optometry (OD) & Vision Care Director',
    industry: 'Optometry, Ocular Disease & Refractive Vision',
    category: 'Healthcare & Clinical',
    rate: 160,
    hours: 13,
    badge: 'AOA American Optometric Association Aligned',
    tags: ['Optometrist', 'Eye Exam SOAP', 'Glaucoma Management', 'Contact Lens Fitting', 'Refraction'],
    overview: 'Engineered for optometrists and eye care clinic directors. Automates comprehensive eye exam SOAP documentation, glaucoma management records, specialty contact lens evaluations, and surgical co-management referrals.',
    chainTitle1: 'Comprehensive Eye Examination SOAP Record & Diabetic Retinopathy Screening',
    chainObj1: 'Document visual acuities, intraocular pressures (IOP), slit lamp findings, and fundus examination staging.',
    chainTitle2: 'Cataract & Refractive Surgery (LASIK) Co-Management Referral Letter',
    chainObj2: 'Synthesize pre-operative measurements and corneal topography notes for the ophthalmic surgeon.'
  },
  {
    key: 'home-health-agency-director',
    role: 'Home Health Care Agency Administrator',
    industry: 'In-Home Senior Care, Non-Medical Nursing & Assisted Living',
    category: 'Healthcare & Clinical',
    rate: 115,
    hours: 16,
    badge: 'CMS Medicare Conditions of Participation (CoPs) Aligned',
    tags: ['Home Health', 'Care Plan', 'OASIS Assessment', 'Caregiver Staffing', 'Senior Fall Prevention'],
    overview: 'Built for home health agency owners and clinical nurse supervisors. Automates OASIS assessment care plans, caregiver shift matching schedules, fall prevention home audits, and family progress updates.',
    chainTitle1: 'Comprehensive In-Home Senior Care Plan & Daily Activity of Daily Living (ADL) Guide',
    chainObj1: 'Structure detailed caregiver shifts outlining mobility assistance, medication reminders, and specialized dementia engagement.',
    chainTitle2: 'Senior Home Fall Risk Assessment & Home Modification Checklist',
    chainObj2: 'Audit client residential environments for throw rugs, grab bar needs, and lighting hazards to prevent hospital readmissions.'
  },

  // Local Sales, Real Estate & Logistics
  {
    key: 'residential-realtor-listing-agent',
    role: 'Residential Real Estate Listing Agent & Realtor',
    industry: 'Residential Real Estate Brokerage & Home Sales',
    category: 'Real Estate',
    rate: 150,
    hours: 16,
    badge: 'NAR Code of Ethics & MLS Standards Aligned',
    tags: ['Realtor', 'Listing Description', 'MLS', 'CMA Presentation', 'Open House', 'Home Sellers'],
    overview: 'Engineered specifically for residential real estate agents and listing specialists. Automates architectural MLS listing descriptions, comparative market analysis (CMA) seller presentations, price-reduction objection scripts, and open house marketing.',
    chainTitle1: 'Architectural MLS Listing Description & Luxury Lifestyle Story',
    chainObj1: 'Draft a compelling, high-converting MLS property description and social media teaser that highlights finishes and drives high open-house turnout.',
    chainTitle2: 'Seller Comparative Market Analysis (CMA) Presentation & Pricing Objection Script',
    chainObj2: 'Structure data-backed pricing arguments overcoming seller overpricing objections using hyper-local absorption rates.'
  },
  {
    key: 'independent-car-dealership-owner',
    role: 'Automotive Dealership Owner & F&I Director',
    industry: 'Independent Auto Sales, Finance & Insurance (F&I)',
    category: 'Real Estate',
    rate: 125,
    hours: 15,
    badge: 'NIADA & Truth in Lending Act (TILA) Aligned',
    tags: ['Car Dealership', 'F&I Menu', 'Vehicle Description', 'Trade-In Appraisal', 'Auto Sales'],
    overview: 'Built for independent car dealers and F&I managers. Automates high-converting online vehicle descriptions (VDP), vehicle trade-in objection scripts, and F&I warranty presentation menus.',
    chainTitle1: 'Online Vehicle Detail Page (VDP) Copy & High-Converting Inventory Narrative',
    chainObj1: 'Write compelling, Carfax-highlighting online vehicle descriptions highlighting clean title, service records, and packages.',
    chainTitle2: 'F&I Extended Warranty & Gap Insurance Menu Presentation Script',
    chainObj2: 'Overcome customer objections to warranty and protection packages using transparent risk-cost comparisons.'
  },
  {
    key: 'public-insurance-adjuster',
    role: 'Licensed Public Insurance Adjuster',
    industry: 'Property Insurance Claims, Loss Appraisal & Recovery',
    category: 'Real Estate',
    rate: 160,
    hours: 15,
    badge: 'NAPIA National Association of Public Insurance Adjusters',
    tags: ['Public Adjuster', 'Property Claim', 'Insurance Dispute', 'Proof of Loss', 'Scope of Damage'],
    overview: 'Designed for public adjusters representing policyholders. Automates detailed damage scope narratives, formal Sworn Proof of Loss filings, and insurance carrier low-ball rebuttal briefs.',
    chainTitle1: 'Comprehensive Property Damage Scope Narrative & Carrier Discrepancy Brief',
    chainObj1: 'Expose omitted carrier line items (overhead, matching continuous flooring, code upgrades) to maximize claim recovery.',
    chainTitle2: 'Formal Sworn Statement in Proof of Loss & Policyholder Appraisal Demand',
    chainObj2: 'Draft formal statutory demand letters triggering the policy appraisal clause to break settlement deadlocks.'
  },
  {
    key: 'residential-property-manager',
    role: 'Residential Property Manager & Landlord Lead',
    industry: 'Multifamily & Single-Family Residential Leasing',
    category: 'Real Estate',
    rate: 90,
    hours: 16,
    badge: 'IREM & Fair Housing Act (FHA) Certified',
    tags: ['Property Manager', 'Tenant Lease', 'Rent Collection', 'Move-In Inspection', 'Eviction Notice'],
    overview: 'Built for property managers and landlords. Automates residential lease agreements, security deposit itemization letters, tenant noise violation notices, and vendor maintenance dispatch orders.',
    chainTitle1: 'Security Deposit Itemized Disposition & Statutory Deduction Letter',
    chainObj1: 'Draft legally defensible security deposit deduction accounting letters itemizing tenant damages vs ordinary wear and tear.',
    chainTitle2: 'Tenant Lease Violation Notice & Right to Cure Memorandum',
    chainObj2: 'Formulate formal statutory notices addressing unauthorized pets, chronic noise, or unauthorized occupants.'
  },

  // Creative & Media Arts
  {
    key: 'wedding-commercial-photographer',
    role: 'Commercial & Luxury Wedding Photographer',
    industry: 'Professional Photography, Creative Production & Licensing',
    category: 'Creative Arts & Media',
    rate: 110,
    hours: 14,
    badge: 'PPA Professional Photographers of America Aligned',
    tags: ['Photographer', 'Wedding Photography', 'Shot List', 'Client Agreement', 'Commercial Licensing'],
    overview: 'Engineered for professional photographers and studio owners. Automates wedding shot list timelines, commercial image licensing agreements, client questionnaire onboarding, and post-session gallery delivery emails.',
    chainTitle1: 'Full-Day Wedding Photography Shot List & Lighting Timeline',
    chainObj1: 'Structure golden-hour portraits, family formal groupings, and ceremony angles with buffer times for delays.',
    chainTitle2: 'Commercial Photography Usage Rights & Copyright Licensing Agreement',
    chainObj2: 'Draft legally protective commercial licensing agreements specifying media territory, term limits, and exclusivity.'
  },
  {
    key: 'commercial-video-producer',
    role: 'Video Production Director & Commercial Cinematographer',
    industry: 'Video Production, Brand Documentaries & Commercials',
    category: 'Creative Arts & Media',
    rate: 125,
    hours: 15,
    badge: 'SMPTE & Broadcast Media Production Standards',
    tags: ['Video Producer', 'Storyboard', 'Video Treatment', 'Production Call Sheet', 'Voiceover Script'],
    overview: 'Built for commercial video producers and creative directors. Automates video pitch treatments, two-column audio-visual scripts, production call sheets, and client revision request boundaries.',
    chainTitle1: 'Commercial Video Treatment & Client Creative Concept Pitch Deck',
    chainObj1: 'Articulate tone, visual style, lighting references, and emotional narrative arc to win client commercial bids.',
    chainTitle2: 'Two-Column AV Script (Visual Cues + Voiceover / Dialogue Breakdown)',
    chainObj2: 'Draft synchronized video production scripts detailing B-roll b-roll instructions, sound effects, and timing.'
  },
  {
    key: 'residential-interior-designer',
    role: 'High-End Residential Interior Designer & Stager',
    industry: 'Interior Design, Space Planning & Architectural Finishes',
    category: 'Creative Arts & Media',
    rate: 115,
    hours: 14,
    badge: 'ASID & NCIDQ Interior Design Certified',
    tags: ['Interior Designer', 'Design Concept', 'FF&E Schedule', 'Client Presentation', 'Room Staging'],
    overview: 'Designed for residential interior designers and home stagers. Automates Furniture, Fixtures & Equipment (FF&E) specification schedules, design concept narratives, and client trade-discount pricing agreements.',
    chainTitle1: 'Complete Room-by-Room FF&E Specification & Purchasing Schedule',
    chainObj1: 'Compile itemized furniture, lighting, and textile specifications with lead times, trade pricing, and finish codes.',
    chainTitle2: 'Client Design Concept Narrative & Space Planning Presentation',
    chainObj2: 'Draft evocative design story narratives describing textures, lighting layers, and architectural transitions.'
  },

  // Non-Profit & Community
  {
    key: 'nonprofit-executive-director',
    role: 'Non-Profit Executive Director & Grant Strategist',
    industry: 'Non-Profit Management, Philanthropy & Public Good',
    category: 'Executive & Strategy',
    rate: 95,
    hours: 16,
    badge: 'IRS 501(c)(3) & Association of Fundraising Professionals Aligned',
    tags: ['Non-Profit', 'Grant Proposal', 'Donor Stewardship', 'Board of Directors', 'Fundraising Campaign'],
    overview: 'Engineered for non-profit executive directors and development leads. Automates institutional foundation grant proposals, major donor stewardship letters, annual impact reports, and board meeting packets.',
    chainTitle1: 'Foundation Grant Proposal & Programmatic Impact Narrative',
    chainObj1: 'Structure compelling grant proposals detailing problem statement, measurable outcomes, and programmatic sustainability.',
    chainTitle2: 'Major Donor Capital Campaign Appeal & Personalized Stewardship Letter',
    chainObj2: 'Draft heartfelt, donor-centric appeals connecting philanthropic contributions to transformative community results.'
  }
];

async function run() {
  console.log(`Processing ${EXISTING_ROLES.length} existing roles + ${BLUEPRINTS.length} new non-tech roles...`);

  // Augment existing roles
  const upgradedExisting = EXISTING_ROLES.map((r) => ({
    ...r,
    chatGptSystemPrompt: r.chatGptSystemPrompt || `You are an elite, accredited ${r.role} operating under ${r.badge}.\n\n### Primary Principles:\n1. Adhere strictly to industry compliance standards (${r.badge}).\n2. Provide institutional, rigorous professional analysis.\n3. Never output vague conversational generalities; deliver structured, client-facing work products.`,
    aiGovernanceGuidelines: r.aiGovernanceGuidelines || [
      `Strict adherence to ${r.badge} regulatory and professional ethics codes.`,
      'Mandatory client data de-identification: redact personal names, account numbers, and proprietary identifiers.',
      'Negative constraint verification: inspect every generated deliverable for synthetic or unverified citations.',
      'Enforce minimum human practitioner review for high-liability transactions or clinical decisions.'
    ],
    onboardingRoadmap: r.onboardingRoadmap || [
      {
        window: 'Day 1 - 7: Workspace & System Prompt Configuration',
        objective: `Initialize Claude Projects and Custom GPT workspaces for ${r.role}.`,
        deliverables: [
          'Upload Master System Prompt into Claude Projects Custom Instructions.',
          'Import knowledge base guidelines into project memory.',
          'Execute baseline test run on prompt chain #1 with past sanitized files.'
        ],
        evaluationBenchmark: '100% adherence to corporate tone and zero hallucination verified.'
      },
      {
        window: 'Day 8 - 30: Routine Operational Task Deployment',
        objective: 'Replace manual repetitive drafting with automated prompt chains.',
        deliverables: [
          'Deploy daily triage and documentation prompt chains across live workflow.',
          'Train support staff on input variable formatting.',
          'Track hours saved weekly against firm baseline.'
        ],
        evaluationBenchmark: `Reclaim minimum ${r.hoursSavedWeekly} hours/week of billable time.`
      },
      {
        window: 'Day 31 - 60: Multi-Step Automation & API Integration',
        objective: 'Connect prompt workflows to Zapier, Make.com, or internal CRMs.',
        deliverables: [
          'Configure webhook triggers for inbound client inquiries or contract drafts.',
          'Automate structured preliminary review memos sent directly to team email/Slack.',
          'Implement monthly audit log of AI-assisted outputs.'
        ],
        evaluationBenchmark: 'Zero manual copy-pasting for recurring daily intakes.'
      },
      {
        window: 'Day 61 - 90: Institutional Mastery & Enterprise Scaling',
        objective: 'Scale prompt operating system across entire practice or department.',
        deliverables: [
          'Conduct quarterly prompt refinement based on edge-case feedback.',
          'Certify all team members on firm AI Governance Protocols.',
          'Document firm ROI and client turnaround velocity acceleration.'
        ],
        evaluationBenchmark: 'Firm achieves 3x faster client turnaround velocity.'
      }
    ],
    auditChecklistTasks: r.auditChecklistTasks || [
      `Verify input variables strictly align with governing standard: ${r.badge}.`,
      'Confirm zero private client identifiers or confidential details are included in raw prompt.',
      'Inspect generated output against statutory cross-references and industry quality benchmarks.',
      'Verify quantitative figures and cost estimates balance to 100% precision.',
      'Log execution timestamp and accountable senior practitioner initials in compliance record.'
    ],
    promptChains: r.promptChains.map((c) => ({
      ...c,
      estimatedCostUsd: c.estimatedCostUsd || Number(((c.estimatedTokens / 1000) * 0.003).toFixed(4)),
      chatGptPrompt: c.chatGptPrompt || c.fullPrompt.replace(/<system_role>[\s\S]*?<\/system_role>/g, '').trim()
    }))
  }));

  // Build the 50 new roles from blueprints
  const compiledNew: RoleSystemKit[] = BLUEPRINTS.map((b) => {
    const slug = `${b.key}-ai-prompts-system-workflows`;
    const monthlyValue = b.hours * b.rate * 4;

    return {
      slug,
      role: b.role,
      industry: b.industry,
      category: b.category,
      headline: `Production AI Systems & Prompt Workflows for ${b.role}`,
      subheadline: `Deploy multi-step Chain-of-Thought AI prompt chains, Claude Project knowledge bases, and executive workflow automations engineered specifically for ${b.role}.`,
      badge: b.badge,
      hoursSavedWeekly: b.hours,
      averageHourlyRate: b.rate,
      monthlyValueCreated: monthlyValue,
      tags: b.tags,
      overview: b.overview,
      masterSystemPrompt: `<system_role>
You are an authoritative, elite-level ${b.role} with 15+ years of institutional experience in ${b.industry}. You operate under strict adherence to ${b.badge}.
</system_role>

<domain_standards>
- Governing Standard: ${b.badge}
- High-level mastery of ${b.industry} operations, client communications, and quality assurance.
- Multi-step Chain-of-Thought reasoning incorporating real-world constraints, liability bounds, and edge cases.
</domain_standards>

<strict_negative_constraints>
- Never provide generic, uncalibrated responses. Every output must reflect real-world professional terminology and statutory guidelines.
- Never omit practical execution details, quantitative metrics, or risk management trade-offs.
- Strictly adhere to established industry frameworks and compliance mandates.
</strict_negative_constraints>

<output_formatting_protocol>
Deliver institutional, structured outputs utilizing markdown headings, clear tables, concrete formulas, and step-by-step implementation playbooks.
</output_formatting_protocol>`,
      chatGptSystemPrompt: `You are an elite, highly accredited ${b.role} operating under ${b.badge}.\n\n### Primary Principles:\n1. Adhere strictly to industry compliance standards (${b.badge}).\n2. Provide institutional, rigorous professional analysis.\n3. Never output vague conversational generalities; deliver structured, client-facing work products.`,
      aiGovernanceGuidelines: [
        `Strict adherence to ${b.badge} regulatory standards.`,
        'Mandatory client data de-identification prior to prompt execution.',
        'Negative constraint verification: inspect every generated deliverable for synthetic or unverified citations.',
        'Enforce professional practitioner review for all high-stakes outputs.'
      ],
      onboardingRoadmap: [
        {
          window: 'Day 1 - 7: Workspace & System Prompt Configuration',
          objective: `Initialize Claude Projects and Custom GPT workspaces for ${b.role}.`,
          deliverables: [
            'Upload Master System Prompt into Claude Projects Custom Instructions.',
            'Import knowledge base guidelines into project memory.',
            'Execute baseline test run on prompt chain #1 with past sanitized files.'
          ],
          evaluationBenchmark: '100% adherence to professional standards verified.'
        },
        {
          window: 'Day 8 - 30: Routine Operational Task Deployment',
          objective: 'Replace manual repetitive drafting with automated prompt chains.',
          deliverables: [
            'Deploy daily triage and documentation prompt chains across live workflow.',
            'Train support staff on input variable formatting.',
            'Track hours saved weekly against firm baseline.'
          ],
          evaluationBenchmark: `Reclaim minimum ${b.hours} hours/week of productive time.`
        },
        {
          window: 'Day 31 - 60: Multi-Step Automation & API Integration',
          objective: 'Connect prompt workflows to Zapier, Make.com, or internal tools.',
          deliverables: [
            'Configure webhook triggers for inbound client inquiries or intake forms.',
            'Automate structured preliminary review memos sent directly to team email/Slack.',
            'Implement monthly audit log of AI-assisted outputs.'
          ],
          evaluationBenchmark: 'Zero manual copy-pasting for recurring daily intakes.'
        },
        {
          window: 'Day 61 - 90: Institutional Mastery & Enterprise Scaling',
          objective: 'Scale prompt operating system across entire practice or business.',
          deliverables: [
            'Conduct quarterly prompt refinement based on client feedback.',
            'Certify all team members on firm AI Governance Protocols.',
            'Document firm ROI and client turnaround velocity acceleration.'
          ],
          evaluationBenchmark: 'Business achieves 3x faster client turnaround velocity.'
        }
      ],
      auditChecklistTasks: [
        `Verify input variables strictly align with governing standard: ${b.badge}.`,
        'Confirm zero private client identifiers or confidential details are included in raw prompt.',
        'Inspect generated output against statutory cross-references and industry quality benchmarks.',
        'Verify quantitative figures and cost estimates balance to 100% precision.',
        'Log execution timestamp and accountable senior practitioner initials in compliance record.'
      ],
      promptChains: [
        {
          id: `${b.key.substring(0, 3).toUpperCase()}-01`,
          title: b.chainTitle1,
          category: 'Core Operations',
          objective: b.chainObj1,
          recommendedModel: 'Claude 3.5 Sonnet',
          complexity: 'Enterprise Multi-Step',
          estimatedTokens: 1850,
          estimatedCostUsd: 0.0055,
          variables: [
            { name: 'PRIMARY_CASE_DATA', description: 'Core operational parameters, data inputs, and constraints', defaultValue: `Standard active case files and specifications in ${b.industry}.`, required: true },
            { name: 'TARGET_OBJECTIVE', description: 'Desired business outcome or deliverable specification', defaultValue: b.chainObj1, required: true },
            { name: 'REGULATORY_STANDARD', description: 'Applicable legal or industry quality code', defaultValue: b.badge, required: true }
          ],
          chainSteps: [
            'Step 1: Input triage and regulatory boundary verification.',
            'Step 2: Deep domain analysis and risk exposure calculation.',
            'Step 3: Synthesis of final high-value deliverable with exact professional terminology.'
          ],
          fullPrompt: `<system_role>
You are an elite ${b.role} executing a high-stakes operational workflow under ${b.badge}.
</system_role>

<input_data>
Case Parameters: {{PRIMARY_CASE_DATA}}
Target Objective: {{TARGET_OBJECTIVE}}
Governing Standard: {{REGULATORY_STANDARD}}
</input_data>

<instructions>
1. Execute a comprehensive professional evaluation using established ${b.industry} best practices.
2. Structure the deliverable into:
   - Executive Brief & Core Findings
   - Technical / Analytical Deep-Dive
   - Quantitative Metrics & Risk Matrix
   - Actionable Step-by-Step Implementation Protocol
3. Avoid generic filler; produce ready-to-deploy, client-facing professional work product.
</instructions>`,
          chatGptPrompt: `Execute a comprehensive professional evaluation using established ${b.industry} best practices.\n\nInput Data:\nCase Parameters: {{PRIMARY_CASE_DATA}}\nTarget Objective: {{TARGET_OBJECTIVE}}\nGoverning Standard: {{REGULATORY_STANDARD}}\n\nStructure the deliverable into an Executive Brief, Technical Deep-Dive, Risk Matrix, and Actionable Implementation Protocol.`,
          sampleInput: {
            PRIMARY_CASE_DATA: `High-priority operational execution in ${b.industry}.`,
            TARGET_OBJECTIVE: b.chainObj1,
            REGULATORY_STANDARD: b.badge
          },
          sampleOutput: `### ${b.role.toUpperCase()} | EXECUTIVE WORK PRODUCT SPECIFICATION

#### 1. Strategic Appraisal & Regulatory Scoping
Under authoritative ${b.badge} guidelines, the submitted operational dataset has been audited for systemic compliance, latency hazards, and risk exposure. 

#### 2. Key Diagnostic Findings
- **Operational Alignment:** 94.2% compliance with baseline statutory frameworks.
- **Identified Bottlenecks:** Manual data handovers and non-standardized documentation contribute to an estimated ${b.hours} hours of weekly latency per senior practitioner.
- **Mitigation Protocol:** Implementation of the automated multi-tier verification matrix reduces risk probability to < 1.0%.

#### 3. Execution Action Matrix
| Phase | Action Protocol | Accountable Role | Target Standard |
|---|---|---|---|
| Phase 1 | Baseline Data Normalization | Lead Practitioner | ${b.badge} |
| Phase 2 | Execution & Quality Control | Senior Specialist | Zero-Defect SLA |
| Phase 3 | Final Review & Archival | Managing Director | Institutional Sign-Off |`,
          practicalUseNote: `Save this prompt in your Claude Projects or ChatGPT workspace as your daily co-pilot for high-volume ${b.industry} tasks.`
        },
        {
          id: `${b.key.substring(0, 3).toUpperCase()}-02`,
          title: b.chainTitle2,
          category: 'Risk & Quality Assurance',
          objective: b.chainObj2,
          recommendedModel: 'Claude 3.5 Sonnet',
          complexity: 'Advanced',
          estimatedTokens: 1650,
          estimatedCostUsd: 0.0049,
          variables: [
            { name: 'AUDIT_SUBJECT', description: 'Matter, contract, or client situation to review', defaultValue: `Active client case and operational parameters in ${b.industry}.`, required: true },
            { name: 'RISK_TOLERANCE', description: 'Institutional risk threshold', defaultValue: 'Strict / Zero-Tolerance', required: true }
          ],
          chainSteps: [
            'Step 1: Rapid anomaly and liability detection.',
            'Step 2: Scoring against industry benchmarks.',
            'Step 3: Corrective action memorandum drafting.'
          ],
          fullPrompt: `<system_role>
You are an expert ${b.role} performing an urgent quality assurance and risk audit.
</system_role>

<audit_input>
Subject: {{AUDIT_SUBJECT}}
Tolerance: {{RISK_TOLERANCE}}
Standard: ${b.badge}
</audit_input>

<output_format>
Deliver an urgent Risk Triage Memo:
1. Critical Vulnerability Summary
2. Benchmarked Risk Rating (Low / Moderate / Severe)
3. Immediate Corrective Interventions
</output_format>`,
          chatGptPrompt: `Perform an urgent quality assurance and risk audit under ${b.badge}.\n\nSubject: {{AUDIT_SUBJECT}}\nTolerance: {{RISK_TOLERANCE}}\n\nDeliver an urgent Risk Triage Memo with Critical Vulnerability Summary, Risk Rating, and Corrective Interventions.`,
          sampleInput: {
            AUDIT_SUBJECT: `Internal operating workflow and documentation in ${b.industry}.`,
            RISK_TOLERANCE: 'Strict'
          },
          sampleOutput: `### RISK TRIAGE & QUALITY AUDIT REPORT
**COMPLIANCE STANDARD:** ${b.badge}

1. **Executive Vulnerability Summary:** Audited operational protocols identified zero catastrophic statutory breaches, but revealed workflow friction in documentation cadence.
2. **Risk Rating: LOW-MODERATE.** Systemic controls are robust, requiring only minor standardization of intake parameters.
3. **Corrective Action Plan:** Deploy standardized validation gates prior to final client sign-off.`,
          practicalUseNote: 'Run incoming client materials through this prompt before commencing billable execution.'
        }
      ],
      automationRecipes: [
        {
          title: `${b.role} Automated Client Intake Pipeline`,
          tooling: 'Zapier / Make + Claude API + Slack / Google Docs',
          trigger: 'New client inquiry form submission or file upload',
          executionSteps: [
            'Extract raw input fields from web intake form.',
            `Run through ${b.role} core triage prompt chain.`,
            'Generate structured briefing memo and notify practitioner via email or Slack.'
          ],
          expectedOutput: 'Comprehensive, structured operational brief prepared before the practitioner opens the file.'
        }
      ],
      knowledgeBaseSnippets: [
        {
          fileName: `${b.key}_operating_standard.md`,
          purpose: `Institutional knowledge file for ${b.role} Claude Project.`,
          content: `# ${b.role} Operating Baseline\nGoverned under ${b.badge}.\nMandate strict adherence to industry best practices and quantitative accountability.`
        }
      ],
      faq: [
        {
          question: `How does this prompt kit save ${b.hours} hours every week?`,
          answer: `By replacing blank-page drafting with pre-engineered, multi-step Chain-of-Thought prompts that incorporate ${b.badge} standards, practitioners eliminate repetitive formatting and analysis cycles.`
        },
        {
          question: 'Can I customize these prompts for my specific business or firm?',
          answer: 'Yes. All prompt chains include customizable variables and can be imported directly into Claude Projects, ChatGPT Custom GPTs, or local API tools.'
        }
      ]
    };
  });

  const TOTAL_ROLES = [...upgradedExisting, ...compiledNew];
  console.log(`Total Compiled Roles: ${TOTAL_ROLES.length}`);

  const fileContent = `// =====================================================================
// AUTOGENERATED PRODUCTION DATASET: PROMPT SYSTEM PRO (${TOTAL_ROLES.length} ROLES)
// =====================================================================
import { RoleSystemKit } from '@/types';

export const ALL_ROLES: RoleSystemKit[] = ${JSON.stringify(TOTAL_ROLES, null, 2)};

export function getAllRoleSlugs(): string[] {
  return ALL_ROLES.map((r) => r.slug);
}

export function getRoleBySlug(slug: string): RoleSystemKit | undefined {
  return ALL_ROLES.find((r) => r.slug === slug);
}

export function getRolesByCategory(category: RoleSystemKit['category']): RoleSystemKit[] {
  return ALL_ROLES.filter((r) => r.category === category);
}

export function getAllCategories(): RoleSystemKit['category'][] {
  return Array.from(new Set(ALL_ROLES.map((r) => r.category)));
}
`;

  const outputPath = path.resolve(__dirname, '../src/data/roles.ts');
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`Successfully wrote ${TOTAL_ROLES.length} roles to ${outputPath}!`);
}

run().catch(console.error);
