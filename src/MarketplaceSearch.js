import MainNavbarMarketplace from "./Rcomponents/MainNavbarMarketplace"

const MarketplaceSearch = () => {
    return (
        <div id="container" className="h-100 w-100 d-flex flex-column">
            <div id="mainNavMarketplace" style={{marginBottom:"130px"}}>
                <MainNavbarMarketplace/>
            </div>



            <div id="marketplace-search-container" className="w-100 h-100 d-flex flex-column" style={{backgroundColor:"#edf5e1"}}>
            <p className="text-center">Search Results:</p>
            <div id="search-results-container" className="h-100 w-100 bg-light border border-dark">
            </div>
            <div className="d-flex flex-row justify-content-center w-100">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item disabled">
                                <a className="page-link" href="#">2 </a>
                            </li>
                        <li className="page-item disabled"><a className="page-link" href="#">3</a></li>
                            <li className="page-item disabled">
                                <a className="page-link" href="#">Next</a>
                            </li>
                    </ul>
                </nav>
            </div>
            </div>
        </div>



    )
}

export default MarketplaceSearch