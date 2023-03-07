import ProfileDefault from './logos/default-profile.jpg'
import {Link} from "react-router-dom"

const InitialSettingsProfile = () => {
    return (
        <div id="initial-settings-profile-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="initial-settings-profile-contents" style={{backgroundColor: "#edf5e1"}} className="border rounded w-50 h-75 d-flex flex-column justify-content-flex-start align-items-center p-5">
                <h1 className="pb-2">Setup Initial Profile:</h1>
                <p className='text-center'>Choose to customize how your profile will appear to others, or select "decide later" to skip:</p>
                <div className="w-100 h-50 d-flex flex-column">
                    <div id="profile image display" className='d-flex flex-column align-items-center'>
                        <img id="profile-image" className="mb-3 d-block border rounded-circle" src={ProfileDefault} alt="Profile Image" style={{maxHeight:"100px", maxWidth: "100px"}}/>
                        <button>Upload Profile Image</button>
                    </div>
                    <div id="profile description" className='mt-5'>
                        <form>
                            <label htmlFor="profile-bio" className='d-block'>Bio (200 character limit):</label>
                            <textarea className='d-block w-100 h-100' name="profile bio" id="profile-bio"></textarea>
                        </form>
                    </div>
                </div>
                <Link to="/register/initial-payment-settings" className='mb-5'><button className='btn btn-primary'>Save Changes and Continue</button></Link>
                <Link to="/register/initial-payment-settings">Decide Later</Link>

            </div>            
        </div>
    )
}
export default InitialSettingsProfile