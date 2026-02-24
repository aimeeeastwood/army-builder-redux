import request from 'superagent'
import type { Unit } from './units.ts'

// Base URL for your backend API
const BASE_URL = 'http://localhost:3000'

// Fetch all units from the Army endpoint
export async function getUnits(): Promise<Unit[]> {
  const res = await request.get(`${BASE_URL}/army`)
  return res.body as Unit[]
}

// Optional: fetch by faction
export async function getUnitsByFaction(
  faction: 'CL' | 'OFN',
): Promise<Unit[]> {
  const allUnits = await getUnits()
  return allUnits.filter((u) => u.faction === faction)
}

// Optional: fetch by category
export async function getUnitsByCategory(category: string): Promise<Unit[]> {
  const allUnits = await getUnits()
  return allUnits.filter((u) => u.category === category)
}
