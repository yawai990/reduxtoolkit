import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart,removeItem,increaseQuantity, decreaseQuantity  } from '../features/Cartitems';

const Cart = () => {
  const cartItems = useSelector(state => state.Cartitems.cartItems);
  const cart = useSelector(state => state.Cartitems);
  const dispatch = useDispatch();

  return (
    <div>
      <h5>Your Cart ({cartItems.length} items)</h5>

      <div className='cartitems_container'>
        {
          cartItems.map(i => <CartItemsCom key={i.id} props={i} 
          fun={idx => dispatch(removeItem(idx))} 
          increase={idx => dispatch(increaseQuantity(idx)) }
          decrease={ idx => dispatch(decreaseQuantity(idx))}
          />)
        }
        <div className='total_amount'>
            <p>Total Amount</p>
            <p>${cart.amount.toFixed(2)}</p>
        </div>
        <buttom className='clear_cart_btn' onClick={() => dispatch(clearCart())}>Clear Cart</buttom>
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
          <button className='remove_btn' onClick={() => fun(id)}>remove</button>
        </div>
      </section>

      <section className='item_quantity'>
        <button onClick={() => increase(id)}>plus</button>
        <p>{amount}</p>
        <button onClick={() => decrease(id)}>minus</button>
      </section>

  </div>
}

export default Cart