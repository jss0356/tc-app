import {firestore} from "../config/firebase"

import {collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc
} from "firebase/firestore"

    //reference to "userSettings" collection.
    const userSettingsCollectionRef = collection(firestore, "userSettings")

    //service to provide all CRUD operations for userSettings collection.
    class UserSettingsDataService{

        addUserSettings = (newUserSettings) => {
            return addDoc(userSettingsCollectionRef, newUserSettings)
        }

        updateUserSettings = (userSettingID, updatedUserSettings) => {
            //check if document exists.
            const userSettingsDoc = doc(firestore, "userSettings", userSettingID)
            return updateDoc(userSettingsDoc, updatedUserSettings)
        }

        deleteUserSettings = (userSettingID) => {
            const userSettingsDoc = doc(firestore, "userSettings", userSettingID)
            return deleteDoc(userSettingsDoc)
        }

        getAllUsersSettings = () => {
            return getDocs(userSettingsCollectionRef)
        }

        getUserSettings = (userSettingID) => {
            const userSettingsDoc = doc(firestore, "userSettings", userSettingID)
            return getDoc(userSettingsDoc)
        }

    }

    export default new UserSettingsDataService()