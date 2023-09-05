import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import Card from 'react-bootstrap/Card'
import { LinkContainer } from "react-router-bootstrap"
import Basketball1 from "./image/basketball/card1.jpg"
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";

import productsServices from "./services/listings.services";


import Cart from "./Cart";
const Marketplace = ({ cart, setCart }) => {
    const [search, setSearch] = useState("");


    return (
        <div id="container" className="h-100 w-100 d-flex flex-column">
            <div id="mainNavMarketplace" style={{marginBottom:"130px"}}>
                <MainNavbarMarketplace
                  search={search}
                />
            </div>

        <div id="marketplace-container" className="w-100 h-100 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}>

            <div id="section-1" className="h-100">
                <h2 className="text-center">Featured:</h2>
                <div className="h-75 w-100 d-flex flex-row flex-nowrap gap-2" style={{overflowX:"scroll"}}>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6>
                                </Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6> </Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card> 
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                                        </Card>         
                </div>
            </div>
            <div id="section-2" className="h-100">
                <h2 className="text-center">Best Sellers:</h2>
                <div className="h-75 w-100 d-flex flex-row flex-nowrap gap-2" style={{overflowX:"scroll"}}>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card> 
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                                        </Card>         
                </div>
            </div>
            <div id="section-3" className="h-100">
                <h2 className="text-center">Recent:</h2>
                <div className="h-75 w-100 d-flex flex-row flex-nowrap gap-2" style={{overflowX:"scroll"}}>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                        <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                            <Card.Body>
                                <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                            </Card.Body>
                    </Card> 
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                    </Card>
                    <Card style={{width:"125px"}}>
                                            
                                            <Card.Img variant="top" src={Basketball1} style={{height:"100px", width: "100px"}}/>
                                                <Card.Body>
                                                    <LinkContainer to="/marketplace/1"><Card.Title className="text-center"><h5>Card 2</h5>
                                <h6>$32.99</h6></Card.Title></LinkContainer>
                                                </Card.Body>
                                        </Card>         
                </div>
            </div>


        </div>



        </div>


    )
}


export default Marketplace
