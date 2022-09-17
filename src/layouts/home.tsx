import { useCallback, useEffect, useState } from 'react'

import { Game } from '../@types/listGames'
import { ListGames } from '../services/listGames'

import logo from '../assets/logo-nlw-esports.png'
import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'

import '../styles/main.css'
import { Error } from '../components/Error'

function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState(false)

  const fecthGames = useCallback(async () => {
    try {
      const data = await ListGames()
      if (data) {
        setGames(data)
      }
    } catch (error) {
      setError(true)
    }
  }, [])

  useEffect(() => {
    fecthGames()
  }, [])

  if (error) {
    return <Error />
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo Nlw Esports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default Home
