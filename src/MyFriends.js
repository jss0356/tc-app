import MainNavbar from './Rcomponents/MainNavbar';
import { LinkContainer } from 'react-router-bootstrap';
import DefaultProfile from "./logos/default-profile.jpg"

const MyFriends = () => {

    return (
        <>
            <div id="My-Friends-Container" className='w-100 h-100 d-flex flex-column'>
                <MainNavbar/>
                <div id="sub-nav" className="w-100 d-flex align-items-center justify-content-center gap-2" style={{position:"sticky", top:"80px", height:"5%", backgroundColor:"#edf5e1"}}>
                    <LinkContainer to="/my-account/my-friends"><a href="#" className='text-decoration-none text-secondary'>My Friends</a></LinkContainer>
                    <LinkContainer to="/my-account/add-friend"><a href="#" className='text-decoration-none text-secondary'>Add Friend</a></LinkContainer>
                </div>
                <div className="w-100 h-100 d-flex justify-content-center">
                    <div id="friends-list-container" className='h-75 w-75 border rounded' style={{backgroundColor:"#edf5e1", marginTop:"200px"}} >
                        <h1 className='text-center'>All Friends</h1>
                        <div className="vstack p-3 gap-1 w-100">
                            <LinkContainer to="/user/friend-1">
                                <div className="bg-light border border-dark d-flex flex-row gap-2">
                                    <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
                                    <p>Friend-1</p>
                                </div>
                            </LinkContainer>

                            <LinkContainer to="/user/friend-2">
                                <div className="bg-light border border-dark d-flex flex-row gap-2">
                                    <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
                                    <p>Friend-2</p>
                                </div>
                            </LinkContainer>

                            <LinkContainer to="/user/friend-3">
                                <div className="bg-light border border-dark d-flex flex-row gap-2">
                                    <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
                                    <p>Friend-3</p>
                                </div>
                            </LinkContainer>                                                
                        </div>
                        <div className='d-flex flex-row h-100 w-100 justify-content-center'>
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#">2 </a>
                                    </li>
                                    <li className="page-item disabled"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default MyFriends