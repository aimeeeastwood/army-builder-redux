import type { Knex } from 'knex'

export async function seed(knex: Knex) {
  const clFaction = await knex('factions').where({ key: 'CL' }).first()

  if (!clFaction) {
    throw new Error('CL faction not found')
  }

  const factionId = clFaction.id
  await knex('unit_options')
    .whereIn(
      'unit_id',
      knex('units').select('id').where({ faction_id: factionId }),
    )
    .del()

  await knex('units').where({ faction_id: factionId }).del()

  await knex('units').where({ faction_id: factionId }).del()

  const units = [
    // HQ
    {
      name: 'Crusader Clergy Squad',
      faction_id: factionId,
      category: 'HQ',
      base_size: 5,
      max_size: 5,
      cost_per_model: 9,
      cc: 4,
      bs: 4,
      de: 3,
      fw: 3,
      w: 1,
      wip: 10,
      mov: '4-4',
      equipment: 'QBZ-110 Bullpup, Grenades',
      special_rules: 'Infantry, Fanatic',
      options: [
        { name: 'Spotter', points: 50 },
        { name: 'Priest', points: 2 },
        { name: 'Hacker', points: 2 },
      ],
    },
    // Troops
    {
      name: 'Crusader Rifle Squad',
      faction_id: factionId,
      category: 'Troop',
      base_size: 5,
      max_size: 10,
      cost_per_model: 7,
      cc: 3,
      bs: 3,
      de: 2,
      fw: 1,
      w: 1,
      wip: 8,
      mov: '4-4',
      equipment: 'QBZ-110 Bullpup, Grenades',
      special_rules: 'Infantry, Fanatic',
      options: [
        { name: 'LMG', points: 3 },
        { name: 'Priest', points: 2 },
      ],
    },
    {
      name: 'Crusader Specialist Team',
      faction_id: factionId,
      category: 'Troop',
      base_size: 3,
      max_size: 3,
      cost_per_model: 8,
      cc: 3,
      bs: 3,
      de: 2,
      fw: 1,
      w: 1,
      wip: 8,
      mov: '4-4',
      equipment: 'QBZ-110 Bullpup, Grenades',
      special_rules: 'Infantry, Fanatic',
      options: [
        { name: 'HMG', points: 4 },
        { name: 'RPG', points: 5 },
        { name: 'Rocket Mortar', points: 5 },
        { name: 'Hackers', points: 2 },
      ],
    },
    // Elite
    {
      name: 'Crusader Zealot Squad',
      faction_id: factionId,
      category: 'Elite',
      base_size: 5,
      max_size: 15,
      cost_per_model: 12,
      cc: 4,
      bs: 4,
      de: 1,
      fw: 1,
      w: 1,
      wip: 7,
      mov: '6-2',
      equipment: 'Heavy Pistols, Poison Blades',
      special_rules: 'Infantry, Fanatic, Zealot, Ambusher',
      options: [{ name: 'Flamethrower', points: 3 }],
    },
    {
      name: 'Enhanced Crusader Squad',
      faction_id: factionId,
      category: 'Elite',
      base_size: 3,
      max_size: 5,
      cost_per_model: 21,
      cc: 4,
      bs: 3,
      de: 3,
      fw: 3,
      w: 2,
      wip: 9,
      mov: '6-2',
      equipment: 'QBZ-100 Bullpup, Crusader Greatswords',
      special_rules:
        'Infantry, Fanatic, Zealot, Hackable, Flurry Of Blades (2)',
    },
    {
      name: 'Crusader Assassin Squad',
      faction_id: factionId,
      category: 'Elite',
      base_size: 3,
      max_size: 5,
      cost_per_model: 21,
      cc: 5,
      bs: 4,
      de: 3,
      fw: 3,
      w: 1,
      wip: 10,
      mov: '6-2',
      equipment: 'Heavy Pistols, Poison Daggers, Optical Camo',
      special_rules:
        'Infantry, Fanatic, Superior Infiltrators, Ambushers, Flurry Of Blades (2)',
    },
    // Drones
    {
      name: 'Tarantula Drone Squad',
      faction_id: factionId,
      category: 'Drone',
      base_size: 3,
      max_size: 6,
      cost_per_model: 13,
      cc: 3,
      bs: 2,
      de: 2,
      fw: 2,
      w: 1,
      wip: 10,
      mov: '4-4',
      equipment: 'Flamethrower, Drone Blades',
      special_rules: 'Drone, Infiltrators, Ambushers, Hackable',
    },
    {
      name: 'Locust Drone Squad',
      faction_id: factionId,
      category: 'Drone',
      base_size: 3,
      max_size: 6,
      cost_per_model: 13,
      cc: 0,
      bs: 0,
      de: 2,
      fw: 2,
      w: 1,
      wip: 10,
      mov: '6-6',
      equipment: 'Explosive Warhead',
      special_rules: 'Drone, Fly, Hackable',
    },
    {
      name: 'Berserker Drone Squad',
      faction_id: factionId,
      category: 'Drone',
      base_size: 5,
      max_size: 10,
      cost_per_model: 15,
      cc: 3,
      bs: 3,
      de: 3,
      fw: 2,
      w: 1,
      wip: 10,
      mov: '6-2',
      equipment: 'QBZ-110 Bullpup, Drone Blade, Sonic Blaster',
      special_rules: 'Drone, Hackable',
    },
    // Vehicles
    {
      name: 'Ezekiel Light Mech',
      faction_id: factionId,
      category: 'Vehicle',
      points: 92,
      cc: 3,
      bs: 4,
      de: 0,
      fw: 3,
      w: 6,
      str: 3,
      wip: 8,
      mov: '4-4',
      equipment: '30mm Autocannon, Flamethrower, Mech Foot',
      special_rules: 'Walker, Turret, Fanatic, Hackable',
      f: 12,
      s: 12,
      r: 10,
    },
    {
      name: 'Goliath Heavy Mech',
      faction_id: factionId,
      category: 'Vehicle',
      points: 110,
      cc: 3,
      bs: 4,
      de: 0,
      fw: 4,
      w: 5,
      str: 6,
      wip: 9,
      mov: '6-4',
      equipment: 'Rail Gun, Pocket Pod, 30mm Cannon, Flamethrower',
      special_rules: 'Walker, Turret, Fanatic, Hackable',
      f: 14,
      s: 12,
      r: 12,
    },
  ]

  for (const unit of units) {
    const { options, ...unitData } = unit
    const [unitId] = await knex('units').insert(unitData)

    if (options && options.length > 0) {
      const optionsWithUnitId = options.map((opt) => ({
        ...opt,
        unit_id: unitId,
      }))
      await knex('unit_options').insert(optionsWithUnitId)
    }
  }
}
