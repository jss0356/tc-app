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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Product = () => {
  const { productID } = useParams();
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const individualCardDetails = () => {
    setLoading(true);
    fetch(`https://api.pokemontcg.io/v2/cards/${productID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCard(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    individualCardDetails();
  }, []);

  if (!loading) {
    console.log({ card });
  }

  const options = {responsive: true,
    maintainAspectRatio: true
  };
  const data = {
    labels: ["low", "mid", "high", "market", "direct low"],
    datasets: [
      {
        label: "Card Prices",
        data: [
          card.tcgplayer?.prices?.holofoil?.low || 0,
          card.tcgplayer?.prices?.holofoil?.mid || 0,
          card.tcgplayer?.prices?.holofoil?.high || 0,
          card.tcgplayer?.prices?.holofoil?.market || 0,
          card.tcgplayer?.prices?.holofoil?.directLow || 0,
        ],
        backgroundColor: "rgba(70, 184, 184, 0.2)",
        borderWidth: 2,
      },
    ],
  };

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
                ${card?.cardmarket?.prices?.averageSellPrice}
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
      <div className="d-flex flex-row w-100">
        {card.tcgplayer?.prices?.holofoil ? (
          
          <div className="chart-container h-25 w-100">
            <h2 className="text-center">Price Over Time</h2>
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

          <div className="w-75 d-flex justify-content-between align-items-center p-3" style={{background: "white", borderRadius: "20px", boxShadow: "1px 1px 3px black"}}>
              
              <img src={UserIcon} alt="Profile Image" width={100} height={100} style={{width: "10%", height: "auto"}}/>
              <div id="lister-email" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Seller Email</div>
                <div>xyz@gmail.com</div>
              </div>
              <div id="grade" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Grade</div>
                <div>PSA 9</div>
              </div>
              <div id="price" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Price</div>
                <div>$8.99</div>
              </div>
              <img src={ShoppingCartIcon} alt="Profile Image" width={100} height={100} style={{width: "7%", height: "auto"}}/>

            </div>
            <div className="w-75 d-flex justify-content-between align-items-center p-3" style={{background: "white", borderRadius: "20px", boxShadow: "1px 1px 3px black"}}>
              
              <img src={UserIcon} alt="Profile Image" width={100} height={100} style={{width: "10%", height: "auto"}}/>
              <div id="lister-email" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Seller Email</div>
                <div>xyz@gmail.com</div>
              </div>
              <div id="grade" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Grade</div>
                <div>PSA 9</div>
              </div>
              <div id="price" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold"}}>Price</div>
                <div>$8.99</div>
              </div>
              <img src={ShoppingCartIcon} alt="Profile Image" width={100} height={100} style={{width: "7%", height: "auto"}}/>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Product;
