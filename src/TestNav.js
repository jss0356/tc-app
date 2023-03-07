import {Link} from 'react-router-dom'

const TestNav = () => {
    return(
        <nav>
            <h1>Screens:</h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">TestNav</Link></li>
                <li><Link to="/register">Registration</Link></li>
                <li><Link to="/reset">Reset Password</Link></li>
                <li><Link to="/home">Home</Link></li>
            </ul>
        </nav>
    )
}

export default TestNav