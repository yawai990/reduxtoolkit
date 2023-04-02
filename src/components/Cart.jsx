import React from 'react';
import './Cart.css';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { clearCart,removeItem,increaseQuantity, decreaseQuantity  } from '../features/Cartitems';

const Cart = () => {
  const cartItems = useSelector(state => state.Cartitems.cartItems);
  const cart = useSelector(state => state.Cartitems);
  const dispatch = useDispatch();

  console.log(cart)

  const handleAni = (target,idx) =>{
    const ele = target.target.parentElement.parentElement.parentElement;
    gsap.fromTo(ele,{ y : -40, opacity : 1}, { y : 20, opacity:0 ,duration: 0.8, ease:'ease' , onComplete : () =>{
      dispatch(removeItem(idx))
    }});
  };


  return (
    <div>
      <h5 className='cart_header'>Your Cart ({cartItems.length || 'empty'} items)</h5>

      <div className='cartitems_container'>
        {
          cartItems.map(i => <CartItemsCom key={i._id} props={i} 
          fun={(tar,idx) => handleAni(tar,idx)} 
          increase={idx => dispatch(increaseQuantity(idx)) }
          decrease={ idx => dispatch(decreaseQuantity(idx))}
          />)
        }
        <div className='total_amount'>
            <p>Total Amount</p>
            <p>${cart.amount.toFixed(2)}</p>
        </div>
        <button className='clear_cart_btn' onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>

    </div>
  )
};

const CartItemsCom = ({ props,fun,increase,decrease }) => {
  const { _id, image, productName, price, amount } = props;

  return <div className='cartItem_com'>
      <section className='cartItem_com_item'>
        <div className='image_container' >
          <img src={`https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/${image[0].path}`} />
        </div>
        <div>
          <h5>{productName}</h5>
          <p>${price}</p>
          <button className='remove_btn' onClick={(e) => fun(e,_id)}>remove</button>
        </div>
      </section>

      <section className='item_quantity'>
        <button className='cart_btn plus' onClick={() => increase(_id)}>
          <AiOutlinePlus />
        </button>
        <p style={{
          textAlign:'center'
        }}>{amount}</p>
        <button className='cart_btn minus' onClick={() => decrease(_id)}>
          <AiOutlineMinus />
        </button>
      </section>

  </div>
}

export default Cart