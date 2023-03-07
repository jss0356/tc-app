import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import PaymentInformation from "./Rcomponents/PaymentInformation"
import {LinkContainer} from "react-router-bootstrap"

const PaymentInfo = () =>{


    return(
    <div id="container" className="d-flex flex-column h-100 w-100">
        <div id="main-navbar" style={{marginBottom:"130px"}}>
            <MainNavbarMarketplace/>
        </div>

        <div id="payment-container" className="w-75 h-75 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}> 
            <h4 className="text-center pt-4">Total: $109.36</h4>
            <div className="w-100 h-75 d-flex flex-column justify-content-start align-items-center pt-5">
                <PaymentInformation/>
            </div>

            <div className='d-flex flex-row w-100 justify-content-center'>
                <LinkContainer to="/marketplace/payment/success"><button className='btn btn-primary w-75'>Proceed to Payment</button></LinkContainer>
            </div>

        </div>


    </div>

    )
}

export default PaymentInfo