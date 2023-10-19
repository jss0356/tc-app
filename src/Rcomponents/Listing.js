
import ShoppingCartIcon from "../logos/ShoppingCartIcon.png";
import UserIcon from '../logos/default-profile.jpg'

const Listing = (props) => {
    return (
        <div className="w-75 d-flex justify-content-between align-items-center p-3" style={{background: "white", borderRadius: "20px", boxShadow: "1px 1px 3px black"}}>
              
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
              <img src={ShoppingCartIcon} alt="Profile Image" width={100} height={100} style={{width: "7%", height: "auto"}}/>

        </div>
    )
}



export default Listing