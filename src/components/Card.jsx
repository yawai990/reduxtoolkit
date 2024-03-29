import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { addItem } from '../features/Cartitems';
gsap.registerPlugin(Flip);
const Card = ({ props }) => {
  const { _id,productName, price, image, stock } = props;

  const dispatch = useDispatch();

  const handleClick = e =>{
    const curTar = e.target;
    const { y, right ,x,top } = curTar.getBoundingClientRect();
   const cart = document.getElementsByClassName('cart');
  const cloneImg = document.createElement('img');
  cloneImg.setAttribute('class','clone_img');
  cloneImg.src = `https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/${image[0].path}`;
  const state = Flip.getState(cloneImg,{ props :'width'});
  cart[0].appendChild(cloneImg);
  Flip.from(state, {
    duration: 0.4,
    scale : true,  
    absolute : true,
    ease: 'back.in(2)',
    onComplete : () =>{
      gsap.fromTo(cloneImg,{ x : e.clientX - (y + right),y,scale :2 }, { x:0,y:0,scale :0.2, 
        onComplete:()=>{
         const img = document.querySelectorAll('.clone_img');
          // cart[0].removeChild(img)
        document.getElementsByClassName('cart')[0].removeChild(cloneImg);
        }
      });
      
    }
  });
 };

  return (
    <main className='card'>
      <Link to={`/product/${_id}`}>
        <div className='card_image_container'>
            <img src={`https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/${image[0].path}`} alt="" className='card_image' />
        </div>
      </Link>

        <div className='card_content_container text-black'>
            <h5 className='card_header'>{productName}</h5>

        <div className='card_content'>
          <div>
            {
              (props.discount && props.discount > 0) ? 
              <>
                 <p className={`card-price line-through`}>$ {price}</p>
              <p className='discound-price'>$ {price - price * props.discount/100}</p>
              </>
              :
              <p className='card-price'>$ {price}</p>
            }
          </div>

            <div>
        <button
        style={{
          cursor : stock < 1 ? 'not-allowed':'pointer',
        }}
         className={`card_button ${stock < 1 && 'card_btn_disabled'}`}
        disabled={stock < 1 ? true:false}
        onClick={(e) => {
          handleClick(e)
          dispatch(addItem(props))}}>Add to card</button>
      {
        stock < 1 &&
          <span className='out_of_stock'>out of stock</span>
      }
          </div>
          </div>
          
        </div>
    </main>
  )
}

export default Card