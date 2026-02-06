import { useNavigate } from 'react-router-dom'

type Faction = {
  id: string
  name: string
  icon: string // path to your PNG
}

const factions: Faction[] = [
  { id: 'OFN', name: 'Oceanic Federal Navy', icon: '/icons/ofn.png' },
  { id: 'CL', name: 'Crusaders Of The Cleansing Light', icon: '/icons/cl.png' },
  { id: 'MR', name: 'Melenesian Resistance', icon: '/icons/mr.png' }, // WIP
]

export default function Factions() {
  const navigate = useNavigate()

  const handleClick = (factionId: string) => {
    // Navigate to army builder with faction in URL
    navigate(`/builder/${factionId}`)
  }

  return (
    <div className="factions-grid">
      {factions.map((f) => (
        <div
          key={f.id}
          className="faction-card cursor-pointer rounded-lg border p-4 text-center"
          onClick={() => handleClick(f.id)}
        >
          <img src={f.icon} alt={f.name} className="mx-auto mb-2 h-16 w-16" />
          <h2 className="text-lg font-bold">{f.name}</h2>
        </div>
      ))}
    </div>
  )
}
