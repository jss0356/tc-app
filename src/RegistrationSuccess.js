import { LinkContainer } from "react-router-bootstrap"

const RegistrationSuccess = () => {
    return (

        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light text-center">Your registration was successful and your initial settings were saved!</h1>
            <LinkContainer to="/login"><button className="btn btn-primary">Back to Login</button></LinkContainer>

        </div>

    )

}

export default RegistrationSuccess