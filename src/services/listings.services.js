import {firestore} from "../config/firebase"

import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    query,
    where,
    limit,
    orderBy
} from "firebase/firestore"

const listingsCollectionRef = collection(firestore, "listings")

const LISTINGS_PER_FETCH = 1;

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

    getListingsByProductID = async (productID) => {
        try{
            const q = query(listingsCollectionRef, where("productID", "==", productID), orderBy("Price"), 
            )
            const listingsSnapshot = await getDocs(q);
            console.log("ALL", listingsSnapshot)

            const allListings = []


            if(listingsSnapshot.empty){
                return [];
            }

            listingsSnapshot.forEach((listingsDoc) => {
                console.log("DOCUMENT", listingsDoc)
                allListings.push(listingsDoc.data())
            })

            return allListings;

        }catch(err){
            console.error(err)
        }

    }

    getStartingPrices = async () => {
        const q = query(listingsCollectionRef, where("isStartingPrice", "==", true))
        const listingsSnapshot = await getDocs(q);
        
        const allListings = [];

        if(listingsSnapshot.empty){
            return []
        }

        listingsSnapshot.forEach((listingDoc) => {
            allListings.push(listingDoc.data())
        })

        return allListings
    }

    getAllListings = async (productID) => {
        const q = query(listingsCollectionRef, where("productID" ,"==", productID))
        const listingsSnapshot = await getDocs(q);
        
        const allListings = [];

        if(listingsSnapshot.empty){
            return []
        }

        listingsSnapshot.forEach((listingDoc) => {
            allListings.push(listingDoc.data())
        })

        return allListings
    }
}


export default new ListingsDataService()



