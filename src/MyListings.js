const MyListings = () => {
    return (
        <div id="setting-options" className="vstack d-flex justify-content-center gap-3 h-100 w-50 border border-dark">
            <label>My Listings</label>
            <label htmlFor="sample-setting">Sample Setting 1:</label>
            <select id="sample-setting"className="form-select" aria-label="Default select example">
                <option value="">Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>
            
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Sample Setting 2:</label>
            </div>

            
                <label htmlFor="sample-setting">Sample Setting 3:</label>
            <select id="sample-setting"className="form-select" aria-label="Default select example">
                <option value="">Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>
        </div>
    )
}

export default MyListings