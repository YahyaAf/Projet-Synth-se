import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Products from './Products'
import Contact from './Contact'

export default function Routage() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/home' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/products' element={<Products />}/>
                <Route path='/contact' element={<Contact />}/>
              </Route>
           </Routes>
         </BrowserRouter>
        </>
  )
}
