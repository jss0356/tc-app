import {useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import ChooseSetting from './ChooseSetting'



const AccountSettings = () => {

    const [gen, setGen] = useState(true);
    const [access, setAccess] = useState(false);
    const [pay, setPay] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [listing, setListing] = useState(false);

    const showGen = () => {
        setGen(true);
        setAccess(false);
        setPay(false);
        setPortfolio(false);
        setListing(false);
    }
    const showAccess = () => {
        setGen(false);
        setAccess(true);
        setPay(false);
        setPortfolio(false);
        setListing(false);
    }
    const showPay = () => {
        setGen(false);
        setAccess(false);
        setPay(true);
        setPortfolio(false);
        setListing(false);
    }
    const showPortfolio = () => {
        setGen(false);
        setAccess(false);
        setPay(false);
        setPortfolio(true);
        setListing(false);
    }
    const showListing = () => {
        setGen(false);
        setAccess(false);
        setPay(false);
        setPortfolio(false);
        setListing(true);
    }

    return (
        <div id="account-settings-container" className="d-flex w-100 h-100 justify-content-center align-items-center ">
        <div id="account-settings-inner-container" className="border rounded w-75 h-75 p-2" style={{ backgroundColor: "#edf5e1"}}>
        <div className="d-flex flex-row w-100 h-75">    
            <div id="subsetting-options" className="vstack d-flex justify-content-center h-100 w-25 border-right rounded border-dark gap-5">
            <p className="text-center">Select sub-setting to change:</p>

                <button className="btn btn-primary" onClick={showGen} >General Settings</button>
                <button className="btn btn-primary" onClick={showAccess} >Accessibility Settings</button>
                <button className="btn btn-primary" onClick={showPay} >Payment Settings</button>
                <button className="btn btn-primary" onClick={showPortfolio} >Portfolio Settings</button>
                <button className="btn btn-primary" onClick={showListing} >My Listings</button>


            </div>

            <ChooseSetting gen = {gen} access = {access} pay = {pay} portfolio = {portfolio} listing = {listing}/>

            </div>
            <LinkContainer to="/home"><button className="btn btn-primary d-inline mt-5 ms-4">Back to Home</button></LinkContainer>
            <LinkContainer to="/home"><button className="btn btn-primary d-inline mt-5 ms-4">Save Changes</button></LinkContainer>

        </div>
        
        </div>



        )
}


export default AccountSettings