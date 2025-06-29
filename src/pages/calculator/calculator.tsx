import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Details, Input, Select } from '../../components'
import { useMemoryStore } from '../../stores/memory'
import type { RequirementItem } from '../../types'
import { availablePresets, presetOptions } from '../../utils/data'
import type { Material } from '../../utils/materials-math'
import {
  calculateRequirements,
  calculateTotals,
  formatResult,
  isApproximate,
  materials,
} from '../../utils/materials-math'
import { structures } from '../../utils/structures'

import styles from './calculator.module.css'

export function Calculator() {
  const [materialType, setMaterialType] = useState<Material>(materials[0][1])
  const [provided, setProvided] = useState(0)
  const [required, setRequired] = useState(0)
  const [note, setNote] = useState('')
  const [selectedPreset, setSelectedPreset] = useState(
    () => structures[0].items[0].name,
  )

  const [memory, addItem, removeItem, clearMemory] = useMemoryStore(
    useShallow((state) => [
      state.memory,
      state.addItem,
      state.removeItem,
      state.clearMemory,
    ]),
  )

  // Create materials array with hotkey information
  const materialsWithHotkeys = useMemo(() => {
    const hotkeyMap: Record<Material, string> = {
      ceramics: 'C',
      chemicals: 'H',
      chiral_crystals: 'I',
      metals: 'M',
      resins: 'R',
      special_alloys: 'S',
    }

    return materials.map(
      ([label, value]) => [`${label} (${hotkeyMap[value]})`, value] as const,
    )
  }, [])

  const remaining = Math.max(0, required - provided)
  const requirements = useMemo(
    () => calculateRequirements(remaining, materialType),
    [materialType, remaining],
  )

  const formattedRequirements = useMemo(
    () => requirements.map((value) => formatResult(value)),
    [requirements],
  )

  // Hotkey handling for material type selection
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Only handle hotkeys when not typing in text input fields or textareas
      if (
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLInputElement && 
         event.target.type !== 'number')
      ) {
        return
      }

      // Ignore hotkeys when ctrl, alt, or meta keys are pressed
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return
      }

      const key = event.key.toLowerCase()

      const materialMap: Record<string, Material> = {
        c: 'ceramics',
        h: 'chemicals',
        i: 'chiral_crystals',
        m: 'metals',
        r: 'resins',
        s: 'special_alloys',
      }

      const newMaterial = materialMap[key]
      if (newMaterial) {
        setMaterialType(newMaterial)
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (requirements.length === 0) {
      return
    }

    const materialTypeLabel = materials.find(([, b]) => b === materialType)?.[0]

    if (!materialTypeLabel) {
      return
    }

    addItem({
      id: crypto.randomUUID(),
      material: materialTypeLabel,
      total: remaining,
      resources: [...requirements],
      note,
    })
    setProvided(0)
    setRequired(0)
    setNote('')
  }

  function handleRemove(id: RequirementItem['id']) {
    removeItem(id)
  }

  function handleClear() {
    clearMemory()
  }

  const totals: RequirementItem[] = useMemo(
    () => calculateTotals(memory),
    [memory],
  )

  function handlePreset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const preset = availablePresets.get(selectedPreset)
    if (!preset) {
      return
    }

    for (const [material, amount] of preset.resources) {
      const materialLabel = materials.find(([, b]) => b === material)?.[0]

      if (!materialLabel) {
        return
      }

      addItem({
        id: crypto.randomUUID(),
        material: materialLabel,
        total: amount,
        resources: calculateRequirements(amount, material),
        note: selectedPreset,
      })
    }
  }

  return (
    <>
      <h1>📦 Death Stranding Resources Calculator</h1>

      <Details summary="How to use?">
        <p>
          Ever experienced the feeling of confusion while planning to build
          multiple structures? Never able to determine how many Resource
          Containers you&apos;ll need? Well worry not, this tool is here!
        </p>
        <p>
          Just pick type of material, enter numbers of provided and required
          materials. After that you&apos;ll see remaining number of materials
          split into least possible number of material containers.
        </p>
        <p>
          Click Save to save calculation to memory. In Total section all
          materials will be summed up together with keeping number of required
          containers grouped. Click Clear to start anew.
        </p>
        <p>
          <strong>Hotkeys:</strong> You can quickly change material types using
          keyboard shortcuts:
        </p>
        <ul>
          <li>
            <kbd>C</kbd> - Ceramics
          </li>
          <li>
            <kbd>H</kbd> - Chemicals
          </li>
          <li>
            <kbd>I</kbd> - Chiral Crystals
          </li>
          <li>
            <kbd>M</kbd> - Metals
          </li>
          <li>
            <kbd>R</kbd> - Resins
          </li>
          <li>
            <kbd>S</kbd> - Special Alloys
          </li>
        </ul>
        <p>
          Made by{' '}
          <a href="https://github.com/Birdie0" target="_blank" rel="noreferrer">
            Birdie 🐦
          </a>
        </p>
      </Details>

      <form onSubmit={handlePreset}>
        <fieldset>
          <legend>Use structure preset</legend>

          <Select
            label="Structure"
            options={presetOptions}
            value={selectedPreset}
            onChange={(event) => setSelectedPreset(event.target.value)}
          />

          <br />

          <button type="submit">Add</button>
        </fieldset>
      </form>

      <form onSubmit={handleSave}>
        <fieldset>
          <legend>Add materials manually</legend>

          <Select
            label="Material type"
            options={materialsWithHotkeys}
            value={materialType}
            onChange={(event) =>
              setMaterialType(event.target.value as Material)
            }
          />
          <Input
            label="Provided"
            type="number"
            min={0}
            inputMode="numeric"
            value={provided}
            onChange={(event) => setProvided(event.target.valueAsNumber)}
          />
          <Input
            label="Required"
            type="number"
            min={0}
            inputMode="numeric"
            value={required}
            onChange={(event) => setRequired(event.target.valueAsNumber)}
          />
          <Input
            label="Note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />

          <p>Remaining: {remaining}</p>
          <ul>
            {formattedRequirements.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <button type="submit">Save</button>
        </fieldset>
      </form>

      {memory.length > 0 && (
        <>
          <h2>Memory:</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Total</th>
                <th>Containers</th>
                <th>Note</th>
                <th>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {memory.map(({ id, material, total, resources, note }) => (
                <tr key={id}>
                  <td>{material}</td>
                  <td>{isApproximate(resources, total)}</td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
                  <td>{note}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <blockquote>
            <code>*</code> means total amount of resources in the containers is
            higher than required value because it was rounded up to match
            minimal number of containers needed.
          </blockquote>

          <h2>Total</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Total</th>
                <th>Containers</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {totals.map(({ id, material, total, resources, note }) => (
                <tr key={id}>
                  <td>{material}</td>
                  <td>{isApproximate(resources, total)}</td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </>
      )}
    </>
  )
}
