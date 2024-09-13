import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Component/Header/Header';
import MySlider from './Component/Slider/Slider';
import Product from './Component/Products/Product';
import Main from './Component/Main/Main';
import FrontPage from './Component/FrontPage';
import Signup from './Component/Form/Signup';
import ProductDescription from './Component/Products/ProductDescription';
import ScreenLoader from './Utils/Loader';
import Cart from './Component/cart/Cart';
function App() {
  const router =createBrowserRouter([
    {path:"",element:<Main />},
    {path:'form',element:<Signup />},
    {path:'description/:name',element:<ProductDescription />},
    {path:"cart",element:<Cart />},
    
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
