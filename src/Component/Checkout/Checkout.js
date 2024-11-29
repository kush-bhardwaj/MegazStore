import './checkout.css'
import { useEffect, useReducer, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ClearStorggeKey, GetStorage } from '../../Utils/Storage'
import { API_BASE_URL2, API_BASE_URL3, API_IMAGE_URL, LOGO_URL, RAZORPAY_SCRIPT_URL } from '../../URL/URL';
import { DecrementQuantityCart, DelelteCart, GetCarts, IncreamentQuantityCart, LoginApi, OrderApi, OrderCreateRazor, SetAddress, SignupApi, SingleCustomer } from '../../API/API'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const initialValue = {
    login: true,
    address: false,
    order: false,
    payment: false,
    change: false,
    addresData: false,
    show: false
}
const reducer = (state, action) => {
    switch (action.data) {
        case 'login': return { login: true };
        case 'logout': return { change: true, login: false, address: true };
        case 'address': return { addres: true,order:false,show:false };
        case 'hide': return { order: true, ...state, address: false, show: true };
        case 'show': return { show: true };
        case 'payment': return {order:false,payment:true};
        case 'isExist':return {addres:true,show:false};
        default :return state
    }
}

const Checkout = () => {

    const loadScript =(src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement('script');
            script.src = src;
            script.onload = function(){
                resolve(true)
            }
            script.onerror = function(){
                resolve(false)
            }
           
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
        IsLogedIn();
    }, [])
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialValue)
    const [dataOfAddress, setDataOfAddress] = useState(0)
    const [Carts, setCart] = useState()
    const [TOTAL, setTotal] = useState()
    const selectStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 'Delhi', "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
    const [addressData, setAddress] = useState({
        name: "",
        address: "",
        landmark: "",
        locality: "",
        pincode: '',
        mobile: "",
        city: "",
        state: "",
        alternate_phone: ""
    })
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    async function SingleCustumer() {
        const res = await SingleCustomer()
       
        if(res?.data?.customerAddress.length === 0 || res?.data?.customerAddress === 'undefined' || res?.data?.customerAddress == ''){
            dispatch({ data:'address'})  
        }
        setDataOfAddress(res?.data?.customerAddress)
        dispatch({ data: 'hide' })
        GetCartFun()
    }
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const formSubmit = async (event) => {
        event.preventDefault()
        const res = await LoginApi(formData)
        if (res.status === 'success') {
           
            dispatch({ data: "logout" })
        }
    }
    const IsLogedIn = () => {
        const status = GetStorage()
        if (status.status === 'success') {
            dispatch({ data: 'logout' })
            SingleCustumer()
        }
    }

    const Logout = () => {
       
        ClearStorggeKey()
        dispatch({ data: 'login' })
    }

    const formHanlde1 = async (event) => {
        try {
            event.preventDefault()
            const res = await SetAddress(addressData)
        } catch (err) { }
    }
    const handleChange1 = (event) => {
        setAddress({ ...addressData, [event.target.name]: event.target.value })
    }



    //ORDER SUMMARY
    async function GetCartFun() {
        //
        try {
            const res = await GetCarts()
           
            if (res.status === "success") {
                setCart(res)
                const discount = Carts?.data?.reduce((acc, e) =>

                    acc + e.discount

                    , 0)
                setTotal(discount)

            }
        } catch (err) {
            console.error(err)
        }
    }
    //increment 
    async function IncQuantity(id) {
        try {
            const res = await IncreamentQuantityCart(id)
           
            if (res.status === 'success') {
                GetCartFun()
            }
        } catch (err) {
            console.error(err)
        }
    }
    //decrement
    async function DecQuantity(id) {

        try {
            const res = await DecrementQuantityCart(id)
            //
            if (res.status === 'success') {
                GetCartFun()
            }
        } catch (err) { console.error(err) }
    }

    //delete cart
    async function DeleteCartAPICall(id) {
        try {
            const res = await DelelteCart(id)
            //
            if (res.status === 'success') {
                GetCartFun()
            }
        } catch (err) { console.error(err) }
    }


    // Order Book
    async function OrderBook(medium){
        const res = await OrderApi(medium)
       
        if(res.status ==='success'){
            navigate('../orderdetails')
            // alert(res.message)
        }else{alert(res.message)}
    }


    //Razorpay script
   
    const onPayment = async () => {
        
        //create order 
        try {
            const header ={
                method:"POST",
                headers:{
                    method:"POST",
                    'Authorization': `bearer ${GetStorage().token}`,
                }
            }
            const res = await fetch (`${API_BASE_URL2}`, header)
            const data =await res.json();
            //
            //



            //intrect with razorpay server
            const PaymentObject = new (window).Razorpay({
                
                key: "rzp_test_tq3U5I5t5iI7Cd",
                order_id: data.id,
                ...data,
                handler: (res) => {
                    const verify = {
                        order_id: res.razorpay_order_id,
                        payment_id: res.razorpay_payment_id,
                        signature: res.razorpay_signature,
                    }
                   
                    const header={
                        headers:{
                            'authorization': `Bearer ${GetStorage().token}`
                        }
                    }
                    axios.post(`${API_BASE_URL3}`,verify,{header}).then((res)=>{
                       
                        if(res.data.success){
                            // alert(res.data.message)
                            alert( 'payment success')
                            OrderBook({paymentMedium:"ONLINE",address:dataOfAddress[0]})

                        }else{ alert('payment faild')}
                       
                    })
                }
            })
            PaymentObject.open()
        } catch (err) { }
    }

    return (
        <>
            {/* Header */}
            {/* <ConstantHeader /> */}
            {/* Header close */}
            <section className="checkoutSection">
                <div className='checkoutMiddle'>
                    {/* LOGIN OR SIGNUP  */}
                    <div className='checkoutOption' onClick={() => { dispatch({ data: 'login' }) }}>
                        <div className='cen'>
                            <div className='contents'>
                                <h5 className='h5'>1</h5>
                                <h5>LOGIN </h5>
                                &nbsp;{state.login ? <h5>OR SIGNUP</h5> : <h5>&nbsp; &#10004;</h5>}

                            </div>
                            {state.change ? <div className='logoutButton' onClick={() => { Logout() }}><button>CHANGE</button></div> : false}
                        </div>
                    </div>
                    {state.login ? <div className='checkoutOption1'>
                        <form onSubmit={formSubmit}>
                            <input type='text' autoComplete='off' placeholder='enter email' name='email' onChange={handleChange}></input>
                            <input type='password' placeholder='enter passowrd' name='password' onChange={handleChange}></input>
                            <input type='submit' value='CONTINUE' className='inputButton'></input>
                        </form>

                    </div> : false}

                    {/* DELIVERY AND ADDRESS */}
                    <div className='checkoutOption'>
                        <div className='cen cen2'>
                            <div className='contents'>
                                <h5 className='h5'>2</h5>
                                <h5>DELIVERY ADDRESS</h5>
                            </div>

                        </div>
                    </div>
                    {state.addres? <div className='checkoutOption2'>
                        <form onSubmit={formHanlde1}>
                            <input type='text' onChange={handleChange1} placeholder='Name' name='name'></input>
                            <input type='text' onChange={handleChange1} placeholder='10-digit mobile number' name='mobile'></input>
                            <input type='text' onChange={handleChange1} placeholder='Pincode' name='pincode'></input>
                            <input type='text' onChange={handleChange1} placeholder='Locality' name='locality'></input>
                            <textarea onChange={handleChange1} placeholder='Address (Area and Street)' name='address'></textarea>
                            <input type='text' onChange={handleChange1} placeholder='City/District/Town' name='city'></input>
                            <select name='state' onChange={handleChange1}>
                                <option>--Select State--</option>
                                {selectStates.map((e, i) =>
                                    <option key={i} value={e}>{e}</option>
                                )}
                            </select>
                            <input type='text' onChange={handleChange1} placeholder='Landmark (Optional)' name='landmark'></input>
                            <input type='text' onChange={handleChange1} placeholder=' Alternate Phone (Optional)' name='alternate_phone'></input>

                            <button type='submit'> save and deliver here</button>
                        </form>
                    </div> 
 :false}
                    
                    {state.show ? <div className='checkoutOptio'>
                        <div className='check'>

                            <ul>
                                <li>{dataOfAddress[0]?.name}</li>
                                <li>{dataOfAddress[0]?.address}</li>
                                <li>{dataOfAddress[0]?.city}</li>
                                <li>{dataOfAddress[0]?.state}</li>
                                <li>{dataOfAddress[0]?.pincode}</li>
                            </ul>
                        </div>
                    </div> : false}

                    {/* ORDER SUMMARY */}
                    <div className='checkoutOption'>
                        <div className='cen'>
                            <div className='contents'>
                                <h5 className='h5'>3</h5>
                                <h5>ORDER SUMMARY</h5>
                            </div>
                        </div>
                    </div>
                    {state.order ? <div className='checkoutOption1'>
                            <div className='dekh'>
                                <div className='left'>
                                    {Carts?.data?.map((e, i) =>
                                        <div className='leftSide' key={i}>
                                            <div className='cartImg'>
                                                <img alt="check" src={`${API_IMAGE_URL}${e.cartsData?.productImg}`} width={100}></img>
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
                                <button onClick={()=>dispatch({data:"payment"})}>CONTINUE</button>
                                </div>
                            </div>
                    </div> : false}

                    {/* PAYMENT OPTIONS */}
                    <div className='checkoutOption'>
                        <div className='cen'>
                            <div className='contents'>
                                <h5 className='h5'>4</h5>
                                <h5>PAYMENT OPTIONS</h5>
                            </div>
                        </div>
                    </div>
                    {state.payment ? <div className='checkoutOption1 payment'>
                       
                     {/* <p><label>cash on delivery</label> <input type='radio' name='payment'></input></p>
                      <p><label>Online</label> <input type='radio' name='payment'></input></p><br></br>
                      <img src={`${LOGO_URL}razorpay.png`}></img> */}
                       {/* <img src={`${LOGO_URL}razorpay.png`} width={100}></img> */}
                     <span onClick={()=>OrderBook({paymentMedium:"COD",address:dataOfAddress[0]})}>COD</span>
                     <span onClick={()=>onPayment()}>Online</span>
                    </div> : false}

                </div>
            </section>
        </>
    )
}
export default Checkout;
