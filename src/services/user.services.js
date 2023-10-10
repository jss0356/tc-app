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

        getListingsByProductID = async (productID) => {
            try{
                const usersSnapshot = await getDocs(collection(firestore, 'users'));
                const allUsers = []
    
    
                if(usersSnapshot.empty){
                    throw new Error("Unexpected error. No users found.")
                }
    
                usersSnapshot.forEach((userDoc) => {
                    allUsers.push(userDoc)
                })
    
                for(const user of allUsers){
                    const listingsCollectionRef = collection(firestore, `users/${user.id}/listings`)
                    const q = query(listingsCollectionRef, where("productID", "==", productID))
                    const querySnapshot = await getDocs(q)
                    if(querySnapshot.empty){
                        return -1
                    }
                    else{
                        const allListings = []
                        querySnapshot.forEach((listing) => {
                            allListings.push(listing.data())
                        })
    
                        return allListings
                    }
                }
    
    
            }catch(err){
                console.error(err)
            }
    
        }

    }



    export default new UserDataService()