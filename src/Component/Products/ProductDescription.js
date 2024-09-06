import './product.css'
import { useParams } from 'react-router-dom';
import { API_IMAGE_URL, LOGO_URL } from '../../URL/URL';
import { useState } from 'react';
import { GetSingleProduct } from '../../API/API';
import Header from '../Header/Header';
import ScreenLoader from '../../Utils/Loader';

const ProductDescription = () => {
    const {name} = useParams()
    const [product , setProduct] = useState([]) 
     async function ProductDescription (){
           try{
            const res = await GetSingleProduct(name)
           if(res.status ==="success"){
                setLoad(false)
           }
           setProduct(res)  
           }catch(err){}
     }
     const [load , setLoad] = useState(true)
     useState(()=>{
        ProductDescription()
     },[name])
     const ul = product.data?.productDescription.split("|");
    return (
        <> <Header />
           {load?<ScreenLoader />: <div className="DescMain">
                <div className="DescMiddle">
                    <div className="imageDiv">
                        <div className='image'><img src={`${API_IMAGE_URL}${product.data?.productImg}`}></img></div>
                       <div className='cartButtonDiv'> <button className='cartButton cartButton1'>Add to Cart</button>
                       <button className='cartButton cartButton1'>Buy Now</button>
                       </div>
                    </div>
                    <div className="detialsDiv">
                        <h1>{name}</h1>
                        <h3><small>₹</small>{product.data?.productPrice}</h3>
                <ul>
                {ul?.slice(0,ul.length-1)?.map((e,i)=><li>{e}</li>)}
                </ul>
                
                    </div>
                </div>
            </div>}
        </>
    )

}
export default ProductDescription;
