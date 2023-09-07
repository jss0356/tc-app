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

  //const cardPrices = card.tcgplayer?.prices?.holofoil;

  const options = {};
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

  return (
    <div id="container" className="w-100 h-100 d-flex flex-column">
      <div id="main-navbar" style={{ marginBottom: "130px" }}>
        <MainNavbarMarketplace />
      </div>

      <div
        id="product-container"
        className="w-100 pb-5 d-flex flex-column"
        style={{ backgroundColor: "#edf5e1" }}
      >
        <div
          id="product-image"
          className=" w-100 d-flex flex-column align-items-center"
          style={{ height: "40%" }}
        >
          <img
            src={card.images?.small}
            alt="Product"
            width="120px"
            className="pt-2 border rounded"
          />
          <h2>{card.name}</h2>
          <p>Prices updated on: {card?.tcgplayer?.updatedAt}</p>
          <p className="m-0">Starting Selling Price: $20</p>
          <p>Starting Bid: $20</p>
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
        <h2>Card Details</h2>
        {card.tcgplayer?.prices?.holofoil ? (
          <div className="chart-container">
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
      </div>
    </div>
  );
};

export default Product;
