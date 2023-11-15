import { CardContext } from './app/CardProvider'
import {useState, useContext, useEffect} from 'react'
import pokemon from './config/pokemontcgsdk'

const CardAndGradeImages = () => {

    const {
        grade,
        id,
        selectedGraded
    } = useContext(CardContext)

    const [image, setImage] = useState("")
    const [name, setName] = useState("")

    const CardImg = () => {
        if (id !== 'none'){
            return(
                <img src={image} style={{width: "35%", height: "auto"}} alt = ""/>
            )
        
        } 
    }

    const GradeImg = () => {
        if (grade !== '-'){
            console.log(grade)
            return(
                <img src={process.env.PUBLIC_URL + `/grades/${grade}.png`} style={{width: "35%", height: "auto"}} alt = ""/>
            )
        }
    }

    const getCard = async () => {
        try{
            await pokemon.card.find(id).then(card => {
                setImage(card.images.small)
                setName(card.name)
                console.log(card.name)
            })
        } catch (e) {
            console.error(e)
        }
    }

    const DisplayName = () => {
        if (name !== "" ){
            return(
                <label>{name}: {grade}</label>
            )
        }
    }

    useEffect( () => {
        if(id !== 'none')
            getCard()
    }, [id])

        return (
            <div className='d-flex flex-column align-items-start mb-3'>
                <DisplayName/>
                <div id="right-display" className=' w-100 d-flex flex-row align-items-center justify-content-around mt-1'>
                    <CardImg/>
                    <GradeImg/>
                </div>
            </div>
        )
    
    
}

export default CardAndGradeImages