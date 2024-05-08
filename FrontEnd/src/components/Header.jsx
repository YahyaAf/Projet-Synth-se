import {Link} from 'react-router-dom'
import {useContext} from 'react'
import '../assets/fontawesome-free-6.4.2-web/css/all.css'
import '../App.css'
import { CartContext } from "../context/CartContext"
export default function Header() {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;
  //reduce((count, item) => count + item.count, 0)
  return (
    <header>
        <Link to='/' className='logo'>Home</Link>
        <div className="links">
          <Link className='about' to='/Products'>Products</Link>

          <div className="addet">
            <Link className='' to='/'></Link>
          </div>
          <Link className='login' to='/login'><i className="fa-solid fa-user"></i></Link>
        </div>
    </header>
  )
}
