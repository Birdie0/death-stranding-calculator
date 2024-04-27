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
  const percentage = `${Math.floor((durability / maxDurability) * 100)}%`
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

      <Details summary="How game works?">
        <p>
          ⚠️ Disclaimer: Some of this is might be speculation based on my
          experience with the game.
        </p>

        <p>All structures in the game have durability based on level:</p>

        <ul>
          <li>Level 1: 360,000 points</li>
          <li>Level 2: 540,000 points</li>
          <li>Level 3: 900,000 points</li>
        </ul>

        <p>
          Durability deteriorates 1 point per second, sometimes it's faster due
          to active timefall and player with structure being in its region,
          maybe difficulty effects it too. Basing on this info we can calculate
          how long structures persist (in-game hours):
        </p>

        <ul>
          <li>Level 1: 100 hours</li>
          <li>Level 2: 150 hours</li>
          <li>Level 3: 250 hours</li>
        </ul>

        <p>Durability can be restores 2 ways:</p>

        <ol>
          <li>Upgrading structure</li>
          <li>Repair by providing materials</li>
        </ol>

        <p>
          Upgrading restores it to maximum value, but can be done limited number
          of times. On the other hand, repair don't require a lot of effort,
          sometimes less if you get them repaired by other players.
        </p>

        <p>
          Structures are repaired with providing materials limited to ones used
          for upgrading structure. Repair ratio is the same for all materials:
          240 durability points per 1 material unit, i.e. providing 60 chemicals
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
            Passing the time in timefall shelter during timefall skips 10
            minutes, resting in shelter, safehouse or center - 30 minutes.
          </li>
          <li>
            When durability reaches 90% structure gets repair option available,
            30% - stops functioning, 0% - gets destroyed.
          </li>
          <li>
            Durability percentage is rounded down, i.e. 91.98% will be displayed
            as 91%.
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
            {results.map(([label, result], index) => (
              <li key={index}>
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
