export type Faction = 'CL' | 'OFN' | 'MR'
export type UnitCategory = 'HQ' | 'Troop' | 'Elite' | 'Drone' | 'Vehicle'

export interface UnitOption {
  id?: string
  name: string
  cost?: number
  description?: string
  points: number
}

export interface BaseUnit {
  id: string
  name: string
  faction: Faction
  category: UnitCategory
  cc: number
  bs: number
  de: number
  fw: number
  w: number
  wip: number
  mov: string
  equipment: string
  special_rules: string
  availableOptions?: UnitOption[]
}

export interface SquadUnit extends BaseUnit {
  category: 'HQ' | 'Troop' | 'Elite' | 'Drone'
  baseSize: number
  maxSize: number
  costPerModel: number
}

export interface VehicleUnit extends BaseUnit {
  category: 'Vehicle'
  points: number
  str: number
  f: number
  s: number
  r: number
}

export type UnitTemplate = SquadUnit | VehicleUnit
