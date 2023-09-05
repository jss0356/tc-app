import {firestore} from "../config/firebase"

import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc
} from "firebase/firestore"

const listingsCollectionRef = collection(firestore, "listings")

class ListingsDataService {
    addListing(newListing){
        return addDoc(listingsCollectionRef, newListing)
    }
    getListing(listingID){
        const listingDocRef = doc(firestore, 'listings', listingID)
        return getDoc(listingDocRef)
    }
    getAllListings(){
        return getDocs(listingsCollectionRef)
    }
    updateListing(listingID, updatesToAdd){
        const listingDocRef = doc(firestore, 'listings', listingID)
        return updateDoc(listingDocRef, updatesToAdd) 
    }
    deleteListing(listingID){
        const listingDocRef = doc(firestore, 'listings', listingID)
        return deleteDoc(listingDocRef)
    }
}


export default new ListingsDataService()



