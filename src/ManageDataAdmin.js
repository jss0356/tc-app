import Logo from "./logos/Logo.png"
import { LinkContainer } from "react-router-bootstrap"

const ManageDataAdmin = () => {
    return (
    <div id="container" className="h-100 w-100 d-flex flex-column">

        <div id="inner-container" className="h-75 w-100 d-flex flex-column justify-content-center mt-3 ps-3" style={{backgroundColor:"#edf5e1"}}>
            
            <div className="w-100 h-100">
                <div className="w-100 pb-3 pt-3 d-flex flex-row justify-content-center">
                    <img className="d-inline" src={Logo} alt="TCM Logo" height="100px" width="100px"/>
                    <h1 className='d-inline'>TCM</h1>
                </div>

                <select className="form-select w-50" aria-labelledby="manage-data">
                            <option value="">View or Manage Data?</option>
                            <option value="Paypal">View</option>
                            <option value="Amex">Manage</option>
                        </select>

            </div>
            <div className="d-flex flex-row w-100 justify-content-center">
                <LinkContainer to="/home-admin"><button className="btn btn-primary w-25 m-4 d-inline">Back to Home</button></LinkContainer>
                <button className="btn btn-primary w-25 m-4 d-inline">View Data / Perform Operation</button>

            </div>
        </div>
    </div>
    )
}

export default ManageDataAdmin