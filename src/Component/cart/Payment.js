import { useReducer, useState } from "react";
// Define the initial state
const initialState = { 
    cod: false ,
    upi:false,
};
// Define a reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'cod':
      return { 
        cod:true ,upi:false
    };
    case 'upi': 
    return{
        cod :false, upi:true
    }
  }
}
const Payment = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
        <div className="paymentHead">
            <div className="paymentMid">
                <h4>Payment Options</h4>
                <p>Choose an express checkout or complete the form below</p>
               <div className="paymentOption">
               <p><input type="radio" name="cod" onClick={() => dispatch({ type: 'cod' })}></input><label>Cash On Delivery</label></p>
               <p><input type="radio" name='cod' onClick={()=> dispatch({type:'upi'})}></input><label>UPI</label></p>
               </div>
               {
                    state.cod?<button>Pay Now</button>:false
                }
                {
                    state.upi?<button>Yes</button>:false
                }
            </div>
        </div>
        </>
    )
}
export default Payment;