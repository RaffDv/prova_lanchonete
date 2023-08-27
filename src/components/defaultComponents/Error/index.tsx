import Balancer from 'react-wrap-balancer'
import { tv, VariantProps } from 'tailwind-variants'

const error = tv({
  base: 'max-w-[80%] text-xs text-red-600/90 transition-all duration-300',
  variants: {
    size: {
      default: 'h-fit',
      normal: 'h-fit',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type errorProps = VariantProps<typeof error> & {
  msg?: string
  className?: string
}
function Error({ msg, className, size, ...props }: errorProps) {
  return <Balancer className={error({ size, className })}>{msg}</Balancer>
}

export default Error
