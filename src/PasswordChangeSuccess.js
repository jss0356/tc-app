import {Link} from "react-router-dom"

const PasswordChangeSuccess = () => {
    return (
        <div id="reset-password-success-display" className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
            <h1 className="text-light text-center">Password Changed Successfully!</h1>
            <Link to="/login"><button className="btn btn-primary">Back to Login</button></Link>
        </div>
    )
}

export default PasswordChangeSuccess