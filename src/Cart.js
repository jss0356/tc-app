import SampleProductImage from './image/baseball/card1.jpg'
import MainNavbarMarketplace from './Rcomponents/MainNavbarMarketplace'
import {LinkContainer} from 'react-router-bootstrap'

const Cart = () =>{

    return (

        
            <div className='h-100 w-100 d-flex flex-column'>
                <div id="main-navbar" style={{marginBottom:"130px"}}>
                    <MainNavbarMarketplace/>
                </div>
                <div id="container" className="h-100 w-100 d-flex flex-row">
                <div id="left-display" className="h-75 w-75 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:"#edf5e1", borderRight:"1px solid black"}}>
                    <h2 className="text-center mb-2">Items in Cart:</h2>

                    <div className="vstack h-75 w-75 ps-5 gap-3">
                        <div className="bg-light border border-dark">
                            <div className='d-flex flex-row h-100 w-100 align-items-center gap-5'>
                                <img src={SampleProductImage} width="100px"alt="Product Image"/>
                                <h3 style={{marginRight:"150px"}}>Baseball Card 1</h3>
                                <h2>$34.99</h2>
                            </div>                        
                        </div>
                        <div className="bg-light border border-dark">
                            <div className='d-flex flex-row h-100 w-100 align-items-center gap-5'>
                                <img src={SampleProductImage} width="100px"alt="Product Image"/>
                                <h3 style={{marginRight:"150px"}}>Baseball Card 1</h3>
                                <h2>$32.99</h2>
                            </div>                        
                        </div>
                        <div className="bg-light border border-dark">
                            <div className='d-flex flex-row h-100 w-100 align-items-center gap-5'>
                                <img src={SampleProductImage} width="100px"alt="Product Image"/>
                                <h3 style={{marginRight:"150px"}}>Baseball Card 1</h3>
                                <h2>$35.99</h2>
                            </div>                        
                        </div>

                    </div>

                </div>


                <div id="right-display" className="h-75 w-25 d-flex flex-column pb-5" style={{backgroundColor:"#edf5e1"}}>
                    <h2 className="text-center">Checkout:</h2>
                    <hr />
                    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className='pb-5'>
                            <h5 className='d-inline'>Subtotal:</h5>
                            <h3 className='d-inline'>$103.97</h3>
                        </div>
                        <div className='pb-5'>
                            <h5 className='d-inline'>Tax:</h5>
                            <h3 className='d-inline'>$5.39</h3>
                        </div>
                        <div className='pb-5'>
                            <h5 className='d-inline'>Total:</h5>
                            <h3 className='d-inline'>$109.36</h3>
                        </div>


                    </div>

                    <div className='d-flex flex-row w-100 justify-content-center'>
                        <LinkContainer to="/marketplace/payment"><button className='btn btn-primary w-75'>Proceed to Payment</button></LinkContainer>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}


export default Cart