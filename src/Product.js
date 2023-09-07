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
