import {useParams} from "react-router-dom"
import DefaultProfile from './logos/default-profile.jpg'
import EditIcon from './logos/EditIcon.png'
import RatingStarFilled from './logos/RatingStarFull.png'
import MainNavbar from "./Rcomponents/MainNavbar"

const User = () =>{
    const {id} = useParams()
    console.log(id)
    return(
        <div id="View-Profile-Outer-Container" className="w-100 h-100 d-flex flex-column align-items-center">
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>

            <div id="view-profile" className="w-75 h-75 p-4" style={{backgroundColor:"#edf5e1"}}>
                <h1 className="text-center">{id}'s profile:</h1>
                <div id="profile-display" className="w-100 h-100 d-flex flex-row">
                        <div id="left-display" className="w-100 h-100 d-flex flex-column align-items-center ">
                                <img src={DefaultProfile} className="border rounded-circle"alt="Profile Image" width="100px" />
                                    <h5 className="pt-3 pb-3">{id}</h5>
                            <div>
                                <h2>Bio:</h2>
                                <div className="d-flex w-100 flex-row justify-content-center">
                                    <p>Sample Bio Provided Here</p>
                                </div>
                                <h3 >User Marketplace Listing Review:</h3>
                                <img className="inline" width="20px" src={RatingStarFilled} alt="" />
                                <img className="inline" width="20px" src={RatingStarFilled} alt="" />
                                <img className="inline" width="20px" src={RatingStarFilled} alt="" />
                                <img className="inline" width="20px" src={RatingStarFilled} alt="" />
                                <img className="inline" width="20px" src={RatingStarFilled} alt="" />

                            </div> 
                        </div>
                        <div id="right-display" className="w-100 h-100 d-flex flex-column align-items-center">
                            <h2>{id}'s Portfolios:</h2>
                                <div className="vstack" style={{height:"90px"}}>
                                    <div className="bg-light border border-1 border-dark text-center">Portfolio-1</div>
                                    <div className="bg-light border border-1 border-dark text-center">Portfolio-2</div>
                                    <div className="bg-light border border-1 border-dark text-center">Portfolio-3</div>
                            <nav className="pt-2" aria-label="...">
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


                                    <h2 className="pt-4 text-center">{id}'s Listings:</h2>
                                    <p className="text-center">Listing # | Product Name | Listing Price | User Review</p>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-1</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>Card-1</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-2</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>Card-2</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$25.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-3</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>Card-1</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/> </div>
                            <nav className="pt-2" aria-label="...">
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
    </div>

    )
}

export default User