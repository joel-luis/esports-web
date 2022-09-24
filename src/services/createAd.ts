import { CreatedProps } from '../@types/createAd'
import { api } from './api'

export async function CreateAd(gameId: string, ad: any): Promise<CreatedProps> {
  try {
    const { data } = await api.post(`/games/${gameId}/ads`, ad)

    return data
  } catch (exception) {
    throw new Error(`Failed to create ad ${exception}`)
  }
}
