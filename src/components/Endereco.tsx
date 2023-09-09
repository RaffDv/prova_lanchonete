import UserInfo from '@/components/UserInfo'

export default function Endereco() {
  return (
    <section className="flex flex-col w-full mt-6 justify-center items-center">
      <UserInfo title="País" value="Brasil" />

      <UserInfo title="Estado" value="RS" />

      <UserInfo title="Cidade" value="Feliz" />

      <UserInfo title="Bairro" value="Mãe do Leo" />

      <UserInfo title="Rua" value="Princesa Izabel" />

      <UserInfo title="Número" value="123" />
    </section>
  )
}
