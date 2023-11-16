import React from "react";
import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";
import add from "./logos/Add-Icon.png";
import { useState } from "react";
const WatchList = ({ watchlist, setWatchlist }) => {
  const removeCard = (cardId) => {
    setWatchlist(watchlist.filter((card) => card.id !== cardId));
  };
  const [quickAddMessage, setQuickAddMessage] = useState(false);

  const handleMouseEnter = () => {
    setQuickAddMessage(true);
  };

  const handleMouseLeave = () => {
    setQuickAddMessage(false);
  };
  return (
    <div>
      <MainNavbarMarketplace />
      <Container style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginTop: "70px" }}>Watchlist</h2>
        <Row>
          {watchlist.map((card) => (
            <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ margin: "20px", maxWidth: "300px" }}>
                <LinkContainer
                  to={`/marketplace/cards/${card.id}`}
                  key={card.id}
                  className="card-link"
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img src={card?.images?.small} alt="Card" />
                </LinkContainer>

                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* <Card.Title>{card.name}</Card.Title> */}
                    <div>
                      <h5>${card?.tcgplayer?.prices?.holofoil?.market}</h5>
                      <p>Free Shipping</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCard(card.id)}
                    >
                      Remove
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <LinkContainer to="/marketplace/search-results">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={add}
                  alt="Add"
                  style={{
                    width: "50px",
                  }}
                />
                {quickAddMessage && (
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      zIndex: 1,
                      top: "30%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <p>Add a card to your watchlist</p>
                  </div>
                )}
              </div>
            </LinkContainer>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default WatchList;
