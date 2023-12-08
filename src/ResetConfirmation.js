import {Link, useLocation} from "react-router-dom"

const ResetConfirmation = () => {
    const location = useLocation()
    return(
        <div id="reset-request-sent-display" className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
                <h1 className="text-light text-center">Request For Password Reset Sent to {location.state}:</h1>
                <Link to="/"><button className="btn btn-primary">Back to Login</button></Link>
        </div>

    )
}

export default ResetConfirmation