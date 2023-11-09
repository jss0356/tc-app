import React from "react";
import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const WatchList = ({ watchlist, setWatchlist }) => {
  const removeCard = (cardId) => {
    setWatchlist(watchlist.filter((card) => card.id !== cardId));
  };

  return (
    <div>
      <MainNavbarMarketplace />
      <Container style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginTop: "70px" }}>Watchlist</h2>
        <Row>
          {watchlist.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ margin: "20px", maxWidth: "300px" }}>
                <Card.Img src={card.images.small} alt="Card" />
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Card.Title>{card.name}</Card.Title>
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
      </Container>
    </div>
  );
};

export default WatchList;
