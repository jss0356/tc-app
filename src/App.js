import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Login from "./Login";
import Registration from "./Registration";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import Marketplace from "./Marketplace";
import NotFound from "./NotFound";
import TestNav from "./TestNav";
import { Route, Routes } from "react-router-dom";
import InitialSettingsProfile from "./InitialSettingsProfile";
import InitialSettingsPaymentInfo from "./InitialSettingsPaymentInfo";
import ResetConfirmation from "./ResetConfirmation";
import ChangePassword from "./ChangePassword";
import PasswordChangeSuccess from "./PasswordChangeSuccess";
import AccountSettings from "./AccountSettings";
import MyPortfolios from "./MyPortfolios";
import MyFriends from "./MyFriends";
import ViewProfile from "./ViewProfile";
import User from "./User";
import AddFriend from "./AddFriend";
import Portfolio from "./Portfolio";
import PortfolioItem from "./PortfolioItem";
import MarketplaceSearch from "./MarketplaceSearch";
import Cart from "./Cart";
import PaymentInfo from "./PaymentInfo";
import PaymentSuccess from "./PaymentSuccess";
import Product from "./Product";
import HomeAdmin from "./HomeAdmin";
import ManageDataAdmin from "./ManageDataAdmin";
import RegistrationSuccess from "./RegistrationSuccess";
import { useState } from "react";
import UserSettingsProvider from "./app/UserSettingsProvider";
import MarketplaceProvider from "./app/MarketplaceProvider";
import CardProvider from "./app/CardProvider";
import WatchList from "./WatchList";

function App() {
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  return (
    <div className="App" style={{ backgroundColor: "#5cdb95" }}>
      <div
        className="container-fluid"
        style={{ overflow: "auto", minHeight: "100vh" }}
      >
        <MarketplaceProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register">
              <Route index element={<Registration />} />
              <Route
                path="initial-profile-settings"
                element={<InitialSettingsProfile />}
              />
              <Route
                path="initial-payment-settings"
                element={<InitialSettingsPaymentInfo />}
              />
              <Route
                path="registration-success"
                element={<RegistrationSuccess />}
              />
            </Route>
            <Route path="/reset">
              <Route index element={<ResetPassword />} />
              <Route path="request-sent" element={<ResetConfirmation />} />
              <Route path="new-password" element={<ChangePassword />} />
              <Route
                path="password-changed"
                element={<PasswordChangeSuccess />}
              />
            </Route>

            <Route path="/my-account">
              <Route index element={<ViewProfile />} />
              <Route
                path="account-settings"
                element={
                  <UserSettingsProvider>
                    <AccountSettings />
                  </UserSettingsProvider>
                }
              />
              <Route path="my-portfolios">
                <Route index element={<MyPortfolios />} />
                <Route path=":portfolioID">
                  <Route
                    index
                    element={
                      <CardProvider>
                        <Portfolio />
                      </CardProvider>
                    }
                  />
                  <Route path=":cardID" element={<PortfolioItem />} />
                </Route>
              </Route>

              <Route path="my-friends" element={<MyFriends />} />
              <Route path="add-friend" element={<AddFriend />} />
            </Route>

            <Route path="/home" element={<Home />} />

            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/manage-data-admin" element={<ManageDataAdmin />} />

            <Route path="/marketplace">
              <Route index element={<Marketplace />} />
              <Route
                path="cards/:productID"
                element={
                  <Product
                    cart={cart}
                    setCart={setCart}
                    cartQuantity={cartQuantity}
                    setCartQuantity={setCartQuantity}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                  />
                }
              />
              <Route
                path="search-results"
                element={
                  <MarketplaceSearch
                    cart={cart}
                    setCart={setCart}
                    cartQuantity={cartQuantity}
                    setCartQuantity={setCartQuantity}
                  />
                }
              />
              <Route
                path="cart"
                element={
                  <Cart
                    cart={cart}
                    setCart={setCart}
                    cartQuantity={cartQuantity}
                    setCartQuantity={setCartQuantity}
                  />
                }
              />
              <Route path="payment">
                <Route index element={<PaymentInfo cart={cart} />} />
                <Route path="success" element={<PaymentSuccess />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/user/:id" element={<User />} />
            <Route
              path="/watchlist"
              element={
                <WatchList watchlist={watchlist} setWatchlist={setWatchlist} />
              }
            />
          </Routes>
        </MarketplaceProvider>
      </div>
    </div>
  );
}

export default App;
