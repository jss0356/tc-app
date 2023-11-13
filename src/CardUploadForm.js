import { CardContext } from './app/CardProvider'
import {useState, useContext, useEffect} from 'react'
import pokemon from './config/pokemontcgsdk'

const CardUploadForm = () => {

    const {
        grade,
        id
    } = useContext(CardContext)

    const [image, setImage] = useState("")

    const getImage = async () => {
        try{
            await pokemon.card.find(id).then(card => {
                setImage(card.images.small)
                console.log(card.name)
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect( () => {
        getImage()
        console.log(image)
    }, [id])

    if (id !== 'none'){
        return(
            <div id="right-display" className='h-100 w-100 ms-3 d-flex flex-column align-items-center justify-content-center'>
                <img src={image} style={{width: "50%", height: "auto"}} alt = ""/>
            </div>
        )
    
    }
    
}

export default CardUploadForm