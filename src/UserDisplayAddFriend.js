import React from "react";
import DefaultProfile from "./logos/default-profile.jpg"
import{ useEffect, useState } from 'react';

function UserAddFriend(userName ){
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
    };

    return(<>
    <div className="bg-light border border-dark d-flex flex-row gap-2">
        <img src={DefaultProfile} alt="Friend Profile Image" width="30px" height="30px"/>
        <p>User-1</p><p>User Name</p><p>User Email    &nbsp; &nbsp;                                                                    &nbsp;&nbsp;&nbsp;&nbsp;   </p><button style={buttonStyle}  onClick={handleButtonClick}>{isFriend ? '- Remove Friend' : '+ Add Friend'}</button>
                                </div>
                        
                
            
    </>);
}
export default UserAddFriend;