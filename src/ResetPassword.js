import {Link, useNavigate} from "react-router-dom"
import {useState} from 'react'
import {collection, query, where, getDocs} from 'firebase/firestore'
import {firestore} from "./config/firebase"
import {auth} from "./config/firebase"
import {sendPasswordResetEmail} from "firebase/auth"

const ResetPassword = () =>{

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    
    const [securityQuestion, setSecurityQuestion] = useState('')
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [isSecurityAnswerValid, setIsSecurityAnswerValid] = useState(false)


    const determineIfValidEmail = async (emailToMatch) => {
        const usersRef = collection(firestore, "users")
        const queryResult = query(usersRef, where("email", "==", emailToMatch))
        
        try{
            const returnedDoc = await getDocs(queryResult)

            if(returnedDoc._snapshot.docs.size === 0){
                setIsEmailValid(false)
            }
            else{
                console.log(returnedDoc._snapshot.docChanges[0].doc.data.value.mapValue.fields.securityQuestion.stringValue)
                setIsEmailValid(true)
                setSecurityQuestion(returnedDoc._snapshot.docChanges[0].doc.data.value.mapValue.fields.securityQuestion.stringValue)
            }
    
        }
        catch(err){
            console.log("error obtaining document reference from users")
        }
    }

    const determineIfValidSecurityAnswer = async (providedAnswer) => {
        const usersRef = collection(firestore, "users")
        const queryResult = query(usersRef, where("email", "==", email), where("securityAnswer", "==", providedAnswer))

        try{
            const returnedDoc = await getDocs(queryResult)

            if(returnedDoc._snapshot.docs.size === 0){
                setIsSecurityAnswerValid(false)
            }
            else{
                setIsSecurityAnswerValid(true)
            }
    
        }
        catch(err){
            console.log("error obtaining document reference from users")
        }



    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
        determineIfValidEmail(e.target.value)
    }

    const securityAnswerHandler = (e) => {
        setSecurityAnswer(e.target.value)
        determineIfValidSecurityAnswer(e.target.value)
    }

    const resetPasswordHandler = async () => {
            try{
                await sendPasswordResetEmail(auth, email)
                console.log("reset request sent successfully")
                navigate("/reset/request-sent", {state: email})
    
            }
            catch(err){
                console.log("Error with sending password reset request.")
            }
    }

    return (
        <div id="reset-password-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="reset-password-container" className="border d-flex rounded flex-column justify-content-center align-items-center w-75 h-50 pt-5 ps-5" style={{ backgroundColor: "#edf5e1"}}>
                <div id="reset-password-container-contents" className="h-100 w-75 d-flex flex-column">
                    <h1 className="text-center">Reset Password:</h1>
                    <p className="text-center">Enter email associated with account and then answer associated security question:</p>
                    <div id="reset-password-form">
                        <form>
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input id="email" type="email" className="form-control mb-2" value={email} onChange={emailHandler}/>
                            {!isEmailValid && <p className="text-danger">Please enter an existing account's email.</p>}
                            {isEmailValid && <><label htmlFor="security-answer" className="form-label">{securityQuestion}</label>
                            <input id="security-answer" type="text" className="form-control mb-4" value={securityAnswer} onChange={securityAnswerHandler}/></>}
                            <div className="d-flex flex-row w-100 justify-content-center">
                                <button type="button" className="btn btn-primary w-50 mt-2" disabled={!isSecurityAnswerValid || !isEmailValid} onClick={resetPasswordHandler}>Reset Password</button>
                            </div>

                        </form>
                        <div className="d-flex justify-content-center w-100 pt-5">
                            <Link to="/">Back to login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword