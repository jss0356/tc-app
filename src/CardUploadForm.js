import { Button } from "react-bootstrap"
import { useContext } from "react"
import { CardContext } from "./app/CardProvider"
import CalculateGradeForm from "./CalculateGradeForm"

const CardUploadForm = () => {

    const {
        grade, setGrade,
        id,
        selectedGraded, setSelectedGraded
    } = useContext(CardContext)

    const handleCalculate = () => {
        setSelectedGraded("Yes")
    }

    if(id !== 'none'){
        if(selectedGraded === "No") {
            return(
                <div>
                    <div className=' d-flex flex-row align-items-end justify-content-between mt-1 mb-3' >
                        <label>Select a grade</label>
                        <Button size='sm' onClick={handleCalculate}>Calculate Grade &gt;</Button>
                    </div>
                    <select className="form-select custom-select mb-2" value={grade} onChange={e => setGrade(e.target.value)}>
                        <option value="-">None</option>
                        <option value="N0">N0</option>
                        <option value="PR 1">PR 1</option>
                        <option value="FR 1.5">FR 1.5</option>
                        <option value="GOOD 2">GOOD 2</option>
                        <option value="VG 3">VG 3</option>
                        <option value="VG-EX 4">VG-EX 4</option>
                        <option value="EX 5">EX 5</option>
                        <option value="EX-MT 6">EX-MT 6</option>
                        <option value="NM 7">NM 7</option>
                        <option value="NM-MT 8">NM-MT 8</option>
                        <option value="MINT 9">MINT 9</option>
                        <option value="GEM-MT 10">GEM-MT 10</option>
                    </select>
                </div>
            )
        } else if (selectedGraded === "Yes") {
            return (
                <CalculateGradeForm />
            )
        }
    }
}

export default CardUploadForm