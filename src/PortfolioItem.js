import {useNavigate, useParams} from 'react-router-dom'
import MainNavbar from './Rcomponents/MainNavbar'
import MarketplaceIcon from './logos/MarketplaceUploadIcon.png'
import CardExample from './image/football/card1.jpg'
import ShadedLineGraph from './image/ShadedLineGraph.png'
import EditIcon from './logos/EditIcon.png'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import {useEffect, useState} from 'react'
import LineGraph from './Rcomponents/LineGraph'
import userServices from './services/user.services'
import { firestore, auth } from './config/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Spinner } from 'react-bootstrap'
import ListingsDataService from './services/listings.services'
import pokemonTypes from "./constants/pokemonTypes";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  import { Bar } from "react-chartjs-2";
  
  import AsyncSelect from 'react-select/async'


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const PortfolioItem = () =>{
    const {cardID, portfolioID} = useParams()

    const [show, setShow] = useState(false);

    const [showMoveCard, setShowMoveCard] = useState(false);

    const [card, setCard] = useState({})
    const [cardApiInfo, setCardApiInfo] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [loadingSelectData, setLoadingSelectData] = useState(false);
    const [portfolioToMoveToo, setPortfolioToMoveToo] = useState("");

    const [portfolioLocation, setPortfolioLocation] = useState("N/A");

    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(0);
    const [average, setAverage] = useState(0);
    const [listingPrices, setListingPrices] = useState([])

    const [newPortfolioID, setNewPortfolioID] = useState(null)
    const [newCardID, setNewCardID] = useState(null)

    const [newListingPrice, setNewListingPrice] = useState("");

    const navigate = useNavigate()


    const getAllListings = async (productID) => {
        const allListings = await ListingsDataService.getAllListings(productID)
        if(allListings.length === 0){
          return
        }        
        setListingPrices(allListings.map((listing) => ({Price: listing.Price, isStartingPrice: listing.isStartingPrice})))
      
    }

    const determineChartPrices = () => {
    
        if(listingPrices.length !== 0){
          const listings = listingPrices.map((listing) => listing.Price);
          //calculate low and high
          let currLow = listings[0];
          let currHigh = listings[0];
    
          for(const listingPrice of listings){
            if(currLow > listingPrice){
              currLow = listingPrice
            }
            if(currHigh < listingPrice){
              currHigh = listingPrice;
            }
          }
          setLow(currLow)
          setHigh(currHigh)
          //calculate average.
    
          const totalPriceSum = listings.reduce((prev, curr) => curr + prev);
          console.log("TOTAL SUM", listings)
          setAverage(totalPriceSum / listings.length);
        }
        
    
      }

    const createListing = async () => {
        try{
            const q = query(collection(firestore, 'users'), where('email', '==', auth.currentUser.email));
            const foundUser = await getDocs(q);

            let foundUserData;
            if(foundUser.size !== 1){
                throw new Error("Unexepectedly couldn't determine logged in user.")
            }

            foundUser.forEach((user) => {
                foundUserData = user.data()
            })

            const newListing = {
                Grade: card.Grade,
                Price: Number(newListingPrice),
                productID: card.Id,
                sellerEmail: foundUserData.email,
                isStartingPrice: false
            }    

            const allListings = await ListingsDataService.getListingsByProductID(card.Id)

            if(allListings.length === 0){
                newListing.isStartingPrice = true;
            }
            else{
                if(newListing.Price < allListings[0].Price){
                    newListing.isStartingPrice = true;
                    await setDoc(doc(firestore, `listings/${allListings[0].listingID}`, {isStartingPrice: false}, {merge: true}));
                }
            }

            await ListingsDataService.createNewListing(newListing)
            handleClose()
            console.log("Done")
        }catch(err){
            console.error(err)
        }
        
        

    }


    console.log("CARD ", card)

    console.log("CARD API INFO", cardApiInfo)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowMoveCard = () => setShowMoveCard(true);
    const handleCloseMoveCard = () => setShowMoveCard(false);


    


    const getCardData = async (updatedPortfolioID = null, updatedCardID = null) => {
        try{

            const q = query(collection(firestore, 'users'), where('email', '==', auth.currentUser.email));
            const foundUser = await getDocs(q);
            const userID = foundUser.docs[0].id;
            let cardData
            if( (newCardID && newPortfolioID) ){
                cardData = await userServices.getCard(userID, newPortfolioID, newCardID);
                console.log({cardData})
                const foundPortfolioName = await userServices.determinePortfolioNameFromID(userID, newPortfolioID)
                setPortfolioLocation(foundPortfolioName);
    

            }
            else if(updatedPortfolioID && updatedCardID){
                cardData = await userServices.getCard(userID, updatedPortfolioID, updatedCardID);
                console.log({cardData})
                const foundPortfolioName = await userServices.determinePortfolioNameFromID(userID, updatedPortfolioID)
                setPortfolioLocation(foundPortfolioName);
            } 
            else{
                cardData = await userServices.getCard(userID, portfolioID, cardID);
                const foundPortfolioName = await userServices.determinePortfolioNameFromID(userID, portfolioID)
                setPortfolioLocation(foundPortfolioName);
            }
            setCard(cardData)

            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardData.Id}`)
            const responseData = await response.json()
            setCardApiInfo(responseData.data);
            await getAllListings(responseData.data.id)


        }catch(err){
            console.error(err)
            setLoading(false)
            setError(true)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getCardData()
    }, [])


    useEffect(() => {
        if(!loading){
          determineChartPrices();
        }
      }, [loading])



      const options = {responsive: true,
        maintainAspectRatio: true
      };
      const data = {
        labels: ["low", "high", "average", "external market"],
        datasets: [
          {
            label: "Card Prices",
            data: [
              low || 0,
              high || 0,
              average || 0,
              cardApiInfo.tcgplayer?.prices?.holofoil?.market || cardApiInfo.tcgplayer?.prices?.unlimitedHolofoil?.market || 0,
            ],
            backgroundColor: "rgba(70, 184, 184, 0.2)",
            borderWidth: 2,
          },
        ],
      };

      console.log("DATA", data)


    const PortfolioToMarketplaceModal =  <div id="add-marketplace-modal">
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Place Card on Marketplace:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
        <form>
            <div className="w-100 d-flex flex-row justify-content-center">
                <img src={cardApiInfo?.images?.small} alt="Card Image" className='border rounded' width="150px"/>
            </div>

            <label htmlFor="cardName">Card Name:</label>
            <input className="form-control mb-2" type="text" id="cardName" placeholder={`${cardApiInfo.name}`} disabled/>

            <label htmlFor="qualityPSA">Grade:</label>
            <input className="form-control mb-2" type="text" id="qualityPSA" placeholder={`${card.Grade}`} disabled/>

            <div className="w-100 d-flex flex-row">
                <div id="left-side">
                    <label htmlFor="listing-price">Listing Price:</label>
                    <input className="form-control mb-2" type="text" id="listing-price" placeholder='' value={newListingPrice} onChange={(e) => setNewListingPrice(e.target.value)}/>
                </div>
                <div id="right-side" className='ms-5'>
                    <h4 className='d-inline'>Current Market Price: </h4>
                    <h2 className='d-inline'>${cardApiInfo.tcgplayer?.prices?.holofoil?.market || cardApiInfo.tcgplayer?.prices?.unlimitedHolofoil?.market || 0}</h2>
                </div>
            </div>

            <p className='text-center'>Go to Account Settings  -&gt; My Listings to view and/or manage all listings. </p>


        </form>



    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={createListing}>
        Create Listing
        </Button>
    </Modal.Footer>
    </Modal>
</div>



const getPortfolioNames = async (searchValue) => {
    try{
        setLoadingSelectData(true);
        const userID = await userServices.getUserID(auth.currentUser.email)
        const portfolioNameObjects = await userServices.getAllOtherPortfolioNames(userID, portfolioID);
    
        if(portfolioNameObjects.length !== 0){
            const fullOptionsArray = portfolioNameObjects.map((portfolioNameObj) => {
                return {value: portfolioNameObj.id, label: portfolioNameObj.name}
            })

            return fullOptionsArray.filter((option) => option.label.toLowerCase().startsWith(searchValue.toLowerCase()))
        }
        else{
            return []
        }
    }catch(err){
        console.error(err)
    }
    finally{
        setLoadingSelectData(false);
    }

}


const moveCard = async () => {
    try{
        handleCloseMoveCard()
        
        if(portfolioToMoveToo !== ""){
            const userID = await userServices.getUserID(auth.currentUser.email);
            const newCardData = await userServices.moveCardToNewPortfolio(userID, portfolioID, cardID, portfolioToMoveToo)  
            navigate(`/my-account/my-portfolios/${newCardData.newPortfolioID}/${newCardData.newCardID}`, {replace: true})
            setLoading(true)
            await getCardData(newCardData.newPortfolioID,newCardData.newCardID)
            
        }
    }
    catch(err){
        console.error(err)
    }
    finally{
        setLoading(false)
    }
    
    return 
}

const moveCardModal =  <div id="move-card-modal">
    <Modal show={showMoveCard} onHide={handleCloseMoveCard}>
    <Modal.Header closeButton>
        <Modal.Title>Move Card to New Portfolio</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
        <form>
            <div className="w-100 d-flex flex-row justify-content-center">
                <img src={cardApiInfo?.images?.small} alt="Card Image" className='border rounded' width="150px"/>
            </div>

            <div className='w-full d-flex flex-row justify-content-center align-items-center gap-2'>
                <p className='fs-7'>Current Location:</p>
                <p className='fs-4'>{portfolioLocation}</p>
            </div>

            <AsyncSelect isLoading={loadingSelectData} loadOptions={getPortfolioNames} onChange={(newValue) => {
                setPortfolioToMoveToo(newValue.value);
            }}/>


        </form>



    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseMoveCard}>
        Close
        </Button>
        <Button variant="primary" onClick={moveCard}>
        Move Card
        </Button>
    </Modal.Footer>
    </Modal>
</div>




    return(

        <div id="container-portfolio-item" className='h-100 w-100 d-flex flex-column'>
            <div id="main-navbar" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>
            <div id="portfolio-item-contents-container" className="w-100 d-flex flex-column" style={{backgroundColor: "#edf5e1"}} >  
                {!loading && !error && <>
                
                    {PortfolioToMarketplaceModal}
                    {moveCardModal}

                    <button id="placeOnMarketplace" className='btn btn-light border border-dark d-grid' onClick={() => {setShow(true)}}style={{width:"30px", height:"30px", placeContent:"center"}}><img src={MarketplaceIcon} alt="Add" width="30px"/></button>



                    <h1 className='text-center'>Card details:</h1>
                    <hr />

                    <div id="item-header" className='d-flex flex-column w-100 align-items-center'>
                        <img src={cardApiInfo.images.small} alt="Card Image" className='border rounded' style={{width: "13%", height: "auto"}}/>
                        <h3 className='text-center'>{cardApiInfo.name}</h3>
                            <br />
                            <br />
                        

                    </div>

                    <div className="d-flex flex-row justify-content-center p-3" style={{gap: "3em"}}>
                            <div className="">
                                    <div className="d-flex flex-column ">
                                    {cardApiInfo?.types?.map((type) => (
                                        <div className="d-flex flex-row ">
                                        <p
                                            className="px-4"
                                            style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                                        >
                                            Type:
                                        </p>
                                        {/* <img
                                        src={pokemonTypes.types[type].icon}
                                        style={pokemonTypes.types[String(type)].iconStyle}
                                        alt={type}
                                        />
                                        <p className="px-2" style={pokemonTypes.types[type].style}>
                                        {type}
                                        </p> */}
                                        {pokemonTypes.types[type] ? (
                                            <>
                                            <img
                                                src={pokemonTypes.types[type].icon}
                                                style={pokemonTypes.types[String(type)].iconStyle}
                                                alt={type}
                                            />
                                            <p
                                                className="px-2"
                                                style={pokemonTypes.types[type].style}
                                            >
                                                {type}
                                            </p>
                                            </>
                                        ) : (
                                            <p>Error, no type avaiable</p>
                                        )}
                                        </div>
                                    ))}

                                    {cardApiInfo?.weaknesses?.map((weakness) => (
                                        <div className="d-flex flex-row w-100">
                                        <p
                                            className="px-4"
                                            style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                                        >
                                            Weaknesses:
                                        </p>

                                        <img
                                            src={pokemonTypes.types[String(weakness.type)].icon}
                                            style={pokemonTypes.types[weakness.type].iconStyle}
                                            alt={weakness.type}
                                        />
                                        <p
                                            className="px-2"
                                            style={pokemonTypes.types[weakness.type].style}
                                        >
                                            {weakness.type}
                                        </p>
                                        </div>
                                    ))}

                                    <div className="d-flex flex-row align-center">
                                        <p
                                        className="px-4"
                                        style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                                        >
                                        HP:
                                        </p>
                                        <img
                                        src="/pokemonHP/hpIcon.png"
                                        alt="hp icon"
                                        style={{
                                            width: "50px",
                                            height: "auto",
                                            marginRight: "0.5em",
                                        }}
                                        />
                                        <p
                                        style={{
                                            fontWeight: "bold",
                                            color: "red",
                                            position: "relative",
                                            top: "25%",
                                        }}
                                        >
                                        {cardApiInfo?.hp}HP
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="setContainer align-items-center d-flex">
                                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                        Set:
                                    </span>
                                    <img
                                        src={cardApiInfo?.set?.images?.symbol}
                                        alt="set logo"
                                        style={{ width: "50px", height: "auto", marginLeft: "0.5em" }}
                                    />
                                    <p className="mb-0">{cardApiInfo?.set?.name}</p>
                                    </div>
                                    <p className="mb-3">
                                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                        Artist:
                                    </span>{" "}
                                    {cardApiInfo?.artist}
                                    </p>
                                    <p className="mb-3">
                                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                        Release Date:
                                    </span>{" "}
                                    {cardApiInfo?.set?.releaseDate}
                                    </p>
                                    <p className="mb-3">
                                    <span style={{ fontWeight: "bold", fontSize: "1.1.rem" }}>
                                        Printed Total: </span> {cardApiInfo?.set?.printedTotal}
                                    </p>
                                </div>

                                </div>

                    <div id="content-display" className='d-flex w-100 h-100 flex-column'>
                        <div id="right-display" className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                            <div id="general-stats">
                            
                            
                           


                            <h5 className='d-inline'>Card Quality:</h5>
                            <h4 className='d-inline'> {card.Grade}</h4>
                            <br />
                            <br />

                            <h5 className='d-inline'>Location: </h5>
                            <p className='d-inline'>"{portfolioLocation}"</p>

                            <div className='d-inline'>
                                <button className="btn  d-grid" style={{width:"20px", height:"20px", placeContent:"center"}}><img src={EditIcon} alt="edit" width="20px" height="20px" onClick={handleShowMoveCard}/></button>
                            </div>
                            <br />
                            <br />

                            <h5 className='d-inline'>Card Description:</h5>
                            <p className=''>None provided.</p>
                            </div>

                        </div>
                        
                        <div id="left-display" className="h-100 w-100 d-flex justify-content-center">
                            <div id="card-stats" className='h-100 w-50 p-5'>
                                <h2 className='text-center'>Card Price Stats (in USD)</h2>
                            <Bar data={data} options={options} />  
                            </div>

                        </div>
                    </div>

                
                </>}

                {loading && 
                
                <>
                
                    <Spinner
                    animation="border"
                    variant="primary"
                    className="custom-spinner spinner-lg w-20 h-20"/>

                    <span className="loading-message fs-4">Loading card...</span>
                </>
                
                }
            </div>
        </div>


    )
}


export default PortfolioItem