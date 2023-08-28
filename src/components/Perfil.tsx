import UserInfo from '@/components/UserInfo'
export default function Perfil() {
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <UserInfo title="Nome" value="Nome Usuário" />

      <UserInfo title="Email" value="Email Usuário" />

      <UserInfo title="Senha" value="********" />

      <button className="flex mt-12 w-32 h-7 bg-buttonBg border rounded-full text-font font-bold item-center justify-center">
        Salvar
      </button>
    </section>
  )
}
