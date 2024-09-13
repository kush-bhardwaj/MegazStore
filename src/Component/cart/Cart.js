import { memo } from 'react';
import Header from '../Header/Header';
import './cart.css'
const Cart = () => {
    return (
        <>
            <Header />
            <section>
                <div className='middle'>
                    <div className='left'>
                        <div className='cartImg'>
                            <img  alt="check"></img>
                        </div>
                        <div className='cartDetails'>h</div>
                    </div>
                    <div className='right'>
                        <div className='amount'><small>PRICE DETAILS</small></div>
                        <div className='amountDetails'></div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default memo (Cart);