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
  const [pointsBudget, setPointsBudget] = useState<number>(1000)

  useEffect(() => {
    if (faction === 'OFN') setUnits([...OFN_UNITS, ...OFN_VEHICLES])
    else if (faction === 'CL') setUnits([...CL_UNITS, ...CL_VEHICLES])
    else setUnits([])
  }, [faction])

  const sortedArmy = [...army].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category as UnitCategory) -
      CATEGORY_ORDER.indexOf(b.category as UnitCategory),
  )

  // Calculate total points for a unit including options, extra models, and specialist weapons
  const calculateTotalUnitPoints = (unit: UnitTemplate, index: number) => {
    const base = unit.points || 0
    const specialist =
      isSpecialistTeam(unit) && specialistSelection[index]
        ? SPECIALIST_WEAPONS[factionKey]?.find(
            (w) => w.name === specialistSelection[index],
          )?.points || 0
        : 0
    const options =
      unitOptions[index]?.reduce((sum, name) => {
        const opt = unit.availableOptions?.find((o) => o.name === name)
        return sum + (opt?.points || 0)
      }, 0) || 0
    const extraModels =
      unit.category !== 'HQ'
        ? (unitExtraModels[index] || 0) * (unit.costPerModel || 0)
        : 0
    return base + specialist + options + extraModels
  }

  // Total points for the army
  const totalPoints = army.reduce(
    (sum, unit, i) => sum + calculateTotalUnitPoints(unit, i),
    0,
  )

  const addUnit = (unit: UnitTemplate) => {
    const unitPts = calculateUnitPoints(unit)
    if (totalPoints + unitPts > pointsBudget) {
      alert(`Cannot add ${unit.name}: would exceed ${pointsBudget} pts limit`)
      return
    }
    setArmy((prev) => [...prev, unit])
  }

  const removeUnit = (index: number) => {
    setArmy((prev) => prev.filter((_, i) => i !== index))
    setSpecialistSelection((prev) => {
      const copy = { ...prev }
      delete copy[index]
      return copy
    })
    setUnitOptions((prev) => {
      const copy = { ...prev }
      delete copy[index]
      return copy
    })
    setUnitExtraModels((prev) => {
      const copy = { ...prev }
      delete copy[index]
      return copy
    })
  }

  // Export PDF (same as before)
  const exportPDF = () => {
    const doc = new jsPDF()
    let y = 10
    doc.setFontSize(16)
    doc.text(
      `${factionKey === 'OFN' ? 'Oceanic Federal Navy Force' : 'Crusaders Of The Cleansing Light Force'} (${totalPoints} pts)`,
      10,
      y,
    )
    y += 10

    sortedArmy.forEach((u, i) => {
      const totalUnit = calculateTotalUnitPoints(u, i)
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

    doc.save(`${factionKey}-force.pdf`)
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-zinc-100">
      {/* Top: Points Budget */}
      <div className="flex items-center space-x-4 border-b border-zinc-800 p-4">
        <label htmlFor="pointsBudget" className="font-semibold">
          Points Budget:
        </label>
        <select
          id="pointsBudget"
          value={pointsBudget}
          onChange={(e) => setPointsBudget(Number(e.target.value))}
          className="rounded border bg-zinc-900 px-2 py-1 text-sm text-white"
        >
          {[500, 750, 1000, 1500].map((pts) => (
            <option key={pts} value={pts}>
              {pts} pts
            </option>
          ))}
        </select>
        <span className="ml-auto font-semibold">
          Total: {totalPoints} / {pointsBudget} pts
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/3 overflow-y-auto border-r border-zinc-800 p-6">
          <h2 className="mb-4 text-xl font-bold">
            {factionKey === 'OFN'
              ? 'Oceanic Federal Navy Force'
              : 'Crusaders Of The Cleansing Light Force'}
          </h2>

          {units.length === 0 ? (
            <p>No units found.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-zinc-700 text-sm">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="border border-zinc-700 p-2 text-left">Name</th>
                  <th className="border border-zinc-700 p-2 text-left">
                    Category
                  </th>
                  <th className="border border-zinc-700 p-2 text-right">
                    Points
                  </th>
                  <th className="border border-zinc-700 p-2 text-center">
                    Add
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/50">
                    <td className="border border-zinc-700 p-2">{u.name}</td>
                    <td className="border border-zinc-700 p-2">{u.category}</td>
                    <td className="border border-zinc-700 p-2 text-right">
                      {calculateUnitPoints(u)}
                    </td>
                    <td className="border border-zinc-700 p-2 text-center">
                      <button
                        onClick={() => addUnit(u)}
                        className="rounded border border-zinc-600 px-2 py-1 hover:bg-zinc-700"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 flex-col bg-zinc-950 p-6">
          <h3 className="mb-2 text-lg font-semibold">Army Preview</h3>
          <div className="flex-1 overflow-y-auto">
            {sortedArmy.length === 0 ? (
              <p>No units selected.</p>
            ) : (
              <ul className="space-y-3">
                {sortedArmy.map((u, i) => {
                  const totalUnit = calculateTotalUnitPoints(u, i)
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
                          {u.category === 'Vehicle' ? u.STR : u.W}, WIP: {u.WIP}
                          , MOV: {u.MOV}
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

          {/* Export button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportPDF}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Export Army to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
