import { useHashLocation } from 'wouter/use-hash-location'

const links = [
  ['Calculator', '/'],
  ['Calculator (DS2)', '/ds2'],
  ['Repair (WIP)', '/repair'],
] as const

export function Navbar() {
  const [location, setLocation] = useHashLocation()

  return (
    <nav>
      {links.map(([label, href]) => (
        <button key={label} type="button" onClick={() => setLocation(href)}>
          {location === href ? <b>{label}</b> : label}
        </button>
      ))}
    </nav>
  )
}
