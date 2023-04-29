import React from 'react';
import './Pagination.css';
import { getAllProducts } from '../../features/Product';

const PagiCom = ({ pagination , dispatch, curPage,setFilterLoading}) => {
 
     const handleClick = (val) =>{
          setFilterLoading(true)
          dispatch(getAllProducts({pagi : val.target.innerText, pirce:'DEFAULT',brand:'DEFAULT',category:'DEFAULT'}))
          .then(resp => {
               if(resp.type === 'products/fulfilled'){
                    setFilterLoading(false)
               }
          })
     };

    
  return (
   <main className='w-90 pagi_container m-top'>
          <div className='number_container flex justify-center align_center'>

               {
                    Array.from({ length : pagination}).map((_,idx) =>(
               <div className={`${curPage === idx + 1 ? 'active-pagi':null} pagi-number flex justify-center align_center`} key={`pagi-${idx}`} onClick={handleClick}>
                    {idx + 1}
               </div>
                    ))
               }
          </div>
   </main>
  )
}

export default PagiCom