import {Link, useParams} from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
import MainNavbar from './Rcomponents/MainNavbar'
import LineGraph from './Rcomponents/LineGraph'
import SearchIcon from './logos/SearchIcon.png'
import AddIcon from './logos/Add-Icon.png'
import { LinkContainer } from 'react-router-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import userService from './services/user.services'
import ChooseCardUpload from './ChooseCardUpload'
import { CardContext } from './app/CardProvider'
import userServices from './services/user.services'
import CardAndGradeImages from './CardAndGradeImages'
import CardUploadForm from './CardUploadForm'

import { auth, firestore} from './config/firebase'
import {collection, 
    addDoc,
    doc,
    query,
    where,
    getDocs,
    setDoc,
    getDoc
} from "firebase/firestore"
import { Spinner } from 'react-bootstrap'

const Portfolio = () =>{

    const [portfolio, setPortfolio] = useState({})
    const [portfolioCards, setPortfolioCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [cardImages, setCardImages] = useState([])
    const [show, setShow] = useState(false);

    const {
        grade, setGrade, id, setID, setSelectedGraded,
        setSelectedAltered, setSelectedSurfaceWear, setSelectedDiscoloration, setSelectedScratch,
        setSelectedStain, setSelectedDefect, setSelectedCornersRounded, setSelectedCrease,
        setSelectedBorder, setSelectedCornersFraying, setSelectedEdges,setSelectedFocus,
        setSelectedGloss, setSelectedInTact, setSelectedFrontCentering, setSelectedBackCentering

    } = useContext(CardContext)

    const {portfolioID} = useParams()

    console.log(id)

    useEffect(() => {
        getPortfolioData()
    }, [])

    const getPortfolioData = async () => {
        setLoading(true)
        try{
            const q = query(collection(firestore, 'users'), where('email', '==', auth.currentUser.email));
            const foundUser = await getDocs(q);
            const userID = foundUser.docs[0].id;

            const portfolioData = await userServices.getUserPortfolio(portfolioID, userID)
            const cardsData = await userServices.getPortfolioCards(portfolioID, userID)

            setPortfolio(portfolioData)
            
            if(cardsData !== "no cards."){
                setPortfolioCards(cardsData)
                console.log("DATA" ,cardsData)

                const images = [];
                for(const card of cardsData){
                    try{
                        const response = await fetch(`https://api.pokemontcg.io/v2/cards/${card.Id}`)
                        const responseData = await response.json();
                        const cardData = responseData.data;
                        if(cardData?.images?.small){
                            images.push({image: cardData?.images?.small, id: card.cardID})
                        }
                    }catch(err){
                        console.error(err)
                    }
                }
                console.log("IMAGES", images)
                setCardImages(images)
        
            }       
        }catch(err){
            setError(true)
        }finally{
            setLoading(false)
            setError(false)
        }
    }

    const uploadCard = async () => {
        
        if(id !== 'none'){
            console.log(portfolioID)
            const userID = await userService.getUserID(auth.currentUser.email)
            console.log(userID)
            const portfolioRef = await userService.getPortfolio(userID, portfolioID)
            const portfolio = await getDoc(portfolioRef)
            const portfolioData  = portfolio.data();
            console.log(portfolioData)

            const newTotal = portfolioData.itemCount + 1;

            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
            const responseData = await response.json();
            const cardData = responseData.data

            const newTotalMarketValue = portfolioData.totalMarketValue + (cardData.tcgplayer?.prices?.holofoil?.market || 0)
            const cardRef = collection(portfolioRef, "cards")

            console.log(grade, id)
            const addedRef = await addDoc(cardRef, {
                Grade: grade,
                Id: id,
                
            })
            await setDoc(addedRef, {cardID: addedRef.id}, {merge: true})
            await setDoc(portfolioRef, {itemCount: newTotal, totalMarketValue: newTotalMarketValue}, {merge: true})

            handleClose()
            await getPortfolioData()
        } else {
            alert("Card must be selected")
        }

    }

    const reset = () => {
        setGrade("-"); setID("none"); setSelectedGraded("No");
        setSelectedAltered(11); setSelectedSurfaceWear(11); setSelectedDiscoloration(11); setSelectedScratch(11)
        setSelectedStain(11); setSelectedDefect(11); setSelectedCornersRounded(11); setSelectedCrease(11)
        setSelectedBorder(11); setSelectedCornersFraying(11); setSelectedEdges(11); setSelectedFocus(11)
        setSelectedGloss(11); setSelectedInTact(11); setSelectedFrontCentering(11); setSelectedBackCentering(11)
    }

    const handleClose = () => {
        setShow(false)
        reset()
    };
    
    const handleShow = () => setShow(true);

    const uploadCardModal =  
        <div id="add-portfolio-modal">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Card To Portfolio:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <ChooseCardUpload/>
                        <CardUploadForm/>
                        <CardAndGradeImages/>
                        <div className="form-group">
                            <label htmlFor="card-description">Card Description</label>
                            <textarea className="form-control" id="card-description" rows="3"></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={uploadCard}>Upload</Button>
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
                {!loading && !error &&
                    <>
                        <div className='w-100 d-flex flex-row gap-3'>
                            <button id="uploadToPortfolio" className='btn d-grid' onClick={handleShow} style={{width:"30px", height:"30px", placeContent:"center"}}><img src={AddIcon} alt="Add" width="30px"/></button>
                        </div>
                        <h1 className='text-center d-inline'>{portfolio.name}</h1>
                        <hr />
                        <div id="inner-display" className='w-100 h-100 d-flex flex-column'>
                            <div id="left-display" className='w-100 h-100'>
                                <div id="portfolio-stats" className='text-center'>
                                    <div id="text-stats" className='ms-3'>
                                        <h5 className='d-inline'>Total Item Count:</h5>
                                        <h5 className='d-inline'> {portfolio.itemCount}</h5>
                                        <br />
                                        <br />
                                        <h5 className='d-inline'>Total Market Value:</h5>
                                        <h2 className='d-inline'> ${portfolio.totalMarketValue}</h2>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div id="right-display" className='h-100 w-100 ms-3 d-flex flex-column align-items-center'>
                                <h3 className='text-center'>Contents</h3>
                                {cardImages.length !== 0 && <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="sortIntoSections"/>
                                        <label className="form-check-label" htmlFor="sortIntoSections">Sort Into Sections</label>
                                </div>}
                                {cardImages.length === 0 ? <span className='text-danger' style={{fontWeight: "bold"}}>Your portfolio is empty.</span> :
                                <div className='w-100 h-100 p-5 ' style={{display: "grid",  overflow: "hidden", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "1.5em",
                                gridAutoRows: "1fr"}}>
                                    {cardImages.map((cardImage) => {
                                        return (
                                            <>
                                                <Link to={`/my-account/my-portfolios/${portfolioID}/${cardImage.id}`}><img src={cardImage.image} style={{width: "50%", height: "auto"}} alt = ""/></Link>
                                            </>
                                        )
                                    })}
                                </div>}
                            </div>
                        </div>
                    </>
                }
                {loading && <div className='w-100 h-100 d-flex justify-content-center'>
                    <Spinner
                        animation="border"
                        variant="primary"
                        className="custom-spinner spinner-lg w-20 h-20"
                    />
                    <span className="loading-message fs-4">Loading portfolio...</span>
                </div>}
            </div>
        </div>        
    )
}

export default Portfolio