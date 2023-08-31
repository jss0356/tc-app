import {useContext, useState} from 'react'
import { UserSettingsContext } from './app/UserSettingsProvider'

const AccessSettings = () => {


    const {textSizing, setTextSizing, darkMode, setDarkMode} = useContext(UserSettingsContext)

    return (
        <div id="setting-options" className="ps-3 d-flex flex-column gap-3 h-100 w-50 border border-dark">
            <label className="text-center">Accessibility Settings</label>
            <div id="font-sizing-input">
                <label htmlFor="sample-setting" className=" pe-3">Text Sizing:</label>
                <select id="sample-setting"className="form-select d-inline w-75" aria-label="Default select example" value={textSizing} onChange={(e) => setTextSizing(e.target.value)}>
                    <option value="">Open this select menu</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </div>
            
            <div className="d-flex flex-row w-100">
                <label className="form-check-label pe-3" htmlFor="flexSwitchCheckDefault">Dark Mode:</label>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={darkMode} onChange={() => setDarkMode((prev) => !prev)}/>
                </div>
            </div>


            
 
        </div>
    )
}

export default AccessSettings