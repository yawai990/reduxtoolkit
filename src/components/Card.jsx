import React,{ useEffect } from 'react';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/Cartitems';
import gsap from 'gsap';
import Flip from 'gsap/Flip';

gsap.registerPlugin(Flip)

const Card = ({props}) => {
  const { title, price, img } = props;
  const cart = useSelector(state => state.Cartitems);
  const dispatch = useDispatch();

  const handleClick = e =>{
    const curTar = e.target;
    const { x,y, width } = curTar.getBoundingClientRect();
   const cart = document.getElementsByClassName('cart');
  const cloneImg = document.createElement('img');
  cloneImg.setAttribute('class','clone_img');
  cloneImg.src = img;
  const state = Flip.getState(cloneImg,{ props :'width'});
  cart[0].appendChild(cloneImg);
  Flip.from(state, {
    duration: 0.4,
    scale : true,  
    absolute : true,
    ease: 'back.in(2)',
    onComplete : () =>{
      gsap.fromTo(cloneImg,{ x : e.clientX - 1400,y,scale :2 }, { x:0,y:0,scale :0.2, 
        onComplete:()=>{
         const img = document.querySelectorAll('.clone_img');
          // cart[0].removeChild(img)
        document.getElementsByClassName('cart')[0].removeChild(cloneImg);
        }
      });
      
    }
  });
 }

  return (
    <main className='card'>
        <div className='card_image_container'>
            <img src={img} alt="" className='card_image' />
        </div>

        <div className='card_content_container'>
            <h5 className='card_header'>{title}</h5>

        <div className='card_content'>
            <p className='card_price'>$ {price}</p>

        <button className='card_button' onClick={(e) => {
          handleClick(e)
          dispatch(addItem(props))}}>Add to card</button>
          </div>
          
        </div>
    </main>
  )
}

export default Card