export default function Perfil() {
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Nome</h2>
        <p className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4">
          Username
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Email</h2>
        <p className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4">
          Email
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-b-2 w-full">
        <h2 className="mt-4 font-bold text-sm">Senha</h2>
        <p className="w-60 h-8 bg-cyan-figma border rounded-full mt-2 flex justify-center items-center mb-4">
          *****
        </p>
      </div>
      <button className="flex relative mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center">
        Salvar
      </button>
    </section>
  )
}
