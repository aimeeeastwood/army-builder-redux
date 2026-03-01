// client/apis/units.ts
export type Faction = 'CL' | 'OFN'
export type UnitCategory = 'HQ' | 'Troop' | 'Elite' | 'Drone' | 'Vehicle'

export interface UnitOption {
  id?: string
  name: string
  cost?: number // optional cost per model for the option
  description?: string
  points?: number // optional total points for this option
}

export interface UnitTemplate {
  id: string
  name: string
  faction: string
  category: 'HQ' | 'Troop' | 'Elite' | 'Drone' | 'Vehicle'
  baseSize?: number // optional
  maxSize?: number // optional
  costPerModel?: number // optional
  CC: number
  BS: number
  DE: number
  FW: number
  W: number
  WIP: number
  MOV: string
  equipment: string
  special_rules: string
  STR?: number // for vehicles
  F?: number // for vehicles
  S?: number // for vehicles
  R?: number // for vehicles
  options?: UnitOption[]

  /** total points is computed dynamically */
  points?: number
}

export const calculateUnitPoints = (unit: UnitTemplate): number => {
  const basePoints = (unit.baseSize ?? 0) * (unit.costPerModel ?? 0)
  const optionsPoints =
    unit.options?.reduce((sum, opt) => sum + (opt.points ?? 0), 0) ?? 0
  return basePoints + optionsPoints
}

// ---------------- OFN Squads & Elites & Drones ----------------
export const OFN_UNITS: UnitTemplate[] = [
  // HQ
  {
    id: '101',
    name: 'Marine Command Squad',
    faction: 'OFN',
    category: 'HQ',
    baseSize: 5,
    maxSize: 5,
    costPerModel: 10,
    options: [
      { name: 'FAC', points: 50 },
      { name: 'Medic', points: 2 },
      { name: 'Hacker', points: 2 },
    ],
    CC: 3,
    BS: 3,
    DE: 2,
    FW: 1,
    W: 1,
    WIP: 4,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },

  // Troop
  {
    id: '102',
    name: 'Marine Rifle Squad',
    faction: 'OFN',
    category: 'Troop',
    baseSize: 5,
    maxSize: 10,
    costPerModel: 8,
    options: [
      { name: 'LMG', points: 3 },
      { name: 'Medic', points: 2 },
      { name: 'Hacker', points: 2 },
    ],
    CC: 3,
    BS: 4,
    DE: 2,
    FW: 2,
    W: 1,
    WIP: 10,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },
  {
    id: '103',
    name: 'Marine Specialist Team',
    faction: 'OFN',
    category: 'Troop',
    baseSize: 3,
    maxSize: 3,
    costPerModel: 8,
    options: [
      { name: 'HMG', points: 4 },
      { name: 'Benling', points: 6 },
      { name: 'Guided Mortar', points: 5 },
      { name: 'Smart Sniper Rifle', points: 4 },
    ],
    CC: 3,
    BS: 3,
    DE: 2,
    FW: 1,
    W: 1,
    WIP: 9,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbine, Grenades, Adaptive Camo',
    special_rules: 'Infantry, Navy',
  },

  // Elite
  {
    id: '104',
    name: 'Marine Airborne Team',
    faction: 'OFN',
    category: 'Elite',
    baseSize: 5,
    maxSize: 10,
    costPerModel: 10,
    options: [{ name: 'Swap Shotguns for SMGs', points: 0 }],
    CC: 4,
    BS: 4,
    DE: 3,
    FW: 2,
    W: 1,
    WIP: 9,
    MOV: '6-2',
    equipment: 'Bonehammer Shotguns, Shitachi, Grenades, Adaptive Camo',
    special_rules: 'Infantry, Navy, Airbourne, Flurry Of Blades (2)',
  },
  {
    id: '105',
    name: 'Exo-Marine Squad',
    faction: 'OFN',
    category: 'Elite',
    baseSize: 3,
    maxSize: 5,
    costPerModel: 20,
    CC: 3,
    BS: 4,
    DE: 4,
    FW: 2,
    W: 2,
    WIP: 9,
    MOV: '6-2',
    equipment: 'Light Machine Guns, Infrared Sensors',
    special_rules: 'Infantry, Navy, Hackable',
  },
  {
    id: '106',
    name: 'Envoy Ranger Squad',
    faction: 'OFN',
    category: 'Elite',
    baseSize: 3,
    maxSize: 5,
    costPerModel: 26,
    CC: 4,
    BS: 5,
    DE: 3,
    FW: 2,
    W: 1,
    WIP: 10,
    MOV: '6-2',
    equipment:
      'Smart Sniper Rifles, Heavy Pistols, Shitachi, Adaptive Camo, Infra-Red Sensors, Explosive Charges, Targeting Laser',
    special_rules:
      'Infantry, Navy, Infiltrators, Ambushers, Flurry Of Blades (3)',
  },

  // Drones
  {
    id: '110',
    name: 'Trilobite Scout Drone',
    faction: 'OFN',
    category: 'Drone',
    baseSize: 3,
    maxSize: 6,
    costPerModel: 8,
    CC: 0,
    BS: 3,
    DE: 0,
    FW: 0,
    W: 1,
    WIP: 10,
    MOV: '6-6',
    equipment: 'Targeting Laser, Infrared Sensors, Adaptive Camo',
    special_rules: 'Drone, Fly, Hackable',
  },
  {
    id: '111',
    name: 'Barracuda Attack Drone',
    faction: 'OFN',
    category: 'Drone',
    baseSize: 3,
    maxSize: 6,
    costPerModel: 13,
    CC: 0,
    BS: 3,
    DE: 1,
    FW: 1,
    W: 1,
    WIP: 10,
    MOV: '6-6',
    equipment: 'M-10 Smart Carbines, Infrared Sensors, Adaptive Camo',
    special_rules: 'Drone, Fly, Hackable',
  },
  {
    id: '112',
    name: 'Vanguard Infantry Drone',
    faction: 'OFN',
    category: 'Drone',
    baseSize: 5,
    maxSize: 10,
    costPerModel: 8,
    CC: 2,
    BS: 3,
    DE: 4,
    FW: 1,
    W: 1,
    WIP: 10,
    MOV: '4-4',
    equipment: 'M-10 Smart Carbines',
    special_rules: 'Drone, Hackable',
  },
]

