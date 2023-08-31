
import { createContext, useState } from "react"

export const UserSettingsContext = createContext(null)


const UserSettingsProvider = ({children}) => {

    const [accountEmail, setAccountEmail] = useState("")
    const [receiveEmailNotifications, setRecieveEmailNotifications] = useState(false)
    const [textSizing, setTextSizing] = useState("")
    const [darkMode, setDarkMode] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    const [creditCardNumber, setCreditCardNumber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [cvv, setCVV] = useState("")
    const [countryOrRegion, setCountryOrRegion] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [aptOrSuiteOrBuilding, setAptOrSuiteOrBuilding] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [cityOrState, setCityOrState] = useState("")
    const [sortPortfolioListBy, setSortPortfolioListBy] = useState("")
    const [portfolioVisibility, setPortfolioVisibility] = useState("")
    const [dividePortfolioIntoSections, setDividePortfolioIntoSections] = useState("")


    const contextValue = {
        accountEmail, setAccountEmail,
        receiveEmailNotifications, setRecieveEmailNotifications,
        textSizing, setTextSizing,
        darkMode, setDarkMode,
        selectedPaymentMethod, setSelectedPaymentMethod,
        creditCardNumber, setCreditCardNumber,
        expirationDate, setExpirationDate,
        cvv, setCVV,
        countryOrRegion, setCountryOrRegion,
        firstName, setFirstName,
        lastName, setLastName,
        streetAddress, setStreetAddress,
        aptOrSuiteOrBuilding, setAptOrSuiteOrBuilding,
        zipCode, setZipCode,
        cityOrState, setCityOrState,
        sortPortfolioListBy, setSortPortfolioListBy,
        portfolioVisibility, setPortfolioVisibility,
        dividePortfolioIntoSections, setDividePortfolioIntoSections
    }

    return (
        <UserSettingsContext.Provider value={contextValue}>
            {children}
        </UserSettingsContext.Provider>
    )
}

export default UserSettingsProvider