import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLinks } from '../constants';

const Navbar = () => {
     const cart = useSelector(state => state.Cartitems);
  return (
     <nav>
          <div className='flex align_center gap'>     
          <Link to={'/'} className='logo'>Shoppy</Link>

          <div className="flex align_center gap text-white capitalize">
               {
                    NavLinks.map(link => (
                         <Link className='nav_link' to={link.name} key={link.id}>{ link.name }</Link>
                    ))
               }
          </div>
          </div>

          <div className="flex align_center gap">
     <Link to={'/login'}>
     <button className='btn text-white'>Login</button>
     </Link>
     <Link to={'/cart'}>
     <button className='cart'>
         <span>{cart.total}</span>
         <GiShoppingCart className='cart_icon' />
         </button>
     </Link>
          </div>
     </nav>
  )
}

export default Navbar