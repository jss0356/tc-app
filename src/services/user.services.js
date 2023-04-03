import {firestore} from "../config/firebase"

import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc
} from "firebase/firestore"

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

    }

    export default new UserDataService()