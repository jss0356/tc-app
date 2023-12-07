import { useMemo, useState } from "react"
import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import PaymentInformation from "./Rcomponents/PaymentInformation"
import {LinkContainer} from "react-router-bootstrap"
import listingsServices from "./services/listings.services"
import userServices from "./services/user.services"
import { auth } from "./config/firebase"
import { useNavigate } from "react-router-dom"

const PaymentInfo = ({cart}) =>{

    const [error, setError] = useState(false);
    const [completedPaymentProcess, setCompletedPaymentProcess] = useState(false);
    const navigate = useNavigate()

    const createPaymentDetails = () => {
        return cart.map((card) => 
        (
            <>
            
            
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

    //logically, this needs to be done with a transaction but is currently not being done as such.
    const purchaseCartHandler = async () => {
        setError(false)
        for(let cartItemIndex = 0; cartItemIndex < cart.length; cartItemIndex++){
           try{
                const cartItem = cart[cartItemIndex];
                console.log(cartItem)
                //remove listing from marketplace.
                await listingsServices.deleteListing(cartItem.listingID)
                //delete card from portfolio of old owner.
                const sellerUserID = await userServices.getUserID(cartItem.listingEmail);
                await userServices.deleteCardFromPortfolio(sellerUserID, cartItem.portfolioID, cartItem.cardID);

                //add card to "purchased" portfolio of user who purchased it.
                const userID = await userServices.getUserID(auth.currentUser.email);

                await userServices.addCardToUserPortfolio(userID,cartItem);
           }
            catch(err){
                setError(true)
                console.error(err);
            }
        }
        setCompletedPaymentProcess(true)

        if(error){
            return;
        }
        //navigate to success screen.
        else{
            navigate("/marketplace/payment/success")
        }
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
            <h2 className="text-center">Purchase Summary</h2>
                {paymentDetails}
                <h4 className="text-center pt-4">Total: ${total}</h4>
                <div className="w-100 h-75 d-flex flex-column justify-content-start align-items-center pt-5">
                    <PaymentInformation/>
                </div>

                <div className='d-flex flex-row w-100 justify-content-center'>
                    {/* <LinkContainer to="/marketplace/payment/success">
                    
                    </LinkContainer> */}

                <button className='btn btn-primary w-25 mb-5' onClick={purchaseCartHandler}>Place purchase</button>
                </div>


            </div>

        </div>


    </div>

    )
}

export default PaymentInfo