import React from 'react';
import './productDetails.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/Cartitems';
import { RiStarSFill } from 'react-icons/ri';
import Review from '../components/reviews/Review';

const ProductDetail = () => {
     const { products } = useSelector(state => state.Product);
     const dispatch = useDispatch();
     const { pathname } = useLocation();
     const curProductId = pathname.split('/').slice(-1)[0];
     const filterprod = products.find(p => p._id === curProductId);
     const { productName,brand, image, price, reviews,rating, stock } = filterprod;

  return (
    <main className="product_datails_container">

     <h4>{productName}</h4>
     <h5>{brand}</h5>

     <div>
     {
          Array.from({ length : 5 }).map((_,idx) => <RiStarSFill key={idx} className={`stars ${idx < rating ? 'star-active':null}`} />) 
     }
    <span style={{ fontSize : '14px'}}>({reviews | 0} Ratings)</span> 
     </div>


     <div className='product_detail_content flex gap'>
          <section className='detail_img_container p-x-sm'>
          <img src={`https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/${image[0].path}`} alt="" />
          </section>

          <section style={{
               width:'50%'
          }}>

          <main className='flex align_center justify-between'>
               <div>
               <p className='price'>
                    <span>US$ </span>
                    <span>{Intl.NumberFormat('es-us').format(price)}</span>
               </p>
               <p>({stock}Quantity)</p>
               </div>
               <button className='btn detail_add_cart_btn'
               onClick={() => dispatch(addItem(filterprod))}
               >add to cart</button>
          </main>

               <Review />
          </section>

     </div>

    </main>
  )
}

export default ProductDetail