import React from 'react';
import Card from './Card';
import cartitems from '../data';
import { useSelector } from 'react-redux';
import Loading from './Loading/Loading';

const Product = () => {
  const { products, loading, isSuccess } = useSelector(state => state.Product);

  if(loading && !isSuccess){
    return <Loading />
  }

  return (
    <div className='product_container'>
      <h1 className='header_text'>Our Products</h1>
    <div className='card_container'>
    {
      products?.map(i => (
        <Card key={i._id} props={i} />
      ))
    }
  </div>
  </div>
  )
}

export default Product