// import { MdOutlineCancel } from "react-icons/md";
import { useState } from 'react'
import './form.css'
import { LoginApi, SignupApi } from '../../API/API'
import { useNavigate } from 'react-router-dom'
import { LOGO_URL } from '../../URL/URL'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import {Main}  from '../Main/Main'

export default function Signup() {
    const navigate = useNavigate()
    const [show, setShow] = useState(true)
    const [LoginShow, setLoginShow] = useState(false)
    const [formData, setFormDatra] = useState()
    const sigupApi = async () => {
        const res = 0
    }
    function handleChange(event) {
        setFormDatra({ ...formData, [event.target.name]: event.target.value })
    }
    async function formSubmit(event) {
        event.preventDefault();

        //signup api call start
        const res = await SignupApi(formData)
        if (res.status === "success") {
            toast.success(res.status)
            setTimeout(()=>{
                navigate("../")
            },2000)
        }
        //signup api call end

        //login api call start
        
        const loginRes = await LoginApi(formData);
        console.log(loginRes)

        //login api call end
    }
    return (
        <>
            {show ? <div className="formContainer">
                <div className="middle">
                    <div className="forms ">
                       <p> <img src={`${LOGO_URL}updae1.png`} ></img></p>
                        <h3>Sign In or create account</h3>
                        <form autoComplete='off' onSubmit={formSubmit}>
                            <p><input onChange={handleChange} type='text' placeholder='Enter your name' name='name'></input></p>
                            <p><input onChange={handleChange} type='email' placeholder='Enter your email' name='email'></input></p>
                            <p><input onChange={handleChange} type='text' placeholder='Enter your mobile number' name='mobile'></input></p>
                            <p><input onChange={handleChange} type='password' placeholder='Enter your password' name='password'></input></p>
                            <p><input onChange={handleChange} type='submit' value='Signup'></input></p>
                        </form>
                        <p>already account? <span onClick={() => { setShow(false); setLoginShow(true) }} >Login</span></p>
                    </div>
                </div>
            </div> : null}

            {LoginShow ? <div className="formContainer">
                <div className="middle">
                    <div className="forms ">
                    <p> <img src={`${LOGO_URL}updae1.png`} ></img></p>
                        <h3>Login Your Account</h3>

                        <form autoComplete='off'onSubmit={formSubmit}>

                            <p><input onChange={handleChange} type='email' placeholder='Enter your mobile number' name='mobile'></input></p>
                            <p><input onChange={handleChange} type='password' placeholder='Enter your password' name='password'></input></p>
                            <p><input onChange={handleChange} type='submit' value='Login'></input></p>
                        </form>
                        <p>Create a Account?<span onClick={() => { setLoginShow(false); setShow(true) }} >SignUp</span></p>
                    </div>
                </div>
            </div> : null}

            <ToastContainer />
        </>
    )
}