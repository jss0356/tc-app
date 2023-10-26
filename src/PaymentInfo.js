import { useMemo } from "react"
import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import PaymentInformation from "./Rcomponents/PaymentInformation"
import {LinkContainer} from "react-router-bootstrap"

const PaymentInfo = ({cart}) =>{



    const createPaymentDetails = () => {
        return cart.map((card) => 
        (
            <>
            
            
            <h2 className="text-center">Purchase Summary</h2>
            <div className="d-flex flex-row justify-content-center w-100 pt-3">
                
                <div id="card-name" className="mx-2 fs-5">
                    {card.name}
                </div>
                <div id="card-price" className="fs-5" style={{fontWeight: "bold"}}>
                    ${card.listingPrice}
                </div>
            </div>
            </>
            
        ))
    }

    const computeTotal = () => {
        const cardPrices = cart.map((card) => card.listingPrice)
        return cardPrices.reduce((total, amount) => total + amount);
    }

    const paymentDetails = useMemo(() => createPaymentDetails() , [])
    const total = useMemo(() => computeTotal(), [])
    return(
    <div id="container" className="d-flex flex-column h-100 w-100">
        <div id="main-navbar" style={{marginBottom:"130px"}}>
            <MainNavbarMarketplace/>
        </div>

        


        <div id="payment-container" className="w-100 h-100 d-flex flex-column align-items-center justify-content-center" > 
            <div id="wrapper" className="w-75 h-100" style={{backgroundColor:"#edf5e1"}}>
                {paymentDetails}
                <h4 className="text-center pt-4">Total: ${total}</h4>
                <div className="w-100 h-75 d-flex flex-column justify-content-start align-items-center pt-5">
                    <PaymentInformation/>
                </div>

                <div className='d-flex flex-row w-100 justify-content-center'>
                    <LinkContainer to="/marketplace/payment/success"><button className='btn btn-primary w-25 mb-5'>Place purchase</button></LinkContainer>

                </div>


            </div>

        </div>


    </div>

    )
}

export default PaymentInfo