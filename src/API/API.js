import { API_BASE_URL } from "../URL/URL";
import { API_ROUTER } from "../Utils/ApiRouter";

//customer form api start here

export const SignupApi = async(data)=>{
    const header ={
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data)
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.signup}`,header);
    return await res.json()
}
//Login Api

export const LoginApi = async(data)=>{
    console.log("data",data)
    const header ={
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.login}`,header);
    return await res.json();
}
//Login Api end
//customer form api end here
export const getSliderApi = async()=>{
    const header ={
        method:"GET",
        headers:{"Content-type":"application/json"}
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.slider.getSlider}`,header);
    return await res.json();
}


//products start

export const GetProducts = async(page)=>{
    const header ={
        method:"GET",
        header:{"Content-type":"application/json"}
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.getAllProduct}?pageno=${page}`,header);
    return await res.json()
}


//products end
