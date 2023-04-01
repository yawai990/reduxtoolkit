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

  const handleAni = (target,idx) =>{
    const ele = target.target.parentElement.parentElement.parentElement;
    gsap.fromTo(ele,{ y : -20, opacity : 1}, { y : 20, opacity:0 ,duration: 0.4 , onComplete : () =>{
      dispatch(removeItem(idx))
    }});
  };


  return (
    <div>
      <h5 className='cart_header'>Your Cart ({cartItems.length || 'empty'} items)</h5>

      <div className='cartitems_container'>
        {
          cartItems.map(i => <CartItemsCom key={i.id} props={i} 
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
  const { id, img, title, price, amount } = props;

  return <div className='cartItem_com'>
      <section className='cartItem_com_item'>
        <div>
          <img src={img} />
        </div>
        <div>
          <h5>{title}</h5>
          <p>${price}</p>
          <button className='remove_btn' onClick={(e) => fun(e,id)}>remove</button>
        </div>
      </section>

      <section className='item_quantity'>
        <button className='cart_btn plus' onClick={() => increase(id)}>
          <AiOutlinePlus />
        </button>
        <p style={{
          textAlign:'center'
        }}>{amount}</p>
        <button className='cart_btn minus' onClick={() => decrease(id)}>
          <AiOutlineMinus />
        </button>
      </section>

  </div>
}

export default Cart