import React from "react";

function CartLogic({ cart, setCart, cartQuantity, setCartQuantity }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, card) => {
      const cardPrice = card?.tcgplayer?.prices?.holofoil?.market || 0;
      return total + cardPrice * card.cartQuantity;
    }, 0);
  };

  const removeCardFromCart = (cardID) => {
    setCart(cart.filter((card) => card.id !== cardID));
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
                  <div className="col-md-6">
                    <h5 className="mb-0">{card.name}</h5>
                    <p className="mb-0">
                      ${card?.tcgplayer?.prices?.holofoil?.market}
                    </p>
                  </div>
                  <div className="col-md-2">
                    <p>Quantity: {card.cartQuantity}</p>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCardFromCart(card.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {/* </div> */}
              </li>
            ))}
          </ul>
          <div className="flex fixed-bottom bg-light p-3 mr-3 text-center">
            <p className="h5">Total Price: ${calculateTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartLogic;
