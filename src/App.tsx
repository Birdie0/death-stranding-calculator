import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Input } from './components/input'
import { Select } from './components/select'
import type { Material, Preset } from './utils'
import {
  calculateRequirements,
  calculateTotals,
  formatResult,
  isApproximate,
  materials,
} from './utils'
import { Details } from './components/details'
import styles from './App.module.css'
import { useMemoryStore } from './stores/memory'
import { useShallow } from 'zustand/shallow'
import type { RequirementItem } from './types'
import { presets } from './utils/presets'

function App() {
  const [materialType, setMaterialType] = useState<Material>(materials[0][1])
  const [provided, setProvided] = useState(0)
  const [required, setRequired] = useState(0)
  const [note, setNote] = useState('')
  const [selectedPreset, setSelectedPreset] = useState(
    () => presets[0].structures[0].name,
  )

  const [memory, addItem, removeItem, clearMemory] = useMemoryStore(
    useShallow((state) => [
      state.memory,
      state.addItem,
      state.removeItem,
      state.clearMemory,
    ]),
  )

  const remaining = Math.max(0, required - provided)
  const requirements = useMemo(
    () => calculateRequirements(remaining, materialType),
    [materialType, remaining],
  )

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (requirements.length === 0) return

    const materialTypeLabel = materials.find(([, b]) => b === materialType)![0]

    addItem([materialTypeLabel, remaining, [...requirements], note])
    setProvided(0)
    setRequired(0)
    setNote('')
  }

  function handleRemove(index: number) {
    removeItem(index)
  }

  function handleClear() {
    clearMemory()
  }

  const presetOptions = useMemo(() => {
    return presets.map(
      ({ name, structures }) =>
        [
          name,
          structures.map(
            ({ name: nestedName }) => [nestedName, nestedName] as const,
          ),
        ] as const,
    )
  }, [])

  const availablePresets = useMemo(() => {
    const map = new Map<Preset['name'], Preset['resources']>()

    for (const { structures } of presets) {
      for (const { name, resources } of structures) {
        map.set(name, resources)
      }
    }

    return map
  }, [])

  const totals: RequirementItem[] = useMemo(
    () => calculateTotals(memory),
    [memory],
  )

  function handlePreset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const selectedPresetResources = availablePresets.get(selectedPreset)
    if (selectedPresetResources) {
      for (const [material, amount] of selectedPresetResources) {
        const materialLabel = materials.find(([, b]) => b === material)![0]

        addItem([
          materialLabel,
          amount,
          calculateRequirements(amount, material),
          selectedPreset,
        ])
      }
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
          containrers groped. Click Clear to start anew.
        </p>
        <p>
          Made by{' '}
          <a href="https://github.com/Birdie0" target="_blank" rel="noreferrer">
            Birdie 🐦
          </a>
        </p>
      </Details>

      <form onSubmit={handlePreset}>
        <Select
          label="Preset"
          options={presetOptions}
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
        />

        <br />

        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleSave}>
        <Select
          label="Material type"
          options={materials}
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value as Material)}
        />
        <Input
          label="Provided"
          type="number"
          min={0}
          inputMode="numeric"
          value={provided}
          onChange={(e) => setProvided(e.target.valueAsNumber)}
        />
        <Input
          label="Required"
          type="number"
          min={0}
          inputMode="numeric"
          value={required}
          onChange={(e) => setRequired(e.target.valueAsNumber)}
        />
        <Input
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <p>Remaning: {remaining}</p>
        <ul>
          {requirements.map((v, i) => (
            <li key={i}>{formatResult(v)}</li>
          ))}
        </ul>
        <button>Save</button>
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
              {memory.map(([type, total, resources, savedNote], index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>{isApproximate(resources, total)}</td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
                  <td>{savedNote}</td>
                  <td>
                    <button
                      className={styles.remove_btn}
                      onClick={() => handleRemove(index)}
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
            higher that required value because it was rounded up to match
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
              {totals.map(([type, total, resources, notes], index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>{isApproximate(resources, total)}</td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
                  <td>{notes}</td>
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

export default App
