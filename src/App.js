import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Component/Header/Header';
import MySlider from './Component/Slider/Slider';
import Product from './Component/Products/Product';
import Main from './Component/Main/Main';
import FrontPage from './Component/FrontPage';
import Signup from './Component/Form/Signup';
function App() {
  const router =createBrowserRouter([
    {path:"",element:<FrontPage />},
    {path:'form',element:<Signup />}
    
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
