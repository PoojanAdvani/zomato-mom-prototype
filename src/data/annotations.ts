// PM annotation registry — the "why" behind each screen/decision.
// Rendered as toggleable callouts throughout the prototype.

export interface Annotation {
  id: string
  title: string
  body: string
  /** the research insight or metric this decision ties back to */
  source: string
}

export const annotations: Record<string, Annotation> = {
  'discovery-banner': {
    id: 'discovery-banner',
    title: 'Lead with trust, not menus',
    body:
      'Research showed users quit dabba services within a week over trust (spice, hygiene, cold rotis). So discovery leads with "Verified Ingredients" + "Served Hot" — the exact objections — before any food photo.',
    source: 'Research: 3/3 dabba users quit in a week · Persona frustrations',
  },
  'discovery-persona': {
    id: 'discovery-persona',
    title: 'Built for Mohit',
    body:
      'We prioritized the 20–25 bachelor working professional living away from home. Every default (2 meals/day, low-masala, subscription) is tuned to this segment, not a generic foodie.',
    source: 'Prioritized segment: 20–25 yr working professionals',
  },
  'chef-verified-badge': {
    id: 'chef-verified-badge',
    title: 'Verification is the moat',
    body:
      'The green "Verified Ingredients" tag is earned by sourcing groceries via Blinkit. It turns an invisible quality claim into a checkable fact — the core differentiator vs. dabbawalas.',
    source: 'Blinkit integration · Positioning: High Trust quadrant',
  },
  'chef-ingredients': {
    id: 'chef-ingredients',
    title: 'Provenance sells quality',
    body:
      'Showing "Amul Butter, MP Atta" makes abstract quality concrete. The persona explicitly values "quality of oil & ingredients used" — so we surface brands, not adjectives.',
    source: 'Persona values: quality of oil/ingredients',
  },
  'customize-subscribe': {
    id: 'customize-subscribe',
    title: 'Subscription = the North Star',
    body:
      'The North Star metric is meals served to *subscribed* customers/month. The "Subscribe Daily" toggle is deliberately the highest-contrast action — retention is the whole business model.',
    source: 'North Star: meals / subscribed user / month',
  },
  'customize-base': {
    id: 'customize-base',
    title: 'Solve "lack of choice"',
    body:
      'A top reason users left dabbas was "lack of choice" and "small meal sizes." Base + add-on customization directly addresses both without exploding chef complexity.',
    source: 'Research: reasons for shifting from dabba to maid',
  },
  'tracking-hot': {
    id: 'tracking-hot',
    title: 'The "Served Hot" promise, visualized',
    body:
      'Cold food is the #1 feasibility risk. A strict delivery radius keeps ETA low, and we make the temperature promise visible so the user trusts it every single day.',
    source: 'Feasibility risk: cold food · Mitigation: strict radius',
  },
  'chef-dashboard': {
    id: 'chef-dashboard',
    title: 'Supply needs a business case',
    body:
      'Chefs join for income. The dashboard leads with daily earnings (₹600–₹1,500) because the #1 supply barrier is convincing chefs the unit economics work.',
    source: 'Unit economics · Supply barriers',
  },
  'chef-blinkit': {
    id: 'chef-blinkit',
    title: 'Turn a cost into a control',
    body:
      'Chefs already need groceries. Routing that spend through Blinkit gives us (a) bulk-discount economics, (b) an auditable quality trail, and (c) an activation metric — one action, three wins.',
    source: 'Blinkit integration · Viability mitigation: bulk procurement',
  },
  'ops-verification': {
    id: 'ops-verification',
    title: 'Automated integrity check',
    body:
      'Blinkit purchase logs are cross-checked against Zomato order volume. A >25% mismatch means a chef is likely sourcing elsewhere — so it auto-triggers a physical audit instead of manual policing.',
    source: 'Verification rule: >25% mismatch → audit',
  },
  'ops-economics': {
    id: 'ops-economics',
    title: 'Pressure-test viability live',
    body:
      'The biggest viability risk is unfavourable chef economics. This lets a reviewer stress-test the model — drag commission to 25% and watch chef profit to confirm the two-sided balance holds.',
    source: 'Viability risk: unfavourable unit economics',
  },
  'ops-revenue': {
    id: 'ops-revenue',
    title: 'From product outcome to revenue',
    body:
      'This is the exact revenue formula from the shareholder-letter linkage, made interactive — so a leader can see how subscriber growth and commission translate to the top line.',
    source: 'Revenue = subscribers × meals×30 × price × commission',
  },
}
