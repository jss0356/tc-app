
import { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "../logos/ShoppingCartIcon.png";
import {MdRemoveShoppingCart} from 'react-icons/md'
import {MdShoppingCart} from 'react-icons/md'
import UserIcon from '../logos/default-profile.jpg'
import { MarketplaceContext } from "../app/MarketplaceProvider";

const Listing = (props) => {
  console.log("CART", props.cart)
  

  const [inCart, setInCart] = useState(props.cart.some((card) => (card.listingID) === props.listingID));

  const determineInCartStatus = () => {
    const result = props.cart.find((card) => (card.listingID) === props.listingID)
    if(result){
      setInCart(true)
      return;
    }
    setInCart(false);
    
  }

  useEffect(() => {
    
    determineInCartStatus()

  }, [])

  const {setCartCount} = useContext(MarketplaceContext)

  console.log("INCART", inCart)
    const handleCart = () => {
      if(props.cart.some((listing) => listing.listingID === props.listingID)){
        props.setCart(props.cart.filter((listing) => listing.listingID !== props.listingID))
        setCartCount((prev) => prev - 1);
      }
      else{
        if(props.cardID){
          props.setCart([...props.cart, {...props.card, listingID: props.listingID, listingPrice: props.Price, listingGrade: props.Grade, listingEmail: props.sellerEmail, cardID: props.cardID, portfolioID: props.portfolioID}])
        }
        else{
          props.setCart([...props.cart, {...props.card, listingID: props.listingID, listingPrice: props.Price, listingGrade: props.Grade, listingEmail: props.sellerEmail, portfolioID: props.portfolioID}])
        }
        setCartCount((prev) => prev + 1);

      }
      setInCart(!inCart)
      console.log(props.cart)
    }

    return (
        <div className="w-50 d-flex justify-content-between align-items-center p-3" style={{background: "white", borderRadius: "20px", boxShadow: "1px 1px 3px black"}}>
              
              <img src={UserIcon} alt="Profile Image" width={100} height={100} style={{width: "10%", height: "auto"}}/>
              <div id="lister-email" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold", fontSize: "1.5rem"}}>Seller Email</div>
                <div style={{fontSize: "1.3rem"}}>{props.sellerEmail}</div>
              </div>
              <div id="grade" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold", fontSize: "1.5rem"}}>Grade</div>
                <div style={{fontSize: "1.3rem"}}>{props.Grade}</div>
              </div>
              <div id="price" className="d-flex flex-column justify-content-between">
                <div className="text-center" style={{fontWeight: "bold", fontSize: "1.5rem"}}>Price</div>
                <div style={{fontSize: "1.3rem"}}>${props.Price}</div>
              </div>
{/* 
              <img src={ShoppingCartIcon} alt="Cart Image" width={100} height={100} style={{width: "7%", height: "auto"}} onClick={handleCart}/> */}
              {inCart ? <MdRemoveShoppingCart style={{width: "5%", height: "auto", color: "red", cursor: "pointer"}} onClick={handleCart}/> : <MdShoppingCart style={{width: "5%", height: "auto", cursor: "pointer"}} onClick={handleCart}/>}
        </div>
    )
}



export default Listing