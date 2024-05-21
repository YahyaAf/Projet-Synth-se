import React from 'react'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Home from './Home.jsx'
import Products from './Products.jsx'
import Contact from './Contact.jsx'
import AddToCard from './AddToCard.jsx'
import useAuthContext from '../hooks/useAuthContext.js'
import ProductDetails from './ProductDetails.jsx'

export default function Routage() {
  const {user}=useAuthContext()
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/home' element={<Home/>}/>

                <Route
                path='/login'
                element={!user ?<Login/>:<Navigate to="/home"/>}
                />
                <Route
                path='/signup'
                element={!user ? <Signup /> :<Navigate to="/home"/>}
                />
                <Route
                path='/products'
                element={user ? <Products /> : <Navigate to="/login"/>}
                />
                <Route
                path='/productDetails/:id'
                element={user ? <ProductDetails/>: <Navigate to="/login"/>}
                />
                <Route
                path='/contact'
                element={user ? <Contact /> : <Navigate to="/login"/>}
                />
                <Route
                path='/addToCard'
                element={user ? <AddToCard /> : <Navigate to="/login"/>}
                />
              </Route>
           </Routes>
         </BrowserRouter>
        </>
  )
}
