import { API_BASE_URL } from "../URL/URL";
import { API_ROUTER } from "../Utils/ApiRouter";
import { GetStorage } from "../Utils/Storage";

//customer form api start here

export const SignupApi = async(data)=>{
   try{
    const header ={
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data)
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.signup}`,header);
    return await res.json()
   }catch(err){}
}
//Login Api

export const LoginApi = async(data)=>{
    try{
        console.log("data",data)
    const header ={
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${GetStorage().token}`
        },
        body:JSON.stringify(data)
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.login}`,header);
    return await res.json();
    }catch(err){}
}
//Login Api end
//customer form api end here
export const getSliderApi = async()=>{
    try{
        const header ={
            method:"GET",
            headers:{"Content-type":"application/json"}
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.slider.getSlider}`,header);
        return await res.json();
    }catch(err){}
}


//products start

export const GetProducts = async(page)=>{
   try{
    const header ={
        method:"GET",
        header:{"Content-type":"application/json"}
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.getAllProduct}?pageno=${page}`,header);
    return await res.json()
   }catch(err){}
}


//products end



//getCategory api

export const getCategory = async ()=>{
   try{
    const header ={
        method:"GET",
        headers:{"Content-type":"application/json"}
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.category.getCategory}`,header);
    return await res.json();
   }catch(err){}
}


//get single category
export const getSingleCategory = async (id)=>{
   try{
    console.log("id",id)
    const header ={
        method:"GET",
        header:{
            "Content-type":"application/json"
        }
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.category.getSingleCategory}/${id}`,header);
    return await res.json()
   }catch(err){}
}


//categoryProduct
export const GetProductByCat = async(id)=>{
    try{
        const header ={
            method:"GET",
            headers:{"Content-type":"applicatoin/json"}
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.aggregate}/${id}`,header);
        return await res.json()
    }catch(err){}
}


//single Product
export const GetSingleProduct = async (data)=>{
   try{
    const header ={
        method:"GET",
        header:{
            "Content-type":"application/json"
        }
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.singleProduct}/${data}`,header);
    return await res.json();
   }catch(err){}
}




//cart api's

//add to cart 

export const AddToCart = async(productId)=>{
    const details ={
        "productId":`${productId}`
    }
    
    var formBody =[]
    for(let check in details){
        const urlKey = encodeURIComponent(check)
        const urlValue =encodeURIComponent(details[check])
        formBody.push(urlKey + "=" + urlValue)
    }
    formBody = formBody.join('&');
    const header ={
        method:"POST",
        headers:{
            "Content-type":"application/x-www-form-urlencoded",
            'Authorization':`Bearer ${GetStorage().token}`
        },
        body:formBody
    }
    console.log(header.headers)
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.addcart}`,header)
    return await res.json();
}

//add to cart end

export const GetCarts = async(id)=>{
    const header ={
        method:"GET",
        header:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${GetStorage().token}`
        }
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.getcart}/${id}`,header);
    return await res.json()

}

//cart api's end