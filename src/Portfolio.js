import {useParams} from 'react-router-dom'
import {useState} from 'react'
import MainNavbar from './Rcomponents/MainNavbar'
import ShadedLineGraph from './image/ShadedLineGraph.png'
import SearchIcon from './logos/SearchIcon.png'
import AddIcon from './logos/Add-Icon.png'
import { LinkContainer } from 'react-router-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"

const Portfolio = () =>{

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
            <div className="form-group mb-2">
                <label htmlFor="uploadCardImage">Upload card image:</label>
                <input type="file" className="form-control-file d-block" id="uploadCardImage"/>
            </div>


            <label htmlFor="add-portfolio-title">Card Name:</label>
            <input className="form-control mb-2" type="text" id="add-portfolio-title"/>

            <select className="form-select mb-2" aria-labelledby="Select card genre">
                <option value="">Select Card Genre/Section:</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
            </select>

            <select className="form-select mb-2" aria-labelledby="Select card genre">
                <option value="">Do you know the PSA grade?</option>
                    <option value="Baseball">Yes</option>
                    <option value="Football">No</option>
            </select>



            <select class="form-select custom-select">
                <option value="">Set the PSA-Grade For the Card:</option>
                <option value="1">PSA-1</option>
                <option value="2">PSA-2</option>
                <option value="3">PSA-3</option>
                <option value="4">PSA-4</option>
                <option value="5">PSA-5</option>
                <option value="6">PSA-6</option>
                <option value="7">PSA-7</option>
                <option value="8">PSA-8</option>
                <option value="9">PSA-9</option>
                <option value="10">PSA-10</option>
            </select>


            <div className="form-group">
                <label htmlFor="card-description">Card Description</label>
                <textarea className="form-control" id="card-description" rows="3"></textarea>
            </div>



        </form>



    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
        </Button>
    </Modal.Footer>
    </Modal>
</div>





    const {portfolioID} = useParams()

    return(
        <div id="container-portfolio" className='h-100 w-100 d-flex flex-column'>
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>

            {uploadCardModal}

            <div id="portfolio-contents-container" className="h-100 w-100 d-flex flex-column" style={{backgroundColor: "#edf5e1"}} >
                
                <div className='w-100 d-flex flex-row gap-3'>
                    <button id="uploadToPortfolio" className='btn d-grid' onClick={handleShow} style={{width:"30px", height:"30px", placeContent:"center"}}><img src={AddIcon} alt="Add" width="30px"/></button>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="sortIntoSections"/>
                        <label className="form-check-label" htmlFor="sortIntoSections">Sort Into Sections</label>
                    </div>
                </div>


                <h1 className='text-center d-inline'>Portfolio {portfolioID} details:</h1>
                <hr />

                <div id="inner-display" className='w-100 h-100 d-flex flex-row'>
                    <div id="left-display" className=''>
                    <div id="portfolio-stats">
                                <img src={ShadedLineGraph} alt="Shaded Line Graph" width="500px"/>                        
                                <div className='input-group mb-3 h-100 w-100  d-flex flex-row justify-content-center'>
                                    <button className='btn btn-primary border border-dark'>1m</button>
                                    <button className='btn btn-primary border border-dark'>3m</button>
                                    <button className='btn btn-primary border border-dark'>6m</button>
                                    <button className='btn btn-primary border border-dark active'>1y</button>

                                </div>
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

                        <h4 className='text-center'>Football:</h4>

                        <div className="input-group m-0 w-100">
                        <input type="text" className="form-control" style={{height:"30px"}} placeholder="Filter by Card-Name" aria-label="card-name"/>
                            <span className="input-group-text"><button className='btn d-grid' style={{height:"15px", placeContent:"center"}} ><img src={SearchIcon} height="20px" alt="" /></button></span>
                        </div>

                        <LinkContainer to="/my-account/my-portfolios/1/4"><p className='border border-dark text-center bg-light m-0'> <span className='d-inline p-2'>Card 4</span> <span className='d-inline'>$5.00 </span> <span className='d-inline text-success'>+$1.00(Past Year)</span> </p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/5"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 5</span>  <span className='d-inline'>$5.00 </span> <span className='d-inline'>+$0.00(Past Year)</span></p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/6"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 6</span> <span className='d-inline'>$5.00 </span> <span className='d-inline text-danger'>-$1.00(Past Year)</span></p></LinkContainer>
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


                        <h4 className='text-center'>Baseball:</h4>
                        <div className="input-group m-0 w-100">
                        <input type="text" className="form-control" style={{height:"30px"}} placeholder="Filter by Card-Name" aria-label="card-name"/>
                            <span className="input-group-text"><button className='btn d-grid' style={{height:"15px", placeContent:"center"}} ><img src={SearchIcon} height="20px" alt="" /></button></span>
                        </div>
                        <LinkContainer to="/my-account/my-portfolios/1/7"><p className='border border-dark text-center bg-light m-0'> <span className='d-inline p-2'>Card 7</span> <span className='d-inline'>$10.00 </span>  <span className='d-inline text-success'>+$1.00(Past Year)</span> </p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/8"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 8</span> <span className='d-inline'>$10.00 </span> <span className='d-inline'>+$0.00(Past Year)</span></p></LinkContainer>
                        <LinkContainer to="/my-account/my-portfolios/1/9"><p className='border border-dark text-center bg-light m-0'><span className='d-inline p-2'>Card 9</span> <span className='d-inline'>$10.00 </span> <span className='d-inline text-danger'>-$1.00(Past Year)</span></p></LinkContainer>
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