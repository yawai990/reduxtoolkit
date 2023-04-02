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

      <main style={{ marginBottom:'0.8rem'}} className='flex justify-between align_center'>
      <h1 className='header_text'>Our Products</h1>

      <div>
        
        <form style={{ gap : '10px'}} className='flex align_center'>
          <p>Filter By:</p>

          <div style={{ gap : '10px'}} className='flex align_center'>
          <select defaultValue={'DEFAULT'}>
            <option value={'DEFAULT'} disabled>category</option>
            <option value={1}>furniture</option>
            <option value={2}>fashion</option>
            <option value={3}>electronic</option>
            <option value={4}>cosmetic</option>
          </select>

          <select defaultValue={'DEFAULT'}>
            <option value={'DEFAULT'} disabled>brand</option>
            <option value={1}>adidas</option>
            <option value={2}>under armor</option>
            <option value={3}>nike</option>
            <option value={4}>polo</option>
          </select>
          </div>

        </form>
      </div>
      </main>
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