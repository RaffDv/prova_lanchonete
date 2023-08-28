import React from 'react'

type layoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}
export default function Layout({ children,modal }: layoutProps) {
  return (
    { children }
    { modal }
  )
}
