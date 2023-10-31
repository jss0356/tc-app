import React, { useContext } from "react";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { MarketplaceContext } from "../app/MarketplaceProvider";
function CartLogic({ cart, setCart, cartQuantity, setCartQuantity }) {

  const {setCartCount} = useContext(MarketplaceContext);

  const calculateTotalPrice = () => {
    return cart.reduce((total, card) => {
      console.log("DA CARD", card)
      const cardPrice = card.listingPrice || 0;
      return total + cardPrice;
    }, 0);
  };
  // const [editCardQuantity, setEditCardQuantity] = useState([]);
  // const handleEditQuantity = (cardID) => {
  //   setEditCardQuantity(cardID);
  // };

  // const handleSaveQuantity = (cardID) => {
  //   setEditCardQuantity(null);
  // };
  const removeCardFromCart = (cardID) => {
    setCart(cart.filter((card) => card.listingID !== cardID));
    setCartCount((prev) => prev - 1);
  };
  const handleEditQuantityInputChange = (cardID, quantity) => {
    setCartQuantity({ ...cartQuantity, [cardID]: quantity });
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((card) => (
              <>
              <li key={card.id} className="list-group-item mb-3">
                {/* <div className="d-flex align-items-center"> */}
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={card.images.small}
                      alt={card.name}
                      className="card-image img-fluid"
                    />
                  </div>

                  <div className="col-md-2">
                    <h5 className="mb-0">Product</h5>
                    <p className="mb-0">
                      {card.name}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <h5 className="mb-0">Seller Email</h5>
                    <p className="mb-0">
                      {card.listingEmail}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <h5 className="mb-0">Grade</h5>
                    <p className="mb-0">
                      {card.listingGrade}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <h5 className="mb-0">Price</h5>
                    <p className="mb-0">
                      ${card.listingPrice}
                    </p>
                  </div>



                  <div className="col-md-2">
                    { (
                      <div className="d-flex align-items-center">
                        {/* <p className="mb-0">Quantity:</p>
                        <p className="mb-0 mr-2">
                          {cartQuantity[card.id] || 0}
                        </p> */}
                        <div className="d-flex flex-column gap-3">
                          {/* <button></button> */}
                          {/* <button
                            className="btn btn-warning"
                            onClick={() => handleEditQuantity(card.id)}
                          >
                            Edit
                          </button> */}
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => removeCardFromCart(card.listingID)}
                          >
                            Remove
                          </button>
                          <LinkContainer to={`/marketplace/cards/${card.id}`}><button className="btn btn-primary">View Product</button></LinkContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* </div> */}
              </li>
              
              
              
              </>
            ))}
          </ul>
          <div className="flex fixed-bottom bg-light p-3 mr-3 text-center">
            <p className="h5">Total Price: ${calculateTotalPrice()}</p>
            <LinkContainer to="/marketplace/payment"><button className='btn mt-3 btn-primary w-25'>Proceed to checkout</button></LinkContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartLogic;
