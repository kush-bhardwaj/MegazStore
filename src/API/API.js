import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../URL/URL";
import { API_ROUTER } from "../Utils/ApiRouter";
import { GetStorage, GetStorageInfo } from "../Utils/Storage";
import { json } from "react-router-dom";

//customer form api start here

export const SignupApi = async (data) => {
    try {
        const header = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.signup}`, header);
        return await res.json()
    } catch (err) { }
}
//Login Api

export const LoginApi = async (data) => {
    try {
        const header = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${GetStorage().token}`
            },
            body: JSON.stringify(data)
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.login}`, header);
        return await res.json();
    } catch (err) { }
}
//Login Api end
//customer form api end here
export const getSliderApi = async () => {
    try {
        const header = {
            method: "GET",
            headers: { "Content-type": "application/json" }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.slider.getSlider}`, header);
        return await res.json();
    } catch (err) { }
}


//products start

export const GetProducts = async (page) => {
    try {
        const header = {
            method: "GET",
            header: { "Content-type": "application/json" }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.getAllProduct}?pageno=${page}`, header);
        return await res.json()
    } catch (err) { }
}


//products end



//getCategory api

export const getCategory = async () => {
    try {
        const header = {
            method: "GET",
            headers: { "Content-type": "application/json" }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.category.getCategory}`, header);
        return await res.json();
    } catch (err) { }
}


//get single category
export const getSingleCategory = async (id) => {
    try {
        const header = {
            method: "GET",
            header: {
                "Content-type": "application/json"
            }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.category.getSingleCategory}/${id}`, header);
        return await res.json()
    } catch (err) { }
}


//categoryProduct
export const GetProductByCat = async (id) => {
    try {
        const header = {
            method: "GET",
            headers: { "Content-type": "applicatoin/json" }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.aggregate}/${id}`, header);
        return await res.json()
    } catch (err) { }
}


//single Product
export const GetSingleProduct = async (data) => {
    try {
        const header = {
            method: "GET",
            header: {
                "Content-type": "application/json"
            }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.products.singleProduct}/${data}`, header);
        return await res.json();
    } catch (err) { }
}




//cart api's

//add to cart 

export const AddToCart = async (productId) => {
    try {
        const details = {
            "productId": `${productId}`
        }

        var formBody = []
        for (let check in details) {
            const urlKey = encodeURIComponent(check)
            const urlValue = encodeURIComponent(details[check])
            formBody.push(urlKey + "=" + urlValue)
        }
        formBody = formBody.join('&');
        const header = {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer ${GetStorage().token}`
            },
            body: formBody
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.addcart}`, header)
        return await res.json();
    } catch (err) {
        console.error(err)
    }
}

//add to cart end

//get carts
export const GetCarts = async () => {
    try {
        const header = {
            method: "GET",
            headers: {
                "Authorization": `bearer ${GetStorage().token}`
            }
        }

        const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.getcart}`, header);
        return await res.json()
    } catch (err) {
        console.error(err)
    }

}


//delete carts

export const DelelteCart = async (id) => {
    try {
        const header = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${GetStorage().token}`
            }
        }
        const resData = await fetch(`${API_BASE_URL}${API_ROUTER.cart.deletecart}/${id}`, header);
        return await resData.json()
    } catch (err) {
        console.error(err)
    }
}

//update quantity of cart

export const IncreamentQuantityCart = async (id) => {
    try {
        const header = {
            method: "PUT",
            headers: {
                "Authorization": `Beare ${GetStorage().token}`
            }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.updatecart}/${id}`, header)
        return await res.json()
    } catch (err) {
        console.error(err)
    }
}


export const DecrementQuantityCart = async (id) => {
    try {

        const header = {
            method: "PUT",
            headers: {
                "Authorization": `Beare ${GetStorage().token}`
            }
        }
        const res = await fetch(`${API_BASE_URL}${API_ROUTER.cart.decrementcart}/${id}`, header)
        return await res.json()
    } catch (err) {
        console.error(err)
    }
}

//end update qunatity of cart
//cart api's end


//ORDER API

export const OrderApi = async (medium) => {
    delete medium.address._id
    const address = medium.address
    const header = {
        method: "POST",
        headers: {
            'Authorization': `bearer ${GetStorage().token}`,
            'Content-type':"application/json"
        },
        body:JSON.stringify(address)
    }

    const res = await fetch(`${API_BASE_URL}${API_ROUTER.order.placeOrder}?medium=${medium.paymentMedium}`, header)
    return await res.json()
}
//ORDER API END


//

export const SetAddress = async (data) => {
    const id = jwtDecode(GetStorage().token)
    const details = {
        "name": `${data.name}`,
        'mobile': `${data.mobile}`,
        'pincode': `${data.pincode}`,
        'locality': `${data.locality}`,
        'city': `${data.city}`,
        'state': `${data.state}`,
        'landmark': `${data.mobile}`,
        'alternate_phone': `${data.alternate_phone}`,
        'address': `${data.address}`
    }

    var formBody = []
    for (let check in details) {
        const urlKey = encodeURIComponent(check)
        const urlValue = encodeURIComponent(details[check])
        formBody.push(urlKey + "=" + urlValue)
    }
    formBody = formBody.join('&');
    const header = {
        method: "PUT",
        headers: {
            'Content-type': "application/x-www-form-urlencoded"
        },
        body: formBody
    }
    const resData = await fetch(`${API_BASE_URL}${API_ROUTER.auth.update}?id=${id.customerId}`, header);
    return await resData.json()
}
//

//single customer

export const SingleCustomer = async () => {
    const id = jwtDecode(GetStorage().token)
    const header = {
        method: "GET",
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTER.auth.single}?id=${id.customerId}`, header);
    return await res.json()
}



//payemtcreateorder
export const OrderCreateRazor=async()=>{
    const header ={
        method:"POST",
        headers:{
            'Authorization': `bearer ${GetStorage().token}`,
        }
    }
    const res =await fetch(`${API_BASE_URL}${API_ROUTER.payment.createOrder}`,header)

    return  await res.json()
}