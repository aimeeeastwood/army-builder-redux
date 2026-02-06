import { useState, useEffect } from 'react'

interface Unit {
  id: number
  name: string
  category: string
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
}

export default function ArmyBuilder({ faction }: { faction: string }) {
  const [units, setUnits] = useState<Unit[]>([])

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
