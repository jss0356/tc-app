import {firestore} from "../config/firebase"

import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    setDoc,
    deleteDoc, 
    doc,
    query, 
    where
} from "firebase/firestore"
import {useContext} from 'react'

    //reference to users collection.
    const userCollectionRef = collection(firestore, "users")

    //service to provide all CRUD operations for users collection.
    class UserDataService{

        addUser = (newUser) => {
            return addDoc(userCollectionRef, newUser)
        }

        updateUser = (userID, updatedUser) => {
            //check if document exists.
            const userDoc = doc(firestore, "users", userID)
            return updateDoc(userDoc, updatedUser)
        }

        deleteUser = (userID) => {
            const userDoc = doc(firestore, "users", userID)     
            return deleteDoc(userDoc)
        }

        getAllUsers = () => {
            return getDocs(userCollectionRef)
        }

        getUser = (userID) => {
            const userDoc = doc(firestore, "users", userID)
            return getDoc(userDoc)
        }

        getUserID = async (email) => {
            const usersCollectionRef = collection(firestore, 'users')
            const associatedUserDoc = query(usersCollectionRef, where("email", "==", email))
            try {
                const userDoc = await getDocs(associatedUserDoc)
                if (userDoc.docs.size !== 0) {
                    return userDoc.docs[0].id
                } else {
                    console.log("User does not exist")
                    return 0
                }
            }catch(err) {
                console.log(err)
            }

        }

        getSettings = async (id) => {

            const settingsCollectionRef = collection(firestore, `users/${id}/userSettings`)

            try{
                const settings = await getDocs(settingsCollectionRef)

                if (settings.size !== 0){
                    return settings.docs[0].data()
                } else {
                    console.log("Settings have not been initialized yet")
                    return 0
                }

            }catch(err){console.log(err)}
        }

        getPortfolio = async (userID, portfolioID) => {
            return doc(firestore, `users/${userID}/userPortfolios/${portfolioID}`)
        }

        getPortfolioCards = async (userID, portfolioID) => {
            const portfolioCardsCollectionRef = collection(firestore, `users/${userID}/userPortfolios/${portfolioID}/cards`)

            try {
                const cards = await getDocs(portfolioCardsCollectionRef)
                return cards

            }catch(err){ console.log(err) }
        }

        getSettingRef = async (id) => {

            const settingsCollectionRef = collection(firestore, `users/${id}/userSettings`)
            
            try{
                const settings = await getDocs(settingsCollectionRef)

                if (settings.size !== 0){
                    return doc(settingsCollectionRef, `${settings.docs[0].id}`)
                    
                } else {
                    console.log("Settings have not been initialized yet")
                    return 0
                }

            }catch(err){console.log(err)}
        }

        initializeUserSettings = (userID, email) => {
            const userSettingsCollectionRef = collection(firestore, `users/${userID}/userSettings`)
            return addDoc(userSettingsCollectionRef, {
                accountEmail: email,
                receiveEmailNotifications: false,
                textSizing: "",
                darkMode: false,
                selectedPaymentMethod: "",
                creditCardNumber: "",
                expirationDate: "",
                cvv: "",
                countryOrRegion: "",
                firstName: "",
                lastName: "",
                streetAddress: "",
                aptOrSuiteOrBuilding: "",
                zipCode: "",
                cityOrState: "",
                sortPortfolioListBy: "",
                portfolioVisibility: "",
                dividePortfolioIntoSections: ""
            })
        }


        getAllUserPortfolios = async (userID) => {
            const portfoliosRef = collection(firestore, `users/${userID}/userPortfolios`)

            const q = query(portfoliosRef, where("ownerID", "==", userID));
            const portfolios = await getDocs(q);
            const allPortfolios = []

            portfolios.forEach((portfolio) => {
                allPortfolios.push(portfolio.data())
            })
            return allPortfolios;
        }
        getUserPortfolio = async (portfolioID, userID) => {
            const portfolioRef = doc(firestore, `users/${userID}/userPortfolios/${portfolioID}`)
            let portfolio = {};
            portfolio = await getDoc(portfolioRef);
            
            return portfolio.data();
        }

        getPortfolioCards = async (portfolioID, userID) => {
            const cardsRef = collection(firestore, `users/${userID}/userPortfolios/${portfolioID}/cards`)
            const cardsResult = await getDocs(cardsRef)
            if(cardsResult.empty){
                return "no cards."
            }

            const allCards = []
            cardsResult.forEach((card) =>{
                allCards.push(card.data())
            })

            return allCards
        }
        getCard = async (userID, portfolioID, cardID) => {
            const cardRef = doc(firestore, `users/${userID}/userPortfolios/${portfolioID}/cards/${cardID}`);
            const card = await getDoc(cardRef)
            return card.data();
        }
        determinePortfolioNameFromID = async (userID, portfolioID) => {
            const portfolioRef = doc(firestore, `users/${userID}/userPortfolios/${portfolioID}`)
            const portfolio = await getDoc(portfolioRef);
            const portfolioData = portfolio.data()

            return portfolioData.name 
        }

        getAllOtherPortfolioNames = async (userID, currentPortfolioID) => {
            const portfoliosCollectionRef = collection(firestore, `users/${userID}/userPortfolios`);
            const q = query(portfoliosCollectionRef, where("portfolioID", "!=", currentPortfolioID));
            const portfolioCollectionSnapshot = await getDocs(q);
            
            const portfolioNames = []

            if(portfolioCollectionSnapshot.empty){
                return portfolioNames;
            }

            portfolioCollectionSnapshot.forEach((portfolioDocSnapshot) => {
                portfolioNames.push({name: portfolioDocSnapshot.data().name, id: portfolioDocSnapshot.data().portfolioID})
            })

            return portfolioNames;

        }

        moveCardToNewPortfolio = async (userID, oldPortfolioID, cardID, newPortfolioID) => {
            
            
            
            
            
            const oldCardRef  = doc(firestore, `users/${userID}/userPortfolios/${oldPortfolioID}/cards/${cardID}`);
            const oldPortfolioDocRef = doc(firestore,  `users/${userID}/userPortfolios/${oldPortfolioID}`)

            const oldCardDocumentSnapshot = await getDoc(oldCardRef);
            const oldCardData = oldCardDocumentSnapshot.data();

            await deleteDoc(oldCardRef);


            const response = await fetch(`https://api.pokemontcg.io/v2/cards/${oldCardData.Id}`)
            const responseData = await response.json();
            const cardData = responseData.data

            const oldPortfolioDocumentSnapshot = await getDoc(oldPortfolioDocRef);
            const oldPortfolioData = oldPortfolioDocumentSnapshot.data();
    
            const newTotalMarketValueOldPortfolio = oldPortfolioData.totalMarketValue - (cardData.tcgplayer?.prices?.holofoil?.market || 0)
            const newTotalOldPortfolio = oldPortfolioData.itemCount - 1;

            await setDoc(oldPortfolioDocRef, {itemCount: newTotalOldPortfolio, totalMarketValue: newTotalMarketValueOldPortfolio}, {merge: true});



            const cardToAdd = {Id: oldCardData.Id, Grade: oldCardData.Grade}
            const newPortfolioCardsRef = collection(firestore, `users/${userID}/userPortfolios/${newPortfolioID}/cards`)
            const newPortfolioDocRef = doc(firestore, `users/${userID}/userPortfolios/${newPortfolioID}`)

            console.log({newPortfolioID})

            const addedDocRef = await addDoc(newPortfolioCardsRef, cardToAdd)
            await setDoc(addedDocRef, {cardID: addedDocRef.id}, {merge: true})

            const newPortfolioSnapshot = await getDoc(newPortfolioDocRef)

            const newPortfolioData = newPortfolioSnapshot.data()

            const newTotalMarketValueNewPortfolio = newPortfolioData.totalMarketValue + (cardData.tcgplayer?.prices?.holofoil?.market || 0)
            const newTotalNewPortfolio = newPortfolioData.itemCount + 1;

            await setDoc(newPortfolioDocRef, {itemCount: newTotalNewPortfolio, totalMarketValue: newTotalMarketValueNewPortfolio}, {merge: true})

            return {newCardID: addedDocRef.id, newPortfolioID}

        }
    }



    export default new UserDataService()