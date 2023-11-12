import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import MainNavbar from './Rcomponents/MainNavbar';
import ViewIcon from './logos/view-icon.png'
import DefaultProfile from './logos/default-profile.jpg'
import AddIcon from './logos/Add-Icon.png'
import Card1Baseball from "./image/baseball/card1.jpg"
import Card2Baseball from "./image/baseball/card2.jpg"
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button"
import {auth} from './config/firebase'
import {firestore} from "./config/firebase"
import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    query,
    where,
    setDoc,
    limit
} from "firebase/firestore"

import userServices from './services/user.services';
import { CarouselItem } from 'react-bootstrap';

const Home = () => {
    const [show, setShow] = useState(false);
    const[portfolios, setPortfolios] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true);

    const [portfolioName, setPortfolioName] = useState("");

    const handleSaveChanges = async () => {
            const userQuery = query(collection(firestore, 'users'), where('email','==',auth.currentUser.email));
            const foundUser = await getDocs(userQuery);
            const userID = foundUser._snapshot.docChanges[0].doc.data.value.mapValue.fields.userID.stringValue;
            const userPortfoliosCollectionRef = collection(firestore, `users/${userID}/userPortfolios`);
            const addRef = await addDoc(userPortfoliosCollectionRef, {
                name:portfolioName,
                ownerID: userID,
                itemCount: 0,
                totalMarketValue: 0
            });
            
            await setDoc(
                addRef,
                {portfolioID: addRef.id},
                {merge: true}
            );

            // Re-fetches the portfolio after creating the portfolio    
            fetchPortfolios();
    }

    const fetchPortfolios = async () => {
        setLoading(true);

        const userQuery = query(
            collection(firestore, 'users'),
            where('email', '==', auth.currentUser.email)
        );

        const foundUser = await getDocs(userQuery);
        const userID = foundUser.docs[0].id;

        if(!userID) {
            setLoading(false);
            return;
        }

        const userPortfoliosCollectionRef = collection(
            firestore,
            `users/${userID}/userPortfolios`
        );
        
        const querySnapshot = await getDocs(
            query(userPortfoliosCollectionRef, limit(3))
        );
        
        
        const portfolioArray = [];
        const tempArray = [];
        
        querySnapshot.forEach(async (portfolioItem) => {
            tempArray.push(portfolioItem.data());
        });

        for(const portfolio of tempArray) {
            const uid = await userServices.getUserID(auth.currentUser.email);
            const cards = await userServices.getPortfolioCards(portfolio.portfolioID, uid);
            
            // Check if cards is an array before attempting to slice
            const cardsLimit = Array.isArray(cards) ? cards.slice(0, 3) : [];

            let cardArr = [];
            if(cardsLimit !== 'no cards.') {
                cardsLimit.forEach((card) => {
                    cardArr.push( {id: card.Id, grade: card.Grade} );
                });
            }

            const portfolioItem = {id: portfolio.portfolioID, name: portfolio.name, cards: cardArr};

            portfolioArray.push(portfolioItem);    
        }

        for(const portfolio of portfolioArray){
            for(const card of portfolio.cards){
                const response = await fetch(
                    `https://api.pokemontcg.io/v2/cards/${card.id}`
                );
                const responseData = await response.json();
                const cardData = responseData.data;
                card.name = cardData.name;
                card.image = cardData.images.small;
            }
        }
    
        setPortfolios(portfolioArray);
        setLoading(false);
        console.log(portfolioArray);
    };

    useEffect(() => {
        // fetches the portfolios
        fetchPortfolios();
    }, []);

    useEffect(() => {
        console.log(portfolios);
    }, [portfolios]);
  
    const addPortfolioModal=  <div id="add-portfolio-modal">
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Add Portfolio:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <label htmlFor="add-portfolio-title">New Portfolio Title:</label>
    <input className="form-control" type="text" id="add-portfolio-title" value={portfolioName} onChange={(e) =>setPortfolioName(e.target.value)}/>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={() => {handleSaveChanges();handleClose();}}>
        Save Changes
        </Button>
    </Modal.Footer>
    </Modal>
