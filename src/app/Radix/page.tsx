'use client'
import { useAuth } from '@/hooks/useGetFromAuth'
import { useAuthStore } from '@/store/auth'

export default function Page() {
  const r = useAuth(useAuthStore, (state) => state.state.user)
  const {
    actions: { logout },
  } = useAuthStore()
  return (
    <>
      <div className="flex items-center justify-center h-full w-full bg-gray-900 text-white flex-col gap-4">
        <span className="fixed top-2">test RADIX UI</span>
        <h1>{JSON.stringify(r, null, 4)}</h1>
        <button
          onClick={() => {
            console.log('a')
            logout()
          }}
        >
          LOGOUT
        </button>
      </div>
    </>
  )
}
