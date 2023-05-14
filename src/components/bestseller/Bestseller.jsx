import React from 'react';
import Loading from '../Loading/Loading';
import Card from '../Card';
import { useSelector } from 'react-redux';

const Bestseller = () => {
  const { bestseller,loading, isSuccess } = useSelector(state => state.bestSellerProducts);

  if(loading && !isSuccess){
    return  <div className="width-90">
      <div className="skeleton skeleton_header" />
      <div className="flex justify_between gap-sm">
    {
      Array.from({length:4}).map((_,idx) => <Loading key={idx} />)
    }
    </div>
  </div>
  };

  if(bestseller.length <= 0){
    return null;
  }

  return (
    <div className='width-90'>
          <h1 className='header_text'>BestSellers Products</h1>
       <div className='card_container'>
    {
      bestseller?.map(i => (
        <Card key={i._id} props={i} />
      ))
    }
  </div>
    </div>
  )
}

export default Bestseller