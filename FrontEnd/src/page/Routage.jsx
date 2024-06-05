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
import Commande from './Commande.jsx'
import AdminHome from '../admin/Home.jsx'
import User from '../admin/User.jsx'
import Produit from '../admin/Produit.jsx'
import AdminManagement from '../admin/CreateAdmin.jsx'
import AdminLayout from '../components/AdminLayout.jsx'
import CommandPage from '../admin/CommandeManagement.jsx'
import NotFound from './NotFound.jsx'
import LoginAdmin from '../admin/LoginAdmin.jsx'
import { useContext } from 'react'
import { AuthAdminContext } from '../context/AuthAdminContext.jsx'

export default function Routage() {
  const {user}=useAuthContext()
  const {admin}=useContext(AuthAdminContext)
  console.log(admin);
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home/>}/>

                <Route
                path='/login'
                element={!user ?<Login/>:<Navigate to="/"/>}
                />
                <Route
                path='/signup'
                element={!user ? <Signup /> :<Navigate to="/"/>}
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
                <Route
                path='/commande/:id'
                element={user ? <Commande/> : <Navigate to="/login"/>}
                />
                <Route
                path='*'
                element={<NotFound/>}
                />
              </Route>

              {/* admin route */}
              <Route
              path="/adminlogin"
              element={!admin ? <LoginAdmin/> : <Navigate to="/admin"/>}/>

              <Route
              path='/admin'
              element={admin ? <AdminLayout />:<Navigate to="/adminlogin"/> }>

                <Route
                path='/admin/Home'
                element={admin? <AdminHome/>:<Navigate to="/adminlogin"/>}
                />
                <Route
                path='/admin/user'
                element={admin ? <User/>:<Navigate to="/adminlogin"/> }
                />
                <Route
                path='/admin/produit'
                element={admin ? <Produit/> :<Navigate to="/adminlogin"/> }
                />
                <Route
                path='/admin/admins'
                element={admin ? <AdminManagement/> :<Navigate to="/adminlogin"/>}
                />
                <Route
                path='/admin/commande'
                element={admin ? <CommandPage/>:<Navigate to="/adminlogin"/> }
                />
              </Route>
          </Routes>

        </BrowserRouter>
        </>
  )
}
