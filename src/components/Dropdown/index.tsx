import { List } from '@phosphor-icons/react'
import * as DropMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

export default function DropdownMenu({ UserEmail }: { UserEmail: string }) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="relative inline-block text-left">
      <DropMenu.Root open={open} onOpenChange={setOpen}>
        <DropMenu.Trigger
          asChild
          className="transition-all duration-300 border border-gray-800 h-fit w-fit bg-gray-800 p-1 rounded cursor-pointer
          hover:bg-gray-500/40 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-md hover:border hover:border-gray-600"
        >
          <span>
            <List size={20} weight="bold" color="white" />
          </span>
        </DropMenu.Trigger>

        <AnimatePresence>
          {open && (
            <DropMenu.Portal forceMount>
              <DropMenu.Content
                className="transition-all duration-300  h-fit w-fit bg-gray-800  rounded text-slate-200 px-2 py-1 space-y-1"
                asChild
                align="start"
              >
                <motion.div
                  className="border border-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {UserEmail ? (
                    <>
                      <Item>
                        <Link href={'#'}>Perfil</Link>
                      </Item>
                      <Item>
                        <Link href={'#'}>Carrinho</Link>
                      </Item>
                      <Item>
                        <Link href={'#'}>Logout</Link>
                      </Item>
                    </>
                  ) : (
                    <Item>
                      <Link href={'/user/login'}>Login</Link>
                    </Item>
                  )}
                </motion.div>
              </DropMenu.Content>
            </DropMenu.Portal>
          )}
        </AnimatePresence>
      </DropMenu.Root>
    </div>
  )
}

function Item({ children }: { children: ReactNode }) {
  return (
    <DropMenu.Item className="rounded px-2 transition-all duration-300 outline-none  hover:bg-gray-500/40  select-none hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-60">
      <motion.div>{children}</motion.div>
    </DropMenu.Item>
  )
}
