import React from 'react'

type layoutProps = {
  children: React.ReactNode
  modalFood: React.ReactNode
}
export default function Layout({ children, modalFood }: layoutProps) {
  return (
    <>
      {children}
      {modalFood}
    </>
  )
}
