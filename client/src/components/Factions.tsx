import { useNavigate } from 'react-router-dom'

// Import images directly from src/assets
import ofnIcon from '../assets/factions/ofn.png'
import clIcon from '../assets/factions/cl.png'

const FACTIONS = [
  {
    key: 'OFN',
    name: 'Oceanic Federal Navy',
    image: ofnIcon,
    className: 'h-56 w-56',
  },
  {
    key: 'CL',
    name: 'Crusaders Of The Cleansing Light',
    image: clIcon,
    className: 'h-40 w-40',
  },
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
            <div className="mb-6 flex h-56 w-56 items-center justify-center">
              <img
                src={faction.image}
                alt={faction.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

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
