import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from '../components/CreateAdBanner'
import { Fields } from './Form/Fields'

export function Modal() {
  return (
    <Dialog.Root>
      <CreateAdBanner />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <Fields />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
