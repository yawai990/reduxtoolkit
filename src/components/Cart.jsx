import React, { useEffect, useState } from 'react';
import './Cart.css';
import { gsap } from 'gsap';
import { useSelector, useDispatch} from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { loadScript } from '@paypal/paypal-js';
import { clearCart,removeItem,increaseQuantity, decreaseQuantity  } from '../features/Cartitems';
import { onCancelHandler,onErrHandler } from './util/Paypal';
import { useNavigate } from 'react-router-dom';
import * as api from '../services';
import Loading from '../components/Loading/Loading';

const Cart = () => {
  const { cartItems,amount} = useSelector(state => state.Cartitems);
  const cart = useSelector(state => state.Cartitems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ popup,setPopup ] = useState(false);
  const [ showLoading , setShowLoading ] = useState(false);

  useEffect(() =>{
    setPopup(false);
  },[]);

  const handleAni = (target,idx) =>{
    const ele = target.target.parentElement.parentElement.parentElement;
    gsap.fromTo(ele,{ y : -40, opacity : 1}, { y : 20, opacity:0 ,duration: 0.8, ease:'ease' , onComplete : () =>{
      dispatch(removeItem(idx))
    }});
  };

  const buttons = (subtotal,carditem,id) => {
    return {
      createOrder:(data,actions) => {
        const orderPaymentLoad = {
             purchase_units :[
               {
                  amount : { 
                   currency_code:"USD",
                  value : subtotal ,
                  breakdown : {
                   item_total : {
                         currency_code : 'USD',
                         value : subtotal
                   }
                },
                 }
                  }]
           };
        return actions.order.create(orderPaymentLoad);
   },
      onApprove:(data,actions) => {
        return actions.order.capture()
        .then(async(orderData) => {
   
          //send the data to the backend
          var transaction = orderData.purchase_units[0].payments.captures[0];
          
          if(transaction.status ==="COMPLETED" && Number(transaction.amount.value) === Number(subtotal)){
            await api.order(cartItems)
           .then(resp => console.log(resp))
           .catch(err => console.log(err));

            setPopup(true)
            setTimeout(() =>{
              setPopup(false);
              navigate('/');
              dispatch(clearCart())
            },4000);  
          }
        })
   },
      onCancel : onCancelHandler,
      onError:onErrHandler
    }
  };

  const loadScriptHandler = () => {
  
      const { address, city , country, zipCode, phNumber } = JSON.parse(localStorage.getItem('userInfo'));
      if(!(address && city && country && zipCode && phNumber)){
        //redirect to the userInfo pages;
        //show alert box
        setShowLoading(true)
        setTimeout(() =>{
          navigate('/user/userinfo')
          setShowLoading(false)
        }, 3000);
      }else{
        if(sessionStorage.getItem('token')){
          loadScript({
            "client-id":'ASLaQ5GXGWhdv3B_IetdX6rOkZw7mmjFKXCp7ZU9FPFcshXTaLi6_e6IKePO_e-cymbAhQBzpwcxBR2B'
          })
          .then(paypal => {
            paypal.Buttons(buttons(amount,cartItems,21)).render("#paypal-container-element")
          })
          .catch(err => console.log(err))
        }else{
          navigate('/login')
        };

        setShowLoading(false);
      }
  };

  return (
    <div>
      <h5 className='cart_header'>Your Cart ({cartItems.length || 'empty'} items)</h5>
      { 
        showLoading &&  <div className='redirect_loading flex justify-center align_center gap-sm'>
          <Loading text={'Redirect your information page...'}/>
          </div>
      }
      {
        popup && 
        <main className='thank_u_popup flex justify-center align_center gap-sm'>
          <div>
          <p>
            Thank You For your buying
          </p>
          <div>
             <Loading text={'Redirecting Home page...'}/>
          </div>
          </div>
          </main>
      }

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

        <section className='flex justify-center align_center flex-col gap m-top'>

        <div className='flex justify-center align_center gap m-top'>
       
        <button className='clear_cart_btn' onClick={loadScriptHandler}>Check out</button>
        <button className='clear_cart_btn' onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
        <div id="paypal-container-element" style={{ maxWidth:'200px'}}></div>
        </section>

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