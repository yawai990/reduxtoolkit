import React, { useState } from 'react';
import Card from './Card';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../features/Product';
import Loading from './Loading/Loading';

const Product = () => {
  const [ filterLoading , setFilterLoading ] = useState(false);
  const dispatch = useDispatch();
  const { products, loading, isSuccess } = useSelector(state => state.Product);
  const { categories,cat_loading } = useSelector(state => state.Category);

  const filterHandler = e => {
    e.preventDefault();
    setFilterLoading(true)

    const elements = e.currentTarget.elements;
    
    const category = elements.category.value;
    const brand = elements.brand.value;
      dispatch(getAllProducts({ brand, category}))
      setFilterLoading(false);
  }

  if(loading && cat_loading && !isSuccess){
    return <Loading />
  }

  return (
    <div className='product_container'>

      <main style={{ marginBottom:'0.8rem'}} className='flex justify-between align_center'>
      <h1 className='header_text'>Our Products</h1>

      <div>
        
        <form style={{ gap : '10px'}} className='flex align_center' onChange={filterHandler}> 
          <p>Filter By:</p>

          <div style={{ gap : '10px'}} className='flex align_center'>
          <select defaultValue={'DEFAULT'} name='category'>
            <option value={'DEFAULT'} disabled>category</option>
            {
              categories?.map(cat => (
                <option className='capitalize' value={cat.category} key={cat._id}>{cat.category}</option>
              ))
            }
          </select>

          <select defaultValue={'DEFAULT'} name='brand'>
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
      filterLoading ? <p>Loading...</p>:
     products.length > 0 ?
      products?.map(i => (
        <Card key={i._id} props={i} />
      )):
      <p>There is no product</p>
    }
  </div>
  </div>
  )
}

export default Product