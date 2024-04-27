import { useLocation } from 'wouter'
const links = [
  ['Calculator', '/'],
  ['Repair (WIP)', '/repair'],
] as const

export function Navbar() {
  const [location, setLocation] = useLocation()

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
