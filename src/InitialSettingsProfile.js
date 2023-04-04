import ProfileDefault from './logos/default-profile.jpg'
import {Link, useLocation, useNavigate} from "react-router-dom"
import {useState} from 'react'
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"
import {auth} from './config/firebase'
import {storage} from './config/firebase'

const InitialSettingsProfile = () => {


    const [profileImage, setProfileImage] = useState('')
    const [profileBio, setProfileBio] = useState('')
    const [profileImageDisplay, setProfileImageDisplay] = useState(ProfileDefault)
    const location = useLocation()
    console.log(location.state.id)

    const [currentInitialSettings, setCurrentIntialSettings] = useState(location.state.initialSettings)
    
    //becomes true if attempting to submit the form with an invalid image type.
    const [isInvalidImage, setIsInvalidImage] = useState(true)



    console.log("state retrieved: ", currentInitialSettings)

    const navigate = useNavigate()

    const profileImageHandler = async (e) => {
        setProfileImage(e.target.files[0])
        console.log(e.target.files[0].type)
        
        if(e.target.files[0].type.includes("image/png")){
            setIsInvalidImage(false)
            const imageRef = ref(storage, `images/profilePictures/${auth.currentUser.uid}.png`)
            try{
                await uploadBytes(imageRef, profileImage)
                try{
                    const url = await getDownloadURL(imageRef)
                    setProfileImageDisplay(url)
                }
                catch(err){
                    console.log(err)
                }
                
            }
            catch(err){
                console.log("Couldn't upload profile image to server")
            }
        }

        else if(e.target.files[0].type.includes("image/jpeg")){
            setIsInvalidImage(false)
            const imageRef = ref(storage, `images/profilePictures/${auth.currentUser.uid}.jpg`)
            try{
                await uploadBytes(imageRef, profileImage)
                try{
                    const url = await getDownloadURL(imageRef)
                    setProfileImageDisplay(url)
                }
                catch(err){
                    console.log(err)
                }
            }
            catch(err){
                console.log("Couldn't upload profile image to server")
            }
        }
        else{
            setIsInvalidImage(true)
        }
    }

    const profileBioHandler = (e) => {
        setProfileBio(e.target.value)        
    }


    //valid input entered and changes saved.
    const saveChangesHandler = (e) => {
        e.preventDefault()

        const newInitialSettings = {...currentInitialSettings, profileBio, IsProfileImageSet: true}
        navigate("/register/initial-payment-settings", {state: {newInitialSettings, id: location.state.id}})
    }

    //ignore whatever is in the state variables and set empty values (no changes made to the settings and no profile image uploaded to firebase storage).
    const decideLaterHandler = () => {
        const newInitialSettings = {...currentInitialSettings, IsProfileImageSet: false,  profileBio: ""}
        navigate("/register/initial-payment-settings", {state: {newInitialSettings, id: location.state.id}})
    }

    return (
        <div id="initial-settings-profile-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="initial-settings-profile-contents" style={{backgroundColor: "#edf5e1"}} className="border rounded w-50 h-75 d-flex flex-column justify-content-flex-start align-items-center p-5">
                <h1 className="pb-2">Setup Initial Profile:</h1>
                <p className='text-center'>Choose to customize how your profile will appear to others, or select "decide later" to skip:</p>
                <form>
                    <div className="w-100 h-50 d-flex flex-column">
                        <div id="profile image display" className='d-flex flex-column align-items-center'>
                            <img id="profile-image" className="mb-3 d-block border rounded-circle" src={profileImageDisplay} alt="Profile Image" style={{height:"100px", width: "100px"}}/>
                            <input className="form-control" type="file" id="profile-image" onChange={profileImageHandler}/>
                            {isInvalidImage && <p className='text-danger'>Invalid image type, only png/jpeg supported.</p>}
                        </div>
                        <div id="profile description" className='mt-4'>
                            <div>
                                <label htmlFor="profile-bio" className='d-block'>Bio (200 character limit):</label>
                                <textarea className='d-block w-100' style={{maxHeight:"130px"}} name="profile bio" id="profile-bio" onChange={profileBioHandler}></textarea>
                                {profileBio.length <= 200 ? <p className='text-success'>{`Current Character Count: ${profileBio.length}`}</p>:<p className='text-danger'>{`Current Character Count: ${profileBio.length}`}</p>}
                            </div>
                        </div>
                        <button className='btn btn-primary mt-5 mb-3' disabled={isInvalidImage || profileBio.length > 200} onClick={saveChangesHandler}>Save Changes and Continue</button>
                    </div>  
                </form>

                <button className='btn btn-link' onClick={decideLaterHandler}>Decide Later</button>

            </div>            
        </div>
    )
}
export default InitialSettingsProfile