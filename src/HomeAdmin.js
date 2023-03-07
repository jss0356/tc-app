import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import MainNavbarAdminHomepage from './Rcomponents/MainNavbarAdminHomepage';
import ViewIcon from './logos/view-icon.png'
import DefaultProfile from './logos/default-profile.jpg'
import AddIcon from './logos/Add-Icon.png'
import Card1Baseball from "./image/baseball/card1.jpg"
import Card2Baseball from "./image/baseball/card2.jpg"
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import Button from "react-bootstrap/Button"

const HomeAdmin = () => {

    return (
        <div id="homepage-container" className="d-flex w-100 h-100 flex-column ">
            <div id="homepage-main-nav" style={{marginBottom:"130px"}}>
                <MainNavbarAdminHomepage/>
            </div>

            <div className='d-flex flex-column h-100 w-100 align-items-center justify-content-center'>
                <h1 className='text-light'>Welcome *insert admin name here*</h1>
            </div>
        </div>
    )
}


export default HomeAdmin