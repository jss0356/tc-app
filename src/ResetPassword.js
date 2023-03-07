import {Link} from "react-router-dom"

const ResetPassword = () =>{


    return (
        <div id="reset-password-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="reset-password-container" className="border d-flex rounded flex-column justify-content-center align-items-center w-75 h-50 pt-5 ps-5" style={{ backgroundColor: "#edf5e1"}}>
                <div id="reset-password-container-contents" className="h-100 w-75 d-flex flex-column">
                    <h1 className="text-center">Reset Password:</h1>
                    <p className="text-center">Enter email associated with account and then answer associated security question:</p>
                    <div id="reset-password-form">
                        <form>
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input id="email" type="email" className="form-control mb-4"/>
                            <label htmlFor="security-question" className="form-label">(sample security question)What is your mother's maiden name?</label>
                            <input id="security-question" type="text" className="form-control mb-4"/>
                        </form>
                        <div className="d-flex justify-content-center h-100 w-100">
                        <Link style={{width: "50%"}} to="/reset/request-sent"><button className="btn btn-primary w-100 mt-2">Reset Password</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword