import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { MarketplaceContext } from "./app/MarketplaceProvider";
import { Link } from "react-router-dom";
import SideBarProductFilters from "./Rcomponents/SideBarProductFilters";
import ListingDataService from "./services/listings.services";
import { auth } from "./config/firebase";
const MarketplaceSearch = ({
  cart,
  setCart,
  cartQuantity,
  setCartQuantity,
}) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterDropDown, setFilterDropDown] = useState("All");
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(0);

  const [oneToFivePrice, setOneToFivePrice] = useState(false);
  const [fiveToTenPrice, setFiveToTenPrice] = useState(false);
  const [tenToFifteenPrice, setTenToFifteenPrice] = useState(false);
  const [fifteenToTwentyPrice, setFifteenToTwentyPrice] = useState(false);
  const [twentyToTwentyFivePrice, setTwentyToTwentyFivePrice] = useState(false);
  const [twentyFivePlusPrice, setTwentyFivePlusPrice] = useState(false);
  const [minStartPriceListings, setMinStartPriceListings] = useState(0);
  const [maxStartPriceListings, setMaxStartPriceListings] = useState(0);
  const [oneToFivePriceListings, setOneToFivePriceListings] = useState(false);
  const [fiveToTenPriceListings, setFiveToTenPriceListings] = useState(false);
  const [tenToFifteenPriceListings, setTenToFifteenPriceListings] =
    useState(false);
  const [fifteenToTwentyPriceListings, setFifteenToTwentyPriceListings] =
    useState(false);
  const [twentyToTwentyFivePriceListings, setTwentyToTwentyFivePriceListings] =
    useState(false);
  const [twentyFivePlusPriceListings, setTwentyFivePlusPriceListings] =
    useState(false);
  const [recentCards, setRecentCards] = useState([]);
  const {
    search,
    setSearch,
    cartCount,
    setCartCount,
    addedCards,
    setAddedCards,
    currPage,
    setCurrPage,
    currPages,
    setCurrPages,
    cards,
    setCards,
  } = useContext(MarketplaceContext);

  let lowerBound = 0;

  if (currPage !== 1) {
    lowerBound = 16 * (currPage - 1);
  }

  useEffect(() => {
    if (cards.length === 0) {
      fetchCards();
    }
  }, []);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const handlePaginationClick = (clickedButton) => {
    if (clickedButton === "Prev" && currPages[0] !== 1) {
      setCurrPages(currPages.map((page) => page - 1));
      setCurrPage(currPages[0] - 1);
      console.log(currPages, currPage);
    } else if (clickedButton === "Next") {
      setCurrPages(currPages.map((page) => page + 1));
      setCurrPage(currPages[currPages.length - 1] + 1);
      console.log(currPages, currPage);
    } else {
      setCurrPage(clickedButton);
      console.log(currPage);
    }
  };

  const fetchAllListingsPrice = async (cardList) => {
    let startingPriceListings;
    try {
      startingPriceListings = await ListingDataService.getStartingPrices(
        auth.currentUser.email
      );
    } catch (err) {
      console.error(err);
    }

    cardList.forEach((card, index) => {
      const foundStartingPriceListing = startingPriceListings.find(
        (listing) => listing.productID === card.id
      );

      console.log(foundStartingPriceListing, "FOUND");

      if (foundStartingPriceListing !== undefined) {
        cardList[index].startingPrice = "$" + foundStartingPriceListing.Price;
      } else {
        cardList[index].startingPrice = "No Listings.";
      }
    });
  };

  const fetchCards = () => {
    setLoading(true);

    fetch(`https://api.pokemontcg.io/v2/cards`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Done getting data");
        if (cards.length === 0) {
          console.log(cards);
          setCards(data.data);
        }
        return data.data;
      })
      .then((cardList) => {
        console.log("fetching prices");

        return fetchAllListingsPrice(cardList);
      })
      .then((result) => {
        console.log("done fetching prices");

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  function handleChange(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const filtered = cards.filter((card) => {
      const priceOfCard = card?.tcgplayer?.prices?.holofoil?.market;
      const priceOfCardForListings = parseFloat(
        (card.startingPrice || "").replace("$", "")
      );
      const inputFilter =
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        search.trim() === "";
      const allSetsFilter = filterDropDown === "All";

      const oneToFivePriceRangeFilter = oneToFivePrice
        ? priceOfCard >= 1 && priceOfCard <= 5
        : true;

      const fiveToTenPriceRangeFilter = fiveToTenPrice
        ? priceOfCard >= 5 && priceOfCard <= 10
        : true;

      const tenToFifteenPriceRangeFilter = tenToFifteenPrice
        ? priceOfCard >= 10 && priceOfCard <= 15
        : true;

      const fifteenToTwentyPriceRangeFilter = fifteenToTwentyPrice
        ? priceOfCard >= 15 && priceOfCard <= 20
        : true;

      const twentyToTwentyFivePriceRangeFilter = twentyToTwentyFivePrice
        ? priceOfCard >= 20 && priceOfCard <= 25
        : true;

      const twentyFivePlusPriceRangeFilter = twentyFivePlusPrice
        ? priceOfCard >= 25
        : true;

      const oneToFivePriceRangeFilterListings = oneToFivePriceListings
        ? priceOfCardForListings >= 1 && priceOfCardForListings <= 5
        : true;

      const fiveToTenPriceRangeFilterListings = fiveToTenPriceListings
        ? priceOfCardForListings >= 5 && priceOfCardForListings <= 10
        : true;

      const tenToFifteenPriceRangeFilterListings = tenToFifteenPriceListings
        ? priceOfCardForListings >= 10 && priceOfCardForListings <= 15
        : true;

      const fifteenToTwentyPriceRangeFilterListings =
        fifteenToTwentyPriceListings
          ? priceOfCardForListings >= 15 && priceOfCardForListings <= 20
          : true;

      const twentyToTwentyFivePriceRangeFilterListings =
        twentyToTwentyFivePriceListings
          ? priceOfCardForListings >= 20 && priceOfCardForListings <= 25
          : true;

      const twentyFivePlusPriceRangeFilterListings = twentyFivePlusPriceListings
        ? priceOfCardForListings >= 25
        : true;

      const startingPriceFilter =
        (!minStartPriceListings ||
          minStartPriceListings === 0 ||
          minStartPriceListings <= priceOfCardForListings) &&
        (!maxStartPriceListings ||
          maxStartPriceListings === 0 ||
          maxStartPriceListings >= priceOfCardForListings);

      if (allSetsFilter) {
        return (
          inputFilter &&
          oneToFivePriceRangeFilter &&
          fiveToTenPriceRangeFilter &&
          tenToFifteenPriceRangeFilter &&
          fifteenToTwentyPriceRangeFilter &&
          twentyToTwentyFivePriceRangeFilter &&
          twentyFivePlusPriceRangeFilter &&
          oneToFivePriceRangeFilterListings &&
          fiveToTenPriceRangeFilterListings &&
          tenToFifteenPriceRangeFilterListings &&
          fifteenToTwentyPriceRangeFilterListings &&
          twentyToTwentyFivePriceRangeFilterListings &&
          twentyFivePlusPriceRangeFilterListings &&
          startingPriceFilter &&
          (!minimumPrice ||
            minimumPrice === 0 ||
            minimumPrice <= priceOfCard) &&
          (!maximumPrice || maximumPrice === 0 || maximumPrice >= priceOfCard)
        );
      } else {
        const dropDownSetFilter = card?.set?.name === filterDropDown;
        return (
          inputFilter &&
          oneToFivePriceRangeFilter &&
          fiveToTenPriceRangeFilter &&
          tenToFifteenPriceRangeFilter &&
          fifteenToTwentyPriceRangeFilter &&
          twentyToTwentyFivePriceRangeFilter &&
          twentyFivePlusPriceRangeFilter &&
          oneToFivePriceRangeFilterListings &&
          fiveToTenPriceRangeFilterListings &&
          tenToFifteenPriceRangeFilterListings &&
          fifteenToTwentyPriceRangeFilterListings &&
          twentyToTwentyFivePriceRangeFilterListings &&
          twentyFivePlusPriceRangeFilterListings &&
          startingPriceFilter &&
          dropDownSetFilter &&
          (!minimumPrice ||
            minimumPrice === 0 ||
            minimumPrice <= priceOfCard) &&
          (!maximumPrice || maximumPrice === 0 || maximumPrice >= priceOfCard)
        );
      }
    });
    setFilteredCards(
      filtered.sort((a, b) => {
        if (a.name < b.name) {
          // console.log(a.name, b.name);
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );
  }, [
    search,
    cards,
    filterDropDown,
    minimumPrice,
    maximumPrice,
    oneToFivePrice,
    fiveToTenPrice,
    tenToFifteenPrice,
    fifteenToTwentyPrice,
    twentyToTwentyFivePrice,
    twentyFivePlusPrice,
    minStartPriceListings,
    maxStartPriceListings,
    oneToFivePriceListings,
    fiveToTenPriceListings,
    tenToFifteenPriceListings,
    fifteenToTwentyPriceListings,
    twentyToTwentyFivePriceListings,
    twentyFivePlusPriceListings,
  ]);

  console.log(addedCards);

  const handleCart = (card) => {
    if (cart.some((item) => item.id === card.id)) {
      setCart(cart.filter((item) => item.id !== card.id));
      setAddedCards(
        addedCards.filter((addedCardsID) => addedCardsID !== card.id)
      );
      setCartQuantity((prevCartQuantity) => {
        const { [card.id]: _, ...rest } = prevCartQuantity;
        return rest;
      });
    } else {
      setCart([...cart, { ...card, cartQuantity: cartQuantity[card.id] || 0 }]);
      setAddedCards([...addedCards, card.id]);
    }
  };

  const handleQuantityInput = (event, cardId) => {
    setCartQuantity((prevQuantity) => ({
      ...prevQuantity,
      [cardId]: parseInt(event.target.value) || 0,
    }));
  };

  const handleAddingQuantity = (card) => {
    if (cart.some((item) => item.id === card.id)) {
      setCart(
        ([...cart][cart.some((item) => item.id === card.id)].cartQuantity =
          +parseInt(cartQuantity))
      );
    } else {
      setCart([...cart, { ...card, cartQuantity: parseInt(cartQuantity) }]);
    }
  };

  function handleFilterDropDown(e) {
    setFilterDropDown(e.target.value);
  }

  const handleMaximumPriceInput = (event) => {
    setMaximumPrice(event.target.value);
  };

  const handleMinimumPriceInput = (event) => {
    setMinimumPrice(event.target.value);
  };

  const handleOneToFivePrice = (event) => {
    setOneToFivePrice(event.target.checked);
  };

  const handleFiveToTenPrice = (event) => {
    setFiveToTenPrice(event.target.checked);
  };

  const handleTenToFifteenPrice = (event) => {
    setTenToFifteenPrice(event.target.checked);
  };

  const handleFifteenToTwentyPrice = (event) => {
    setFifteenToTwentyPrice(event.target.checked);
  };

  const handleTwentyToTwentyFivePrice = (event) => {
    setTwentyToTwentyFivePrice(event.target.checked);
  };

  const handleTwentyFivePlusPrice = (event) => {
    setTwentyFivePlusPrice(event.target.checked);
  };

  const handleUserListingsMaxPrice = (event) => {
    setMaxStartPriceListings(event.target.value);
  };

  const handleUserListingsMinPrice = (event) => {
    setMinStartPriceListings(event.target.value);
  };

  const storeCard = (card) => {
    const cardInStorage = JSON.parse(sessionStorage.getItem("recent")) || [];
    setRecentCards(cardInStorage);
  };

  useEffect(() => {
    storeCard();
  }, []);

  const clickToAddToRecent = (card) => {
    const addToStorage = [
      card,
      ...recentCards.filter((c) => c.id !== card.id),
    ].slice(0, 4);
    setRecentCards(addToStorage);
    sessionStorage.setItem("recent", JSON.stringify(addToStorage));
  };

  return (
    <div id="container" className="h-100 w-100 d-flex flex-column">
      <div id="mainNavMarketplace" style={{ marginBottom: "130px" }}>
        <MainNavbarMarketplace
          cards={cards}
          setCards={setCards}
          filterDropDown={filterDropDown}
          setFilterDropDown={setFilterDropDown}
          handleFilterDropDown={handleFilterDropDown}
          minimumPrice={minimumPrice}
          maximumPrice={maximumPrice}
          handleMinimumPriceInput={handleMinimumPriceInput}
          handleMaximumPriceInput={handleMaximumPriceInput}
          setMinimumPrice={setMinimumPrice}
          setMaximumPrice={setMaximumPrice}
        />
      </div>
      <div className="d-flex flex-row">
        <SideBarProductFilters
          filterDropDown={filterDropDown}
          setFilterDropDown={setFilterDropDown}
          cards={cards}
          maximumPrice={maximumPrice}
          minimumPrice={minimumPrice}
          handleMaximumPriceInput={handleMaximumPriceInput}
          handleMinimumPriceInput={handleMinimumPriceInput}
          handleFilterDropDown={handleFilterDropDown}
          oneToFivePrice={oneToFivePrice}
          setOneToFivePrice={setOneToFivePrice}
          fiveToTenPrice={fiveToTenPrice}
          setFiveToTenPrice={setFiveToTenPrice}
          tenToFifteenPrice={tenToFifteenPrice}
          setTenToFifteenPrice={setTenToFifteenPrice}
          fifteenToTwentyPrice={fifteenToTwentyPrice}
          setFifteenToTwentyPrice={setFifteenToTwentyPrice}
          twentyToTwentyFivePrice={twentyToTwentyFivePrice}
          setTwentyToTwentyFivePrice={setTwentyToTwentyFivePrice}
          twentyFivePlusPrice={twentyFivePlusPrice}
          setTwentyFivePlusPrice={setTwentyFivePlusPrice}
          handleOneToFivePrice={handleOneToFivePrice}
          handleFiveToTenPrice={handleFiveToTenPrice}
          handleTenToFifteenPrice={handleTenToFifteenPrice}
          handleFifteenToTwentyPrice={handleFifteenToTwentyPrice}
          handleTwentyToTwentyFivePrice={handleTwentyToTwentyFivePrice}
          handleTwentyFivePlusPrice={handleTwentyFivePlusPrice}
          minStartPriceListings={minStartPriceListings}
          maxStartPriceListings={maxStartPriceListings}
          handleUserListingsMaxPrice={handleUserListingsMaxPrice}
          handleUserListingsMinPrice={handleUserListingsMinPrice}
          oneToFivePriceListings={oneToFivePriceListings}
          setOneToFivePriceListings={setOneToFivePriceListings}
          fiveToTenPriceListings={fiveToTenPriceListings}
          setFiveToTenPriceListings={setFiveToTenPriceListings}
          tenToFifteenPriceListings={tenToFifteenPriceListings}
          setTenToFifteenPriceListings={setTenToFifteenPriceListings}
          fifteenToTwentyPriceListings={fifteenToTwentyPriceListings}
          setFifteenToTwentyPriceListings={setFifteenToTwentyPriceListings}
          twentyToTwentyFivePriceListings={twentyToTwentyFivePriceListings}
          setTwentyToTwentyFivePriceListings={
            setTwentyToTwentyFivePriceListings
          }
          twentyFivePlusPriceListings={twentyFivePlusPriceListings}
          setTwentyFivePlusPriceListings={setTwentyFivePlusPriceListings}
        />
        <div
          id="marketplace-search-container"
          className="w-100 h-100 d-flex flex-column"
          style={{ backgroundColor: "#edf5e1" }}
        >
          <p className="text-center">Search Results:</p>
          <div
            id="search-results-container"
            className="h-100 w-100  "
            style={
              loading
                ? {}
                : {
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                    gap: "1em",
                    gridTemplateRows: "1fr 1fr",
                  }
            }
          >
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
              filteredCards
                .map((card) => {
                  return (
                    <Card
                      key={card.id}
                      className="card-item"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        transition: "box-shadow 10s",
                        ":hover": {
                          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Link
                        to={`/marketplace/cards/${card.id}`}
                        key={card.id}
                        className="card-link"
                      >
                        <Card.Img
                          variant="top"
                          src={card.images.small}
                          alt={card.name}
                          style={{ height: "auto", width: "100%" }}
                          onClick={() => clickToAddToRecent(card)}
                        />
                      </Link>

                      <Card.Body>
                        <Card.Title className="card-name">
                          {card.name}
                        </Card.Title>
                        <p>
                          Market Price:${""}
                          {card?.tcgplayer?.prices?.holofoil?.market}
                        </p>
                        <Card.Text
                          style={
                            card.startingPrice === "No Listings."
                              ? { fontWeight: "bold" }
                              : {}
                          }
                          className={`card-price ${
                            card.startingPrice === "No Listings."
                              ? "text-danger"
                              : ""
                          }`}
                        >
                          {card.startingPrice === "No Listings." ? (
                            card.startingPrice
                          ) : (
                            <p>
                              Starting from:{" "}
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                  color: "rgb(92, 219, 149)",
                                }}
                              >
                                {card.startingPrice}
                              </span>
                            </p>
                          )}
                        </Card.Text>
                        {/* <input
                        className="mb-2"
                        type="number"
                        placeholder="quantity"
                        style={{ width: "95px" }}
                        value={cartQuantity[card.id] || 0}
                        onChange={(event) =>
                          handleQuantityInput(event, card.id)
                        }
                        key={`quantity-input-${card.id}`}
                      />
                      <button
                        //className="btn btn-primary add-to-cart-btn"
                        className={`btn ${
                          addedCards.includes(card.id)
                            ? "btn-danger"
                            : "btn-primary"
                        }`}
                        onClick={() => {
                          handleCart(card);
                          handleAddingQuantity(card);
                        }}
                      >
                        {addedCards.includes(card.id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button> */}
                      </Card.Body>
                    </Card>
                  );
                })
                .slice(lowerBound, 16 * currPage)
            )}
          </div>
          <div className="d-flex flex-row justify-content-center w-100 pt-5">
            <nav aria-label="...">
              <ul className="pagination">
                <li
                  className={`page-item ${
                    currPages[0] === 1 ? "disabled" : ""
                  }`}
                  onClick={() => handlePaginationClick("Prev")}
                >
                  <a className="page-link" href="#" tabIndex="-1">
                    Previous
                  </a>
                </li>
                {currPages.map((page) => (
                  <li
                    className={`page-item ${currPage === page ? "active" : ""}`}
                    onClick={() => handlePaginationClick(page)}
                  >
                    <a className="page-link" href="#">
                      {page}
                    </a>
                  </li>
                ))}
                <li
                  className="page-item"
                  onClick={() => handlePaginationClick("Next")}
                >
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h3 style={{ marginLeft: "20px" }}>Recently Viewed Cards</h3>
            <div className="d-flex flex-wrap">
              {recentCards.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {recentCards.map((card) => (
                    <Card
                      key={card.id}
                      className="card-item"
                      style={{
                        width: "200px",
                        cursor: "pointer",
                        margin: "8px",
                        transition: "box-shadow 10s",
                        ":hover": {
                          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                      alt={card.name}
                      onClick={() => clickToAddToRecent(card)}
                    >
                      <Link
                        to={`/marketplace/cards/${card.id}`}
                        className="card-link"
                      >
                        <Card.Img
                          variant="top"
                          src={card.images.small}
                          alt={card.name}
                          style={{ height: "auto", width: "100%" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="card-name">
                          {card.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div
                  className="justify-content-center align-items-center d-flex"
                  style={{ textAlign: "center", marginLeft: "20px" }}
                >
                  <p>No cards recently viewed.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSearch;
