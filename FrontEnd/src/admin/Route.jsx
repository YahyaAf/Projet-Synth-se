import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import User from './User'
import Produit from './Produit'

export default function Routage() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/users' element={<User/>}/>
                <Route path='/produits' element={<Produit/>}/>
              </Route>
           </Routes>
         </BrowserRouter>
        </>
  )
}
