import {auth, firestore} from "../config/firebase"

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
    orderBy,
    setDoc
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
    async deleteListing(listingID){
        const listingDocRef = doc(firestore, 'listings', listingID)
        const listingDocSnapshot = await getDoc(listingDocRef)
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

    getStartingPrices = async (userEmail) => {
        const q = query(listingsCollectionRef, where("isStartingPrice", "==", true), where("sellerEmail", "!=", userEmail));
        const listingsSnapshot = await getDocs(q);
        console.log(listingsSnapshot)
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

    createNewListing = async (listingToCreate) => {
        const addRef = await addDoc(listingsCollectionRef, listingToCreate)
        await setDoc(doc(firestore, `listings/${addRef.id}`), {listingID: addRef.id}, {merge: true})
        return
    }
}


export default new ListingsDataService()