</div>

    return (
        <div id="homepage-container" className="d-flex w-100 h-100 flex-column ">
            <div id="homepage-main-nav" style={{marginBottom:"130px"}}>
                <MainNavbar/>
            </div>
            
                {addPortfolioModal}
            
                <div id="homepage-content" className="h-100 w-100 d-flex flex-row mb-2">
                    <div style={{backgroundColor:"#edf5e1"}} id="friends-list-container" className="h-100 w-25 ms-3 border rounded">
                        <h2 className='text-center'>Friends List</h2>
                        <hr />
                    <div className="vstack gap-1">
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
                                               
                        <LinkContainer className='text-center' to="/my-account/my-friends"><a href="#">Manage All Friends...</a></LinkContainer> 
                    </div>

                </div>
                <div id="homepage-portfolio-showcase" style={{backgroundColor:"#edf5e1"}} className="h-100 w-75 ms-3 border rounded">
                    <div id="sort-by-container" className="d-flex flex-row w-100">
                        <select className="form-select w-25" style={{maxWidth:"100px"}}aria-labelledby="sort-showcase-by">
                            <option value="">Sort by:</option>
                            <option value="creationDate">Creation Date</option>
                            <option value="lastEdited">Last Edited</option>
                        </select>
                    </div>
                    <h2 className='text-center'>My Portfolios</h2>
                    <hr />
                    <div id="portfolio-showcase" className="d-flex flex-column align-items-center">
                            <div id="add-portfolio" className="w-100 mb-5 d-flex align-items-center justify-content-center" style={{height:"50px", placeContent:"center"}}>
                                <button variant="primary" onClick={handleShow} className='d-grid' style={{height:"40px", width:"300px", placeContent:"center", backgroundColor:"none"}}><img src={AddIcon} alt="" width="20px"/></button>
                            </div>

                            

                            {!loading &&
                            <div className="d-flex flex-wrap">                     
                                 {portfolios.map((portfolio, index) => (
                                    <div key={index} className="portfolio-container text-center mx-2">
                                        {portfolio.cards && (
                                            <Carousel variant="dark" style={{ width: "220px" }}>
                                                {/*portfolio.cards.map((card, index) => (
                                                <Carousel.Item key={index}>
                                                    <div className='card text-center'>
                                                    <p>{index}</p>
                                                    </div>
                                                </Carousel.Item>
                                                ))*/}
                                                {portfolio.cards.map((card, index) =>
                                                <Carousel.Item key={index}>
                                                    <div className='card text-center'>
                                                        <img src={card.image} alt={card.name} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                                                        <p>{card.name}</p>
                                                    </div>
                                                </Carousel.Item>
                                                )}
                                            </Carousel>
                                        )}
                                        {/*<Carousel variant="dark" style={{ width: "220px" }}>
                                            {/*portfolio.cards.map((card, index) => (
                                                <Carousel.Item key={index}>
                                                    <div className='card text-center'>
                                                        <p>Meow</p>
                                                    </div>
                                                </Carousel.Item>
                                            ))}
                                            <Carousel.Item key="1">
                                                <div className='card text-center'>
                                                    <p>{portfolio.cards[0]}</p>
                                                </div>
                                            </Carousel.Item>
                                        </Carousel>*/}

                                        <LinkContainer to={`/my-account/my-portfolios/${portfolio.id}`}>
                                            <h2 role="button">{portfolio.name}</h2>
                                        </LinkContainer>
                                    </div>
                                ))}
                            </div>}
                            {/*<div className='portfolio-title'>
                            <LinkContainer to="/my-account/my-portfolios/1">
                                <h2>Portfolio 1</h2>
                            </LinkContainer>
                        </div>
                        <Carousel variant="dark" style={{width:"220px"}}>
                            <Carousel.Item>
                                <Card>
                                    <Card.Img variant="top" src={Card1Baseball} style={{height:"200px", width:"200px"}}/>
                                    <Card.Body>
                                        <LinkContainer to="my-account/my-portfolios/1/1">
                                            <Card.Title className="text-center">Card 1</Card.Title>
                                        </LinkContainer>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Card>
                                    <Card.Img variant="top" src={Card2Baseball} style={{height:"200px", width:"200px"}}/>
                                    <Card.Body>
                                        <LinkContainer to="my-account/my-portfolios/1/2">
                                            <Card.Title className="text-center">Card 2</Card.Title>
                                        </LinkContainer>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                            
                        </Carousel>
                        <div className='portfolio-title'>
                            <LinkContainer to="/my-account/my-portfolios/2">
                                <h2>Portfolio 2</h2>
                            </LinkContainer>
                        </div>
                        <Carousel variant="dark" style={{width:"220px"}}>
                            <Carousel.Item>
                                <Card>
                                    <Card.Img variant="top" src={Card1Baseball} style={{height:"200px", width:"200px"}}/>
                                    <Card.Body>
                                        <LinkContainer to="my-account/my-portfolios/2/1">
                                            <Card.Title className="text-center">Card 1</Card.Title>
                                        </LinkContainer>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Card>
                                    <Card.Img variant="top" src={Card2Baseball} style={{height:"200px", width:"200px"}}/>
                                    <Card.Body>
                                        <LinkContainer to="my-account/my-portfolios/2/2">
                                            <Card.Title className="text-center">Card 2</Card.Title>
                                        </LinkContainer>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Card>
                                    <Card.Body>
                                        <div style={{width:"220px", height:"220px"}}></div>
                                        <Card.Title className="tetx-center">Sample</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                                            </Carousel>*/}

                            <LinkContainer className='text-center pt-5' to="/my-account/my-portfolios">
                                <a href="#">View All Portfolios...</a>
                            </LinkContainer> 
                        </div>
                    </div>
                </div>
        </div>
    )
}



export default Home