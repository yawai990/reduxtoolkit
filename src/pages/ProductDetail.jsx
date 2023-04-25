import React , { useState,useEffect } from 'react';
import './productDetails.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/Cartitems';
import { RiStarSFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import Review from '../components/reviews/Review';
import * as api from '../services';
import moment from 'moment';

const ProductDetail = () => {
     const { products } = useSelector(state => state.Product);
     const dispatch = useDispatch();
     const { pathname } = useLocation();
     const curProductId = pathname.split('/').slice(-1)[0];
     const filterprod = products.find(p => p._id === curProductId);
     const [ product, setProduct ] = useState(null);
    
     const getProduct = async(id) => {
          await api.getSinglePro(id)
          .then(resp => {
               const {status,product} = resp.data;
               if(status){
                    setProduct(product)
               }
          })
          .catch(err => console.log(err))
     };

     useEffect(() => {
          getProduct(curProductId)
     }, []);


     return (
    <main className="product_datails_container">

     {
          product !== null && <>
                 <h4>{product.productName}</h4>
     <h5>{product.brand}</h5>

     <div>
     {
          Array.from({ length : 5 }).map((_,idx) => <RiStarSFill key={idx} className={`stars ${idx < product.rating ? 'star-active':null}`} />) 
     }
    <span style={{ fontSize : '14px'}}>({product.reviews | 0} Ratings)</span> 
     </div>


     <div className='product_detail_content flex gap'>
          <section className='detail_img_container p-x-sm'>
          <img src={`https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/${product.image[0].path}`} alt="" />
          </section>

          <section style={{
               width:'50%'
          }}>

          <main className='flex align_center justify-between'>
               <div>
               <p className='price'>
                    <span>US$ </span>
                    <span>{Intl.NumberFormat('es-us').format(product.price)}</span>
               </p>
               <p>({product.stock}Quantity)</p>
               </div>
               <button className='btn detail_add_cart_btn'
               onClick={() => dispatch(addItem(filterprod))}
               >add to cart</button>
          </main>

          <div className='m-top'>
               <h4>Review</h4>

               {
                    product.reviews.length > 0 &&
                    product.reviews.map(r => (
                    <main key={r._id} className='review_card'>
                         <div className='flex justify-between align_center'>
                              <div>
                                   <div className='flex align_center'>
                              <div>
                                   <FaUserCircle />
                              </div>
                   
                                   <p style={{ fontSize : '14px'}}>{r.user.name}</p>
                                 
                                   </div>
                              </div>
                              <p style={{ fontSize : '12px'}}>{moment(r.createdAt).fromNow()}</p>
                         </div>

                         <div className="flex">

                         <p style={{ fontSize : '14px',flex:1}}>{r.comment}</p>
                         {
                              Array.from({ length : 5 }).map((_,idx) => <RiStarSFill key={idx} className={`review_stars ${idx < r.rating ? 'star-active':null}`} />) 
                         }
                         </div>

                    </main>
                    ))
               }
          </div>

               <Review pID={curProductId} />

          </section>

     </div>

          </>
     }
   
    </main>
  )
}

export default ProductDetail