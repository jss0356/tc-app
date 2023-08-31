
import {useContext, useState} from 'react'
import { UserSettingsContext } from './app/UserSettingsProvider'

const PortfolioSettings = () => {


    const {sortPortfolioListBy, setSortPortfolioListBy, portfolioVisibility, setPortfolioVisibility, dividePortfolioIntoSections, setDividePortfolioIntoSections} = useContext(UserSettingsContext)

    return (
        <div id="setting-options" className="ps-3 d-flex flex-column gap-3 h-100 w-50 border border-dark">
            <label className="text-center">Portfolio Settings</label>
            <div id="sort-porfolios-input">
                <label htmlFor="sample-setting" className="pe-3">Sort Portfolio List By:</label>
                <select id="sample-setting"className="form-select d-inline w-50" aria-label="Default select example" >
                    <option value="">Sort Portfolios By</option>
                    <option value="Date Created">Date Created</option>
                    <option value="Last Modified">Last Modified</option>
                    <option value="Last Accessed">Last Accessed</option>
                </select>
            </div>
            
            <div id="sort-porfolios-input">
                <label htmlFor="sample-setting" className="pe-3">All Portfolios are Visible to:</label>
                <select id="sample-setting"className="form-select d-inline w-50" aria-label="Default select example" >
                    <option value="">Everyone</option>
                    <option value="Friends Only">Friends Only</option>
                    <option value="Nobody">Nobody</option>
                </select>
            </div>

            <div className="d-flex flex-row w-100">
                <label className="form-check-label pe-3" htmlFor="flexSwitchCheckDefault">Divide Contents Into Sections:</label>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                </div>
            </div>
        </div>
    )
}

export default PortfolioSettings