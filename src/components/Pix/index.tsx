export default function Pix() {
  return (
    <div className="flex flex-col h-full w-full items-start justify-start">
      <div className="flex flex-col w-full h-fit p-4 border-b-gray-700 border-b gap-2">
        <span className="border-b border-b-gray-600 w-fit">Chave PIX</span>
        <span className="font-medium ml-4">avell@gmail.com</span>
      </div>

      <input type="file" className="hidden" id="comprovante" />
      <label htmlFor="comprovante" className="font-medium m-4 underline">
        Enviar comprovante
      </label>
    </div>
  )
}
