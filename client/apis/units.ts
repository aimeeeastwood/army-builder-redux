// client/apis/units.ts
export type Faction = 'CL' | 'OFN'
export type UnitCategory = 'HQ' | 'Troop' | 'Elite' | 'Vehicle' | 'Drone'

export interface Unit {
  id: number
  name: string
  faction: Faction
  category: UnitCategory
  points: number
  CC: number
  BS: number
  DE: number
  FW: number
  W?: number
  STR?: number
  WIP: number
  MOV: string
  F?: number
  S?: number
  R?: number
  equipment?: string
  special_rules?: string
}

// ---------------- CL Units ----------------
export const CL_UNITS: Unit[] = [
  {
    id: 1,
    name: 'Crusader HQ',
    faction: 'CL',
    category: 'HQ',
    points: 48,
    CC: 6,
    BS: 8,
    DE: 4,
    FW: 4,
    W: 5,
    WIP: 10,
    STR: 2,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry, Fanatic',
  },
  {
    id: 2,
    name: 'Crusader Troop',
    faction: 'CL',
    category: 'Troop',
    points: 36,
    CC: 6,
    BS: 6,
    DE: 3,
    FW: 2,
    W: 3,
    WIP: 9,
    STR: 2,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry',
  },
  {
    id: 3,
    name: 'Crusader Specialist Team',
    faction: 'CL',
    category: 'Troop',
    points: 32,
    CC: 6,
    BS: 6,
    DE: 4,
    FW: 2,
    W: 3,
    WIP: 9,
    STR: 2,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry, Fanatic',
  },
]

// ---------------- OFN Units ----------------
export const OFN_UNITS: Unit[] = [
  {
    id: 101,
    name: 'Marine Command Team',
    faction: 'OFN',
    category: 'HQ',
    points: 48,
    CC: 6,
    BS: 8,
    DE: 4,
    FW: 4,
    W: 5,
    WIP: 10,
    STR: 2,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Limited Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },
  {
    id: 102,
    name: 'Marine Rifle Squad',
    faction: 'OFN',
    category: 'Troop',
    points: 44,
    CC: 6,
    BS: 6,
    DE: 3,
    FW: 2,
    W: 5,
    WIP: 9,
    STR: 2,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Limited Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },
  {
    id: 103,
    name: 'Marine Specialist Team',
    faction: 'OFN',
    category: 'Troop',
    points: 36,
    CC: 6,
    BS: 6,
    DE: 3,
    FW: 2,
    W: 3,
    WIP: 9,
    STR: 2,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Limited Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },
  {
    id: 104,
    name: 'Marine Airborne Team',
    faction: 'OFN',
    category: 'Elite',
    points: 48,
    CC: 8,
    BS: 8,
    DE: 5,
    FW: 3,
    W: 5,
    WIP: 9,
    STR: 2,
    MOV: '6-2',
    equipment: 'Shotguns, Shitachi, Grenades, Adaptive Camo',
    special_rules: 'Infantry, Navy, Airborne, Flurry Of Blades (2)',
  },
]

// ---------------- OFN Vehicles & Drones ----------------
export const OFN_UNITS_FULL: Unit[] = [
  ...OFN_UNITS,
  {
    id: 201,
    name: 'Carrowary Light Support Mech',
    faction: 'OFN',
    category: 'Vehicle',
    points: 115,
    CC: 4,
    BS: 8,
    DE: 0,
    FW: 3,
    W: 6,
    STR: 3,
    WIP: 9,
    MOV: '6-4',
    equipment:
      '75mm Cannon, Guided Missile Pod, 25mm Gatling Cannon, Adaptive Camo',
    special_rules: 'Walker, Navy, Turret, Hackable',
  },
  {
    id: 202,
    name: 'Stingray Mech Destroyer',
    faction: 'OFN',
    category: 'Vehicle',
    points: 105,
    CC: 0,
    BS: 8,
    DE: 0,
    FW: 3,
    W: 4,
    STR: 2,
    WIP: 9,
    MOV: '6-6',
    equipment: 'Rail Gun, Adaptive Camo',
    special_rules: 'Hovercraft, Hackable',
  },
  {
    id: 203,
    name: 'Trilobite Scout Drone',
    faction: 'OFN',
    category: 'Drone',
    points: 29,
    CC: 0,
    BS: 6,
    DE: 0,
    FW: 0,
    W: 3,
    WIP: 10,
    MOV: '6-6',
    equipment: 'Targeting Laser, Infra-Red Sensors, Adaptive Camo',
    special_rules: 'Drone, Fly, Hackable',
  },
]

// ---------------- Merge Arrays ----------------
export const ALL_UNITS = [...CL_UNITS, ...OFN_UNITS]
export const ALL_UNITS_FULL = [...CL_UNITS, ...OFN_UNITS_FULL]
