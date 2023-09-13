import {Link} from "react-router-dom"
import Error404 from "./logos/Error404.png"
const NotFound = () =>{
    return(
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <img src={Error404} alt="Error-404 Icon"/>
            <h2 className="text-danger">Page Not Found </h2>
            <Link to="/home"><button className="btn btn-primary">Back to Home</button></Link>
        </div>
    )
}


export default NotFound