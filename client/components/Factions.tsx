import { useNavigate } from 'react-router-dom'

// Import images directly from src/assets
import ofnIcon from '../assets/factions/ofn.png'
import clIcon from '../assets/factions/cl.png'
import mrIcon from '../assets/factions/mr.png'

const FACTIONS = [
  { key: 'OFN', name: 'Oceanic Federal Navy', image: ofnIcon },
  { key: 'CL', name: 'Crusaders Of The Cleansing Light', image: clIcon },
  { key: 'MR', name: 'Melenesian Resistance', image: mrIcon },
]

const Factions = () => {
  const navigate = useNavigate()

  const selectFaction = (faction: string) => {
    navigate(`/builder/${faction}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-16 text-4xl font-bold tracking-wide">
        Kairos: The Fulcrum Wars
      </h1>

      <div className="flex gap-20">
        {FACTIONS.map((faction) => (
          <div
            key={faction.key}
            onClick={() => selectFaction(faction.key)}
            className="group flex cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src={faction.image}
              alt={faction.name}
              className="mb-6 h-40 w-40 object-contain"
            />

            <span className="max-w-xs text-center text-lg transition-colors group-hover:text-zinc-400">
              {faction.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Factions
