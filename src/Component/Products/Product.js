import './product.css';
import { TbShoppingCart } from "react-icons/tb";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetProductByCat, GetProducts ,getCategory, getSingleCategory } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
export default function Product() {
  const navigate = useNavigate()
  const [productData, setProductData] = useState()
  const [category ,setCategory] = useState()
  const [pages, setPages] = useState(1)
  const id ="669a6d20537e70bd47330bf3"
  async function calling() {
    const res = await GetProductByCat(id);
    setProductData(res.data)
  }
  const SingleCategory = async (event)=>{
    // console.log("id",event.target.value)
    // const res = await getSingleCategory(event.target.value)
    const res = await GetProductByCat(event.target.value);
    setProductData(res.data)
    console.log("res",res)
  }
  const CategoryCall = async()=>{
    const res = await getCategory()
   setCategory(res.data)
  }

  function Descriptioin(name){
    // console.log("name",name.replaceAll(" ","-"))
      navigate(`/description/${name}`)
  }
 
  useEffect(() => {
    calling()
    CategoryCall()
  }, [pages])
  return (
    <>



      <div className='mainProductDiv'>
      <div className='options'>
       <div className='inner'>
       <select onChange={SingleCategory}>
        {
          category?.map((e,i)=>
          <option key={i} value={e._id}>{e.catName}</option>)
        }
        </select>
       </div>
      </div>
        <div className='ProductCard'>
          {/* <button title='previous' onClick={() => { setPages(pages - 1) }}><FaAngleDoubleLeft /></button> */}
          <div className='ProducardCardMiddle'>
            {productData?.map((e, i) =>
              <div key={i} className='ProductCardInside' onClick={()=>Descriptioin(e.productTitle)}>
                <div className='ProductsImg'><img src={`${API_IMAGE_URL}${e.productImg}`}></img></div>
                <div className='textContent'>
                  <p style={{ maxHeight: "50px", overflow: "hidden", fontSize: "15px" }}>{e.productTitle}</p>
                  <p>From :- {e.productPrice}</p>
                </div>
              </div>)}
          </div>
          {/* <button title='more' onClick={() => { setPages(pages + 1) }}><FaAngleDoubleRight /></button> */}
        </div>

      </div>
    </>
  )
}