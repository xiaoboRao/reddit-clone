import React from 'react'
import Navbar from '../Navbar/Navbar'
type layoutProps = {
  children?: React.ReactNode
}
const Layout: React.FC<layoutProps> = (props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  )
}
export default Layout
