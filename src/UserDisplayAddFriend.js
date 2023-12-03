import React from "react";
import DefaultProfile from "./logos/default-profile.jpg"
import{ useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './config/firebase.js'; // Replace with the path to your Firebase config file
import {
    
    query,
    where,
   
    addDoc,
    setDoc,
} from "firebase/firestore"

function UserAddFriend(userName ){
    const [userData, setUserData] = useState([]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Reference the "users" collection
                const usersCollection = collection(firestore, 'users');

                // Fetch data from the "users" collection
                const querySnapshot = await getDocs(usersCollection);

                // Extract and store user data
                const userDataArray = [];
                querySnapshot.forEach((doc) => {
                    userDataArray.push(doc.data());
                });
                //setUserData(userDataArray)

                //console.log(users + "ASDkkk")
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        findPortfolios();
    }, []);

    

    const findPortfolios = async () => {
        
        

        try {
            const q = query(collection(firestore, 'users'));
            const foundUser = await getDocs(q);
            
            const userID = foundUser.docs[0].id;

            const u = collection(firestore, `users`);

            const querySnapshot = await getDocs(u);


            //const portfolioArray = [];
            querySnapshot.forEach(async (doc) => {

                const dataitem = doc.data();
                //console.log(dataitem+"AA");

                setUsers(dataitem.username)
                console.log(users+"SSSSS");

                //portfolioArray.push(portfolioItem);
            });
            
            


            

            
        }
        catch (err) {
            console.log(err);
            
        }
        

    }

    useEffect(() => {


        findPortfolios()

    }, [])






    const [isFriend, setIsFriend] = useState(false);
    const buttonStyle = {
        backgroundColor: isFriend ? '#e74c3c' : '#3498db',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
    };
    const handleButtonClick = () => {
        setIsFriend((prevIsFriend) => !prevIsFriend);
        //console.log(userName);

    };

    return(
    <>
    <div className="bg-light border border-dark d-flex flex-row gap-2">
        <h1>HELLO</h1>
        <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
        <p>{userName}</p><p>User Name</p><p>User Email    &nbsp; &nbsp;                                                                    &nbsp;&nbsp;&nbsp;&nbsp;   </p><button style={buttonStyle}  onClick={handleButtonClick}>{isFriend ? '- Remove Friend' : '+ Add Friend'}</button>
        </div>
                        
                
            
    </>
    );
}
export default UserAddFriend;