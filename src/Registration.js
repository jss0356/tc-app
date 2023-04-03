import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './config/firebase'
import userDataService from './services/user.services'

const Registration = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [securityQuestion, setSecurityQuestion] = useState('')
    const [isSecurityQuestionSet, setIsSecurityQuestionSet] = useState(false)
    const [securityAnswer, setSecurityAnswer] = useState('')

    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false)
    
    const [receiveEmailNotifications, setRecieveEmailNotifications] = useState(false)
    
    const addNewUser = async (newUser) => {
        await userDataService.addUser(newUser)
    }



    //on the submission of the registration form, this shall create new user entry in the database.
    const registerNewUser = async (e) => {
        //prevent page reload.
        e.preventDefault()

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user
            console.log(userCredentials)
            
            //successful registration, so add user to db
            const newUser = {
                email,
                securityAnswer,
                securityQuestion,
                username
            }
            
            try{
                await addNewUser(newUser)
                console.log("User successfully added", newUser)
                
                //lastly, set default settings with the initial field of emailNotifications.
                const initialSettings = {
                    userID: auth.currentUser.uid,
                    receiveEmailNotifications
                }
                
                navigate("/register/initial-profile-settings", {state: initialSettings})
                
            }
            catch(err){
                console.log("user was unable to be added to the database.")
            }     
        }
        catch(err){
            console.log(err.message)
        }

    }

    const securityQuestionHandler = (e) => {
        setSecurityQuestion(e.target.value)

        if(e.target.value !== ""){
            setIsSecurityQuestionSet(true)
            return
        }

        setIsSecurityQuestionSet(false)
    }



    return (
        <div id="registration-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="registration-container" className="border rounded d-flex justify-content-center align-items-flex-start w-75 pt-3" style={{ backgroundColor: "#edf5e1", height: "90%"}}>
                <div id="registration-contents" className="h-100 w-75 d-flex flex-column ">
                
                    <h1 className="text-center">Create Account:</h1>
                    <p className="text-center">Sign-up to create trading card portfolios and track their prices:</p>

                    <form onSubmit={registerNewUser}>
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input id="username" type="text" className="form-control mb-3" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                        <label htmlFor="email" className="form-label">Email:</label>
                        <input id="email" type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input id="password" type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} pattern="[a-zA-Z0-9]{6,}" required/>
                        
                        {password.length < 6 ? <p className='text-danger'>Password must be at least 6 characters long.</p> : <></>}

                        <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                        <input id="confirm-password" type="password" className="form-control mb-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        
                        {password !== confirmPassword ? <p className='text-danger'>Passwords must match.</p> : <></>}


                        <select className="form-select mb-2" aria-labelledby="security question" onChange={securityQuestionHandler} required>
                            <option value="">Select Security Question</option>
                            <option>Which city were you born in?</option>
                            <option>What is your mother's maiden name?</option>
                        </select>

                        {isSecurityQuestionSet && 
                        <>
                            <label htmlFor="Answer" className="form-label">Answer:</label>
                            <input id="Answer" type="text" className="form-control mb-2" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required/>
                        </>}


                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="email-notifications" checked={receiveEmailNotifications} onChange={() => setRecieveEmailNotifications(!receiveEmailNotifications)}/>
                            <label className="form-check-label" htmlFor="email-notifications">Recieve Email Notifications</label>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary w-100 mt-2" disabled={ (password !== confirmPassword) || (password.length < 6) }>Sign-Up</button>
                        </div>
                        <hr />
                        <h5 className='text-center'>Already Have An Account? Login Here:</h5>
                        <div className='d-flex flex-column align-items-center w-100'>
                            <Link to="/login"><button type="button" className="btn btn-outline-primary">Login</button></Link>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration