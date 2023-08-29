import {useParams} from 'react-router-dom'
import MainNavbar from './Rcomponents/MainNavbar'
import MarketplaceIcon from './logos/MarketplaceUploadIcon.png'
import CardExample from './image/football/card1.jpg'
import ShadedLineGraph from './image/ShadedLineGraph.png'
import EditIcon from './logos/EditIcon.png'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import {useState} from 'react'
import LineGraph from './Rcomponents/LineGraph'

const PortfolioItem = () =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const PortfolioToMarketplaceModal =  <div id="add-marketplace-modal">
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Place Card on Marketplace:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
        <form>
            <div className="w-100 d-flex flex-row justify-content-center">
                <img src={CardExample} alt="Card Image" className='border rounded' width="150px"/>
            </div>

            <label htmlFor="cardName">Card Name:</label>
            <input className="form-control mb-2" type="text" id="cardName" placeholder='Lionel Messi' disabled/>

            <label htmlFor="cardGenre">Card Genre:</label>
            <input className="form-control mb-2" type="text" id="cardGenre" placeholder='Football' disabled/>

            <label htmlFor="qualityPSA">PSA-Grade Quality:</label>
            <input className="form-control mb-2" type="text" id="qualityPSA" placeholder='PSA-9' disabled/>

            <select className="form-select" aria-labelledby="auction-or-sell">
                        <option value="">Auction or Sell?</option>
                        <option value="Auction">Auction</option>
                        <option value="Sell">Sell</option>
            </select>

            <div className="w-100 d-flex flex-row">
                <div id="left-side">
                    <label htmlFor="listing-price">Listing Price:</label>
                    <input className="form-control mb-2" type="text" id="listing-price" placeholder='' />
                </div>
                <div id="right-side" className='ms-5'>
                    <h4 className='d-inline'>Current Market Price: </h4>
                    <h2 className='d-inline'>$50.00</h2>
                </div>
            </div>

            <p className='text-center'>Your listing will be listing #22, go to Account Settings  -&gt; My Listings to view and/or manage all listings. </p>


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





    const {cardID} = useParams()
    return(

        <div id="container-portfolio-item" className='h-100 w-100 d-flex flex-column'>
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>
            <div id="portfolio-item-contents-container" className="w-100 d-flex flex-column" style={{backgroundColor: "#edf5e1"}} >  
                {PortfolioToMarketplaceModal}

                    <button id="placeOnMarketplace" className='btn btn-light border border-dark d-grid' onClick={() => {setShow(true)}}style={{width:"30px", height:"30px", placeContent:"center"}}><img src={MarketplaceIcon} alt="Add" width="30px"/></button>



                    <h1 className='text-center'>Card details:</h1>
                    <hr />

                    <div id="item-header" className='d-flex flex-column w-100 align-items-center'>
                        <img src={CardExample} alt="Card Image" className='border rounded' width="150px"/>


                    </div>
                    <div id="content-display" className='d-flex w-100 h-100 flex-row'>
                        <div id="left-display" className="h-100 w-100">
                            <div id="card-stats">
                                <LineGraph/>
                                <div id="text-price-stats" className='ms-3'>
                                    <h3 className='text-center'>Card Price Stats:</h3>
                                    <h5 className='d-inline'>Current Estimated Market Value:</h5>
                                    <h2 className='d-inline'> 50$</h2>
                                    <br />
                                    <br />
                                    <h5 className='d-inline'>Change in Price in the Last Year: </h5>
                                    <h5 className='d-inline text-success'>+$5.00</h5>
                                    <br />
                                    <h5 className='d-inline'>Change in Price in the Last 6 months: </h5>
                                    <h5 className='d-inline text-success'>+$2.00</h5>
                                    <br />
                                    <h5 className='d-inline'>Change in Price in the Last 3 months: </h5>
                                    <h5 className='d-inline'>$0.00</h5>
                                    <br />
                                    <h5 className='d-inline'>Change in Price in the Last month: </h5>
                                    <h5 className='d-inline text-danger'>-$2.00</h5>

                                </div>
                            </div>

                        </div>
                        <div id="right-display" className="h-100 w-100 d-flex flex-column justify-content-center">
                            <div id="general-stats">
                            <h3 className='text-center'>Card General Stats:</h3>
                            
                            <h5 className='d-inline'>Card Name: </h5>
                            <h5 className='d-inline'>Lionel Messi</h5>
                            <br />
                            <br />
                            
                            <h5 className='d-inline'>Card PSA Quality:</h5>
                            <h4 className='d-inline'> PSA-9</h4>
                            <br />
                            <br />

                            <h5 className='d-inline'>Located in Portfolio: </h5>
                            <h5 className='d-inline'>"Portfolio-1"</h5>
                            <div className='d-inline'>
                                <button className="btn btn-primary d-grid" style={{width:"20px", height:"20px", placeContent:"center"}}><img src={EditIcon} alt="edit" width="20px" height="20px"/></button>
                            </div>
                            <br />
                            <br />

                            <h5 className='d-inline'>Card Description:</h5>
                            <p className=''>Card Description goes here</p>
                            </div>

                        </div>
                    </div>

                </div>
        </div>


    )
}


export default PortfolioItem