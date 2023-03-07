import MainNavbar from "./Rcomponents/MainNavbar"
import SearchIcon from "./logos/SearchIcon.png"

const MyPortfolios = () => {
    return(
        <div id="container" className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
            <div id="main-navbar" style={{marginTop:"130px"}}>
                <MainNavbar/>
            </div>

            <div id="my-portfolios-container" className="w-75 h-75 d-flex flex-column border rounded align-items-center" style={{backgroundColor:"#edf5e1"}}>

            <div className="input-group mb-3 mt-2 w-75">
                    <select className="form-select w-25" style={{maxWidth:"100px"}}aria-labelledby="sort-showcase-by">
                        <option value="">Sort by:</option>
                        <option value="creationDate">Creation Date</option>
                        <option value="lastEdited">Last Edited</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Search by Portfolio Name" aria-label="Username"/>
                    <span className="input-group-text"><button><img src={SearchIcon} width="30px" alt="search"/></button></span>
            </div>
            <p>Search Results:</p>

            <div id="search-results" className="w-75 h-100 border border-dark" style={{backgroundColor:"white"}}></div>


            </div>
        </div>
    )
}

export default MyPortfolios