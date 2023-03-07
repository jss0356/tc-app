import MainNavbar from "./Rcomponents/MainNavbar"
import DefaultProfile from "./logos/default-profile.jpg"
import EditIcon from "./logos/EditIcon.png"

const ViewProfile = () => {
    return(
        <div id="View-Profile-Outer-Container" className="w-100 h-100 d-flex flex-column align-items-center">
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>

            <div id="view-profile" className="w-75 h-75 d-flex flex-column align-items-center" style={{backgroundColor:"#edf5e1"}}>
                <h1 className="text-center">My Account:</h1>
                <p className="text-center">View and modify how your account appears to others.</p>
                <hr />
                
                <h2>Profile Picture:</h2>
                <div className="d-flex w-100 flex-row justify-content-center">
                    <img src={DefaultProfile} className="border rounded-circle"alt="Profile Image" width="100px" />
                    <button className="btn btn-primary d-grid" style={{width:"30px", height:"30px", placeContent:"center"}}><img src={EditIcon} alt="edit" width="20px" height="20px"/></button>
                </div>
                    <h2>Username:</h2>
                    <div className="d-flex w-100 flex-row justify-content-center">
                        <h5>SampleName</h5>
                        <button className="btn btn-primary d-grid" style={{width:"20px", height:"20px", placeContent:"center"}}><img src={EditIcon} alt="edit" width="20px" height="20px"/></button>

                    </div>
                <div>
                    <h2>Profile Bio:</h2>
                    <div className="d-flex w-100 flex-row justify-content-center">
                        <p>Sample Bio Provided Here</p>
                        <button className="btn btn-primary d-grid" style={{width:"20px", height:"20px", placeContent:"center"}}><img src={EditIcon} alt="edit" width="20px" height="20px"/></button>
                    </div>
                </div> 
                    <h2>Profile Options:</h2>
                    <label htmlFor="portfolio-visibility">My Portfolios can be viewed by:</label>
                    <select id="portfolio-visibility"className="form-select w-50" aria-labelledby="portfolio visibility">
                        <option value="">Anyone</option>
                        <option value="Friends">Friends Only</option>
                        <option value="Nobody">Nobody</option>
                    </select>
            </div>

        </div>

    )
}

export default ViewProfile