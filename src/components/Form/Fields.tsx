import { FormEvent, useCallback, useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { ListGames } from '../../services/listGames'
import { CreateAd } from '../../services/createAd'
import { Game } from '../../@types/listGames'

import { Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import { Error } from '../Error'

export function Fields() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [error, setError] = useState(false)
  const [useVoiceChannel, setVoiceChannel] = useState(false)

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

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await CreateAd(data.game as string, {
        ...data,
        yearsPlaying: Number(data.yearsPlaying),
        weekDays,
        useVoiceChannel
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return <Error />
  }

  return (
    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="game">
          Qual o game?
        </label>
        <select
          id="game"
          name="game"
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
          defaultValue=""
        >
          <option disabled value="">
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
        <Input
          id="name"
          name="name"
          placeholder="Como te chamam dentro do game? "
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
          <Input
            id="yearsPlaying"
            name="yearsPlaying"
            type="number"
            placeholder="Tudo bem ser ZERO"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual seu discord?</label>
          <Input id="discord" name="discord" placeholder="Usuario#0000" />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">Quando costuma jogar?</label>
          <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-2"
            value={weekDays}
            onValueChange={setWeekDays}
          >
            <ToggleGroup.Item
              value="0"
              className={`w-8 h-8 rounded ${
                weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Domingo"
            >
              D
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="1"
              className={`w-8 h-8 rounded ${
                weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Segunda"
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="2"
              className={`w-8 h-8 rounded ${
                weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Terça"
            >
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              className={`w-8 h-8 rounded  ${
                weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Quarta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"
              className={`w-8 h-8 rounded  ${
                weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Quinta"
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="5"
              className={`w-8 h-8 rounded ${
                weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Sexta"
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="6"
              className={`w-8 h-8 rounded ${
                weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
              title="Sábado"
            >
              S
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart">Qual horário do dia?</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              id="hourStart"
              name="hourStart"
              type="time"
              placeholder="De"
            />
            <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
          </div>
        </div>
      </div>
      <label className="mt-2 flex items-center gap-2 text-sm">
        <Checkbox.Root
          className="w-6 h-6 p-1 rounded bg-zinc-900"
          checked={useVoiceChannel}
          onCheckedChange={() => setVoiceChannel(!useVoiceChannel)}
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </label>
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
