import React from "react";
import { Form, Button } from "react-bootstrap";

const SideBarProductFilters = ({
  filterDropDown,
  setFilterDropDown,
  cards,
  maximumPrice,
  minimumPrice,
  handleMaximumPriceInput,
  handleMinimumPriceInput,
  handleFilterDropDown,
}) => {
  return (
    <div
      className="sidebar"
      style={{ background: "#f8f9fa", padding: "20px", marginRight: "20px" }}
    >
      <h4 className="mb-2">Filters</h4>
      <Form.Group className="mb-2">
        <Form.Label>Price Range</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="number"
            placeholder="Min"
            value={minimumPrice}
            onChange={handleMinimumPriceInput}
            style={{ width: "70px" }}
          />
          <div className="mx-2">to</div>
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
      </Form.Group>
    </div>
  );
};

export default SideBarProductFilters;
