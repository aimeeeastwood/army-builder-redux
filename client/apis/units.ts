import type { UnitTemplate } from '../../models/units.ts'

export const calculateUnitPoints = (unit: UnitTemplate) => {
  if (unit.category === 'Vehicle') {
    return unit.points
  }

  return unit.baseSize * unit.costPerModel
}
