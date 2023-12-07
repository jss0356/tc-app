import { useParams } from "react-router-dom";
import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace";
import SampleProductImage from "./image/baseball/card1.jpg";
import ShadedLineGraph from "./image/ShadedLineGraph.png";
import RatingStarFilled from "./logos/RatingStarFull.png";
import ShoppingCartIcon from "./logos/ShoppingCartIcon.png";
import AuctionIcon from "./logos/MarketplaceUploadIcon.png";
import { useState } from "react";
import { useEffect } from "react";
import LineGraph from "./Rcomponents/LineGraph";
import ListingsDataService from "./services/listings.services";
import UserIcon from "./logos/default-profile.jpg";
import { MarketplaceContext } from "./app/MarketplaceProvider";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import {
  app,
  firestore,
  auth,
  storage,
  signInWithGoogle,
} from "./config/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import pokemonTypes from "./constants/pokemonTypes";
import Listing from "./Rcomponents/Listing";
import InfiniteScroll from "react-infinite-scroller";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const Product = ({ cart, setCart, watchlist, setWatchlist }) => {
  const { productID } = useParams();
  const [productInfo, setProductInfo] = useState([]);
  const [listings, setListings] = useState([]);
  const [listingPrices, setListingPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [average, setAverage] = useState(0);
  const [pricesOverTime, setPricesOverTime] = useState([]);
  const [cardToCompareWith, setCardToCompareWith] = useState(null);
  const [popUpSectionToCompare, setPopUpSectionToCompare] = useState(false);
  const { cards, setCards } = useContext(MarketplaceContext);

  const openPopUpSectionToCompare = (card) => {
    setCardToCompareWith(card);
    setPopUpSectionToCompare(true);
  };

  const closePopUpSectionToCompare = () => {
    setCardToCompareWith(null);
    setPopUpSectionToCompare(false);
  };

  const handleAddToWatchList = (card) => {
    if (watchlist.some((c) => c.id === card.id)) {
      setWatchlist(watchlist.filter((c) => c.id !== card.id));
    } else {
      setWatchlist([...watchlist, card]);
    }
  };

  const fetchAllListings = async (productID) => {
    const listingsResult = await ListingsDataService.getListingsByProductID(
      productID
    );
    const allListings = await ListingsDataService.getAllListings(productID);
    if (listingsResult.length === 0 || allListings.length === 0) {
      return;
    }
    const allFilteredLisitings = listingsResult.sort((a, b) => a.Price - b.Price).filter((listing) => listing.sellerEmail !== auth.currentUser.email);
    setListings(allFilteredLisitings);
    setListingPrices(
      allFilteredLisitings.map((listing) => ({
        Price: listing.Price,
        isStartingPrice: listing.isStartingPrice,
      }))
    );
    
  };

  async function individualCardDetails(productID) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards/${productID}`
      );
      const data = await response.json();
      setProductInfo(data.data);
      const card = data.data;
      await fetchAllListings(card.id);
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      const currentPrice = data.data.tcgplayer?.prices?.holofoil?.market;

      const docRef = await addDoc(
        collection(firestore, "projectPriceChartData"),
        {
          date: currentDate,
          price: currentPrice,
          productID: productID,
        }
      );
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    finally{
      setError(false)
      setLoading(false)
    }
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    //   setProductInfo(data.data);
    //   return data.data;
    // })
    // .then((card) => {
    //   fetchAllListings(card.id).then((listingsResult) => {
    //     setLoading(false);
    //   });
    // })
    // .catch((error) => {
    //   setError(true);
    //   setLoading(false);
    // });
  }

  useEffect(() => {
    async function retrieveFireStoreData(productID) {
      try {
        await individualCardDetails(productID);

        const querySnapshot = await getDocs(
          query(
            collection(firestore, "projectPriceChartData"),
            where("productID", "==", productID)
          )
        );
        let prices = querySnapshot.docs.map((doc) => doc.data());

        prices.sort((a, b) => new Date(a.date) - new Date(b.date));

        setPricesOverTime(prices);
      } catch (error) {
        console.error("firestore error ", error);
        setError(true);
      }
    }

    retrieveFireStoreData(productID);
  }, [productID]);

  const determineStartingFrom = () => {
    if (listingPrices.length !== 0) {
      const listing = listingPrices.find(
        (listing) => listing.isStartingPrice === true
      );
      return "$" + String(listing.Price);
    }
    return "N/A";
  };

  const determineChartPrices = () => {
    if (listingPrices.length !== 0) {
      const listings = listingPrices.map((listing) => listing.Price);
      //calculate low and high
      let currLow = listings[0];
      let currHigh = listings[0];

      for (const listingPrice of listings) {
        if (currLow > listingPrice) {
          currLow = listingPrice;
        }
        if (currHigh < listingPrice) {
          currHigh = listingPrice;
        }
      }
      setLow(currLow);
      setHigh(currHigh);
      //calculate average.

      const totalPriceSum = listings.reduce((prev, curr) => curr + prev);
      console.log("TOTAL SUM", listings);
      setAverage(totalPriceSum / listings.length);
    }
  };

  useEffect(() => {
    if (!loading) {
      determineStartingFrom();
      determineChartPrices();
    }
  }, [loading]);

  if (!loading) {
    console.log({ card: productInfo });
  }

  const options = { responsive: true, maintainAspectRatio: true };
  const data = {
    labels: ["low", "direct low", "high", "average", "market"],
    datasets: [
      {
        label: "Card Prices",
        data: [
          productInfo.tcgplayer?.prices?.holofoil?.low || 0,
          productInfo.tcgplayer?.prices?.holofoil?.directLow || 0,
          productInfo.tcgplayer?.prices?.holofoil?.high || 0,
          productInfo.tcgplayer?.prices?.holofoil?.mid || 0,
          productInfo.tcgplayer?.prices?.holofoil?.market || 0,
        ],
        backgroundColor: "rgba(70, 184, 184, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  const dataLine = {
    labels: pricesOverTime.map((p) => p.date),
    datasets: [
      {
        //fill: true,
        label: "Price",
        data: pricesOverTime.map((p) => p.price),

        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  console.log(listings);
  const [cardHoverEffect, setCardHoverEffect] = useState(false);

  const [hoverEffectStyle, setCardHoverEffectStyle] = useState({
    width: "80%",
    padding: "1rem",
    transition: "all 0.5s ease",
    transform: cardHoverEffect ? "scale(1)" : "scale(1)",
    boxShadow: cardHoverEffect ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
    cursor: cardHoverEffect ? "pointer" : "default",
  });

  const handleHoverOverCard = (e) => {
    setCardHoverEffect(true);
  };

  const handleMouseMove = (e) => {
    console.log("CLIENT X: ", e.clientX);
    console.log("CLIENT Y: ", e.clientY);
    const dampeningFactor = 0.13;
    setCardHoverEffectStyle({
      ...hoverEffectStyle,
      transform: `rotateX(${(e.clientY - 300) * dampeningFactor}deg) rotateY(${
        (e.clientX - 190) * dampeningFactor
      }deg)`,
    });
  };

  const handleHoverOffCard = () => {
    setCardHoverEffect(false);
  };

  const nonHoverEffectStyle = {
    transition: "all 0.5s ease",
    width: "60%",
  };

  return (
    <div id="container" className="w-100 d-flex flex-column">
      <div id="main-navbar" style={{ marginBottom: "130px" }}>
        <MainNavbarMarketplace />
      </div>

      <div
        id="product-container"
        className="w-100 pb-5 h-100 d-flex flex-column"
        style={{ backgroundColor: "#edf5e1" }}
      >
        <div className="row pt-3">
          <div className="col-md-4 justify-content-center">
            <div
              id="product-image"
              className="d-flex flex-column align-items-center"
            >
              <div className="d-flex align-items-center">
                <h2>{productInfo.name}</h2>
                <span className="px-2">{productInfo.subtypes}</span>
              </div>
              <div className="d-flex flex-row w-100 justify-content-center align-items-center">
                <div className="px-2" style={{ fontWeight: "bold" }}>
                  Starting from:
                </div>
                <div style={{ fontSize: "2rem" }} className="text-green">
                  {determineStartingFrom()}
                </div>
              </div>
              <img
                src={productInfo.images?.small}
                alt="Product"
                width="250px"
                className="pt-2 border rounded"
                style={cardHoverEffect ? hoverEffectStyle : nonHoverEffectStyle}
                onMouseOver={handleHoverOverCard}
                onMouseLeave={handleHoverOffCard}
                onMouseMove={handleMouseMove}
              />
            </div>
          </div>
          <div className="col-md-4 justify-content-center">
            <div className="d-flex flex-column ">
              {productInfo?.types?.map((type) => (
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
                    <p className="text-danger" style={{ fontWeight: "bold" }}>
                      Error, no type available.
                    </p>
                  )}
                </div>
              ))}

              {productInfo?.weaknesses?.map((weakness) => (
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
                  {productInfo?.hp}HP
                </p>
              </div>
              <div>
                <div className="chart-container h-100 w-45">
                  <h2 className="text-center">Price Statistics (In USD)</h2>
                  <Bar data={data} options={options} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 justify-content-center">
            <div className="setContainer align-items-center d-flex">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Set:
              </span>
              <img
                src={productInfo?.set?.images?.symbol}
                alt="set logo"
                style={{ width: "50px", height: "auto", marginLeft: "0.5em" }}
              />
              <p className="mb-0">{productInfo?.set?.name}</p>
            </div>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Artist:
              </span>{" "}
              {productInfo?.artist}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Release Date:
              </span>{" "}
              {productInfo?.set?.releaseDate}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1.rem" }}>
                Printed Total:{" "}
              </span>{" "}
              {productInfo?.set?.printedTotal}
            </p>
            <div className="mt-4">
              <button onClick={() => handleAddToWatchList(productInfo)}>
                {watchlist.some((c) => c.id === productInfo.id) ? (
                  <span className="text-danger">Remove from Watchlist</span>
                ) : (
                  <span className="text-success">Add to Watchlist</span>
                )}
              </button>
            </div>

            <div class="dropdown mt-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuToCompare"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Compare With
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuToCompare">
                <li>
                  {cards &&
                    cards.map((card) => {
                      return (
                        <button
                          class="dropdown-item"
                          type="button"
                          onClick={() => openPopUpSectionToCompare(card)}
                        >
                          {card.name}
                        </button>
                      );
                    })}
                </li>
              </ul>
            </div>

            {popUpSectionToCompare && (
              <Modal
                show={popUpSectionToCompare}
                onHide={closePopUpSectionToCompare}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Compare Cards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <h3>{cardToCompareWith.name}</h3>
                      <img
                        src={cardToCompareWith?.images?.small}
                        alt="Product"
                        width="200px"
                        className="pt-2 border rounded"
                      />
                      {cardToCompareWith?.hp ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            hp:{" "}
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {cardToCompareWith?.hp}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            hp :
                          </span>
                          <span
                            style={{
                              fontSize: " 1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {cardToCompareWith?.types ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            types:{" "}
                          </span>{" "}
                          <span style={{ fontsize: "1.1 rem" }}>
                            {cardToCompareWith?.types}
                          </span>{" "}
                        </p>
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            color: "red",
                          }}
                        >
                          types:
                          <span
                            style={{ fontSize: "1.1rem", fontStyle: "italic" }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {cardToCompareWith?.evolvesTo ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            evolvesTo:
                          </span>{" "}
                          <span style={{ fontSize: "1.1rem" }}>
                            {cardToCompareWith?.evolvesTo}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            evolvesTo:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {cardToCompareWith?.weaknesses?.type ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            weaknesses:{" "}
                          </span>
                          <span>{cardToCompareWith?.weaknesses?.type}</span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            weaknesses:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {cardToCompareWith?.set?.name ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            set:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                            }}
                          >
                            {cardToCompareWith?.set?.name}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            set:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {cardToCompareWith?.tcgplayer?.prices?.holofoil
                        ?.market ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            market price ($):{" "}
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {
                              cardToCompareWith?.tcgplayer?.prices?.holofoil
                                ?.market
                            }
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            market price ($):
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>{" "}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <h3>{productInfo?.name}</h3>
                      <img
                        src={productInfo?.images?.small}
                        alt="Product"
                        width="200px"
                        className="pt-2 border rounded"
                      />
                      {productInfo?.hp ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            hp:{" "}
                          </span>{" "}
                          <span style={{ fontSize: "1.1rem" }}>
                            {productInfo?.hp}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            hp:{" "}
                          </span>{" "}
                          <span
                            style-={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {productInfo?.types ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            types:{" "}
                          </span>{" "}
                          <span style={{ fontSize: "1.1rem" }}>
                            {productInfo?.types}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            types:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}

                      {productInfo?.evolvesTo ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            evolvesTo:
                          </span>{" "}
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            {productInfo?.evolvesTo}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            evolvesTo:
                          </span>
                          <span
                            style={{
                              fontStyle: "italic",
                              fontSize: "1.1rem",
                              color: "red",
                            }}
                          >
                            {" "}
                            N/A
                          </span>
                        </p>
                      )}
                      {productInfo?.weaknesses?.type ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            weaknesses:{" "}
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {productInfo?.weaknesses?.type}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            weaknesses:{" "}
                          </span>
                          <span
                            style={{
                              fontsize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}
                      {productInfo?.set?.name ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            set:{" "}
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {productInfo?.set?.name}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            sets:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}
                      {productInfo?.tcgplayer?.prices?.holofoil?.market ? (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            market price ($):{" "}
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {productInfo?.tcgplayer?.prices?.holofoil?.market}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            market price ($):{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontStyle: "italic",
                              color: "red",
                            }}
                          >
                            N/A
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button onClick={closePopUpSectionToCompare}>Close</button>
                  </div>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
        {/* <div className='w-100 h-100 d-flex flex-row'>
                    <div id="left-display" className='ps-3 h-100 w-100 d-flex flex-column justify-content-center gap-2' >
                        <LineGraph/>

                        
                        <div>
                            <h5 className='d-inline'>Estimated Market Price: </h5>
                            <h3 className='d-inline'>$35.99</h3>
                        </div>
                        <div>
                            <h5 className='d-inline'>PSA-Quality: </h5>
                            <h5 className='d-inline'>PSA-8</h5>
                        </div>
                        <div>
                            <h5 className='d-inline'>Card-Genre: </h5>
                            <h5 className='d-inline'>Baseball</h5>
                        </div>
                        <div>
                            <h5 className='d-inline'>Card-Description: </h5>
                            <h5 className='d-inline'>Baseball</h5>
                        </div>
                        <div>
                            <h5 className='d-inline'>Change in Price(Last Year): </h5>
                            <h5 className='d-inline text-danger'>-$2.00</h5>
                        </div>
                    </div>
                    <div id="right-display" className='h-100 w-100 d-flex flex-column ps-3'>
                        <h1>Selling Listings</h1>
                        <p className="text-center">Listing # | Seller Name | Listing Price | Seller Review | Add to Cart</p>
                        <select className="form-select" aria-labelledby="sort-by">
                            <option value="">Sort-by</option>
                            <option value="lowestPriceFirst">Lowest Price First</option>
                            <option value="highestReviewsFirst">Highest Reviews First</option>
                        </select>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-1</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-1</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/> <img src={ShoppingCartIcon} alt="Add to Cart" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-2</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-2</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$25.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/>  <img src={ShoppingCartIcon} alt="Add to Cart" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-3</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-1</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/>  <img src={ShoppingCartIcon} alt="Add to Cart" width="20px"/> </div>
                            <nav className="pt-2" aria-label="...">
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


                            <h1>Auction Listings</h1>
                            
                        <p className="text-center">Listing # | Seller Name | Current Highest Bid | Seller Review | Place bid</p>
                        <select className="form-select" aria-labelledby="sort-by">
                            <option value="">Sort-by</option>
                            <option value="lowestPriceFirst">Lowest Bid First</option>
                            <option value="highestReviewsFirst">Highest Reviews First</option>
                        </select>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-1</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-4</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/>  <img src={AuctionIcon} alt="Place Bid" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-2</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-2</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$25.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/>  <img src={AuctionIcon} alt="Place Bid" width="20px"/> </div>
                                    <div className="bg-light border border-1 border-dark text-center"> <p className="w-100 d-inline border-1 border-dark" style={{borderLeft:"1px solid black"}}>Listing-3</p> <p className="d-inline" style={{borderRight:"1px solid black", borderLeft:"1px solid black"}}>User-1</p>  <p className="d-inline" style={{borderRight:"1px solid black"}}>$20.00</p> <img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} alt="rating" width="20px"/><img src={RatingStarFilled} style={{borderRight:"1px solid black"}} alt="rating" width="20px"/>  <img src={AuctionIcon} alt="Place Bid" width="20px"/> </div>
                            <nav className="pt-2" aria-label="...">
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
  </div> */}
        <div className="d-flex flex-column w-100">
          <div className="w-100 h-100 d-flex flex-row justify-content-center">
            {/* <div className="chart-container h-100 w-50">
              <h2 className="text-center">Price Statistics (In USD)</h2>
              <Bar data={data} options={options} />
            </div> */}
            <div className="chart-container h-200 w-50">
              <h2 className="text-center">Price History</h2>
              {productInfo?.tcgplayer?.prices?.holofoil?.market ? (
                <p></p>
              ) : (
                <p style={{ fontWeight: "bold" }} className="text-center">
                  This card currently has no price data. No data can be shown on
                  the chart.
                </p>
              )}
              <Line options={options} data={dataLine} />;
            </div>
          </div>

          <div
            id="selling-listings"
            className="w-100 h-100 d-flex gap-2 flex-column align-items-center m-2"
          >
            <h2 className="text-center">Listings</h2>
            {!loading && listings.length > 0 ? (
              listings.map((listing) => {
                console.log(auth.currentUser.email, listing.sellerEmail)
                if(auth.currentUser.email !== listing.sellerEmail){
                  return (
                    <>
                  <Listing
                    listingID={listing.listingID}
                    sellerEmail={listing.sellerEmail}
                    Grade={listing.Grade}
                    Price={listing.Price}
                    cardID={listing.cardID}
                    portfolioID={listing.portfolioID}
                    cart={cart}
                    setCart={setCart}
                    productID={productID}
                    card={productInfo}
                  />
                </>
                  )
                }
                else{
                  return <></>
                }
              })
            ) : (
              <span className="text-danger" style={{ fontWeight: "bold" }}>
                No listings available.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
