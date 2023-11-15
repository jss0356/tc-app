import { CardContext } from './app/CardProvider'
import {useState, useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import pokemon from './config/pokemontcgsdk'

const CardAndGradeImages = () => {

    const [image, setImage] = useState("")
    const [name, setName] = useState("")

    const {
        grade, id, setID,
    } = useContext(CardContext)

    useEffect( () => {
        if(id !== 'none')
            getCard()
    }, [id])

    const CardImg = () => {
        if (id !== 'none'){
            return(
                <img src={image} style={{width: "45%", height: "auto"}} alt = ""/>
            )
        
        } 
    }

    const GradeImg = () => {
        if (grade !== '-'){
            console.log(grade)
            return(
                <img src={process.env.PUBLIC_URL + `/grades/${grade}.png`} style={{width: "39%", height: "auto"}} alt = ""/>
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

    const changeCard = () => {
        setID("none")
        setName("")
    }

    const DisplayName = () => {
        if (name !== "" ){
            return(
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <label>{name}: {grade}</label>
                    <Button size='sm' onClick={changeCard}>Change</Button>
                </div>
            )
        }
    }

    return (
        <div className='d-flex flex-column align-items-between mb-3'>
            <DisplayName/>
            <div id="right-display" className=' w-100 d-flex flex-row align-items-center justify-content-around mt-1'>
                <CardImg/>
                <GradeImg/>
            </div>
        </div>
    )
    
    
}

export default CardAndGradeImages