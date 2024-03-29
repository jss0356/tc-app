import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
const SideBarProductFilters = ({
  filterDropDown,
  setFilterDropDown,
  cards,
  maximumPrice,
  minimumPrice,
  handleMaximumPriceInput,
  handleMinimumPriceInput,
  handleFilterDropDown,
  oneToFivePrice,
  setOneToFivePrice,
  fiveToTenPrice,
  setFiveToTenPrice,
  tenToFifteenPrice,
  setTenToFifteenPrice,
  fifteenToTwentyPrice,
  setFifteenToTwentyPrice,
  twentyToTwentyFivePrice,
  setTwentyToTwentyFivePrice,
  twentyFivePlusPrice,
  setTwentyFivePlusPrice,
  handleOneToFivePrice,
  handleFiveToTenPrice,
  handleTenToFifteenPrice,
  handleFifteenToTwentyPrice,
  handleTwentyToTwentyFivePrice,
  handleTwentyFivePlusPrice,
  minStartPriceListings,
  maxStartPriceListings,
  handleUserListingsMaxPrice,
  handleUserListingsMinPrice,
  oneToFivePriceListings,
  setOneToFivePriceListings,
  fiveToTenPriceListings,
  setFiveToTenPriceListings,
  tenToFifteenPriceListings,
  setTenToFifteenPriceListings,
  fifteenToTwentyPriceListings,
  setFifteenToTwentyPriceListings,
  twentyToTwentyFivePriceListings,
  setTwentyToTwentyFivePriceListings,
  twentyFivePlusPriceListings,
  setTwentyFivePlusPriceListings,
}) => {
  const [marketPriceFilters, setMarketPriceFilters] = useState(true);
  const switchBetweenFilters = () => {
    setMarketPriceFilters(!marketPriceFilters);
  };
  const [messageForCondition, setMessageForCondition] = useState(false);
  const hoverOnCondition = () => {
    setMessageForCondition(true);
  };
  const hoverOffCondition = () => {
    setMessageForCondition(false);
  };
  const [messageForAvailability, setMessageForAvailability] = useState(false);
  const hoverOnAvailability = () => {
    setMessageForAvailability(true);
  };
  const hoverOffAvailability = () => {
    setMessageForAvailability(false);
  };

  return (
    <div
      className="sidebar"
      style={{ background: "#f8f9fa", padding: "20px", marginRight: "20px" }}
    >
      <h4 className="mb-2">
        {marketPriceFilters
          ? "Market Prices Filters"
          : "User Listing Prices Filters"}
      </h4>
      <button className="btn btn-primary mb-3" onClick={switchBetweenFilters}>
        {marketPriceFilters
          ? "Change to User Listing Prices Filters"
          : "Change to Market Prices Filters"}
      </button>
      {marketPriceFilters ? (
        <div>
          <Form.Group className="mb-2">
            <Form.Label>Price Range</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="Min"
                value={minimumPrice}
                onChange={handleMinimumPriceInput}
                style={{ width: "70px" }}
              />
              <div className="mx-2 text-center">to</div>
              <Form.Control
                type="number"
                placeholder="Max"
                value={maximumPrice}
                onChange={handleMaximumPriceInput}
                style={{ width: "70px" }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$1-$5"
              checked={oneToFivePrice}
              onChange={handleOneToFivePrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$5-$10"
              checked={fiveToTenPrice}
              onChange={handleFiveToTenPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$10-$15"
              checked={tenToFifteenPrice}
              onChange={handleTenToFifteenPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$15-$20"
              checked={fifteenToTwentyPrice}
              onChange={handleFifteenToTwentyPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$20-$25"
              checked={twentyToTwentyFivePrice}
              onChange={handleTwentyToTwentyFivePrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$25+"
              checked={twentyFivePlusPrice}
              onChange={handleTwentyFivePlusPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Set</Form.Label>
            <Form.Control
              as="select"
              value={filterDropDown}
              onChange={handleFilterDropDown}
              style={{ width: "150px" }}
            >
              <option value="All">All Sets</option>
              {cards?.map((card) => (
                <option key={card.id} value={card.set.name}>
                  {card.set.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>{" "}
        </div>
      ) : (
        <div>
          {/* <h4 className="mt-2">Filters For User Listings</h4> */}
          <div
            onMouseEnter={hoverOnAvailability}
            onMouseLeave={hoverOffAvailability}
          >
            <Form.Label className="mt-3">Availability</Form.Label>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Available" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Not Available" />
            </Form.Group>
          </div>
          {messageForAvailability && (
            <div
              className="text-center justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(200, 0, 0, 1)",
                color: "white",
                borderRadius: "2px",
                zIndex: 1,
              }}
            >
              <p>Availability filter currently unavailable</p>
            </div>
          )}
          <div onMouseEnter={hoverOnCondition} onMouseLeave={hoverOffCondition}>
            <Form.Label className="mt-3">Condition</Form.Label>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Near Mint" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Lighly Played" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Moderately Played" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Heavly Played" />
            </Form.Group>
          </div>
          {messageForCondition && (
            <div
              className="text-center justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(200, 0, 0, 1)",
                color: "white",
                borderRadius: "2px",
                zIndex: 1,
              }}
            >
              <p>condition filter currently unavailable</p>
            </div>
          )}
          <Form.Group className="mb-2">
            <Form.Label>Price Range</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="Min"
                value={minStartPriceListings}
                onChange={handleUserListingsMinPrice}
                style={{ width: "70px" }}
              />
              <div className="mx-2 text-center">to</div>
              <Form.Control
                type="number"
                placeholder="Max"
                value={maxStartPriceListings}
                onChange={handleUserListingsMaxPrice}
                style={{ width: "70px" }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$1-$5"
              checked={oneToFivePriceListings}
              onChange={(e) => setOneToFivePriceListings(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$5-$10"
              checked={fiveToTenPriceListings}
              onChange={(e) => setFiveToTenPriceListings(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$10-$15"
              checked={tenToFifteenPriceListings}
              onChange={(e) => setTenToFifteenPriceListings(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$15-$20"
              checked={fifteenToTwentyPriceListings}
              onChange={(e) =>
                setFifteenToTwentyPriceListings(e.target.checked)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$20-$25"
              checked={twentyToTwentyFivePriceListings}
              onChange={(e) =>
                setTwentyToTwentyFivePriceListings(e.target.checked)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="$25+"
              checked={twentyFivePlusPriceListings}
              onChange={(e) => setTwentyFivePlusPriceListings(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Set</Form.Label>
            <Form.Control
              as="select"
              value={filterDropDown}
              onChange={handleFilterDropDown}
              style={{ width: "150px" }}
            >
              <option value="All">All Sets</option>
              {cards?.map((card) => (
                <option key={card.id} value={card.set.name}>
                  {card.set.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>{" "}
        </div>
      )}
    </div>
  );
};

export default SideBarProductFilters;
