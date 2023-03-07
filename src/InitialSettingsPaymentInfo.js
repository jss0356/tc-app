import {Link} from "react-router-dom"
import PaymentInformation from "./Rcomponents/PaymentInformation"

const InitialSettingsPaymentInfo = () => {
    return (
        <div id="initial-settings-payment-info-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="initial-settings-payment-info-contents" style={{backgroundColor: "#edf5e1"}} className="border rounded w-50 h-75 d-flex flex-column justify-content-flex-start align-items-center p-5">
                <h1>Initial Payment Info:</h1>
                <p className="text-center">Set-up an initial payment plan for marketplace purchases associated to your account, or select "decide later" to skip.</p>
                
                <PaymentInformation/>                
                
                <Link to="/home" className='mb-5'><button className='btn btn-primary'>Save Changes and Continue</button></Link>
                <Link to="/home">Decide Later</Link>

            </div>
        </div>
    )
}
export default InitialSettingsPaymentInfo