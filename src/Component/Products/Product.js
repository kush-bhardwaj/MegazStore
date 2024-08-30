import './product.css';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetProducts } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import Carousel from 'react-bootstrap/Carousel';
export default function Product(){
  const [productData , setProductData] = useState()
  const [pages , setPages] = useState(1)
 async function calling(){
    const res = await GetProducts(pages);
    console.log(res)
    setProductData(res.data)
  }
  // function pageCal(){
  //   setPages(pages+1)
  //   calling(pages)
  // }
  useEffect(()=>{
    calling()
  },[pages])
    return (
        <>


    <div className='ProductCard'>
      <button title='previous' onClick={()=>{setPages(pages-1)}}><FaAngleDoubleLeft /></button>
        <div className='ProducardCardMiddle'>
        {productData?.map((e,i)=>
          <div className='ProductCardInside'>
            <div className='ProductsImg'><img src={`${API_IMAGE_URL}${e.productImg}`}></img></div>
            <div className='textContent'>
              <p style={{maxHeight:"50px",overflow:"hidden" , fontSize:"15px"}}>{e.productTitle}</p>
              <p>From :- {e.productPrice}</p>
            </div>
          </div>)}
        </div>
      <button title='more' onClick={()=>{setPages(pages+1)}}><FaAngleDoubleRight/></button>
    </div>
        </>
    )
}