import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'

const MarketplaceSearch = ({cart, setCart}) => {
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
      fetch("https://api.pokemontcg.io/v2/cards?pageSize=16")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
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

    console.log(cart)
  
    const handleCart = (card) => {
      if (cart.some((item) => item.id === card.id)) {
        setCart(cart.filter((item) => item.id !== card.id));
        console.log(cart)
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
                                  cartCount={cart.length}/>
            </div>



            <div id="marketplace-search-container" className="w-100 h-100 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}>
            <p className="text-center">Search Results:</p>
            <div id="search-results-container" className="h-100 w-100  " style={loading ? {}: {overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "1fr"}}>

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
                        <Card key={card.id} className="card-item" style={{width: "100%"}}>
                            <Card.Img
                            variant="top"
                            src={card.images.small}
                            alt={card.name}
                            //make the image smaller
                            style={{ height: "auto", width: "100%"}}
                            />
                            <Card.Body >
                            <Card.Title className="card-name">{card.name}</Card.Title>
                            <Card.Text className="card-price">
                                ${card?.tcgplayer?.prices?.holofoil?.market}
                            </Card.Text>
                            <button
                                //className="btn btn-primary add-to-cart-btn"
                                className={`btn ${
                                cart.includes(card)
                                    ? "btn-danger"
                                    : "btn-primary"
                                }`}
                                onClick={() => handleCart(card)}
                            >
                                {cart.includes(card)
                                ? "Remove from Cart"
                                : "Add to Cart"}
                            </button>
                            </Card.Body>
                        </Card>
                        );
                    })
                    )}



            </div>
            <div className="d-flex flex-row justify-content-center w-100">
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



    )
}

export default MarketplaceSearch