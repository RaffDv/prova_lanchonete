import CartMain from '@/components/cart/cartMain/page'

export default function Cart({ params }: { params: { email: string } }) {
  return (
    <section>
      <CartMain email={params.email} />
    </section>
  )
}
