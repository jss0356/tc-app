import {createContext, useState} from 'react'

export const MarketplaceContext = createContext(null)

const MarketplaceProvider = ({children}) => {
    const [search, setSearch] = useState("")
    const [cartCount, setCartCount] = useState(0)
    const [addedCards, setAddedCards] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [currPages, setCurrPages] = useState([1,2,3])

    return (
        <MarketplaceContext.Provider value={{search, setSearch, cartCount, setCartCount, addedCards, setAddedCards, currPage, setCurrPage, currPages, setCurrPages}}>
            {children}
        </MarketplaceContext.Provider>
    )

}


export default MarketplaceProvider