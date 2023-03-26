import React from 'react';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/Cartitems';

const Card = ({props}) => {
  const { title, price, img } = props;
  const cart = useSelector(state => state.Cartitems);
  const dispatch = useDispatch();

  return (
    <main className='card'>
        <div className='card_image_container'>
            <img src={img} alt="" className='card_image' />
        </div>

        <div className='card_content_container'>
        <div className='card_content'>
            <h5 className='card_header'>{title}</h5>
            <p className='card_price'>$ {price}</p>
        </div>

        <button className='card_button' onClick={() => dispatch(addItem(props))}>Add to card</button>
        </div>
    </main>
  )
}

export default Card