import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'

import {
  OFN_UNITS,
  OFN_VEHICLES,
  CL_UNITS,
  CL_VEHICLES,
  type UnitTemplate,
  type UnitOption,
  calculateUnitPoints,
} from '../apis/units'

type UnitCategory = 'HQ' | 'Troop' | 'Elite' | 'Vehicle' | 'Drone'

const SPECIALIST_WEAPONS: Record<string, UnitOption[]> = {
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

const CATEGORY_ORDER: UnitCategory[] = [
  'HQ',
  'Troop',
  'Elite',
  'Drone',
  'Vehicle',
]

const isSpecialistTeam = (unit: UnitTemplate) =>
  unit.name.includes('Specialist Team')

export default function ArmyBuilder() {
  const { faction } = useParams<{ faction: string }>()
  if (!faction) return <p>No faction selected.</p>
  const factionKey = faction as 'OFN' | 'CL'

  const [units, setUnits] = useState<UnitTemplate[]>([])
  const [army, setArmy] = useState<UnitTemplate[]>([])
  const [specialistSelection, setSpecialistSelection] = useState<
    Record<number, string>
  >({})
  const [unitOptions, setUnitOptions] = useState<Record<number, string[]>>({})
  const [unitExtraModels, setUnitExtraModels] = useState<
    Record<number, number>
  >({})

  useEffect(() => {
    if (faction === 'OFN') setUnits([...OFN_UNITS, ...OFN_VEHICLES])
    else if (faction === 'CL') setUnits([...CL_UNITS, ...CL_VEHICLES])
    else setUnits([])
  }, [faction])

  const addUnit = (unit: UnitTemplate) => setArmy((prev) => [...prev, unit])

  const removeUnit = (index: number) => {
    setArmy((prev) => prev.filter((_, i) => i !== index))
    setSpecialistSelection((prev) => {
      const u = { ...prev }
      delete u[index]
      return u
    })
    setUnitOptions((prev) => {
      const u = { ...prev }
      delete u[index]
      return u
    })
    setUnitExtraModels((prev) => {
      const u = { ...prev }
      delete u[index]
      return u
    })
  }

  const sortedArmy = [...army].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category as UnitCategory) -
      CATEGORY_ORDER.indexOf(b.category as UnitCategory),
  )

  const totalPoints = army.reduce((sum, u, i) => {
    const base = calculateUnitPoints(u)
    const specialist =
      isSpecialistTeam(u) && specialistSelection[i]
        ? SPECIALIST_WEAPONS[factionKey].find(
            (w) => w.name === specialistSelection[i],
          )?.points || 0
        : 0
    const options =
      unitOptions[i]?.reduce((acc, name) => {
        const opt = u.availableOptions?.find((o) => o.name === name)
        return acc + (opt?.points || 0)
      }, 0) || 0
    const extraModels =
      u.category !== 'HQ'
        ? (unitExtraModels[i] || 0) * (u.costPerModel || 0)
        : 0
    return sum + base + specialist + options + extraModels
  }, 0)

  const exportPDF = () => {
    const doc = new jsPDF()
    let y = 10
    doc.setFontSize(16)
    doc.text(`${faction} Army List (${totalPoints} pts)`, 10, y)
    y += 10

    sortedArmy.forEach((u, i) => {
      const basePoints = calculateUnitPoints(u)
      const specialistPoints =
        isSpecialistTeam(u) && specialistSelection[i]
          ? SPECIALIST_WEAPONS[factionKey].find(
              (w) => w.name === specialistSelection[i],
            )?.points || 0
          : 0
      const optionsPoints =
        unitOptions[i]?.reduce((acc, name) => {
          const opt = u.availableOptions?.find((o) => o.name === name)
          return acc + (opt?.points || 0)
        }, 0) || 0
      const extraModelsPoints =
        u.category !== 'HQ'
          ? (unitExtraModels[i] || 0) * (u.costPerModel || 0)
          : 0
      const totalUnit =
        basePoints + specialistPoints + optionsPoints + extraModelsPoints

      doc.setFontSize(12)
      doc.text(`${u.name} (${totalUnit} pts)`, 10, y)
      y += 6
      doc.setFontSize(10)
      doc.text(`Category: ${u.category}`, 12, y)
      y += 5
      doc.text(
        `CC: ${u.CC}, BS: ${u.BS}, DE: ${u.DE}, FW: ${u.FW}, W/STR: ${u.category === 'Vehicle' ? u.STR : u.W}, WIP: ${u.WIP}, MOV: ${u.MOV}`,
        12,
        y,
      )
      y += 5
      if (u.category === 'Vehicle') {
        doc.text(`F/S/R: ${u.F}/${u.S}/${u.R}`, 12, y)
        y += 5
      }
      if (isSpecialistTeam(u) && specialistSelection[i]) {
        doc.text(`Specialist Weapon: ${specialistSelection[i]}`, 12, y)
        y += 5
      }
      if (unitExtraModels[i]) {
        doc.text(`Extra Models: ${unitExtraModels[i]}`, 12, y)
        y += 5
      }
      if (unitOptions[i]?.length) {
        doc.text(`Options: ${unitOptions[i].join(', ')}`, 12, y)
        y += 5
      }
      if (u.special_rules) {
        doc.text(`Special Rules: ${u.special_rules}`, 12, y)
        y += 5
      }

      y += 3
      if (y > 280) {
        doc.addPage()
        y = 10
      }
    })

    doc.save(`${faction}-army.pdf`)
  }

  return (
    <div className="army-builder p-4">
      <h2 className="mb-4 text-2xl font-bold">{faction} Army</h2>

      {/* Unit Table */}
      {units.length === 0 ? (
        <p>No units found.</p>
      ) : (
        <table className="mb-4 w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1">Name</th>
              <th className="border p-1">Category</th>
              <th className="border p-1">Points</th>
              <th className="border p-1">Add</th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="border p-1">{u.name}</td>
                <td className="border p-1">{u.category}</td>
                <td className="border p-1">{calculateUnitPoints(u)}</td>
                <td className="border p-1 text-center">
                  <button
                    onClick={() => addUnit(u)}
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

      {/* Preview */}
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold">
          Army Preview ({totalPoints} pts)
        </h3>
        {sortedArmy.length === 0 ? (
          <p>No units selected.</p>
        ) : (
          <ul className="space-y-2 border p-2">
            {sortedArmy.map((u, i) => {
              const specialistPoints =
                isSpecialistTeam(u) && specialistSelection[i]
                  ? SPECIALIST_WEAPONS[factionKey].find(
                      (w) => w.name === specialistSelection[i],
                    )?.points || 0
                  : 0
              const optionsPoints =
                unitOptions[i]?.reduce((acc, name) => {
                  const opt = u.availableOptions?.find((o) => o.name === name)
                  return acc + (opt?.points || 0)
                }, 0) || 0
              const extraModelsPoints =
                u.category !== 'HQ'
                  ? (unitExtraModels[i] || 0) * (u.costPerModel || 0)
                  : 0
              const totalUnit =
                calculateUnitPoints(u) +
                specialistPoints +
                optionsPoints +
                extraModelsPoints

              return (
                <li key={`${u.id}-${i}`} className="border p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {u.name} ({totalUnit} pts)
                    </span>
                    <button
                      onClick={() => removeUnit(i)}
                      className="rounded border px-2 text-red-600 hover:bg-gray-200"
                    >
                      −
                    </button>
                  </div>
                  <div className="mt-1 space-y-1 text-sm">
                    <div>Category: {u.category}</div>
                    <div>
                      CC: {u.CC}, BS: {u.BS}, DE: {u.DE}, FW: {u.FW}, W/STR:{' '}
                      {u.category === 'Vehicle' ? u.STR : u.W}, WIP: {u.WIP},
                      MOV: {u.MOV}
                    </div>
                    {u.category === 'Vehicle' && (
                      <div>
                        F/S/R: {u.F}/{u.S}/{u.R}
                      </div>
                    )}
                    {isSpecialistTeam(u) && (
                      <select
                        value={specialistSelection[i] || ''}
                        onChange={(e) =>
                          setSpecialistSelection((prev) => ({
                            ...prev,
                            [i]: e.target.value,
                          }))
                        }
                        className="mt-1 rounded border px-1 text-sm"
                      >
                        <option value="">-- Weapon --</option>
                        {SPECIALIST_WEAPONS[factionKey].map((w) => (
                          <option key={w.name} value={w.name}>
                            {w.name} (+{w.points})
                          </option>
                        ))}
                      </select>
                    )}
                    {u.category !== 'HQ' &&
                      u.baseSize &&
                      u.baseSize > 1 &&
                      !isSpecialistTeam(u) && (
                        <label className="mt-1 flex items-center space-x-1">
                          <span>Extra Models:</span>
                          <select
                            value={unitExtraModels[i] || 0}
                            onChange={(e) =>
                              setUnitExtraModels((prev) => ({
                                ...prev,
                                [i]: Number(e.target.value),
                              }))
                            }
                            className="rounded border px-1 text-sm"
                          >
                            {Array.from(
                              { length: u.baseSize },
                              (_, n) => n + 1,
                            ).map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    {!isSpecialistTeam(u) &&
                      u.availableOptions?.map((opt) => (
                        <label
                          key={opt.name}
                          className="ml-2 mt-1 flex items-center space-x-1"
                        >
                          <input
                            type="checkbox"
                            checked={
                              unitOptions[i]?.includes(opt.name) || false
                            }
                            onChange={(e) => {
                              setUnitOptions((prev) => {
                                const current = prev[i] || []
                                return {
                                  ...prev,
                                  [i]: e.target.checked
                                    ? [...current, opt.name]
                                    : current.filter((o) => o !== opt.name),
                                }
                              })
                            }}
                          />
                          <span className="text-sm">
                            {opt.name} (+{opt.points})
                          </span>
                        </label>
                      ))}
                    {u.special_rules && (
                      <div>Special Rules: {u.special_rules}</div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <button
        onClick={exportPDF}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Export Army to PDF
      </button>
    </div>
  )
}
