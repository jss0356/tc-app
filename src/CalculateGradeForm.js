import React, { useContext, useEffect } from 'react';
import { CardContext } from './app/CardProvider';
const CalculateGradeForm = () => {

    const convertGrade = (g) => {
        switch(g){
            case 0:
                setGrade('N0')
                break
            case 1:
                setGrade('PR 1')
                break
            case 1.5:
                setGrade('FR 1.5')
                break
            case 2:
                setGrade('GOOD 2')
                break
            case 3:
                setGrade('VG 3')
                break
            case 4:
                setGrade('VG-EX 4')
                break
            case 5:
                setGrade('EX 5')
                break
            case 6:
                setGrade('EX-MT 6')
                break
            case 7:
                setGrade('NM 7')
                break
            case 8:
                setGrade('NM-MT 8')
                break
            case 9:
                setGrade('MINT 9')
                break
            default:
                setGrade('GEM-MT 10')
        }
    }

    const {
        setGrade,
        selectedAltered, setSelectedAltered,
        selectedSurfaceWear, setSelectedSurfaceWear,
        selectedDiscoloration, setSelectedDiscoloration,
        selectedScratch, setSelectedScratch,
        selectedStain, setSelectedStain,
        selectedDefect, setSelectedDefect,
        selectedCornersRounded, setSelectedCornersRounded,
        selectedCrease, setSelectedCrease,
        selectedBorder, setSelectedBorder,
        selectedCornersFraying, setSelectedCornersFraying,
        selectedEdges, setSelectedEdges,
        selectedFocus, setSelectedFocus,
        selectedGloss, setSelectedGloss,
        selectedInTact, setSelectedInTact,
        selectedFrontCentering, setSelectedFrontCentering,
        selectedBackCentering, setSelectedBackCentering
    } = useContext(CardContext)


    useEffect(()=> {

        let selections = [Number(selectedAltered), Number(selectedSurfaceWear), Number(selectedDiscoloration), 
            Number(selectedScratch), Number(selectedStain), Number(selectedDefect), Number(selectedCornersRounded), 
            Number(selectedCrease), Number(selectedBorder), Number(selectedCornersFraying), Number(selectedEdges), 
            Number(selectedFocus), Number(selectedGloss), Number(selectedInTact), Number(selectedFrontCentering),
            Number(selectedBackCentering)]

        if (selections.includes(11)){
            setGrade("-")
        } else {
            let newGrade = Math.min.apply(Math, selections)
            //setGrade(newGrade)
            convertGrade(newGrade)
        }

        
    },[selectedAltered, selectedSurfaceWear, selectedDiscoloration, 
        selectedScratch, selectedStain, selectedDefect, selectedCornersRounded, selectedCrease, selectedBorder, 
        selectedCornersFraying, selectedEdges, selectedFocus, selectedGloss, selectedInTact, selectedFrontCentering,
        selectedBackCentering])

    return(
        <div>
            <label htmlFor="add-portfolio-title">Calculate Grade:</label>
            <select className="form-select custom-select mb-2" value={selectedAltered} onChange={e => { setSelectedAltered(e.target.value)}}>
                <option value={11}>Is the card altered in some way or have any major defects</option>
                <option value={0}>Yes</option>
                <option value={10}>No</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedInTact} onChange={e => {setSelectedInTact(e.target.value)}}>
                <option value={11}>Is the card fully in tact</option>
                <option value={10}>Yes</option>
                <option value={1}>No</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedSurfaceWear} onChange={e => {setSelectedSurfaceWear(e.target.value)}}>
                <option value={11}>Choose an option that best describes the surface wear</option>
                <option value={1.5}>Advanced</option>
                <option value={2}>Obvious</option>
                <option value={3}>Apparent</option>
                <option value={4}>Noticeable</option>
                <option value={5}>More Visible</option>
                <option value={6}>Visible</option>
                <option value={7}>Slight (On Close Inspection)</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedDiscoloration} onChange={e => {setSelectedDiscoloration(e.target.value)}}>
                <option value={11}>Choose an option that best describes the discoloration</option>
                <option value={1.5}>Extreme or Dirty</option>
                <option value={2}>Considerable</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedScratch} onChange={e => {setSelectedScratch(e.target.value)}}>
                <option value={11}>Choose an option that best describes any scratches</option>
                <option value={3}>Light</option>
                <option value={5}>Several (On Close Inspection) </option>
                <option value={6}>One (On Close Inspection) </option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedStain} onChange={e => {setSelectedStain(e.target.value)}}>
                <option value={11}>Choose an option that best describes any stains</option>
                <option value={3}>Slight (Front)</option>
                <option value={8}>Slight (Back)</option>
                <option value={6}>Minor (Back)</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedDefect} onChange={e => {setSelectedDefect(e.target.value)}}>
                <option value={11}>Choose an option that best describes any print defects</option>
                <option value={1}>Warping or Destructive</option>
                <option value={7}>Minor Blemish</option>
                <option value={9}>Minor Imperfection</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedCrease} onChange={e => {setSelectedCrease(e.target.value)}}>
                <option value={11}>Choose an option that best describes any creases</option>
                <option value={1}>Major</option>
                <option value={1.5}>Heavy</option>
                <option value={2}>Visible (Several)</option>
                <option value={3}>Visible (One)</option>
                <option value={4}>Light (One)</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedCornersRounded} onChange={e => {setSelectedCornersRounded(e.target.value)}}>
                <option value={11}>Choose an option that best describes any rounded corners</option>
                <option value={1.5}>Missing</option>
                <option value={2}>Accelerated</option>
                <option value={3}>Some</option>
                <option value={4}>Slighty</option>
                <option value={5}>Minor</option>
                <option value={9}>None</option>
                <option value={10}>Sharp</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedCornersFraying} onChange={e => {setSelectedCornersFraying(e.target.value)}}>
                <option value={11}>Choose an option that best describes any fraying corners</option>
                <option value={6}>Slight</option>
                <option value={10}>None</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedBorder} onChange={e => {setSelectedBorder(e.target.value)}}>
                <option value={11}>Choose an option that best describes the borders</option>
                <option value={1.5}>Brown/Dirty</option>
                <option value={3}>Somewhat Yellow or Discolored</option>
                <option value={4}>Slightly Off-White</option>
                <option value={5}>Some Off-Whiteness</option>
                <option value={6}>Slight Off-Whiteness</option>
                <option value={10}>White</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedEdges} onChange={e => {setSelectedEdges(e.target.value)}}>
                <option value={11}>Choose an option that best describes the edges</option>
                <option value={1.5}>Frame Affecting Damage</option>
                <option value={3}>Noticeable Wear</option>
                <option value={5}>Minor Chipping</option>
                <option value={6}>Slight Notching</option>
                <option value={10}>No Damage</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedFocus} onChange={e => {setSelectedFocus(e.target.value)}}>
                <option value={11}>Choose an option that best describes the focus</option>
                <option value={1.5}>Quite Out-of-Register</option>
                <option value={3}>Somewhat Out-of-Register</option>
                <option value={5}>Slightly Out-of-Register</option>
                <option value={9}>In Focus</option>
                <option value={10}>Sharp</option>

            </select>
            <select className="form-select custom-select mb-2" value={selectedGloss} onChange={e => {setSelectedGloss(e.target.value)}}>
                <option value={11}>Choose an option that best describes the gloss</option>
                <option value={2}>Absent</option>
                <option value={3}>Mostly Gone</option>
                <option value={6}>Some Removal</option>
                <option value={7}>Mostly Remaining</option>
                <option value={10}>Full</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedFrontCentering} onChange={e => {setSelectedFrontCentering(e.target.value)}}>
                <option value={11}>Choose an option that best describes the centering on the front</option>
                <option value={10}>55/45 - 60/40 % or less</option>
                <option value={9}>60/40 - 65/35 % or less</option>
                <option value={8}>65/35 - 70/30 % or less</option>
                <option value={7}>70/30 - 75/25 % or less</option>
                <option value={6}>80/20 % or less</option>
                <option value={5}>85/15 % or less</option>
                <option value={3}>90/10 % or less</option>
            </select>
            <select className="form-select custom-select mb-2" value={selectedBackCentering} onChange={e => {setSelectedBackCentering(e.target.value)}}>
                <option value={11}>Choose an option that best describes the centering on the back</option>
                <option value={10}>75/25 % or less</option>
                <option value={9}>90/10 % or less</option>
            </select>

        </div>
    )

}
export default CalculateGradeForm;