import {Link, useLocation, useNavigate} from "react-router-dom"
import {useState} from 'react'
import PaymentInformation from "./Rcomponents/PaymentInformation"
import userSettingsDataService from "./services/userSettings.services"

const InitialSettingsPaymentInfo = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const [currentInitialSettings, setCurrentIntialSettings] = useState(location.state)

    console.log("state retrieved: ", currentInitialSettings)

    const addInitialUserSettings = async (userSettingsToAdd) => {
        try{
            await userSettingsDataService.addUserSettings(userSettingsToAdd)
        }
        catch(err){
            console.log("Unable to update settings")
        }
    }

    const [paymentType, setPaymentType] = useState("")

    const saveChangesHandler = () => {
        const newIntialSettings = {...currentInitialSettings, isPaymentInfoSet: true, paymentType}
        addInitialUserSettings(newIntialSettings)
        navigate("/register/registration-success")
    }

    const decideLaterHandler = () => {
        const newIntialSettings = {...currentInitialSettings, isPaymentInfoSet: false}
        addInitialUserSettings(newIntialSettings)
        navigate("/register/registration-success")
    }



    return (
        <div id="initial-settings-payment-info-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="initial-settings-payment-info-contents" style={{backgroundColor: "#edf5e1"}} className="border rounded w-50 h-75 d-flex flex-column justify-content-flex-start align-items-center p-5">
                <h1>Initial Payment Info:</h1>
                <p className="text-center">Set-up an initial payment plan for marketplace purchases associated to your account, or select "decide later" to skip.</p>
                
                <PaymentInformation paymentType={paymentType} setPaymentType={setPaymentType} />                
                
                <button className='btn btn-primary' onClick={saveChangesHandler} disabled={paymentType === ""}>Save Changes and Continue</button>
                <button className="btn btn-link" onClick={decideLaterHandler}> Decide Later </button>

            </div>
        </div>
    )
}
export default InitialSettingsPaymentInfo