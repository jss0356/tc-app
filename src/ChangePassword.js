import {Link} from "react-router-dom" 

const ChangePassword = () => {

    return(
        <div id="reset-password-display" className="d-flex justify-content-center align-items-center h-100 w-100">
        <div id="reset-password-container" className="border d-flex rounded flex-column justify-content-center align-items-center w-75 h-50 pt-5 ps-5" style={{ backgroundColor: "#edf5e1"}}>
            <div id="reset-password-container-contents" className="h-100 w-75 d-flex flex-column">
                <h1 className="text-center">Reset Password:</h1>
                <p className="text-center">Enter new password.</p>
                <div id="reset-password-form">
                    <form>
                        <label htmlFor="newPassword" className="form-label">Enter New Password:</label>
                        <input id="newPassword" type="password" className="form-control mb-4"/>
                        <label htmlFor="newPasswordAgain" className="form-label">Enter New Password Again:</label>
                        <input id="newPasswordAgain" type="password" className="form-control mb-4"/>
                    </form>
                    <div className="d-flex justify-content-center h-100 w-100">
                    <Link style={{width: "50%"}} to="/reset/password-changed"><button className="btn btn-primary w-100 mt-2">Change Password</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default ChangePassword