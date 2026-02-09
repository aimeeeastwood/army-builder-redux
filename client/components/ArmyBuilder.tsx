import { useState, useEffect } from 'react'

type UnitCategory = 'HQ' | 'Troop' | 'Elite' | 'Vehicle' | 'Drone'

interface Unit {
  id: number
  name: string
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

const SPECIALIST_WEAPONS: Record<string, { name: string; points: number }[]> = {
  CL: [
    { name: 'HMG', points: 4 },
    { name: 'RPG', points: 5 },
    { name: 'Rocket Mortar', points: 5 },
    { name: 'Sniper Rifle', points: 4 },
  ],
  OFN: [
    { name: 'HMG', points: 4 },
    { name: 'Benling', points: 6 },
    { name: 'Mortar', points: 5 },
    { name: 'Smart Sniper Rifle', points: 4 },
  ],
}

export default function ArmyBuilder({ faction }: { faction: string }) {
  const [units, setUnits] = useState<Unit[]>([])
  const [army, setArmy] = useState<Unit[]>([])
  const [specialistSelection, setSpecialistSelection] = useState<
    Record<number, string>
  >({})

  const addUnit = (unit: Unit) => {
    setArmy((prev) => [...prev, unit])
  }

  const removeUnit = (index: number) => {
    setArmy((prev) => prev.filter((_, i) => i !== index))
  }

  const totalPoints = army.reduce((sum, u, i) => {
    const specialPoints =
      u.name.includes('Specialist Team') && specialistSelection[i]
        ? SPECIALIST_WEAPONS[faction].find(
            (w) => w.name === specialistSelection[i],
          )?.points || 0
        : 0
    return sum + u.points + specialPoints
  }, 0)

  const hqCount = army.filter((u) => u.category === 'HQ').length
  const troopCount = army.filter((u) => u.category === 'Troop').length
  const meetsMinimums = hqCount >= 1 && troopCount >= 2

  useEffect(() => {
    async function fetchUnits() {
      try {
        const res = await fetch(`/api/v1/units?faction=${faction}`)
        const data = await res.json()
        setUnits(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUnits()
  }, [faction])

  return (
    <div className="army-builder p-4">
      <h2 className="mb-4 text-2xl font-bold">{faction} Army</h2>

      {units.length === 0 ? (
        <p>No units found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-1">Name</th>
              <th className="border border-gray-400 p-1">Category</th>
              <th className="border border-gray-400 p-1">Points</th>
              <th className="border border-gray-400 p-1">CC</th>
              <th className="border border-gray-400 p-1">BS</th>
              <th className="border border-gray-400 p-1">DE</th>
              <th className="border border-gray-400 p-1">FW</th>
              <th className="border border-gray-400 p-1">W / STR</th>
              <th className="border border-gray-400 p-1">WIP</th>
              <th className="border border-gray-400 p-1">MOV</th>
              <th className="border border-gray-400 p-1">F/S/R (Vehicles)</th>
              <th className="border border-gray-400 p-1">Add</th>
            </tr>
          </thead>

          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-100">
                <td className="border border-gray-400 p-1">{unit.name}</td>
                <td className="border border-gray-400 p-1">{unit.category}</td>
                <td className="border border-gray-400 p-1">{unit.points}</td>
                <td className="border border-gray-400 p-1">{unit.CC}</td>
                <td className="border border-gray-400 p-1">{unit.BS}</td>
                <td className="border border-gray-400 p-1">{unit.DE}</td>
                <td className="border border-gray-400 p-1">{unit.FW}</td>
                <td className="border border-gray-400 p-1">
                  {unit.category === 'Vehicle' ? unit.STR : unit.W}
                </td>
                <td className="border border-gray-400 p-1">{unit.WIP}</td>
                <td className="border border-gray-400 p-1">{unit.MOV}</td>
                <td className="border border-gray-400 p-1">
                  {unit.category === 'Vehicle'
                    ? `${unit.F}/${unit.S}/${unit.R}`
                    : '-'}
                </td>
                <td className="border border-gray-400 p-1 text-center">
                  <button
                    onClick={() => addUnit(unit)}
                    className="rounded border px-2 hover:bg-gray-200"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔻 Army composition & points */}
      <div className="mt-6">
        <h3 className="mb-2 text-xl font-bold">
          Current Army ({totalPoints} pts)
        </h3>

        {/* Minimum requirements */}
        <ul className="mb-2 text-sm">
          <li className={hqCount >= 1 ? 'text-green-600' : 'text-red-600'}>
            HQ: {hqCount}/1
          </li>
          <li className={troopCount >= 2 ? 'text-green-600' : 'text-red-600'}>
            Troops: {troopCount}/2
          </li>
        </ul>

        {army.length === 0 ? (
          <p>No units selected.</p>
        ) : (
          <ul className="space-y-1">
            {army.map((unit, index) => (
              <li
                key={`${unit.id}-${index}`}
                className="flex flex-col items-start justify-between space-y-1 md:flex-row md:items-center md:space-y-0"
              >
                <div className="flex items-center space-x-2">
                  <span>
                    {unit.name} ({unit.points}
                    {unit.name.includes('Specialist Team') &&
                    specialistSelection[index]
                      ? ` + ${
                          SPECIALIST_WEAPONS[faction].find(
                            (w) => w.name === specialistSelection[index],
                          )?.points || 0
                        }`
                      : ''}
                    )
                  </span>

                  {/* Specialist weapon dropdown */}
                  {unit.name.includes('Specialist Team') && (
                    <select
                      value={specialistSelection[index] || ''}
                      onChange={(e) =>
                        setSpecialistSelection((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      className="rounded border px-1 text-sm"
                    >
                      <option value="">-- Weapon --</option>
                      {SPECIALIST_WEAPONS[faction].map((w) => (
                        <option key={w.name} value={w.name}>
                          {w.name} (+{w.points})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  onClick={() => removeUnit(index)}
                  className="rounded border px-2"
                >
                  −
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Army requirements warning */}
        {!meetsMinimums && (
          <div className="mt-3 text-sm text-red-600">
            <p>Army requirements not met:</p>
            <ul className="list-inside list-disc">
              {hqCount < 1 && <li>At least 1 HQ required</li>}
              {troopCount < 2 && <li>At least 2 Troop units required</li>}
            </ul>
          </div>
        )}

        <button
          disabled={!meetsMinimums}
          className={`mt-4 rounded border px-4 py-2 ${
            meetsMinimums
              ? 'bg-green-600 text-white'
              : 'cursor-not-allowed bg-gray-300 text-gray-600'
          }`}
        >
          Save Army
        </button>
      </div>
    </div>
  )
}
