// import { MdOutlineCancel } from "react-icons/md";
import { useState } from 'react'
import './form.css'
import { LoginApi, SignupApi } from '../../API/API'
import { useNavigate } from 'react-router-dom'
import { LOGO_URL } from '../../URL/URL'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { SetStorage } from '../../Utils/Storage'
// import {Main}  from '../Main/Main'

export default function Signup() {
    const navigate = useNavigate()
    const [show, setShow] = useState(true)
    const [LoginShow, setLoginShow] = useState(false)
    const [formData, setFormDatra] = useState({
        name:"",
        email:"",
        password:"",
        mobile:""
    })
    const [LoginData ,setLoginData] = useState()
    function handleChange(event) {
        setFormDatra({ ...formData, [event.target.name]: event.target.value })
    }
    async function formSubmit(event) {
        event.preventDefault();
        // (formData)
        // signup api call start
        const res = await SignupApi(formData)
        if (res.status === "success") {
            toast.success(res.status)
            // setTimeout(()=>{
            //     navigate("../")
            // },2000)
            (res)
        }
        //signup api call end
    }
    
    const LoginChange =async(event)=>{
        setLoginData({...LoginData,[event.target.name]:event.target.value})
        // (LoginData)
    }
    const LoginHandle =async(event)=>{
        event.preventDefault()
        (LoginData)
        try{
            const data = new FormData()
            data.append('email',LoginData.email);
            data.append('password',LoginData.password);
            const res = await LoginApi(LoginData)
            if(res.status === 'success'){
                SetStorage(res)
                toast.success(res.message)
                setTimeout(() => {
                    navigate("../")
                }, 1000);

            }else{
                toast.warning(res.message)
            }
        }catch(err){

        }
    }
    return (
        <>
            {show ? <div className="formContainer mobileForm">
                <div className="middle center">
                    <div className=" middelEnd phone_width ">
                       <p> <img src={`${LOGO_URL}updae1.png`} ></img></p>
                        <h3>Sign In or create account</h3>
                        <form autoComplete='off' onSubmit={formSubmit}>
                            <p><input onChange={handleChange} type='text' placeholder='Enter your name' name='name'></input></p>
                            <p><input onChange={handleChange} type='email' placeholder='Enter your email' name='email'></input></p>
                            <p><input onChange={handleChange} type='text' placeholder='Enter your mobile number' name='mobile'></input></p>
                            <p><input onChange={handleChange} type='password' placeholder='Enter your password' name='password'></input></p>
                            <p><input onChange={handleChange} type='submit' value='Signup' className='inputButton'></input></p>
                        </form>
                        <p>already account? <span onClick={() => { setShow(false); setLoginShow(true) }} >Login</span></p>
                    </div>
                </div>
            </div> : null}

            {LoginShow ? <div className="formContainer mobileForm">
                <div className="middle center">
                    <div className="phone_width ">
                    <p> <img src={`${LOGO_URL}updae1.png`} ></img></p>
                        <h3>Login Your Account</h3>

                        <form autoComplete='off'onSubmit={LoginHandle}>

                            <p><input onChange={LoginChange} type='email' placeholder='Enter your email' name='email'></input></p>
                            <p><input onChange={LoginChange} type='password' placeholder='Enter your password' name='password'></input></p>
                            <p><input type='submit' value='Login' className='inputButton'></input></p>
                        </form>
                        <p>Create a Account ?<span onClick={() => { setLoginShow(false); setShow(true) }} style={{cursor:'pointer'}} > SignUp</span></p>
                    </div>
                </div>
            </div> : null}

            <ToastContainer />
        </>
    )
}