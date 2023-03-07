import {Link} from 'react-router-dom'

const Registration = () => {


    return (
        <div id="registration-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="registration-container" className="border rounded d-flex justify-content-center align-items-flex-start w-75 h-75 pt-5" style={{ backgroundColor: "#edf5e1"}}>
                <div id="registration-contents" className="h-100 w-75 d-flex flex-column ">
                
                    <h1 className="text-center">Create Account:</h1>
                    <p className="text-center">Sign-up to create trading card portfolios and track their prices:</p>

                    <form>
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input id="username" type="text" className="form-control mb-4"/>
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input id="email" type="email" className="form-control mb-4"/>
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input id="password" type="password" className="form-control mb-4"/>
                        <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                        <input id="confirm-password" type="password" className="form-control mb-4"/>
                    
                        <select className="form-select mb-5" aria-labelledby="security question">
                            <option selected>Select Security Question</option>
                            <option value="Birth-Location">Which city were you born in?</option>
                            <option value="Mother-Maiden-Name">What is your mother's maiden name?</option>
                        </select>

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="email-notifications"/>
                            <label className="form-check-label" htmlFor="email-notifications">Recieve Email Notifications</label>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center">
                        <Link style={{width: "50%"}} to="/register/initial-profile-settings"><button className="btn btn-primary w-100 mt-2">Sign-Up</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration