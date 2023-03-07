import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logos/Logo.png"
import DefaultProfile from "../logos/default-profile.jpg"

const MainNavbarAdminHomepage = () => {
    return (
        <>
        <Navbar fixed="top" style={{backgroundColor: "#edf5e1"}} expand="md">
         <Navbar.Brand><img src={Logo} alt="trading card manager logo" width="40%"/> TCM</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
             <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
             <LinkContainer to="/marketplace"><Nav.Link>Marketplace</Nav.Link></LinkContainer>
             <NavDropdown style={{position: "absolute", right: "70px", top: "1px"}} title={<img className="border rounded-circle"src={DefaultProfile} alt="profile picture" width="60px"></img>} id="basic-nav-dropdown">
             <LinkContainer to="/my-account/my-friends"><NavDropdown.Item >
                 My Friends
             </NavDropdown.Item></LinkContainer>
             <LinkContainer to="/my-account/my-portfolios"><NavDropdown.Item >
                 My Portfolios
             </NavDropdown.Item></LinkContainer>
             <LinkContainer to="/my-account"><NavDropdown.Item >
                 View Profile
             </NavDropdown.Item></LinkContainer>
             <NavDropdown.Divider />
             <LinkContainer to="/my-account/account-settings"><NavDropdown.Item >
                 Account Settings
             </NavDropdown.Item></LinkContainer>
             </NavDropdown>
         </Nav>
         </Navbar.Collapse>
     </Navbar>
   </>
    )
}

export default MainNavbarAdminHomepage