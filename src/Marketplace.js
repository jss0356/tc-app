import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import Card from 'react-bootstrap/Card'
import { LinkContainer } from "react-router-bootstrap"
import Basketball1 from "./image/basketball/card1.jpg"

const Marketplace = ({ cart, setCart }) => {
     const [cards, setCards] = useState([]);
  //this is the state that will hold the value of the input
  const [filteredCards, setFilteredCards] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    setLoading(true);
    fetch("https://api.pokemontcg.io/v2/cards")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  function handleChange(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [search, cards]);
  const [addedToCart, setAddedToCart] = useState([]);
  const handleCart = (card) => {
    if (cart.some((item) => item.id === card.id)) {
      setCart(cart.filter((item) => item.id !== card.id));
    } else {
      setCart([...cart, card]);
      setAddedToCart([...addedToCart, card.id]);
    }
  };
    return (
        <div id="container" className="h-100 w-100 d-flex flex-column">
            <div id="mainNavMarketplace" style={{marginBottom:"130px"}}>
                <MainNavbarMarketplace
                  search={search}
                  handleChange={handleChange}
                  cartCount={cart.length}
                />
            </div>

        <div id="marketplace-container" className="w-100 h-100 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}>
         {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner
              animation="border"
              variant="primary"
              className="custom-spinner spinner-lg w-20 h-20"
            />
            <span className="loading-message fs-4">Loading cards...</span>
          </div>
        ) : (
          filteredCards &&
          filteredCards.map((card) => {
            return (
              <Card key={card.id} className="card-item">
                <Card.Img
                  variant="top"
                  src={card.images.small}
                  alt={card.name}
                  //make the image smaller
                  style={{ height: "500px", width: "400px" }}
                />
                <Card.Body>
                  <Card.Title className="card-name">{card.name}</Card.Title>
                  <Card.Text className="card-price">
                    ${card?.tcgplayer?.prices?.holofoil?.market}
                  </Card.Text>
                  <button
                    //className="btn btn-primary add-to-cart-btn"
                    className={`btn ${
                      addedToCart.includes(card.id)
                        ? "btn-danger"
                        : "btn-primary"
                    }`}
                    onClick={() => handleCart(card)}
                  >
                    {addedToCart.includes(card.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </button>
                </Card.Body>
              </Card>
            );
          })
        )}
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
