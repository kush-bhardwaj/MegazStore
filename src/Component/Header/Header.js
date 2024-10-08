import './header.css'
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiShoppingCartThin } from "react-icons/pi";
import { BsShopWindow, BsThreeDotsVertical } from "react-icons/bs";
import { LOGO_URL } from "../../URL/URL";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
    return (
        <>
            <div className="header ">
                <nav className="nav ">
                    <div className="leftDiv ">
                        <img src={`${LOGO_URL}updae1.png`}></img>
                        <form autoComplete="off">
                            <input type='text' placeholder='&#128269; Search for Products, Brand and More ' ></input>
                        </form>
                    </div>
                    <div className="rightDiv">
                        <span title='Login' onClick={() => navigate('/form')}>  <HiOutlineUserCircle className='icons' /> Login</span>
                        <span title='Cart' onClick={() => navigate('/cart')}>  <PiShoppingCartThin className='icons' /> Cart</span>
                        <span title='Seller'> <BsShopWindow className='icons' /> Become a Seller</span>
                        <span>  <BsThreeDotsVertical /></span>
                    </div>
                </nav>
            </div>

            <div className="mobileHeader FLEX">
                <nav className=" mobileNav">
                    <div className=" MobileLeftDiv">
                        <img src={`${LOGO_URL}updae1.png`}></img>

                    </div>
                    <div className="MobilerightDiv">
                        <span title='Login' onClick={() => navigate('/form')}>  <HiOutlineUserCircle className='icons' /> Login</span>
                        <span title='Cart' onClick={() => navigate('/cart')}>  <PiShoppingCartThin className='icons' /> Cart</span>
                        {/* <span title='Seller'> <BsShopWindow className='icons'/> Become a Seller</span>
                     <span>  <BsThreeDotsVertical/></span> */}
                    </div>
                </nav>
                <div className='forms'>
                <form autoComplete="off">
                    <input type='text' placeholder='&#128269; Search for Products, Brand and More ' ></input>
                </form>
                </div>
            </div>

        </>
    )
}