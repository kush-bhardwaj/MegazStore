import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Component/Main/Main';
import Signup from './Component/Form/Signup';
import ProductDescription from './Component/Products/ProductDescription';
import Cart from './Component/cart/Cart';
import Payment from './Component/cart/Payment';
import Checkout from './Component/Checkout/Checkout';
function App() {
  const router =createBrowserRouter([
    {path:"",element:<Main />},
    {path:'form',element:<Signup />},
    {path:'description/:name',element:<ProductDescription />},
    {path:"cart",element:<Cart />},
    {path:'payment',element:<Payment />},
    {path:"checkout",element:<Checkout /> }
    
  ])
  return (
    <>  
   {/* <Header />
    <MySlider />
    <Product /> */}
    <RouterProvider router={router} />
    </>
  );
}

export default App;
