import {useContext, useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import ChooseSetting from './ChooseSetting'
import { query, getDocs, where, collection, doc, setDoc } from 'firebase/firestore'
import {firestore, auth} from './config/firebase'

import UserSettingsProvider, { UserSettingsContext } from './app/UserSettingsProvider'

import userServices from './services/user.services'

const AccountSettings = () => {

    const [gen, setGen] = useState(true);
    const [access, setAccess] = useState(false);
    const [pay, setPay] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [listing, setListing] = useState(false);


    const  {
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

    const saveChangesHandler = async () => {

        



        const userCollectionRef = collection(firestore, 'users')
        console.log(auth.currentUser.email)

        const findAssociatedUserDoc = query(userCollectionRef, where("email", "==", auth.currentUser.email))

        try{
            const associatedUserDoc = await getDocs(findAssociatedUserDoc)
            if(associatedUserDoc.size != 0){
                const userID = associatedUserDoc._snapshot.docChanges[0].doc.data.value.mapValue.fields.userID.stringValue 
                const associatedUserDocRef = doc(firestore, `users/${userID}`)
                const userSettingsCollection =  collection(associatedUserDocRef, 'userSettings')
                
                try{
                    let settingDoc = await getDocs(userSettingsCollection)
                    if(settingDoc.size != 0){
                        const settingsID = settingDoc._snapshot.docChanges[0].doc.data.value.mapValue.fields.settingsID.stringValue
                        console.log(settingsID)
                        const settingsRef = doc(userSettingsCollection, `${settingsID}`)
                        await setDoc(settingsRef, {
                            accountEmail,
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
                    }
                    else{
                        userServices.initializeUserSettings(userID, {
                            accountEmail,
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
                        })
                    }
                }catch(err){
                    console.log(err)
                }
                
            }
            else{
                console.log("unexpected error, no user document found")
            }
        }catch(err){
            console.log(err)
        }


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
    saveChangesHandler()


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