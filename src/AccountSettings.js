import { LinkContainer } from "react-router-bootstrap"

const AccountSettings = () => {

    return (
        <div id="account-settings-container" className="d-flex w-100 h-100 justify-content-center align-items-center ">
        <div id="account-settings-inner-container" className="border rounded w-75 h-75 p-2" style={{ backgroundColor: "#edf5e1"}}>
        <div className="d-flex flex-row w-100 h-75">    
            <div id="subsetting-options" className="vstack d-flex justify-content-center h-100 w-25 border-right rounded border-dark gap-5">
            <p className="text-center">Select sub-setting to change:</p>

                <button className="btn btn-primary">General Settings</button>
                <button className="btn btn-primary">Accessibility Settings</button>
                <button className="btn btn-primary">Payment Settings</button>
                <button className="btn btn-primary">Portfolio Settings</button>
                <button className="btn btn-primary">My Listings</button>


            </div>
            
            <div id="setting-options" className="vstack d-flex justify-content-center gap-3 h-100 w-50 border border-dark">
            
                <label htmlFor="sample-setting">Sample Setting 1:</label>
                <select id="sample-setting"className="form-select" aria-label="Default select example">
                    <option value="">Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select>
                
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Sample Setting 2:</label>
                </div>

                
                    <label htmlFor="sample-setting">Sample Setting 3:</label>
                <select id="sample-setting"className="form-select" aria-label="Default select example">
                    <option value="">Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </select>
            </div>
            </div>
            <LinkContainer to="/home"><button className="btn btn-primary d-inline mt-5 ms-4">Back to Home</button></LinkContainer>
            <LinkContainer to="/home"><button className="btn btn-primary d-inline mt-5 ms-4">Save Changes</button></LinkContainer>

        </div>
        
        </div>



        )
}


export default AccountSettings