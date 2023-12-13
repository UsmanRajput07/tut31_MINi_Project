import React from 'react'
import Headers from './Headers'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
   <>
   <Headers/>
   <main>
    <Outlet/>
   </main>
  <Footer/>
   </>
  )
}
