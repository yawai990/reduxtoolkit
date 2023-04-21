import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLinks } from '../constants';
import { BiUserCircle } from 'react-icons/bi';

const Navbar = () => {
     const cart = useSelector(state => state.Cartitems);


     const handleLogOut = () => {
          sessionStorage.clear('token');
          localStorage.clear('userData');
          localStorage.clear('token');
          location.reload()
     };
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

          <div className="flex align_center gap-sm">
    
          {
               sessionStorage.getItem('token') ?  
                <div className='profile_container text-white flex justify-center align_center relative' style={{ gap:'5px'}}>
               <BiUserCircle className='profile' />
                <p>admin</p>

                <div className='user_data_pop_up'>
                    <button>Setting</button>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
                </div>
               : 
               <Link to={'/login'}>
               <button className='btn text-white'>
                    Log In
               </button>
          </Link>
          }
   
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