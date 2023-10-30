import {useParams} from 'react-router-dom'
import {useState, useContext} from 'react'
import MainNavbar from './Rcomponents/MainNavbar'
import LineGraph from './Rcomponents/LineGraph'
import SearchIcon from './logos/SearchIcon.png'
import AddIcon from './logos/Add-Icon.png'
import { LinkContainer } from 'react-router-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import CalculateGradeForm from './CalculateGradeForm'
import userService from './services/user.services'
import ChooseCardUpload from './ChooseCardUpload'
import { CardContext } from './app/CardProvider'

import { auth} from './config/firebase'
import {collection, 
    addDoc,
    doc
} from "firebase/firestore"

const Portfolio = () =>{

    const[selectedGraded, setSelectedGraded] = useState();
    const {
        grade, setGrade,
        id, setID
    } = useContext(CardContext)

    const changeID = (value) => {
        setID(value)
    }

    const DisplayForm = (props) => {
        if(props.graded === "Yes") {
            return(

                <div>
                    <select className="form-select custom-select mb-2" value={grade} onChange={e => setGrade(e.target.value)}>
                        <option value="-">Select a Grade:</option>
                        <option value="N0">N0</option>
                        <option value="PR 1">PR 1</option>
                        <option value="FR 1.5">FR 1.5</option>
                        <option value="GOOD 2">GOOD 2</option>
                        <option value="VG 3">VG 3</option>
                        <option value="VG-EX 4">VG-EX 4</option>
                        <option value="EX 5">EX 5</option>
                        <option value="EX-MT 6">EX-MT 6</option>
                        <option value="NM 7">NM 7</option>
                        <option value="NM-MT 8">NM-MT 8</option>
                        <option value="MINT 9">MINT 9</option>
                        <option value="GEM-MT 10">GEM-MT 10</option>
                    </select>
                    {<p> Grade: {grade}</p>}
                </div>

            )
        } else if (props.graded === "No") {
            return (
                <CalculateGradeForm />
            )
        }
    }

    const {portfolioID, name} = useParams()

    const uploadCard = async () => {
         
        if (grade !== '-' && id !== 'none') {
            console.log(portfolioID)
            const userID = await userService.getUserID(auth.currentUser.email)
            console.log(userID)
            const portfolioRef = await userService.getPortfolio(userID, portfolioID)
            console.log(portfolioRef)
            const cardRef = collection(portfolioRef, "cards")
            console.log(grade, id)
            addDoc(cardRef, {
                grade,
                id
            })
            handleClose()
            setID("none")
            setGrade("-")
        } else {
            alert("Grade or Card must be selected")
        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uploadCardModal =  <div id="add-portfolio-modal">
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Upload Card To Portfolio:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <form>

            <label htmlFor="add-portfolio-title">Card Name:</label>
            <ChooseCardUpload changeID={changeID}/>

            <select className="form-select mb-2" aria-labelledby="Select card genre" value={selectedGraded} onChange={e => setSelectedGraded(e.target.value)}>
                <option value="">Do you know the PSA grade?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
            </select>

            <DisplayForm graded = {selectedGraded}/>

            <div className="form-group">
                <label htmlFor="card-description">Card Description</label>
                <textarea className="form-control" id="card-description" rows="3"></textarea>
            </div>
            {<p> Grade: {grade}</p>}
        </form>



    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={uploadCard}>
        Upload
        </Button>
    </Modal.Footer>
    </Modal>
</div>



    return(
        <div id="container-portfolio" className='h-100 w-100 d-flex flex-column'>
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>

            {uploadCardModal}

            <div id="portfolio-contents-container" className="w-100 d-flex flex-column" style={{backgroundColor: "#edf5e1"}} >
                
                <div className='w-100 d-flex flex-row gap-3'>
                    
                    <button id="uploadToPortfolio" className='btn d-grid' onClick={handleShow} style={{width:"30px", height:"30px", placeContent:"center"}}><img src={AddIcon} alt="Add" width="30px"/></button>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="sortIntoSections"/>
                        <label className="form-check-label" htmlFor="sortIntoSections">Sort Into Sections</label>
                    </div>
                </div>


                <h1 className='text-center d-inline'>Portfolio {name} details:</h1>
                <hr />

                <div id="inner-display" className='w-100 h-100 d-flex flex-row'>
                    <div id="left-display" className='w-100 h-100'>
                    <div id="portfolio-stats" className=''>
                    <LineGraph/> 
                            <div id="text-stats" className='ms-3'>
                                <h3 className='text-center'>Portfolio Stats:</h3>
                                <h5 className='d-inline'>Current Estimated Market Value:</h5>
                                <h2 className='d-inline'> 50$</h2>
                                <br />
                                <br />
                                <h5 className='d-inline'>Total Item Count:</h5>
                                <h5 className='d-inline'> 3</h5>
                                <br />
                                <br />
                                <h5 className='d-inline'>Change in Price in the Last Year: </h5>
                                <h5 className='d-inline text-success'>+$5.00</h5>
                                <br />
                                <br />
                                <h5 className='d-inline'>Change in Price in the Last 6 months: </h5>
                                <h5 className='d-inline text-success'>+$2.00</h5>
                                <br />
                                <br />
                                <h5 className='d-inline'>Change in Price in the Last 3 months: </h5>
                                <h5 className='d-inline'>$0.00</h5>
                                <br />
                                <br />
                                <h5 className='d-inline'>Change in Price in the Last month: </h5>
                                <h5 className='d-inline text-danger'>-$2.00</h5>

                            </div>
                        </div>

                    </div>
                    <div id="right-display" className='h-100 w-100 ms-3 d-flex flex-column align-items-center justify-content-center'>
                        
                    <div className='vstack w-75 gap-0'>
                    <h3 className='text-center'>Portfolio Contents:</h3>

                    <h4 className='text-center'>Basketball:</h4>
                    <div className="input-group m-0 w-100">
                    <input type="text" className="form-control" style={{height:"30px"}} placeholder="Filter by Card-Name" aria-label="card-name"/>
                        <span className="input-group-text"><button className='btn d-grid' style={{height:"15px", placeContent:"center"}} ><img src={SearchIcon} height="20px" alt="" /></button></span>
                    </div>

                        <LinkContainer to="/my-account/my-portfolios/1/1"><p className='border border-dark text-center bg-light m-0'> <span className='d-inline p-2'>Card 1</span> <span className='d-inline'>$1.67 </span> <span className='d-inline text-success'>+$1.00(Past Year)</span> </p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/2"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 2</span> <span className='d-inline'>$1.67 </span> <span className='d-inline'>+$0.00(Past Year)</span></p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/3"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 3</span> <span className='d-inline'>$1.67 </span> <span className='d-inline text-danger'>-$1.00(Past Year)</span></p></LinkContainer>
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
            </div>
        </div>        
    )
}

export default Portfolio