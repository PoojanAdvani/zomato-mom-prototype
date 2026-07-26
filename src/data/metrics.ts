// Business & product metrics sourced directly from CASE_STUDY.md.
// These drive the interactive Ops / Strategy Console widgets.

// ---- Market Sizing (Section 3) ----
export const marketSizing = [
  {
    key: 'TAM',
    label: 'Total Addressable Market',
    value: 540,
    unit: 'Bn',
    basis: '90% of India’s $600 Bn food consumption market',
  },
  {
    key: 'SAM',
    label: 'Serviceable Addressable Market',
    value: 13,
    unit: 'Bn',
    basis: 'Size of the daily-meal market in India',
  },
  {
    key: 'SOM',
    label: 'Serviceable Obtainable Market',
    value: 0.35,
    unit: 'Bn',
    basis: '$350 Mn — target segment spend in Bengaluru',
  },
] as const

// ---- Unit Economics (Section 4) — per home chef, per 3-meal day ----
export const unitEconomicsDefaults = {
  aov: 300, // ₹250–350
  variableCost: 100, // ₹80–120
  deliveryFee: 60, // ₹60 (delivery agent, not chef margin)
  commissionPct: 20, // Zomato commission
  mealsPerSlot: 12, // 10–15
  slotsPerDay: 4,
}

export const unitEconomicsRanges = {
  aov: { min: 250, max: 350, step: 10 },
  variableCost: { min: 80, max: 120, step: 5 },
  commissionPct: { min: 15, max: 25, step: 1 },
  mealsPerSlot: { min: 10, max: 15, step: 1 },
  slotsPerDay: { min: 1, max: 6, step: 1 },
}

export interface UnitEconResult {
  chefNetPerDay3Meal: number // net profit per one customer's 3 meals
  zomatoCommissionPerDay: number
  chefDailyEarnings: number // across all served customers
  zomatoDailyRevenue: number
  ordersPerDay: number
}

/** Compute chef + Zomato economics from the interactive inputs. */
export function computeUnitEconomics(input: {
  aov: number
  variableCost: number
  deliveryFee: number
  commissionPct: number
  mealsPerSlot: number
  slotsPerDay: number
}): UnitEconResult {
  const { aov, variableCost, deliveryFee, commissionPct, mealsPerSlot, slotsPerDay } = input
  const commission = (aov * commissionPct) / 100
  const chefNetPerDay3Meal = Math.max(0, aov - variableCost - deliveryFee - commission)
  // meals served per day / 3 meals per customer = customers served
  const mealsPerDay = mealsPerSlot * slotsPerDay
  const ordersPerDay = mealsPerDay / 3
  return {
    chefNetPerDay3Meal,
    zomatoCommissionPerDay: commission,
    chefDailyEarnings: Math.round(chefNetPerDay3Meal * ordersPerDay),
    zomatoDailyRevenue: Math.round(commission * ordersPerDay),
    ordersPerDay: Math.round(ordersPerDay),
  }
}

// ---- Revenue Model (Section 1) ----
// Revenue = subscribers × (meals/customer/day × 30) × price/meal × commission%
export const revenueDefaults = {
  subscribers: 20000,
  mealsPerDay: 2, // lunch + dinner
  pricePerMeal: 150,
  commissionPct: 20,
}

export const revenueRanges = {
  subscribers: { min: 1000, max: 200000, step: 1000 },
  mealsPerDay: { min: 1, max: 3, step: 1 },
  pricePerMeal: { min: 100, max: 250, step: 10 },
  commissionPct: { min: 15, max: 25, step: 1 },
}

/** Monthly Zomato Mom revenue in ₹ (from the case-study formula). */
export function computeMonthlyRevenue(input: {
  subscribers: number
  mealsPerDay: number
  pricePerMeal: number
  commissionPct: number
}): number {
  const { subscribers, mealsPerDay, pricePerMeal, commissionPct } = input
  return subscribers * (mealsPerDay * 30) * pricePerMeal * (commissionPct / 100)
}

// ---- Blinkit Verification (Section 5) ----
export const AUDIT_THRESHOLD_PCT = 25 // >25% mismatch => physical audit

/** Ingredient requirement model: qty (kg/units) needed per 100 meals. */
export const ingredientModel = [
  { name: 'Atta (flour)', perHundredMeals: 8, unit: 'kg' },
  { name: 'Rice', perHundredMeals: 6, unit: 'kg' },
  { name: 'Cooking oil', perHundredMeals: 3, unit: 'L' },
  { name: 'Vegetables', perHundredMeals: 14, unit: 'kg' },
  { name: 'Dairy (ghee/butter/dahi)', perHundredMeals: 4, unit: 'kg' },
]

// ---- Positioning Matrix (Section 5) ----
// x = Experience (0 = Non-Home, 100 = Home), y = Trust on Quality (0..100)
export interface PositioningPlayer {
  name: string
  x: number
  y: number
  us?: boolean
}

export const positioningPlayers: PositioningPlayer[] = [
  { name: 'Zomato Mom', x: 88, y: 90, us: true },
  { name: 'Dabbawala', x: 55, y: 35 },
  { name: 'Mess', x: 40, y: 30 },
  { name: 'Caterer', x: 45, y: 55 },
  { name: 'Cafeteria', x: 20, y: 40 },
  { name: 'Cloud Kitchen', x: 25, y: 62 },
]

// ---- KPI Funnel (Section 7) ----
export interface KpiRow {
  stage: 'Acquisition' | 'Activation' | 'Retention' | 'Revenue'
  demand: string[]
  supply: string[]
}

export const kpiFunnel: KpiRow[] = [
  {
    stage: 'Acquisition',
    demand: ['# unique users on landing page', 'CTR on Zomato Mom poster'],
    supply: ['# chefs signed up'],
  },
  {
    stage: 'Activation',
    demand: ['First-meal activation rate', '# new subscriptions / month'],
    supply: ['% chefs using Blinkit for groceries', 'GOV of chef orders on Blinkit'],
  },
  {
    stage: 'Retention',
    demand: ['Avg meals / subscribed user / month', 'Repeat subscription rate', 'Avg delivery time'],
    supply: ['Avg # meals served per chef partner'],
  },
  {
    stage: 'Revenue',
    demand: ['ARPU', 'GOV of meals served monthly', 'Revenue from commissions'],
    supply: ['Avg daily revenue per chef'],
  },
]

export const northStar = {
  metric: 'Total meals served to subscribed customers / month',
  current: 118400,
  target: 150000,
  wowGrowthPct: 14,
}

// Illustrative North Star trend (last 8 weeks) for the KPI dashboard sparkline.
export const northStarTrend = [
  { week: 'W1', meals: 42000 },
  { week: 'W2', meals: 51000 },
  { week: 'W3', meals: 58500 },
  { week: 'W4', meals: 67000 },
  { week: 'W5', meals: 79000 },
  { week: 'W6', meals: 92000 },
  { week: 'W7', meals: 104000 },
  { week: 'W8', meals: 118400 },
]

// Helper for compact ₹ formatting (Lakhs / Crores).
export function formatINR(value: number): string {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(2)} L`
  if (value >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`
  return `₹${Math.round(value)}`
}

export function formatNum(value: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(value))
}
