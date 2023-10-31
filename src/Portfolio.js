import {Link, useParams} from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
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
import userServices from './services/user.services'

import { auth, firestore} from './config/firebase'
import {collection, 
    addDoc,
    doc,
    query,
    where,
    getDocs
} from "firebase/firestore"
import { Spinner } from 'react-bootstrap'

const Portfolio = () =>{

    const[selectedGraded, setSelectedGraded] = useState();
    const [portfolio, setPortfolio] = useState({})
    const [portfolioCards, setPortfolioCards] = useState([])
    
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [cardImages, setCardImages] = useState([])

    const {
        grade, setGrade,
        id, setID
    } = useContext(CardContext)
    //const [grade, setGrade] = useState(0);
    //const [id, setID] = useState("");

    const changeID = (value) => {
        setID(value)
    }

    const changeGrade = (value) => {

        setGrade(value)
    }
    console.log(id)

    const DisplayForm = (props) => {
        if(props.graded === "Yes") {
            return(

                <div>
                    <select className="form-select custom-select mb-2" value={grade} onChange={e => setGrade(e.target.value)}>
                        <option value="">Select a Grade:</option>
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

    const {portfolioID} = useParams()

    useEffect(() => {
        const getPortfolioData = async () => {
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
                        images.push({image: cardData.images.small, id: card.Id})
    
                    }catch(err){
                        console.error(err)
                    }
                }
                console.log("IMAGES", images)
                setCardImages(images)
         
            }
           



            }catch(err){
                setError(true)
            }
            finally{
                setLoading(false)
            }

        }
        getPortfolioData()


        
    }, [])


    const uploadCard = async () => {
         
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
             
                    <div id="right-display" className='h-100 w-100 ms-3 d-flex flex-column align-items-center justify-content-center'>
                        
                        <h3 className='text-center'>Contents</h3>
                       {cardImages.length !== 0 && <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="sortIntoSections"/>
                            <label className="form-check-label" htmlFor="sortIntoSections">Sort Into Sections</label>
                        </div>}
                    {cardImages.length === 0 ? <span className='text-danger' style={{fontWeight: "bold"}}>Your portfolio is empty.</span> :
                        <div className='w-100 h-100 p-5' style={{display: "grid",  overflow: "hidden", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5em",
                  gridAutoRows: "1fr"}}>

                         {cardImages.map((cardImage) => {
                            return (
                                <>
                                
                                <Link to={`/my-account/my-portfolios/${portfolioID}/${cardImage.id}`}><img src={cardImage.image} style={{width: "50%", height: "auto"}}/></Link>
                                
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