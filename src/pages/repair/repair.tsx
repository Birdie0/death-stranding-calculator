import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Details, Input, Select } from '../../components'
import { availablePresets, presetOptions } from '../../utils/data'
import {
  calculateRequirements,
  formatResult,
  isApproximate,
  materials,
} from '../../utils/materials-math'
import { durabilityPerLevel, structures } from '../../utils/structures'

export function Repair() {
  const [durability, setDurability] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(
    () => structures[0].items[0].name,
  )

  const currentPreset = useMemo(
    () => availablePresets.get(selectedPreset),
    [selectedPreset],
  )

  const level = useMemo(() => currentPreset?.level ?? 1, [currentPreset])
  const repairMaterials = useMemo(
    () => currentPreset?.repairMaterials ?? [],
    [currentPreset],
  )

  function handlePreset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  const maxDurability = durabilityPerLevel[level - 1]
  const repairableDurability = maxDurability - durability
  const percentage = `${100 - Math.floor((durability / maxDurability) * 100)}%`
  const materialsNeeded = Math.floor(repairableDurability / 240)

  const results = useMemo(() => {
    return repairMaterials.map((material) => {
      const materialLabel = materials.find(([, b]) => b === material)?.[0]

      return [
        materialLabel,
        calculateRequirements(materialsNeeded, material),
      ] as const
    })
  }, [repairMaterials, materialsNeeded])

  return (
    <>
      <h1>📦 Death Stranding Structures Repair</h1>

      <Details summary="How the game works?">
        <p>
          ⚠️ Disclaimer: Some of this is might be incorrect as it's fully based
          on my experience.
        </p>

        <p>Durability is solely based on structure's level:</p>

        <ul>
          <li>Level 1: 360,000 points</li>
          <li>Level 2: 540,000 points</li>
          <li>Level 3: 900,000 points</li>
        </ul>

        <p>
          Durability decreases 1 point per second, active timefall seemingly
          increases rate, but it affects only structures in visible range,
          meaning distant structures, even when shown in range active timefall
          on forecast map, get damage at usual rate. Difficulty likely increases
          timefall damage even further since containers get damaged faster on
          higher difficulties but its scale is unknown. Basing on this info we
          can calculate how long structures would persist if not repaired in
          time (in in-game hours):
        </p>

        <ul>
          <li>Level 1: 100 hours</li>
          <li>Level 2: 150 hours</li>
          <li>Level 3: 250 hours</li>
        </ul>

        <p>
          Durability can be restored 2 ways: upgrading and repairing. Upgrading
          restores durability to next maximum value, but can be done limited
          number of times. Repair requires providing materials.
        </p>

        <p>
          Materials that can be used for repairing are limited to ones used for
          upgrading structure (chiral crystals are always an option). Repair
          ratio is the same for all materials: 240 durability points per 1
          material unit, i.e. providing 60 chemicals or 60 chiral crystals both
          would restore 14,400 durability points.
        </p>

        <p>Some facts worth mentioning:</p>

        <ul>
          <li>
            Other players' structures durabilities are not "shared" but repair
            and upgrades are, so when you get notifications about upgrading or
            providing means durability for those got replenished.
          </li>
          <li>
            Upgrade/repair is not applied to player world in moment, rather in
            batches, exact logic is unknown.
          </li>
          <li>
            Passing time in Timefall Shelter during timefall fast-forwards 10
            minutes, resting in shelter or private room - 30 minutes. When menu
            is opened or any cutscene plays, time is considered stopped.
          </li>
          <li>
            When durability lowers to 90% structure gets repair option
            available, 29.7% (shown as 29%) - stops functioning, 0% - gets
            destroyed.
          </li>
          <li>
            Durability percentage on map is rounded down, i.e. 91.98% will be
            displayed as 91%.
          </li>
        </ul>
      </Details>

      <form onSubmit={handlePreset}>
        <fieldset>
          <legend>Repair cost</legend>

          <Select
            label="Structure"
            options={presetOptions}
            value={selectedPreset}
            onChange={(event) => {
              setSelectedPreset(event.target.value)
              setDurability(0)
            }}
          />

          <Input
            type="number"
            label="Current durability (exact)"
            min={0}
            max={maxDurability}
            value={durability}
            onChange={(event) =>
              setDurability(Math.min(maxDurability, event.target.valueAsNumber))
            }
          />

          <Input
            type="range"
            label="Slider"
            min={0}
            max={maxDurability}
            value={durability}
            onChange={(event) =>
              setDurability(Math.min(maxDurability, event.target.valueAsNumber))
            }
          />

          <ul>
            <li>Max durability: {maxDurability}</li>
            <li>
              Durability to repair: {repairableDurability} ({percentage})
            </li>
            <li>Materials needed: {materialsNeeded}</li>
          </ul>

          <p>
            To restore full durability provide one of the next amount of
            materials:
          </p>

          <ul>
            {results.map(([label, result]) => (
              <li key={label}>
                {label}:{' '}
                {result.map((value) => formatResult(value)).join(' + ')}
                {' = '}
                {isApproximate(result, materialsNeeded)}
              </li>
            ))}
          </ul>

          <blockquote>
            <code>*</code> means total amount of resources in the containers is
            higher that required value because it was rounded up to match
            minimal number of containers needed.
          </blockquote>
        </fieldset>
      </form>
    </>
  )
}
