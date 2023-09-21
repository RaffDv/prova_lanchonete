'use client'
import api from '@/api'
import { useAuth } from '@/hooks/useGetFromAuth'
import { userType } from '@/schemas/global'
import { useAuthStore } from '@/store/auth'
import { List } from '@phosphor-icons/react'
import * as DropMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export default function DropdownMenu({
  params,
}: {
  params: { email: string }
}) {
  const [data, setData] = useState<userType>({} as userType)
  const [open, setOpen] = useState<boolean>(false)
  const {
    actions: { logout },
  } = useAuthStore()

  const user = useAuth(useAuthStore, (state) => state.state.user)
  const { push } = useRouter()

  const getdata = async () => {
    const r = await api.user.unique({ email: params.email })
    if (r.success) {
      setData(r.data.data)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  console.log(params)
  return (
    <div className="relative inline-block text-left">
      <DropMenu.Root open={open} onOpenChange={setOpen}>
        <DropMenu.Trigger
          asChild
          className="transition-all duration-300 border  p-1 rounded cursor-pointer"
        >
          <span>
            <List size={20} weight="bold" color="black" />
          </span>
        </DropMenu.Trigger>

        <AnimatePresence>
          {open && (
            <DropMenu.Portal forceMount>
              <DropMenu.Content
                className="t h-fit w-fit bg-white shadow-md  rounded text-black px-2 py-1 space-y-1"
                asChild
                align="center"
                sideOffset={5}
              >
                <motion.div
                  className="border border-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DropMenu.Arrow className="fill-gray-800" />
                  {user?.email ? (
                    <>
                      <Item>
                        <Link href={`user/${user.email}/edit`}>Perfil</Link>
                      </Item>
                      <Item>
                        <Link href={`/user/${user.email}/cart`}>Carrinho</Link>
                      </Item>
                      <Item>
                        <button
                          className="h-fit w-fit"
                          onClick={async () => {
                            push('/API/user/logout')
                          }}
                        >
                          Logout
                        </button>
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
    <DropMenu.Item className="rounded transition-colors border border-white hover:border hover:border-sky-300 px-2 outline-none  hover:bg-sky-400/30  select-none hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-md ">
      <motion.div>{children}</motion.div>
    </DropMenu.Item>
  )
}
