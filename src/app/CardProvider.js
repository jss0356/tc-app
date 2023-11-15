import {createContext, useState} from 'react'

export const CardContext = createContext(null)

const CardProvider = ({children}) => {
    const [id, setID] = useState("none")
    const [grade, setGrade] = useState("-")
    const [selectedGraded, setSelectedGraded] = useState("No")
    const[selectedAltered, setSelectedAltered] = useState(11);
    const[selectedSurfaceWear, setSelectedSurfaceWear] = useState(11);
    const[selectedDiscoloration, setSelectedDiscoloration] = useState(11);
    const[selectedScratch, setSelectedScratch] = useState(11);
    const[selectedStain, setSelectedStain] = useState(11);
    const[selectedDefect, setSelectedDefect] = useState(11);
    const[selectedCornersRounded, setSelectedCornersRounded] = useState(11);
    const[selectedCrease, setSelectedCrease] = useState(11);
    const[selectedBorder, setSelectedBorder] = useState(11);
    const[selectedCornersFraying, setSelectedCornersFraying] = useState(11);
    const[selectedEdges, setSelectedEdges] = useState(11);
    const[selectedFocus, setSelectedFocus] = useState(11);
    const[selectedGloss, setSelectedGloss] = useState(11);
    const[selectedInTact, setSelectedInTact] = useState(11);
    const[selectedFrontCentering, setSelectedFrontCentering] = useState(11);
    const[selectedBackCentering, setSelectedBackCentering] = useState(11);

    const contextValue = {
        id, setID,
        grade, setGrade,
        selectedGraded, setSelectedGraded,
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
    }
    

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    )

}

export default CardProvider