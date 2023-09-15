import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import WebLogo from './Rcomponents/WebLogo'
import {auth, firestore} from './config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithGoogle } from './config/firebase'

import {query, where, collection, getDocs, setDoc} from 'firebase/firestore'

import userService from './services/user.services'

import './signInButton.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log("before:", auth)
    const navigate = useNavigate()

    const LoginHandler = async (e) => {
        e.preventDefault()
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log("after:", auth)

            navigate("/home")
        }
        catch(err){
            console.log("Error logging in, incorrect username or password.")
        }
    }

    //sign in using google with a popup, store results of current authenticated user in database.
    const googleSignInHandler = async () => {
        const result = await signInWithGoogle()
        console.log(result)
        console.log(auth)
        const name = result.user.displayName
        const email = result.user.email
        const profilePic = result.user.photoURL

        const usersRef = collection(firestore, '/users')        
        console.log(usersRef)
        const q = query(usersRef, where("email", "==", email))
        
        try{
            

            const resultDoc = await getDocs(q)
            const fullCollection = await getDocs(usersRef)
            if(resultDoc._snapshot.docs.size == 0 || fullCollection.empty){
                const userDocToAdd = {username: name, email, authenticationMethod: "google"}
                try{
                    const userRef = await userService.addUser(userDocToAdd)
                    setDoc(userRef, {userID: userRef.id}, {merge: true})
                    userService.initializeUserSettings(userRef.id, email)

                }catch(err){
                    console.log("Unable to add new user data to database.")
                }

            }
        }catch(err){
            console.log("Unable to determine if user data already exists.")
        }
    

        navigate("/home")
    }
    return (
        <div id="login-display" className="d-flex justify-content-center align-items-center h-100 w-100">
            <div id="login-container" className="border d-flex rounded justify-content-center align-items-flex-start w-75 h-75 pt-5" style={{ backgroundColor: "#edf5e1"}}>
                <div id="login-container-contents" className="h-100 w-75 ">
                    <header id="login-header">
                        <div className="d-flex justify-content-center pb-4">
                            <WebLogo/>
                        </div>
                        <h1 className='text-center'>Sign-In:</h1>
                    </header>

                    <form onSubmit={LoginHandler}>
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input id="email" type="email" className="form-control mb-5" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input id="password" type="password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        
                        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                            <Link to="/reset" className='mb-4'>Reset Password</Link>

                            <button type="button" className="btn btn-primary mb-5" style={
                                {
                                    padding: "12px 16px 12px 42px",
                                    border: "none",
                                    borderRadius: "3px",
                                    boxShadow: "0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25)",
                                    color: "#757575",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                                    backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)",
                                    backgroundColor: "white",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "12px 11px"
                                }} onClick={googleSignInHandler}>Sign-In With Google</button>

                            <button className="btn btn-primary">Login</button>
                        </div>
                        
                        <hr />
                        <h5 className='text-center'>First Time Using TCM? Register Here:</h5>
                        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                            <Link to="/register"><button type="button" className="btn btn-outline-primary mt-2">Register</button></Link>

                        </div>
                        
                    </form>
                </div>
        
            </div>
        </div>
    )
}


export default Login