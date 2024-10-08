import { memo, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './cart.css'
import { DecrementQuantityCart, DelelteCart, GetCarts, IncreamentQuantityCart, OrderApi } from '../../API/API';
import { API_IMAGE_URL } from '../../URL/URL';
import ScreenLoader from '../../Utils/Loader';
import BlankScreenLoad from '../../Utils/BlankLoad';
import { toast, ToastContainer } from 'react-toastify';
import { GetStorageInfo } from '../../Utils/Storage';
const Cart = () => {
    const [load, setLoad] = useState(true)
    const [Carts, setCart] = useState()
    const [blank, setBlank] = useState(false)
    const [Notification, setNotification] = useState()
    const [TOTAL, setTotal] = useState()
    const [isTrue, setIsTrue] = useState()
    async function GetCartFun() {
        // console.log("hello")
        try {
            const res = await GetCarts()
            console.log("res", res)
            if (res.status === "success") {
                setCart(res)
                const discount = Carts?.data?.reduce((acc, e) =>

                    acc + e.discount

                    , 0)
                setTotal(discount)
                if (res.data.length === 0) {

                    setBlank(true)
                }
                // console.log("data",res.data)
                setLoad(false)
                // console.log('cart',Carts)

            }
        } catch (err) {
            console.error(err)
        }
    }

    //incerement quantiy with price
    async function IncQuantity(id) {
        try {
            const res = await IncreamentQuantityCart(id)
               console.log("reskkkk", res)
            if (res.status === 'success') {
                GetCartFun()
                toast.success(res.message)
            }
        } catch (err) {
            console.error(err)
        }
    }
    //decerement quantiy with price
    async function DecQuantity(id) {

        try {
            const res = await DecrementQuantityCart(id)
            // console.log("res",res)
            if (res.status === 'success') {
                toast.success(res.message)
                GetCartFun()
            }
        } catch (err) { console.error(err) }
    }

    //delete cart product
    async function DeleteCartAPICall(id) {
        try {
            const res = await DelelteCart(id)
            // console.log(res)
            if (res.status === 'success') {
                toast.success(res.message)
                GetCartFun()
            }
        } catch (err) { console.error(err) }
    }



    const PlaceOrder =async ()=>{
        const res = await OrderApi()
        alert(res.status)
        console.log("data",res)
    }



   

       
    useEffect(() => {
        GetCartFun()
        setIsTrue(GetStorageInfo())
     
    }, [])
    return (
        <>
            <div className='Head'>
                <Header />
            </div>
            {/* DESKTOP CART START */}
            {blank ? <h1 style={{ textAlign: "center" }}>EMPTY CART</h1> : null}
            {load ? <BlankScreenLoad /> : <section className ='DesktopCart'>
             
                <div className='middle'>
                
                    <div className='left'>
                        <div className='address'>
                            <div className='addreInput'>
                            <input type='text' placeholder='Your Address'></input>
                            </div>
                           <div className='addressButtons'> 
                            <button>Save Address</button>
                            <button>Already Saved</button>
                           </div>
                        </div>
                        {Carts?.data?.map((e, i) => 
                        <div className='leftSide' key={i}>
                            <div className='cartImg'>
                                <img alt="check" src={`${API_IMAGE_URL}${e.cartsData?.productImg}`}></img>
                            </div>
                            <div className='cartDetails'>
                                <p>{e.cartsData?.productTitle}</p>
                                <small>&#8377; {e.cartsData?.productPrice * e?.quantity}</small><br></br>
                                <button onClick={() => DecQuantity(e.productId)} >-</button>
                                <small className='inc'>{e.quantity}</small>
                                <button className='plus' onClick={() => IncQuantity(e.productId)}>+</button>
                                <small className='remove' onClick={() => DeleteCartAPICall(e?.productId)}>Remove</small>
                            </div>
                        </div>)}
                    </div>
                    
                    <div className='right'>

                        <div className='amount'><small>PRICE DETAILS</small></div>
                        <div className='amountDetails'>
                            {/* {PRICE?.data?.map((e,i)=>console.log("roice",e?.cartsData.productPrice))} */}
                            <div>
                                <p>Price ({Carts?.data?.length} Items)</p>
                                <p> &#8377;&nbsp;{
                                    Carts?.data?.reduce((acc, e) => {
                                        const prices = parseInt(e.cartsData?.productPrice) * e.quantity || 0;
                                        return acc + prices

                                    }, 0)
                                }

                                </p>
                            </div>

                            <div>
                                <p>Delivery Charges</p>
                                <p> <span style={{ textDecoration: "line-Through", color: "#a83248" }}>&#8377;40</span>&nbsp;&nbsp;<span style={{ color: "#32a852" }}>Free</span></p>
                            </div>
                            <div>
                                <h5>Total Amount</h5>
                                <p> &#8377;&nbsp;{
                                    Carts?.data?.reduce((acc, e) => {
                                        const prices = parseInt(e.cartsData?.productPrice) * e.quantity || 0;
                                        return acc + prices

                                    }, 0)
                                }

                                </p>
                            </div>
                            <div className='checkout'>
                                <button onClick={()=>PlaceOrder()}>Checkout</button>
                            </div>
    
                        </div>
                    </div>
                </div>
            </section>}
            {/* DESKTOP CART END */}

            {/* MOBILE CART */}
            <section className='MobileCart Carts'>
                <div className='MobileMiddleCart'>
                    {Carts?.data?.map((e, i) => <div className='loop' key={i}>
                        <div className='MobileCartImg'>
                            <img alt="check" src={`${API_IMAGE_URL}${e.cartsData?.productImg}`}></img>
                        </div>
                        <div className='CartDetails'>
                            <p>{e.cartsData?.productTitle}</p>
                            <small>&#8377; {e.cartsData?.productPrice * e?.quantity}</small><br></br>
                            <button onClick={() => DecQuantity(e.productId)} >-</button>
                            <small >{e.quantity}</small>
                            <button onClick={() => IncQuantity(e.productId)}>+</button>
                            <button className='remove' onClick={() => DeleteCartAPICall(e?.productId)}>Remove</button>
                        </div>
                    </div>)}
                        
                </div>

                {/* <div className='popup'>
                <p>You've changed
                    'realme P1 5G (Peacock Green, 128 GB)' QUANTITY to '1'
                </p>     
                </div> */}
                <footer>
                    <div>
                        <h4>&#8377; {
                            Carts?.data?.reduce((acc, e) => {
                                const prices = parseInt(e.cartsData?.productPrice) * e.quantity || 0;
                                return acc + prices;

                            }, 0)
                        }</h4>
                        <button onClick={()=>PlaceOrder()}>Place Order</button>
                    </div>
                </footer>
            </section>

            {/* MOBILE CART END */}
            <ToastContainer />
        </>
    )
}
export default memo(Cart);


// const x = {
//     status: 'success',
//     data: [
//         {_id: "hello my world", userId: "abc",discount:1500,
//             cartsData: [
//                 { _id: 'hcl', productName: 'samsung', productTitile: "xxy", productImg: "xyc" }
//             ]
//         },
//         {_id: "hello world", userId: "abc",discount:1500,
//             cartsData: [
//                 { _id: 'hclx', productName: 'iPhone', productTitile: "xxy", productImg: "xyc" }
//             ]
//         }
//     ]
// }
// const extractedObjects = x.data.flatMap(item => item.cartsData);

// console.log(extractedObjects);










