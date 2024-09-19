import { memo, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './cart.css'
import { DecrementQuantityCart, DelelteCart, GetCarts, IncreamentQuantityCart } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import ScreenLoader from '../../Utils/Loader';
import BlankScreenLoad from '../../Utils/BlankLoad';
import { toast, ToastContainer } from 'react-toastify';
const Cart = () => {
    const [load, setLoad] =useState(true)
    const [Carts, setCart] = useState()
    const [blank , setBlank] = useState(false)
    const [PRICE , setPrice] = useState() 
    const[TOTAL , setTotal] =useState()
    async function GetCartFun() {
        // console.log("hello")
        const res = await GetCarts()
        console.log("res",res)
        if (res.status === "success") {
            if(res.data.length ===0){
                setBlank(true)
            }
            // console.log("data",res.data)
            setLoad(false)
            // const extractedObjects = res?.data.flatMap(item => item.cartsData);
            // console.log(extractedObjects);
            // setCart(extractedObjects)
            setCart(res)
            setPrice(res)

            // var price =  res?.data?.reduce((acc, e) => {
            //     const prices = parseInt(e.cartsData?.productPrice )|| 0;
            //     return acc + prices;
            //   }, 0)
              //console.log(price)
        
            //setTotal(price)
        }
    }

    //incerement quantiy with price
    async function IncQuantity(id) {
           const res = await IncreamentQuantityCart(id)
        //    console.log("res", res)
           if(res.status==='success'){
            GetCartFun()
            toast.success(res.message)
           }
    }
    //decerement quantiy with price
    async function DecQuantity(id) {

        const res = await DecrementQuantityCart(id)
        console.log("res",res)
        if(res.status === 'success'){
            toast.success(res.message)
            GetCartFun()
        }
    }

    //delete cart product
    async function DeleteCartAPICall(id) {
        const res = await DelelteCart(id)
        console.log(res)
        if(res.status === 'success'){
            toast.success(res.message)
            GetCartFun()
        }
    }
    
    useEffect(() => {
        GetCartFun()
    }, [])
    return (
        <>
            <Header />
            {blank?<h1 style={{textAlign:"center"}}>EMPTY CART</h1>:null}
            {load?<BlankScreenLoad />: <section>
                <div className='middle'>
                    <div className='left'>
                        {Carts?.data?.map((e,i)=><div className='leftSide' key={i}>
                            <div className='cartImg'>
                                <img alt="check" src={`${API_IMAGE_URL}${e.cartsData?.productImg}`}></img>
                            </div>
                            <div className='cartDetails'>
                                <p>{e.cartsData?.productTitle}</p>
                                <small>&#8377; {e.cartsData?.productPrice*e?.quantity}</small><br></br>
                                <button onClick={()=>DecQuantity(e.productId)} >-</button>
                                <small className='inc'>{e.quantity}</small>
                                <button className='plus' onClick={()=>IncQuantity(e.productId)}>+</button>
                                <small className='remove' onClick={()=>DeleteCartAPICall(e?.productId)}>Remove</small>
                                </div>
                        </div>)}
                    </div>
                    <div className='right'>

                        <div className='amount'><small>PRICE DETAILS</small></div>
                        <div className='amountDetails'>
                            {/* {PRICE?.data?.map((e,i)=>console.log("roice",e?.cartsData.productPrice))} */}
                            <p>Price ({PRICE?.data?.length} Items)<small>
                                {
                                    Carts?.data?.reduce((acc, e) => {
                                        const prices = parseInt(e.cartsData?.productPrice )*e.quantity|| 0;
                                        return acc + prices;
                                      }, 0)
                                }
                                
                                </small>
                                
                                </p>
                            <p>Discount</p>
                            <p>Delivery Charges</p>
                            <h5>Total Amount</h5>
                        </div>
                    </div>
                </div>
            </section>}

                <ToastContainer />
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