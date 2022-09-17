import logo from '../assets/logo-nlw-esports.png'

export function Error() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 px-4">
      <img src={logo} alt="Logo Nlw Esports" />
      <h1 className="text-2xl text-white font-black mt-20">
        Ocorreu um erro ao carregar os dados, por favor tente novamente!
      </h1>
    </div>
  )
}
