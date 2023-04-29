import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts } from '../features/Product';
import Loading from './Loading/Loading';
import * as api from '../services';
import './Select.css';
import PagiCom from './pagination/PagiCom';

const Product = () => {
  const [ filterLoading , setFilterLoading ] = useState(false);
  const dispatch = useDispatch();
  const { products, loading, isSuccess, pagination, curPage } = useSelector(state => state.Product);
  const { categories,cat_loading } = useSelector(state => state.Category);
  const [ brands, setBrands] = useState();

  useEffect(() =>{
    api.allBrands()
    .then(resp =>{
      const { success , brands } = resp.data;
      if(success){
        setFilterLoading(false);
        setBrands(brands);
      }else{
        setFilterLoading(true)
      }
    })
    .catch(err => console.log(err));
  },[]);
 
  const filterHandler = e => {
    e.preventDefault();
    setFilterLoading(true)

    const elements = e.currentTarget.elements;
    
    const category = elements.category.value;
    const brand = elements.brand.value;
    const price = elements.price.value;
      dispatch(getAllProducts({ pagi : 1,price,brand, category}))
      setFilterLoading(false);
  };

  if(loading && cat_loading && !isSuccess){
    return <Loading />
  }

  return (
    <div className='product_container'>

      <main style={{ marginBottom:'0.8rem'}} className='flex justify-between align_center'>
      <h1 className='header_text'>Our Products</h1>

      <div>
        
        <form style={{ gap : '10px'}} className='flex align_center' onChange={filterHandler}> 
   
          <div style={{ gap : '10px'}} className='flex align_center'>
          <SelectCom name={'price'} arr={[
            { _id : 1, category : 100},
            { _id : 2, category : 200},
            { _id : 3, category : 500},
            { _id : 4, category : 1000},
            { _id : 5, category : 1000},

          ]} />
            <SelectCom name={'category'} arr={categories} />

          <>
          <p>Brand :</p>
          <select defaultValue={'DEFAULT'} name='brand' className='custom-select'>
            <option value={'DEFAULT'} disabled>All</option>
          {
              brands?.map((b,i) => (
                <option className='capitalize' value={b} key={`brand-${i}`}>{b}</option>
              ))
            }
          </select>
          </>

          </div>

        </form>
      </div>
      </main>
      <div className='card_container'>
      {
        filterLoading ? <Loading />:
      products.length > 0 ?
        products?.map(i => (
          <Card key={i._id} props={i} />
        )):
        <p>There is no product</p>
      }
    </div>

    <PagiCom pagination={pagination} dispatch={dispatch} curPage={curPage} setFilterLoading={setFilterLoading} />
    
  </div>
  )
};

const SelectCom = ({ name, arr }) =>{
  return   <>
  <p className='capitalize'>{name} :</p>
  <select defaultValue={'DEFAULT'} name={name} className='custom-select'>
  <option value={'DEFAULT'}>All</option>
  {
    arr?.map(cat => (
      <option className='capitalize' value={cat.category} key={cat._id}>
        {name === 'price' ? `below ${cat.category}`:cat.category}
        </option>
    ))
  }
</select>
</>
}

export default Product