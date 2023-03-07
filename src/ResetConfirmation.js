import {Link} from "react-router-dom"

const ResetConfirmation = () => {

    return(
        <div id="reset-request-sent-display" className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
                <h1 className="text-light text-center">Request For Password Reset Sent to *insert email here*:</h1>
                <Link to="/login"><button className="btn btn-primary">Back to Login</button></Link>
        </div>

    )
}

export default ResetConfirmation