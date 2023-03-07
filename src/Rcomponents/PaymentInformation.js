import PaymentOptions from "../logos/payment-options.png"


const PaymentInformation = () => {
    return (
        <>
            <img className="pb-4" src={PaymentOptions} alt="Payment Options" width="100px"/>
                <form className="pb-5 mb-5">
                    <select className="form-select" aria-labelledby="select-payment-option">
                        <option value="">Select payment method</option>
                        <option value="Paypal">Paypal</option>
                        <option value="Amex">American Express</option>
                    </select>
                </form>
        </>
    )
}

export default PaymentInformation