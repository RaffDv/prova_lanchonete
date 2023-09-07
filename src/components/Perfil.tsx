import UserInfo from '@/components/UserInfo'
export default function Perfil() {
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <UserInfo title="Nome" value="" />

      <UserInfo title="Email" value="Email Usuário" />

      <UserInfo title="Senha" value="********" />
    </section>
  )
}
