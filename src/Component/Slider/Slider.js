import 'bootstrap/dist/css/bootstrap.min.css';
import '../Header/header.css'
import Carousel from 'react-bootstrap/Carousel';
import { API_IMAGE_URL, LOGO_URL } from '../../URL/URL';
import { getSliderApi } from '../../API/API';
import { useEffect, useState } from 'react';
function MySlider() {
  const [getSlider , setGetSlider] = useState();
  async function SliderCall() {
    const res = await getSliderApi();
    setGetSlider(res)
  }
  useEffect(()=>{
    SliderCall()
  },[])
  return (
    <div className='crosel'>
        <Carousel data-bs-theme="dark">
        {getSlider?.data.map((e,i)=><Carousel.Item key={i}>
        <img
          className="d-block w-100" src={`${API_IMAGE_URL}${e.image}`} alt="Second slide"
        />
      </Carousel.Item>)}
    </Carousel> 
    </div>
  );
}

export default MySlider;