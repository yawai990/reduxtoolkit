import React from 'react';
import Card from './Card';
import cartitems from '../data';

const Product = () => {
  return (
    <div className='card_container'>
    {
      cartitems?.map(i => (
        <Card key={i.id} props={i} />
      ))
    }
  </div>
  )
}

export default Product