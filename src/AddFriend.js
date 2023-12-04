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
    
    
    const myArray = ['Apple', 'Banana', 'Mango'];
    const [userData, setUserData] = useState([]);
    //const [isFriend, setIsFriend] = useState(false);
    const [isFriend2, setIsFriend2] = useState(false);
    const [userDataquery, setUserDataquery] = useState([]);

    // const handleButtonClick = () => {
    //     setIsFriend((prevIsFriend) => !prevIsFriend);
    // };
    // const handleButtonClick2 = () => {
    //     setIsFriend2((prevIsFriend) => !prevIsFriend);
    // };
    // const [isFriend, setIsFriend] = useState(false);
    // const buttonStyle = {
    //     backgroundColor: isFriend ? '#e74c3c' : '#3498db',
    //     color: 'white',
    //     padding: '10px 20px',
    //     border: 'none',
    //     cursor: 'pointer',
    // };
    // const handleButtonClick = () => {
    //     setIsFriend((prevIsFriend) => !prevIsFriend);
    //     //console.log(userName);

    // };

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
                //console.log(userData + "ASDkkk")


                //console.log(users + "ASDkkk")
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        findPortfolios();
    }, []);

    

    const findPortfolios = async () => {
        
        let myUsers=[];

        try {
            const q = query(collection(firestore, 'users'));
            const foundUser = await getDocs(q);
            
            const userID = foundUser.docs[0].id;

            const u = collection(firestore, `users`);

            const querySnapshot = await getDocs(u);
            setUserDataquery(querySnapshot);
            
            querySnapshot.forEach(async (doc) => {

                const dataitem = doc.data();
                const u=[];
                u['name']=dataitem.username;
                u['email']=dataitem.email;
                console.log(u)
                
                
                myUsers.push(u)
                //console.log(myUsers+ " ")


                

            });
            
            


            

            
        }
        catch (err) {
            console.log(err);
            
        }
        //console.log(myUsers + "abc")
        setUsers(myUsers)

    }

    useEffect(() => {


        findPortfolios()
        


    }, [])

    const MyComponent = ({value}) => {

        const [isFriend, setIsFriend] = useState(false);
        const buttonStyle = {
            backgroundColor: isFriend ? '#e74c3c' : '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            align : 'right'
        };
        const handleButtonClick = () => {
            setIsFriend((prevIsFriend) => !prevIsFriend);
            //console.log(userName);
    
        };

        return <div>
                {/* <div className="bg-light border border-dark d-flex flex-row justify-content-between align-items-center gap-2">
                <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>


            <span>User Name : {"  "+value.name+" "} </span><span>User Email : {"  "+value.email}</span>
            
            <button style={buttonStyle}  onClick={handleButtonClick}>{isFriend ? '- Remove Friend' : '+ Add Friend'}</button>
            </div> */}
            <div className="bg-light border border-dark d-flex justify-content-between align-items-center gap-2">
    <div>
        <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px" />
        <span style={{color:"#20c997"}}> {value.name +  "  " }</span>
        <span style={{color:"#198754"}}> {value.email + "   "}</span>
    </div>
    <button style={buttonStyle} onClick={handleButtonClick}>
        {isFriend ? '- Remove Friend' : '+ Add Friend'}
    </button>
</div>
            </div>
      };
      

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
                <div>
                {/* {console.log(users)} */}
                {
                users.map((item,index)=>(console.log(item.name)))
                }
                {users.map((item, index) => (
        <MyComponent value={item}/>
      ))}



            

                
               
                </div>
            </div>
        
        </div>
        )
}

export default AddFriend