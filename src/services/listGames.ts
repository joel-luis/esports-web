import { api } from './api'
import { Game } from '../@types/listGames'

export async function ListGames(): Promise<Game[]> {
  try {
    const { data } = await api.get('/games')

    return data
  } catch (exception) {
    throw new Error(`Failed to get games. ${exception}`)
  }
}
