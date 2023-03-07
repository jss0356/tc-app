import { LinkContainer } from "react-router-bootstrap"

const PaymentSuccess = () => {
    return (

        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light text-center">Your purchase was successful and your order ID is *insert order ID here*:</h1>
            <h2 className="text-light text-center">View your purchased item(s) were placed in the "purchased" portfolio:</h2>
            <LinkContainer to="/home"><button className="btn btn-primary">Back to Home</button></LinkContainer>

        </div>

    )

}

export default PaymentSuccess