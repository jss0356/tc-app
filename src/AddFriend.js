import MainNavbar from "./Rcomponents/MainNavbar"
import SearchIcon from "./logos/SearchIcon.png"
import { LinkContainer } from "react-router-bootstrap"

const AddFriend = () => {

    return (
        <div id="Add-Friends-Container" className='w-100 h-100 d-flex flex-column'>
            <div id="main-nav">
                <MainNavbar/>

            </div>
            <div id="sub-nav" className="w-100 d-flex align-items-center justify-content-center gap-2" style={{position:"sticky",top:"80px", height:"5%", backgroundColor:"#edf5e1", marginBottom:"130px"}}>
                    <LinkContainer to="/my-account/my-friends"><a href="#" className='text-decoration-none text-secondary'>My Friends</a></LinkContainer>
                    <LinkContainer to="/my-account/add-friend"><a href="#" className='text-decoration-none text-secondary'>Add Friend</a></LinkContainer>
            </div>


            <div id= "add-friend-container" className="w-75 h-75 d-flex flex-column align-items-center" style={{backgroundColor:"#edf5e1", marginLeft:"130px"}}>
                <div className="input-group mb-3 mt-2 w-75">
                    <input type="text" className="form-control" placeholder="Search by Username" aria-label="Username"/>
                    <span className="input-group-text"><button><img src={SearchIcon} width="30px" alt="search"/></button></span>
                </div>
                <p>Search Results:</p>
                <div id="search-results" className="w-75 h-100 border border-dark" style={{backgroundColor:"white"}}></div>
            </div>
        
        </div>
        )
}

export default AddFriend