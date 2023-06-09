import React, { useState, useEffect } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLinks } from '../constants';
import { BiUserCircle } from 'react-icons/bi';

const Navbar = () => {
     const cart = useSelector(state => state.Cartitems);
     const [ show ,setShow ] = useState(false);

     useEffect(() =>{

          if(sessionStorage.getItem('token')){
               document.getElementById('profile').addEventListener('mouseout', () =>{
                    setShow(true)
                    setTimeout(() => {
                         setShow(false)
                    }, 5000);
               })
          }
     },[ show ]);

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
                <div id='profile' className='profile_container text-white relative' onClick={() => setShow(true)}>
                    <div className='profile_container flex justify-center align_center' style={{ gap:'5px'}}>
                    <BiUserCircle className='profile' />
                    <p>{JSON.parse(localStorage.getItem('userInfo')).name}</p>
                </div>
               {
                    show && 
                <div className='user_data_pop_up'>
                   
                    <button className='user_data_pop_up_btn'>
                    <Link to={'/user/userinfo'}>
                         Setting
                    </Link>
                         </button>
                    <button className='user_data_pop_up_btn' onClick={handleLogOut}>Log Out</button>
                </div>
               }
                </div>
               : 
               <>
          <Link to={'/register'}>
               <button className='btn text-white'>
                    Sign Up
               </button>
          </Link>
               <Link to={'/login'}>
               <button className='btn text-white'>
                    Log In
               </button>
          </Link>
          </>
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