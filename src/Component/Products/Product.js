import './product.css';
import { TbShoppingCart } from "react-icons/tb";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GetProductByCat, GetProducts, getCategory, getSingleCategory } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import ScreenLoader from '../../Utils/Loader';
export default function Product() {
  const navigate = useNavigate()
  const [productData, setProductData] = useState()
  const [category, setCategory] = useState()
  const [pages, setPages] = useState(1)
  const [load, setLoad] = useState(true)
  const id = "669a6d20537e70bd47330bf3"
  async function calling() {
    try {
      const res = await GetProductByCat(id);
      if (res.status === 'success') {
        setLoad(false)
        setProductData(res.data)
      }
    } catch (err) { }
  }
  const SingleCategory = async (event) => {
    
    // const res = await getSingleCategory(event.target.value)
    try {
      const res = await GetProductByCat(event.target.value);
      setProductData(res.data)

    } catch (err) { }
  }
  const CategoryCall = async () => {
    try {
      const res = await getCategory()
      setCategory(res.data)
    } catch (err) { }
  }

  function Descriptioin(name) {
    
    navigate(`/description/${name}`)
  }

  useEffect(() => {
    calling()
    CategoryCall()
  }, [pages])
  return (
    <>


      {load ? <ScreenLoader /> : 
      <div className='mainProductDiv'>
        {/* <div className='MobileMenu '>
        {category?.map((e,i)=><span>{e.catName}</span>)}
        </div> */}
        <div className='options mobile_options'>
          <div className='inner inner_text'>
            <select onChange={SingleCategory}>
              {
                category?.map((e, i) =>
                  <option key={i} value={e._id}>{e.catName}</option>)
              }
            </select>
          </div>
        </div>
        <div className='ProductCard'>
          {/* <button title='previous' onClick={() => { setPages(pages - 1) }}><FaAngleDoubleLeft /></button> */}
          <div className='ProducardCardMiddle MobileProducardCardMiddle'>
            {productData?.map((e, i) =>
              <div key={i} className='ProductCardInside MobileProductCardInside' onClick={() => Descriptioin(e.productTitle)}>
                <div className='ProductsImg MobileProductsImg'><img className='Mobileimg' src={`${API_IMAGE_URL}${e.productImg}`}></img></div>
                <div className='textContent'>
                  <p style={{ maxHeight: "50px", overflow: "hidden", fontSize: "15px" }}>{e.productTitle}</p>
                  <p>&#8377;&nbsp;{e.productPrice}</p>
                </div>
              </div>)}
          </div>
          {/* <button title='more' onClick={() => { setPages(pages + 1) }}><FaAngleDoubleRight /></button> */}
        </div>

      </div>}
    </>
  )
}