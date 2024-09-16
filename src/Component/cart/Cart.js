import { memo, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './cart.css'
import { GetCarts } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import ScreenLoader from '../../Utils/Loader';
import BlankScreenLoad from '../../Utils/BlankLoad';
const Cart = () => {
    const [load, setLoad] =useState(true)
    const [Carts, setCart] = useState()
    async function GetCartFun() {
        console.log("hello")
        const res = await GetCarts()
        if (res.status === "success") {
            console.log("data",res.data)
            setLoad(false)
            // const extractedObjects = res?.data.flatMap(item => item.cartsData);
            // console.log(extractedObjects);
            // setCart(extractedObjects)
            setCart(res)
        }
    }
    async function IncQuantity(id) {
            console.log("id",id)
    }
    useEffect(() => {
        GetCartFun()
    }, [])
    return (
        <>
            <Header />
            {load?<BlankScreenLoad />: <section>
                <div className='middle'>
                    <div className='left'>
                        {Carts?.data?.map((e,i)=><div className='leftSide' key={i}>
                            <div className='cartImg'>
                                <img alt="check" src={`${API_IMAGE_URL}${e.cartsData?.productImg}`}></img>
                            </div>
                            <div className='cartDetails'>
                                <p>{e.cartsData?.productTitle}</p>
                                <small>&#8377; {e.cartsData?.productPrice}</small><br></br>
                                <button>-</button>
                                <small className='inc'>{e.quantity}</small>
                                <button className='plus' onClick={()=>IncQuantity(e.productId)}>+</button>
                                <small className='remove'>Remove</small>
                                </div>
                        </div>)}

                    </div>
                    <div className='right'>
                        <div className='amount'><small>PRICE DETAILS</small></div>
                        <div className='amountDetails'></div>
                    </div>
                </div>
            </section>}
           

        </>
    )
}
export default memo(Cart);


// const x = {
//     status: 'success',
//     data: [
//         {_id: "hello my world", userId: "abc",
//             cartsData: [
//                 { _id: 'hcl', productName: 'samsung', productTitile: "xxy", productImg: "xyc" }
//             ]
//         },
//         {_id: "hello world", userId: "abc",
//             cartsData: [
//                 { _id: 'hclx', productName: 'iPhone', productTitile: "xxy", productImg: "xyc" }
//             ]
//         }
//     ]
// }
// const extractedObjects = x.data.flatMap(item => item.cartsData);

// console.log(extractedObjects);