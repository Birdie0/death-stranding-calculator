import { useMemo, useState } from 'react'
import { Input } from './components/input'
import { Select } from './components/select'
import {
  Material,
  calculateRequirements,
  formatResult,
  isApproximate,
  materials,
} from './utils'
import { Details } from './components/details'
import styles from './App.module.css'

function App() {
  const [materialType, setMaterialType] = useState<Material>(materials[0][1])
  const [provided, setProvided] = useState(0)
  const [required, setRequired] = useState(0)
  const [memory, setMemory] = useState<[string, number, [number, number][]][]>(
    [],
  )

  const remaining = Math.max(0, required - provided)
  const requirements = useMemo(
    () => calculateRequirements(remaining, materialType),
    [materialType, remaining],
  )

  function handleSave() {
    if (requirements.length === 0) return

    const materialTypeLabel = materials.find(([, b]) => b === materialType)![0]

    setMemory(() => [
      ...memory,
      [materialTypeLabel, remaining, [...requirements]],
    ])
    setProvided(0)
    setRequired(0)
  }

  function handleRemove(index: number) {
    setMemory(memory.filter((_v, i) => i !== index))
  }

  function handleClear() {
    setMemory([])
  }

  const totals: [string, number, [number, number][]][] = useMemo(() => {
    const result: Record<string, [number, Record<number, number>]> = {}

    for (const [material, total, resources] of memory) {
      if (!result[material]) {
        result[material] = [0, {}]
      }

      result[material][0] += total
      for (const [size, count] of resources) {
        if (!result[material][1][size]) {
          result[material][1][size] = 0
        }

        result[material][1][size] += count
      }
    }

    return Object.entries(result).map(([material, [total, resources]]) => {
      const res = Object.entries(resources).map(
        ([a, b]) => [Number(a), b] as [number, number],
      )
      return [material, total, res]
    })
  }, [memory])

  return (
    <>
      <h1>📦 Death Stranding Resources Calculator</h1>

      <Details summary="How to use?">
        <p>
          You know that feel when you look at numbers under road construction or
          planning to build multiple structures and get confused very quickly at
          how many resource containers you need in total? Well, fear no more,
          this little tool will help you.
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
        value={provided}
        onChange={(e) => setProvided(e.target.valueAsNumber)}
      />
      <Input
        label="Required"
        type="number"
        min={0}
        value={required}
        onChange={(e) => setRequired(e.target.valueAsNumber)}
      />

      <p>Remaning: {remaining}</p>
      <ul>
        {requirements.map((v, i) => (
          <li key={i}>{formatResult(v)}</li>
        ))}
      </ul>
      <button type="button" onClick={handleSave}>
        Save
      </button>

      {memory.length > 0 && (
        <>
          <h2>Memory:</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Total</th>
                <th>Containers</th>
                <th>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {memory.map(([type, total, resources], index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>
                    {total}
                    {isApproximate(resources, total) && '*'}
                  </td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
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
              </tr>
            </thead>
            <tbody>
              {totals.map(([type, total, resources], index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>
                    {total}
                    {isApproximate(resources, total) && '*'}
                  </td>
                  <td>{resources.map((v) => formatResult(v)).join(' + ')}</td>
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
