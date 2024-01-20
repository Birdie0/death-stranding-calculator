import { useMemo, useState } from 'react'
import { Input } from './components/input'
import { Select } from './components/select'
import {
  Material,
  calculateRequirements,
  formatResult,
  materials,
} from './utils'
import { Details } from './components/details'

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

  const totals = useMemo(() => {
    const arr: [string, number, [number, number][]][] = []

    // TODO: calculate total values
    // maybe add 0 but don't show it
    // for (const record of memory) {
    //   arr.find(([type]) => type === record[0])
    // }

    return arr
  }, [memory])

  return (
    <>
      <h1>📦 Death Stranding Resources Calculator</h1>

      <Details summary="How to use?">
        <p>bla bla bla...</p>
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
          <ul>
            {memory.map(([type, total, resources], index) => (
              <li key={index}>
                {type} - {total} ={' '}
                {resources.map((v) => formatResult(v)).join(' + ')}{' '}
                <button type="button" onClick={() => handleRemove(index)}>
                  x
                </button>
              </li>
            ))}
          </ul>

          <h2>Total</h2>
          <ul>
            {totals.map(([type, total, resources], index) => (
              <li key={index}>
                {type} - {total} ={' '}
                {resources.map((v) => formatResult(v)).join(' + ')}{' '}
              </li>
            ))}
          </ul>

          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </>
      )}
    </>
  )
}

export default App
