import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logos/Logo.png"
import DefaultProfile from "../logos/default-profile.jpg"
import SearchIcon from "../logos/SearchIcon.png"
import FilterIcon from "../logos/FilterIcon.png"
import ShoppingCartIcon from "../logos/ShoppingCartIcon.png"
import {auth} from "../config/firebase"
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { MarketplaceContext } from '../app/MarketplaceProvider';


const MainNavbarMarketplace = () => {
    const navigate = useNavigate()

    const {search, setSearch, cartCount} = useContext(MarketplaceContext)

    console.log(cartCount)

    const cartCountElement = <div style={{position: "absolute",width: "30%",height: "40%", borderRadius: "50%", background: "red", top:"0%", right: "10%", fontWeight: "bold", display: "grid", placeContent: "center", color: "white", transform: "scale(0.7)"}}>{cartCount}</div>

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
             <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
             <LinkContainer to="/marketplace"><Nav.Link>Marketplace</Nav.Link></LinkContainer>


             <div className="input-group  w-50" style={{position:"absolute", right:"300px"}}>
                    <select className="form-select w-25" style={{maxWidth:"150px"}}aria-labelledby="sort-showcase-by">
                        <option value="">All Genres:</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Baseball">Baseball</option>

                    </select>
                    <input type="text" style={{width:"200px"}} className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Product Name" aria-label="product-name"/>
                    <LinkContainer to="/marketplace/search-results"><span className="input-group-text"><button className='btn d-grid' style={{placeContent:"center", height:"30px"}}><img src={SearchIcon} width="30px" alt="search"/></button></span></LinkContainer>

                    <div style={{position: "relative"}}>
                        <LinkContainer to="/marketplace/cart"><button className='btn d-grid' style={{placeContent:"center", height:"30px"}}>
                        {cartCount > 0 && cartCountElement}

                        <img src={ShoppingCartIcon} width="30px" alt="search"/></button></LinkContainer>
                    </div>
                </div>
            <button className='btn' style={{position:"absolute", right:"1250px"}}><img src={FilterIcon} alt="filter" width="30px"/></button>

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

export default MainNavbarMarketplace
