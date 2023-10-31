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

import ListingsDataService from './services/listings.services'

import UserIcon from './logos/default-profile.jpg'

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
  Legend
);

const Product = ({cart, setCart}) => {
  const { productID } = useParams();
  const [card, setCard] = useState([]);
  const [listings, setListings] = useState([])
  const [listingPrices, setListingPrices] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [average, setAverage] = useState(0);

  const [more, setMore] = useState(true);

  const [currRender, setCurrRender] = useState(1);

const fetchMoreListings = async () => {
  if(listings.length < 3){
    const listingsResult = await ListingsDataService.getListingsByProductID(productID, currRender)
  setCurrRender((prev) => prev + 1);
  setListings(listingsResult.sort((a, b) => a.Price - b.Price))
  }
  else{
    setMore(false);
  }

}
 
const fetchAllListings = async (productID) => {
  console.log("EXECUTING")
  const listingsResult = await ListingsDataService.getListingsByProductID(productID)
  const allListings = await ListingsDataService.getAllListings(productID)
  setCurrRender(2)
  if(listingsResult.length === 0 || allListings.length === 0){
    return
  }
  
  setListings(listingsResult.sort((a, b) => a.Price - b.Price))
  setListingPrices(allListings.map((listing) => ({Price: listing.Price, isStartingPrice: listing.isStartingPrice})))
  console.log("RESULT", allListings.map((listing) => ({Price: listing.Price, isStartingPrice: listing.isStartingPrice})))
}

  const individualCardDetails = () => {
    setLoading(true);
    fetch(`https://api.pokemontcg.io/v2/cards/${productID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setCard(data.data);
        return data.data
        
      })
      .then((card) => {
        fetchAllListings(card.id).then((listingsResult) => {
          setLoading(false)
        })
      })   
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    individualCardDetails();
  }, []);



  const determineStartingFrom = () => {
    if(listingPrices.length !== 0){
      const listing = listingPrices.find((listing) => listing.isStartingPrice === true)
      return "$"+ String(listing.Price);
    }
    return "N/A"
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

  useEffect(() => {
    if(!loading){
      determineStartingFrom();
      determineChartPrices();
    }
  }, [loading])

  if (!loading) {
    console.log({ card });
  }

  const options = {responsive: true,
    maintainAspectRatio: true
  };
  const data = {
    labels: ["low", "high", "average", "market"],
    datasets: [
      {
        label: "Card Prices",
        data: [
          low || 0,
          high || 0,
          average || 0,
          card.tcgplayer?.prices?.holofoil?.market || 0,
        ],
        backgroundColor: "rgba(70, 184, 184, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  console.log(cart)
  const [cardHoverEffect, setCardHoverEffect] = useState(false);

  const [hoverEffectStyle, setCardHoverEffectStyle] = useState({
  width: "80%", 
  padding: "1rem",
  transition: "all 0.5s ease",
  transform: cardHoverEffect ? "scale(1)" : "scale(1)",
  boxShadow: cardHoverEffect ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
  cursor: cardHoverEffect ? "pointer" : "default"})

 


  const handleHoverOverCard = (e) => {
    setCardHoverEffect(true);
  };

  const handleMouseMove = (e) => {
    console.log("CLIENT X: ", e.clientX);
    console.log("CLIENT Y: ", e.clientY);
    const dampeningFactor = 0.13;
    setCardHoverEffectStyle({...hoverEffectStyle, transform: `rotateX(${(e.clientY-300) * dampeningFactor}deg) rotateY(${(e.clientX-190) * dampeningFactor}deg)`})
    
  }

  const handleHoverOffCard = () => {
    setCardHoverEffect(false);
  };


  const nonHoverEffectStyle = {
    transition: "all 0.5s ease",
    width: "60%",
  }

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
                <h2>{card.name}</h2>
                <span className="px-2">{card.subtypes}</span>
              </div>
              <div className="d-flex flex-row w-100 justify-content-center align-items-center">

                <div className="px-2" style={{fontWeight: "bold"}}>
                  Starting from:
                </div>
                <div style={{fontSize: "2rem"}} className="text-green">
                {determineStartingFrom()}
                </div>
                 
              </div>
              <img
                src={card.images?.small}
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
              {card?.types?.map((type) => (
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

              {card?.weaknesses?.map((weakness) => (
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
                  {card?.hp}HP
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 justify-content-center">
            <div className="setContainer align-items-center d-flex">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Set:
              </span>
              <img
                src={card?.set?.images?.symbol}
                alt="set logo"
                style={{ width: "50px", height: "auto", marginLeft: "0.5em" }}
              />
              <p className="mb-0">{card?.set?.name}</p>
            </div>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Artist:
              </span>{" "}
              {card?.artist}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Release Date:
              </span>{" "}
              {card?.set?.releaseDate}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "bold", fontSize: "1.1.rem" }}>
                Printed Total: </span> {card?.set?.printedTotal}
            </p>
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
        {card.tcgplayer?.prices?.holofoil ? (
          
          <div className="chart-container h-25 w-100">
            <h2 className="text-center">Price Statistics (In USD)</h2>
                <Bar data={data} options={options} />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner
                  animation="border"
                  variant="primary"
                  className="custom-spinner spinner-lg w-20 h-20"
                />
                <span className="loading-message fs-4">
                  Loading Card Details...
                </span>
              </div>
            )}

          <div id="selling-listings" className="w-100 h-100 d-flex gap-2 flex-column align-items-center m-2">
          <h2 className="text-center">Listings</h2>
            {!loading && 
            
           

            listings.map((listing) => (
              <>
                <Listing listingID={listing.listingID} sellerEmail={listing.sellerEmail} Grade={listing.Grade} Price={listing.Price} cart={cart} setCart={setCart} productID={productID} card={card}/>

              
              </>
                        
            ))

            }
   
          </div>

        </div>

      </div>

    </div>
  );
};

export default Product;