// ---------------- OFN Vehicles ----------------
export const OFN_VEHICLES: UnitTemplate[] = [
  {
    id: '201',
    name: 'Carrowary Light Support Mech',
    faction: 'OFN',
    category: 'Vehicle',
    points: 115,
    CC: 2,
    BS: 4,
    DE: 0,
    FW: 3,
    W: 6,
    STR: 3,
    WIP: 9,
    MOV: '6-4',
    equipment:
      '75mm Cannon, Guided Missile Pod, 25mm Gatling Cannon, Adaptive Camo, Mech Foot',
    special_rules: 'Walker, Navy, Turret, Hackable',
    F: 10,
    S: 10,
    R: 10,
  },
  {
    id: '202',
    name: 'Stingray Mech Destroyer',
    faction: 'OFN',
    category: 'Vehicle',
    points: 105,
    CC: 0,
    BS: 4,
    DE: 0,
    FW: 3,
    W: 4,
    STR: 2,
    WIP: 9,
    MOV: '6-6',
    equipment: 'Rail Gun, Adaptive Camo',
    special_rules: 'Hovercraft, Hackable',
    F: 12,
    S: 10,
    R: 10,
  },
]

// ---------------- CL Squads & Elites & Drones ----------------
export const CL_UNITS: UnitTemplate[] = [
  // HQ
  {
    id: '301',
    name: 'Crusader Clergy Squad',
    faction: 'CL',
    category: 'HQ',
    baseSize: 5,
    maxSize: 5,
    costPerModel: 9,
    options: [
      { name: 'Spotter', points: 50 },
      { name: 'Priest', points: 2 },
      { name: 'Hacker', points: 2 },
    ],
    CC: 4,
    BS: 4,
    DE: 3,
    FW: 3,
    W: 1,
    WIP: 10,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry, Fanatic',
  },

  // Troops
  {
    id: '302',
    name: 'Crusader Rifle Squad',
    faction: 'CL',
    category: 'Troop',
    baseSize: 5,
    maxSize: 10,
    costPerModel: 7,
    options: [
      { name: 'LMG', points: 3 },
      { name: 'Priest', points: 2 },
    ],
    CC: 3,
    BS: 3,
    DE: 2,
    FW: 1,
    W: 1,
    WIP: 8,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry, Fanatic',
  },
  {
    id: '303',
    name: 'Crusader Specialist Team',
    faction: 'CL',
    category: 'Troop',
    baseSize: 3,
    maxSize: 3,
    costPerModel: 8,
    options: [
      { name: 'HMG', points: 4 },
      { name: 'RPG', points: 5 },
      { name: 'Rocket Mortar', points: 5 },
      { name: 'Hackers', points: 2 },
    ],
    CC: 3,
    BS: 3,
    DE: 2,
    FW: 1,
    W: 1,
    WIP: 8,
    MOV: '4-4',
    equipment: 'QBZ-110 Bullpup, Grenades',
    special_rules: 'Infantry, Fanatic',
  },

  // Elite
  {
    id: '304',
    name: 'Crusader Zealot Squad',
    faction: 'CL',
    category: 'Elite',
    baseSize: 5,
    maxSize: 15,
    costPerModel: 12,
    options: [{ name: 'Flamethrower', points: 3 }],
    CC: 4,
    BS: 4,
    DE: 1,
    FW: 1,
    W: 1,
    WIP: 7,
    MOV: '6-2',
    equipment: 'Heavy Pistols, Poison Blades',
    special_rules: 'Infantry, Fanatic, Zealot, Ambusher',
  },
  {
    id: '305',
    name: 'Enhanced Crusader Squad',
    faction: 'CL',
    category: 'Elite',
    baseSize: 3,
    maxSize: 5,
    costPerModel: 21,
    CC: 4,
    BS: 3,
    DE: 3,
    FW: 3,
    W: 2,
    WIP: 9,
    MOV: '6-2',
    equipment: 'QBZ-100 Bullpup, Crusader Greatswords',
    special_rules: 'Infantry, Fanatic, Zealot, Hackable, Flurry Of Blades (2)',
  },
  {
    id: '306',
    name: 'Crusader Assassin Squad',
    faction: 'CL',
    category: 'Elite',
    baseSize: 3,
    maxSize: 5,
    costPerModel: 21,
    CC: 5,
    BS: 4,
    DE: 3,
    FW: 3,
    W: 1,
    WIP: 10,
    MOV: '6-2',
    equipment: 'Heavy Pistols, Poison Daggers, Optical Camo',
    special_rules:
      'Infantry, Fanatic, Superior Infiltrators, Ambushers, Flurry Of Blades (2)',
  },

  // Drones
  {
    id: '307',
    name: 'Tarantula Drone Squad',
    faction: 'CL',
    category: 'Drone',
    baseSize: 3,
    maxSize: 6,
    costPerModel: 13,
    CC: 3,
    BS: 2,
    DE: 2,
    FW: 2,
    W: 1,
    WIP: 10,
    MOV: '4-4',
    equipment: 'Flamethrower, Drone Blades',
    special_rules: 'Drone, Infiltrators, Ambushers, Hackable',
  },
  {
    id: '308',
    name: 'Locust Drone Squad',
    faction: 'CL',
    category: 'Drone',
    baseSize: 3,
    maxSize: 6,
    costPerModel: 13,
    CC: 0,
    BS: 0,
    DE: 2,
    FW: 2,
    W: 1,
    WIP: 10,
    MOV: '6-6',
    equipment: 'Explosive Warhead',
    special_rules: 'Drone, Fly, Hackable',
  },
  {
    id: '309',
    name: 'Berserker Drone Squad',
    faction: 'CL',
    category: 'Drone',
    baseSize: 5,
    maxSize: 10,
    costPerModel: 15,
    CC: 3,
    BS: 3,
    DE: 3,
    FW: 2,
    W: 1,
    WIP: 10,
    MOV: '6-2',
    equipment: 'QBZ-110 Bullpup, Drone Blade, Sonic Blaster',
    special_rules: 'Drone, Hackable',
  },
]

// ---------------- CL Vehicles ----------------
export const CL_VEHICLES: UnitTemplate[] = [
  {
    id: '401',
    name: 'Ezekiel Light Mech',
    faction: 'CL',
    category: 'Vehicle',
    points: 92,
    CC: 3,
    BS: 4,
    DE: 0,
    FW: 3,
    W: 6,
    STR: 3,
    WIP: 8,
    MOV: '4-4',
    equipment: '30mm Autocannon, Flamethrower, Mech Foot',
    special_rules: 'Walker, Turret, Fanatic, Hackable',
    F: 12,
    S: 12,
    R: 10,
  },
  {
    id: '402',
    name: 'Goliath Heavy Mech',
    faction: 'CL',
    category: 'Vehicle',
    points: 110,
    CC: 3,
    BS: 4,
    DE: 0,
    FW: 4,
    W: 5,
    STR: 6,
    WIP: 9,
    MOV: '6-4',
    equipment: 'Rail Gun, Pocket Pod, 30mm Cannon, Flamethrower',
    special_rules: 'Walker, Turret, Fanatic, Hackable',
    F: 14,
    S: 12,
    R: 12,
  },
]

OFN_UNITS.forEach((unit) => (unit.points = calculateUnitPoints(unit)))
