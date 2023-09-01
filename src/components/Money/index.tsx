export default function Money() {
  return (
    <section className="flex flex-col w-full h-full gap-2">
      <span>Preciso de troco para:</span>
      <input
        type="number"
        className="w-full rounded-full bg-inputBg"
        placeholder="R$0,00"
      />
    </section>
  )
}
