import { useCallback, useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'

import { ListGames } from '../../services/listGames'
import { Game } from '../../@types/listGames'

import { Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import { Error } from '../Error'

export function Fields() {
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
    <form className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="game">
          Qual o game?
        </label>
        <select
          id="game"
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
        >
          <option disabled selected value="">
            Selecione o game que deseja jogar
          </option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Seu nome (ou nickname)</label>
        <Input id="name" placeholder="Como te chamam dentro do game? " />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
          <Input
            id="yearsPlaying"
            type="number"
            placeholder="Tudo bem ser ZERO"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual seu discord?</label>
          <Input id="discord" placeholder="Usuario#0000" />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">Quando costuma jogar?</label>
          <div className="grid grid-cols-4 gap-2">
            <button className="w-8 h-8 rounded bg-zinc-900" title="Domingo">
              D
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Segunda">
              S
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Terça">
              T
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Quarta">
              Q
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Quinta">
              Q
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Sexta">
              S
            </button>
            <button className="w-8 h-8 rounded bg-zinc-900" title="Sábado">
              S
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart">Qual horário do dia?</label>
          <div className="grid grid-cols-2 gap-2">
            <Input id="hourStart" type="time" placeholder="De" />
            <Input id="hourEnd" type="time" placeholder="Até" />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </div>
      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        >
          <GameController size={24} />
          Encontrar duo
        </button>
      </footer>
    </form>
  )
}
