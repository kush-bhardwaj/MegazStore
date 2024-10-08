export const API_ROUTER = {
    auth:{
        signup:"/auth/customer/signup",
        login:"/auth/customer/login"
    },
    products:{
        getAllProduct:"/product/allProduct",
        singleProduct:"/product/singleProduct",
        aggregate:"/product/getproductbyid"
    },
    slider:{
        getSlider:"/slider/getSlider"
    },
    cart:{
        addcart:"/cart/addcart",
        getcart:"/cart/getcart",
        updatecart:'/cart/updatecart',
        decrementcart:'/cart/decrement',
        deletecart:"/cart/deletecart"

    },
    category:{
        getCategory:"/category/getAllCategory",
        getSingleCategory:'/category/singlecategory'
    },
    order:{
        placeOrder:'/order/addorder'
    }
    
}