import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card'
import { MarketplaceContext } from "./app/MarketplaceProvider";

const MarketplaceSearch = ({cart, setCart}) => {
    const [cards, setCards] = useState([]);
    //this is the state that will hold the value of the input
    const [filteredCards, setFilteredCards] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {search, setSearch, cartCount, setCartCount, addedCards, setAddedCards, currPage, setCurrPage, currPages, setCurrPages} = useContext(MarketplaceContext)
    console.log("page#",currPage)

    let lowerBound = 0

    if(currPage !== 1){
      lowerBound = 16*(currPage - 1)
    }

    useEffect(() => {
      fetchCards();
    }, []);
  
    useEffect(() => {
      setCartCount(cart.length)
    }, [cart])

    const handlePaginationClick = (clickedButton) => {
      if(clickedButton === "Prev" && currPages[0] !== 1){
        setCurrPages(currPages.map((page) => page - 1))
        setCurrPage(currPages[0] - 1)
        console.log(currPages, currPage)
      }
      else if(clickedButton === "Next"){
        setCurrPages(currPages.map((page) => page + 1))
        setCurrPage(currPages[currPages.length - 1] + 1)
        console.log(currPages, currPage)
      }
      else{
        setCurrPage(clickedButton)
        console.log(currPage)

      }
    }

    const fetchCards = () => {
      setLoading(true);
      fetch(`https://api.pokemontcg.io/v2/cards?orderBy=name`)
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
        card.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredCards(filtered);
    }, [search, cards]);
  
  

    console.log(addedCards)
  
    const handleCart = (card) => {
      if (cart.some((item) => item.id === card.id)) {
        setCart(cart.filter((item) => item.id !== card.id));
        setAddedCards(addedCards.filter((addedCardsID) => addedCardsID !== card.id))
      } else {
        setCart([...cart, card]);
        setAddedCards([...addedCards, card.id])

      }
    };

    return (
        <div id="container" className="h-100 w-100 d-flex flex-column">
            <div id="mainNavMarketplace" style={{marginBottom:"130px"}}>
                <MainNavbarMarketplace
/>
            </div>



            <div id="marketplace-search-container" className="w-100 h-100 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}>
            <p className="text-center">Search Results:</p>
            <div id="search-results-container" className="h-100 w-100  " style={loading ? {}: {overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: "1em", gridTemplateRows: "1fr 1fr"}}>

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
                                addedCards.includes(card.id)
                                    ? "btn-danger"
                                    : "btn-primary"
                                }`}
                                onClick={() => handleCart(card)}
                            >

                                {addedCards.includes(card.id)
                                ? "Remove from Cart"
                                : "Add to Cart"}
                            </button>
                            </Card.Body>
                        </Card>
                        );
                    }).slice(lowerBound ,16 * (currPage))
                    )}



            </div>
            <div className="d-flex flex-row justify-content-center w-100 pt-5">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${currPages[0] === 1 ? "disabled": ""}`} onClick={() => handlePaginationClick("Prev")}>
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        {currPages.map((page) => 
                          (<li className={`page-item ${currPage===page ? 'active' : ''}`} onClick={() => handlePaginationClick(page)}><a className="page-link" href="#">{page}</a></li>)
                        )}
                            <li className="page-item" onClick={() => handlePaginationClick("Next")}>
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