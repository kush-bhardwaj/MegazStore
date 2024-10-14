import './checkout.css'
import { useEffect, useReducer, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ClearStorggeKey, GetStorage } from '../../Utils/Storage'
import { LoginApi, SetAddress } from '../../API/API'
const initialValue = {
    login: true,
    address: false,
    order: false,
    payment: false,
    change: false,
}
const reducer = (state, action) => {
    switch (action.data) {
        case 'login': return { login: true }
        case 'logout': return { login: false, address: true, change: true }
    }
}
const Checkout = () => {
    const [state, dispatch] = useReducer(reducer, initialValue)
    const [dataOfAddress , setDataOfAddress] = useState()   
    const selectStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
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
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const formSubmit = async (event) => {
        event.preventDefault()
        const res = await LoginApi(formData)
        if (res.status === 'success') {
            dispatch({ data: "logout" })
        }
        // dispatch({data:'logout'})
    }
    const IsLogedIn = () => {
        const status = GetStorage()
        if (status.status === 'success') {
            // const x = jwtDecode(status.token)
            // console.log("check",x)
            dispatch({ data: 'logout' })
        }
    }
    const Logout = () => {
        console.log("hello")
        ClearStorggeKey()
        dispatch({ data: 'login' })
    }

    const formHanlde1 = async (event) => {
        event.preventDefault()
        const res = await SetAddress(addressData)
        console.log(res)
        console.log("res", res?.data?.customerAddress)
        setDataOfAddress(res?.data?.customerAddress)
        // console.log(addressData)

    }
    const handleChange1 = (event) => {
        setAddress({ ...addressData, [event.target.name]: event.target.value })
        //    console.log(addressData)
    }
    useEffect(() => {
        IsLogedIn()

    }, [])
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
                            <div className='check'>
            
                                    {dataOfAddress?.map((e,i)=>
                                        <span>{e}</span>
                                    )}
                            </div>
                        </div>
                    </div>
                    {state.address ? <div className='checkoutOption2'>
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
                    </div> : false}

                    <div className='checkoutOption2'></div>

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
                        <input></input>
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
                    {state.payment ? <div className='checkoutOption1'>
                        <input></input>
                    </div> : false}

                </div>
            </section>
        </>
    )
}
export default Checkout;