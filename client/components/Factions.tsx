import { useNavigate } from 'react-router-dom'

const Factions = () => {
  const navigate = useNavigate()
  const selectFaction = (faction: string) => {
    navigate(`/builder/${faction}`)
  }

  return (
    <div>
      <button onClick={() => selectFaction('OFN')}>Oceanic Federal Navy</button>
      <button onClick={() => selectFaction('CL')}>
        Crusaders of the Light
      </button>
      <button onClick={() => selectFaction('MR')}>Mystic Rebels</button>
    </div>
  )
}

export default Factions
