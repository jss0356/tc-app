
import { useContext, useState } from "react"
import { UserSettingsContext } from "./app/UserSettingsProvider"

const GenSettings = () => {


    const {accountEmail, setAccountEmail, receiveEmailNotifications, setRecieveEmailNotifications} = useContext(UserSettingsContext)

    return (
        <div id="setting-options" className="ps-3 d-flex flex-column gap-3 h-100 w-50 border border-dark">
                <label className="text-center">General Settings</label>

                <div id="form-input-account-email d-flex">
                
                    <label htmlFor="account-email" className="d-inline pe-2">Account Email:</label>
                    <input type="email" placeholder="example@gmail.com"value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} className="w-75 form-control d-inline" />
                
                </div>            
                
                <div className="d-flex flex-row w-100">
                    <label className="form-label d-inline pe-2" htmlFor="flexSwitchCheckDefault" >Recieve Email Notifications: </label>

                    <div className="form-check form-switch">

                        <input className="form-check-input d-inline" type="checkbox" id="flexSwitchCheckDefault" checked={receiveEmailNotifications} onChange={() => setRecieveEmailNotifications(!receiveEmailNotifications)}/>

                    </div>
                </div>

        </div>
    )
}

export default GenSettings