import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap'
import Login from "./Login"
import Registration from "./Registration"
import ResetPassword from "./ResetPassword"
import Home from "./Home"
import Marketplace from "./Marketplace"
import NotFound from "./NotFound"
import TestNav from "./TestNav"
import {Route, Routes} from 'react-router-dom'
import InitialSettingsProfile from './InitialSettingsProfile';
import InitialSettingsPaymentInfo from './InitialSettingsPaymentInfo';
import ResetConfirmation from './ResetConfirmation'
import ChangePassword from './ChangePassword';
import  PasswordChangeSuccess from './PasswordChangeSuccess';
import AccountSettings from './AccountSettings'
import MyPortfolios from './MyPortfolios'
import MyFriends from "./MyFriends"
import ViewProfile from './ViewProfile';
import User from "./User"
import AddFriend from './AddFriend';
import Portfolio from './Portfolio';
import PortfolioItem from "./PortfolioItem";
import MarketplaceSearch from './MarketplaceSearch';
import Cart from './Cart';
import PaymentInfo from './PaymentInfo'
import PaymentSuccess from './PaymentSuccess';
import Product from './Product'
import HomeAdmin from './HomeAdmin';
import ManageDataAdmin from './ManageDataAdmin';

function App() {
  return (
    <div className="App" style={{backgroundColor: "#5cdb95"}}>
      <div className="container">




        <Routes>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/register">
            <Route index element={<Registration/>}/>
            <Route path="initial-profile-settings" element={<InitialSettingsProfile/>}/>
            <Route path="initial-payment-settings" element={<InitialSettingsPaymentInfo/>}/>
          </Route>
          <Route path = "/reset">
            <Route index element={<ResetPassword/>}/>
            <Route path="request-sent" element={<ResetConfirmation/>}/>
            <Route path="new-password" element={<ChangePassword/>}/>
            <Route path="password-changed" element={<PasswordChangeSuccess/>}/>
          </Route>

          <Route path="/my-account">
            <Route index element={<ViewProfile/>}/>
            <Route path="account-settings" element={<AccountSettings/>}/>
            <Route path="my-portfolios">
              <Route index element={<MyPortfolios/>}/>
              <Route path=":portfolioID">
                <Route index element={<Portfolio/>}/>
                <Route path=":cardID" element={<PortfolioItem/>}/>
              </Route>
            </Route>

            <Route path="my-friends" element={<MyFriends/>}/>
            <Route path="add-friend" element={<AddFriend/>}/>
          </Route>

          <Route path = "/home" element={<Home/>}/>

          <Route path = "/home-admin" element={<HomeAdmin/>}/>
          <Route path = "/manage-data-admin" element={<ManageDataAdmin/>}/>

          <Route path="/marketplace">
            <Route index element={<Marketplace/>}/>
            <Route path=":productID" element={<Product/>}/>
            <Route path="search-results" element={<MarketplaceSearch/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="payment">
              <Route index element={<PaymentInfo/>}/>
              <Route path="success" element={<PaymentSuccess/>}/>
            </Route>
          </Route>
          <Route path="/" element={<TestNav/>}/>
          <Route path = "*" element={<NotFound/>}/>
          <Route path = "/user/:id" element={<User/>}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
