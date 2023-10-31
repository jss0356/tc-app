import { useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import {auth, firestore} from './config/firebase'
import { collection, query, where, getDocs } from "firebase/firestore"
import MainNavbar from "./Rcomponents/MainNavbar"
import SearchIcon from "./logos/SearchIcon.png"
import UserServices from './services/user.services'
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"

const MyPortfolios = () => {

    const [portfolioName, setPortfolioName] = useState("")
    const [sortBy, setSortBy] = useState("");
    const [portfoliios, setPortfolios] = useState([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState([])
    const [currPage, setCurrPage] = useState(1);
    const [currPages, setCurrPages] = useState([1,2,3])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)


    let lowerBound = 0;

  if (currPage !== 1) {
    lowerBound = 16 * (currPage - 1);
  }



    const findPortfolios = async () => {
        setLoading(false)

        try{
            const q = query(collection(firestore, 'users'), where('email', '==', auth.currentUser.email));
            const foundUser = await getDocs(q);
            const userID = foundUser.docs[0].id;
    
            const allPortfolios = await UserServices.getAllUserPortfolios(userID)
    
            setPortfolios(allPortfolios)
            setFilteredPortfolios(allPortfolios)
            setError(false)
        }
        catch(err){
            setError(true)
        }
        finally{
            setLoading(false)
        }
        
    }

    useEffect(() => {
     

        findPortfolios()

    }, [])


    useEffect(() => {
        const filterPortfolios = () => {
            setFilteredPortfolios(portfoliios.filter((portfolio) => {
                
                console.log(portfolio.name.toUpperCase())
                console.log(portfolioName.toUpperCase())
                return portfolio.name.toUpperCase().startsWith(portfolioName.toUpperCase()); 
            }))
        }
        filterPortfolios()
    }, [portfolioName])


    
    console.log(filteredPortfolios)

    console.log("PORTFOLIOS", portfoliios)

    console.log(portfolioName)
    const handlePaginationClick = (clickedButton) => {
        if (clickedButton === "Prev" && currPages[0] !== 1) {
          setCurrPages(currPages.map((page) => page - 1));
          setCurrPage(currPages[0] - 1);
          console.log(currPages, currPage);
        } else if (clickedButton === "Next") {
          setCurrPages(currPages.map((page) => page + 1));
          setCurrPage(currPages[currPages.length - 1] + 1);
          console.log(currPages, currPage);
        } else {
          setCurrPage(clickedButton);
          console.log(currPage);
        }
      };

    return(
        <div id="container" className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
            <div id="main-navbar" style={{marginTop:"130px"}}>
                <MainNavbar/>
            </div>

            <div id="my-portfolios-container" className="w-75 h-75 d-flex flex-column border rounded align-items-center" style={{backgroundColor:"#edf5e1"}}>

            <div className="input-group mb-3 mt-2 w-75">
                    <select className="form-select w-25" style={{maxWidth:"100px"}}aria-labelledby="sort-showcase-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort by:</option>
                        <option value="creationDate">Creation Date</option>
                        <option value="lastEdited">Last Edited</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Search by Portfolio Name" aria-label="Username" value={portfolioName} onChange={(e) => setPortfolioName(e.target.value)}/>
                    <span className="input-group-text"><button><img src={SearchIcon} width="30px" alt="search"/></button></span>
            </div>
            <p>Search Results:</p>

            <div id="search-results-container"
          className="h-100 w-100  "
          style={
            loading
              ? {}
              : {
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                  gap: "1em",
                  gridTemplateRows: "1fr 1fr 1fr 1fr",
                }
          }>
              {loading && <>
                <Spinner
                animation="border"
                variant="primary"
                className="custom-spinner spinner-lg w-20 h-20"
              />
              <span className="loading-message fs-4">Loading cards...</span>
                </>}
                {!loading && !error && filteredPortfolios.map((portfolio) => 
                
                <>
                
               <Link to={`/my-account/my-portfolios/${portfolio.portfolioID}`} style={{textDecoration: "none", color: "black"}}>
               
               <div style={{border:"3px solid rgba(0,0,0, 0.2)", justifyContent: "space-between", width: "100%"}} className="d-flex align-items-center h-100 p-3">
                    <div>
                    Portfolio
                    
                    </div>

                    <div className="name d-flex flex-column">
                        <div className="name-label">
                            Name
                        </div>
                        <div>
                        {portfolio.name}
                        </div>
                    
                    </div>
                </div>
               
               </Link>
              
                
                
                </>


                
                ).slice(lowerBound, 16 * currPage)}
            </div>

            <div className="d-flex flex-row justify-content-center w-100 pt-5">
          <nav aria-label="...">
            <ul className="pagination">
              <li
                className={`page-item ${currPages[0] === 1 ? "disabled" : ""}`}
                onClick={() => handlePaginationClick("Prev")}
              >
                <a className="page-link" href="#" tabIndex="-1">
                  Previous
                </a>
              </li>
              {currPages.map((page) => (
                <li
                  className={`page-item ${currPage === page ? "active" : ""}`}
                  onClick={() => handlePaginationClick(page)}
                >
                  <a className="page-link" href="#">
                    {page}
                  </a>
                </li>
              ))}
              <li
                className="page-item"
                onClick={() => handlePaginationClick("Next")}
              >
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>


            </div>
        </div>
    )
}

export default MyPortfolios