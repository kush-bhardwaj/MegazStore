import './product.css'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { API_IMAGE_URL, LOGO_URL } from '../../URL/URL';
import { useState } from 'react';
import { AddToCart, GetSingleProduct } from '../../API/API';
import Header from '../Header/Header';
import ScreenLoader from '../../Utils/Loader';
import { memo } from 'react';
import { GetStorage } from '../../Utils/Storage';
import Cart from '../cart/Cart';

const ProductDescription = () => {
    const { name } = useParams()
    const [load, setLoad] = useState(true)
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    async function ProductDescription() {
        try {
            const res = await GetSingleProduct(name)
            console.log("resssss",res)
            if (res.status === "success") {
                setLoad(false)
            }
            setProduct(res)
        } catch (err) { }
    }

        async function AddCart(productId){
            // console.log('productId',productId)
            const res = await AddToCart(productId)
            if(res.status === 'success'){
                toast.success(res.message)
                setTimeout(()=>{
                    navigate(`/cart`)
                },500)
            }
           else{toast.error(res.message)}
            
        }
    useState(() => {
        ProductDescription()
    }, [name])
    const ul = product.data?.productDescription.split("|");
    return (
        <> <Header />
            {load ? <ScreenLoader /> : <div className="DescMain MobileDescMain">
                <div className="DescMiddle mobileMiddle" >
                    <div className="imageDiv mobileImg">
                        <img src={`${API_IMAGE_URL}${product.data?.productImg}`}></img>
                        <div className='cartButtonDiv mobilecartButtonDiv'> <button className='cartButton cartButton1' onClick={()=>AddCart(product.data?._id)}>Add to Cart</button>
                            <button className='cartButton cartButton1'>Buy Now</button>
                        </div>
                    </div>
                    <div className="detialsDiv">
                        <h1>{name}</h1>
                        <h3><small>₹</small> {product.data?.productPrice}</h3>
                        <ul>
                            {ul?.slice(0, ul.length - 1)?.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>

                    </div>
                </div>
                
            </div>}
            <footer>
                    <button onClick={()=>AddCart(product.data?._id)}>Add To Cart</button>
                    <button>Buy Know</button>
                </footer>
            <ToastContainer />
        </>
    )

}
export default memo (ProductDescription);
