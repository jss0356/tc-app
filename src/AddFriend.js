import MainNavbar from "./Rcomponents/MainNavbar"
import SearchIcon from "./logos/SearchIcon.png"
import { LinkContainer } from "react-router-bootstrap"
import DefaultProfile from "./logos/default-profile.jpg"
import React , { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './config/firebase.js'; // Replace with the path to your Firebase config file
import {
    
    query,
    where,
   
    addDoc,
    setDoc,
} from "firebase/firestore"
import UserAddFriend from "./UserDisplayAddFriend.js";
const AddFriend = () => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isFriend2, setIsFriend2] = useState(false);
    const handleButtonClick = () => {
        setIsFriend((prevIsFriend) => !prevIsFriend);
    };
    const handleButtonClick2 = () => {
        setIsFriend2((prevIsFriend) => !prevIsFriend);
    };

    // Access the Firestore database

    // const usersCollection = collection(firestore, 'users');
    //const querySnapshot =  getDocs(usersCollection);
    //console.log(querySnapshot + "SAS");
    // querySnapshot.forEach((doc)=>{console.log(doc.data()) });

    // Reference the "users" collection
    //const usersCollection = collection(firestore, 'users');
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
                setUserData(userDataArray)

                console.log(users + "ASD")
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        findPortfolios();
    }, []);

    const buttonStyle = {
        backgroundColor: isFriend ? '#e74c3c' : '#3498db',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
    };
    const buttonStyle2 = {
        backgroundColor: isFriend2 ? '#e74c3c' : '#3498db',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
    };

    const findPortfolios = async () => {
        console.log("A");
        

        try {
            const q = query(collection(firestore, 'users'));
            const foundUser = await getDocs(q);
            
            const userID = foundUser.docs[0].id;

            const u = collection(firestore, `users`);

            const querySnapshot = await getDocs(u);


            //const portfolioArray = [];
            querySnapshot.forEach(async (doc) => {

                const dataitem = doc.data();
                console.log(dataitem)
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


    return (
        <div id="Add-Friends-Container" className='w-100 h-100 d-flex flex-column'>
            <div id="main-nav">
                <MainNavbar/>

            </div>
            <div id="sub-nav" className="w-100 d-flex align-items-center justify-content-center gap-2" style={{position:"sticky",top:"80px", height:"5%", backgroundColor:"#edf5e1", marginBottom:"130px"}}>
                    <LinkContainer to="/my-account/my-friends"><a href="#" className='text-decoration-none text-secondary'>My Friends</a></LinkContainer>
                    <LinkContainer to="/my-account/add-friend"><a href="#" className='text-decoration-none text-secondary'>Add Friend</a></LinkContainer>
            </div>


            <div id= "add-friend-container" className="w-75 h-75 d-flex flex-column align-items-center" style={{backgroundColor:"#edf5e1", marginLeft:"130px"}}>
                <div className="input-group mb-3 mt-2 w-75">
                    <input type="text" className="form-control" placeholder="Search by Username" aria-label="Username"/>
                    <span className="input-group-text"><button><img src={SearchIcon} width="30px" alt="search"/></button></span>
                </div>
                <p>Search Results:</p>
                <div id="search-results" className="w-75 h-100 border border-dark" style={{backgroundColor:"white"}}></div>
                <p>All Users:</p>
                <div id="search-results" className="w-75 h-100 border border-dark" style={{backgroundColor:"white"}}>
                <div className="bg-light border border-dark d-flex flex-row gap-2">
                                    <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
                        <p>User-1</p><p>User Name</p><p>User Email    &nbsp; &nbsp;                                                                    &nbsp;&nbsp;&nbsp;&nbsp;   </p><button style={buttonStyle}  onClick={handleButtonClick}>{isFriend ? '- Remove Friend' : '+ Add Friend'}</button>
                                </div>
                                <div className="bg-light border border-dark d-flex flex-row gap-2">
                                    <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
                        <p>User-2</p><p>User Name</p><p>User Email &nbsp; &nbsp;                                                                    &nbsp;&nbsp;&nbsp;&nbsp;</p><button style={buttonStyle2}  onClick={handleButtonClick2}>{isFriend2 ? '- Remove Friend' : '+ Add Friend'}</button>
                                </div>
                </div>
                <UserAddFriend userName=""/>
            
            </div>
        
        </div>
        )
}

export default AddFriend