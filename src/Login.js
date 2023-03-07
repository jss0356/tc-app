import {Link} from 'react-router-dom'
import WebLogo from './Rcomponents/WebLogo'
const Login = () => {
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

                    <form>
                        <label htmlFor="username/email" className="form-label">Username/Email:</label>
                        <input id="username/email" type="text" className="form-control mb-5"/>
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input id="password" type="password" className="form-control mb-3"/>
                        
                        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                            <Link to="/reset" className='mb-4'>Reset Password</Link>


                            
                      
                                <Link to="/home"><button className="btn btn-primary mb-5">Sign-In With Google</button></Link>

                         
                            <Link to="/home"><button className="btn btn-primary">Login</button></Link>
                        </div>
                        
                        <hr />
                        <h5 className='text-center'>First Time Using TCM? Register Here:</h5>
                        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                            <Link to="/register"><button className="btn btn-outline-primary mt-2">Register</button></Link>

                        </div>
                        
                    </form>
                </div>
        
            </div>
        </div>
    )
}


export default Login