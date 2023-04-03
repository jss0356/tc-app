import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logos/Logo.png"
import DefaultProfile from "../logos/default-profile.jpg"
import {auth} from "../config/firebase"
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const MainNavbarAdminHomepage = () => {
    
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try{
            await signOut(auth)
            console.log("signed out")
            navigate("/login")    
        }
        catch(err){
            console.log("unable to sign out")
        }
        
    }

    
    
    return (
        <>
        <Navbar fixed="top" style={{backgroundColor: "#edf5e1"}} expand="md">
         <Navbar.Brand><img src={Logo} alt="trading card manager logo" width="40%"/> TCM</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
             <LinkContainer to="/home-admin"><Nav.Link>Home</Nav.Link></LinkContainer>
             <LinkContainer to="/marketplace"><Nav.Link>Marketplace</Nav.Link></LinkContainer>
             <LinkContainer to="/manage-data-admin"><Nav.Link>Manage</Nav.Link></LinkContainer>
             <NavDropdown style={{position: "absolute", right: "70px", top: "1px"}} title={<img className="border rounded-circle"src={DefaultProfile} alt="profile picture" width="60px"></img>} id="basic-nav-dropdown">
             <LinkContainer to="/my-account/account-settings"><NavDropdown.Item >
                 Account Settings
             </NavDropdown.Item></LinkContainer>
             <NavDropdown.Divider />
             <NavDropdown.Item onClick={logoutHandler}>
                 Logout
             </NavDropdown.Item>

             </NavDropdown>
         </Nav>
         </Navbar.Collapse>
     </Navbar>
   </>
    )
}

export default MainNavbarAdminHomepage