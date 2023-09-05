
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
                <form>
                    <div id="form-input-credit-card-number d-flex">

                        <h2 className='text-center'>Card Information:</h2>
                    
                        <label htmlFor="account-email" className="d-inline pe-2">Credit Card Number:</label>
                        <input type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" className="w-50 form-control d-inline" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
                    </div>            
                    <div id="form-input-credit-card-number d-flex">

                        <label htmlFor="account-email" className="d-inline pe-2">Expiration Date:</label>
                        <input type="text" patter="\d{4}" placeholder="MMYY" className="w-50 form-control d-inline" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    </div>            
                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">CVV:</label>
                        <input type="text" pattern="\d{3}" placeholder="###" className="w-50 form-control d-inline" value={cvv} onChange={(e) => setCVV(e.target.value)}/>
                    </div>            

                    <h2 className='text-center'>Billing Address:</h2>

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">Country/Region:</label>
                        <input type="text" pattern="[A-Za-z]+" placeholder="Country or Region" className="w-50 form-control d-inline" value={countryOrRegion} onChange={(e) => setCountryOrRegion(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">First Name:</label>
                        <input type="text" pattern="[A-Za-z]+" placeholder="First" className="w-50 form-control d-inline" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">Last Name:</label>
                        <input type="text" pattern="[A-Za-z]+" placeholder="Last" className="w-50 form-control d-inline" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">Street Address:</label>
                        <input type="text" pattern="^(\d{1,}) [a-zA-Z0-9\s]+" className="w-50 form-control d-inline" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">Apt/Suite/Building (Optional):</label>
                        <input type="text" className="w-50 form-control d-inline" value={aptOrSuiteOrBuilding} onChange={(e) => setAptOrSuiteOrBuilding(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">Zip Code:</label>
                        <input type="text" pattern="\d{5}" placeholder="#####" className="w-50 form-control d-inline" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                    </div>            

                    <div id="form-input-credit-card-number d-flex">
                        <label htmlFor="account-email" className="d-inline pe-2">City, State:</label>
                        <input type="text" pattern="[A-Za-z]+" placeholder="City or State" className="w-50 form-control d-inline" value={cityOrState} onChange={(e) => setCityOrState(e.target.value)}/>
                    </div>   
                    <input type="submit"/>         
                </form>

            </>
            )}
            

        </div>
    )
}

export default PaySettings