import {useContext, useState, useEffect} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import ChooseSetting from './ChooseSetting'
import { setDoc} from 'firebase/firestore'
import { auth} from './config/firebase'

import { UserSettingsContext } from './app/UserSettingsProvider'
import userService from './services/user.services'

const AccountSettings = () => {

    const [gen, setGen] = useState(true);
    const [access, setAccess] = useState(false);
    const [pay, setPay] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [listing, setListing] = useState(false);


    const {
        accountEmail, setAccountEmail,
        receiveEmailNotifications, setRecieveEmailNotifications,
        textSizing, setTextSizing,
        darkMode, setDarkMode,
        selectedPaymentMethod, setSelectedPaymentMethod,
        creditCardNumber, setCreditCardNumber,
        expirationDate, setExpirationDate,
        cvv, setCVV,
        countryOrRegion, setCountryOrRegion,
        firstName, setFirstName,
        lastName, setLastName,
        streetAddress, setStreetAddress,
        aptOrSuiteOrBuilding, setAptOrSuiteOrBuilding,
        zipCode, setZipCode,
        cityOrState, setCityOrState,
        sortPortfolioListBy, setSortPortfolioListBy,
        portfolioVisibility, setPortfolioVisibility,
        dividePortfolioIntoSections, setDividePortfolioIntoSections
    } = useContext(UserSettingsContext)

    const getCurrentSettings = async () => {
        
        const userID = await userService.getUserID(auth.currentUser.email)
        const settings = await userService.getSettings(userID)

        if (settings !== 0){
            setAccountEmail(settings.accountEmail)
            setCityOrState(settings.cityOrState)
            setCountryOrRegion(settings.countryOrRegion)
            setCreditCardNumber(settings.creditCardNumber)
            setCVV(settings.cvv)
            setDarkMode(settings.darkMode)
            setDividePortfolioIntoSections(settings.dividePortfolioIntoSections)
            setExpirationDate(settings.expirationDate)
            setFirstName(settings.firstName)
            setLastName(settings.lastName)
            setPortfolioVisibility(settings.portfolioVisibility)
            setRecieveEmailNotifications(settings.receiveEmailNotifications)
            setSelectedPaymentMethod(settings.selectedPaymentMethod)
            setSortPortfolioListBy(settings.sortPortfolioListBy)
            setStreetAddress(settings.streetAddress)
            setTextSizing(settings.textSizing)
            setZipCode(settings.zipCode)
        }
        
    }


    const saveChangesHandler = async () => {

        //Return before updating database if any user input does not match the requested format, notify user
        //Email must have a value
        if (!accountEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) )
        {
            alert("Invalid email")
            return
        }

        //Credit card
        if (selectedPaymentMethod !== "") { //Check if user wants to save a form of payment
        //If yes, ensure that all required fields are filled
            //cc#
            if (!creditCardNumber.match(/[0-9\s]{13,19}/))
            {
                alert("Invalid credit card info")
                return
            }

            //Exp Date
            if (!expirationDate.match(/\d{4}/))
            {
                alert("Invalid credit card info")
                return
            }

            //CVV
            if (!cvv.match(/\d{3}/))
            {
                alert("Invalid credit card info")
                return
            }

            //Country/Region
            if (!countryOrRegion.match(/[A-Za-z]+/))
            {
                alert("Invalid credit card info")
                return
            }

            //First
            if (!firstName.match(/[A-Za-z]+/))
            {
                alert("Invalid credit card info")
                return
            }

            //Last
            if (!lastName.match(/[A-Za-z]+/))
            {
                alert("Invalid credit card info")
                return
            }

            //St addr
            if (!streetAddress.match(/^(\d+) [a-zA-Z0-9\s]+/))
            {
                alert("Invalid credit card info")
                return
            }

            //Zip
            if (!zipCode.match(/\d{5}/))
            {
                alert("Invalid credit card info")
                return
            }


            //City/State
            if (!cityOrState.match(/[A-Za-z]+/))
            {
                alert("Invalid credit card info")
                return
            }
        } 

        const userID = await userService.getUserID(auth.currentUser.email)
        const settingsDocRef = await userService.getSettingRef(userID)
        try {
            await setDoc(settingsDocRef, {
                accountEmail: auth.currentUser.email,
                receiveEmailNotifications,
                textSizing,
                darkMode,
                selectedPaymentMethod,
                creditCardNumber,
                expirationDate,
                cvv,
                countryOrRegion,
                firstName,
                lastName,
                streetAddress,
                aptOrSuiteOrBuilding,
                zipCode,
                cityOrState,
                sortPortfolioListBy,
                portfolioVisibility,
                dividePortfolioIntoSections
            }, {merge: true})
        }catch(err){console.log(err)}
        alert("Changes succesfully changed")
    }

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

    useEffect(() => {
        getCurrentSettings()
    }, [])
    
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
            <button onClick={() => saveChangesHandler()}className="btn btn-primary d-inline mt-5 ms-4">Save Changes</button>

        </div>
        </div>

        )
}


export default AccountSettings
//Email regex on line 44 taken from https://www.regextester.com/19