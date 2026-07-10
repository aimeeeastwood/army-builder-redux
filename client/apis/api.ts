import request from 'superagent'
import type { UnitTemplate, Faction } from '../../models/units.ts'

// Base URL for your backend API
const BASE_URL = 'http://localhost:4000'

// Fetch all units from the units endpoint
export async function getUnits(faction?: Faction): Promise<UnitTemplate[]> {
  const url = faction
    ? `${BASE_URL}/units?faction=${faction}`
    : `${BASE_URL}/units`
  const res = await request.get(url)
  return res.body as UnitTemplate[]
}

// Optional: fetch by category
export async function getUnitsByCategory(
  category: string,
): Promise<UnitTemplate[]> {
  const allUnits = await getUnits()
  return allUnits.filter((u) => u.category === category)
}
