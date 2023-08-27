import Lista from './ListaBebida'
import BarraPesquisa from './BarraPesquisa'
export default function Bebidas() {
  return (
    <main className="flex w-full h-full flex-col items-center">
      <BarraPesquisa />
      <div className="flex flex-col w-full mt-6">
        <Lista />
        <Lista />
        <Lista />
        <Lista />
      </div>
    </main>
  )
}
