
import {useContext, useState} from 'react'
import { UserSettingsContext } from './app/UserSettingsProvider'

const PaySettings = () => {



    const { selectedPaymentMethod, setSelectedPaymentMethod,
        creditCardNumber, setCreditCardNumber,
        expirationDate, setExpirationDate,
        cvv, setCVV,
        countryOrRegion, setCountryOrRegion,
        firstName, setFirstName,
        lastName, setLastName,
        streetAddress, setStreetAddress,
        aptOrSuiteOrBuilding, setAptOrSuiteOrBuilding,
        zipCode, setZipCode,
        cityOrState, setCityOrState} = useContext(UserSettingsContext)
        


    return (
        <div id="setting-options" style={{overflow: "auto"}} className="ps-3 d-flex flex-column gap-3 h-100 w-50 border border-dark">
            <label className='text-center'>Payment Settings</label>
           


           <div id="preferred payment method">
                <label htmlFor="sample-setting" className='d-inline'>Preferred payment method: </label>
                <select id="sample-setting" className="form-select w-50 d-inline" value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)} aria-label="Default select example">
                    <option value="">Set Preferred Method: </option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Visa">Visa</option>
                    <option value="Amex">Amex</option>
                    <option value="Paypal">Paypal</option>
                </select>
           </div>

            {(selectedPaymentMethod !== "Paypal" && selectedPaymentMethod !== "") && (
            <>
                    <div id="form-input-credit-card-number d-flex">

                        <h2 className='text-center'>Card Information:</h2>
                    
                        <label htmlFor="credit-card-num" className="d-inline pe-2">Credit Card Number:</label>
                        <input type="text" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" className="w-50 form-control d-inline" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
                    </div>            
                    <div id="form-input-exp-date d-flex">

                        <label htmlFor="exp-date" className="d-inline pe-2">Expiration Date:</label>
                        <input type="text" placeholder="MMYY" className="w-50 form-control d-inline" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </div>            
                    <div id="form-input-cvv d-flex">
                        <label htmlFor="cvv" className="d-inline pe-2">CVV:</label>
                        <input type="text" placeholder="###" className="w-50 form-control d-inline" value={cvv} onChange={(e) => setCVV(e.target.value)}/>
                    </div>            

                    <h2 className='text-center'>Billing Address:</h2>

                    <div id="form-input-country-region d-flex">
                        <label htmlFor="country-region" className="d-inline pe-2">Country/Region:</label>
                        <input type="text" placeholder="Country or Region" className="w-50 form-control d-inline" value={countryOrRegion} onChange={(e) => setCountryOrRegion(e.target.value)}/>
                    </div>            

                    <div id="form-input-first-name d-flex">
                        <label htmlFor="first-name" className="d-inline pe-2">First Name:</label>
                        <input type="text" placeholder="First" className="w-50 form-control d-inline" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>            

                    <div id="form-input-last-name d-flex">
                        <label htmlFor="last-name" className="d-inline pe-2">Last Name:</label>
                        <input type="text" placeholder="Last" className="w-50 form-control d-inline" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>            

                    <div id="form-input-st-addr d-flex">
                        <label htmlFor="st-addr" className="d-inline pe-2">Street Address:</label>
                        <input type="text" className="w-50 form-control d-inline" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                    </div>            

                    <div id="form-input-apt-suite-building d-flex">
                        <label htmlFor="apt-suite-building" className="d-inline pe-2">Apt/Suite/Building (Optional):</label>
                        <input type="text" className="w-50 form-control d-inline" value={aptOrSuiteOrBuilding} onChange={(e) => setAptOrSuiteOrBuilding(e.target.value)}/>
                    </div>            

                    <div id="form-input-zip-code d-flex">
                        <label htmlFor="zip-code" className="d-inline pe-2">Zip Code:</label>
                        <input type="text" placeholder="#####" className="w-50 form-control d-inline" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                    </div>            

                    <div id="form-input-city-state d-flex">
                        <label htmlFor="city-state" className="d-inline pe-2">City, State:</label>
                        <input type="text" pattern="[A-Za-z]+" placeholder="City or State" className="w-50 form-control d-inline" value={cityOrState} onChange={(e) => setCityOrState(e.target.value)}/>
                    </div>   

            </>
            )}
            

        </div>
    )
}

export default PaySettings