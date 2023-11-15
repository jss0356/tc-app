
import { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import {useState, useContext} from 'react'
import pokemon from './config/pokemontcgsdk'
import { CardContext } from './app/CardProvider'

const ChooseCardUpload = () => {

    const [loading, setLoading] = useState(false)
    const {
        id, setID
    } = useContext(CardContext)
    
    const getCards = async inputValue => {
        
        let arr = []
        setLoading(true)
            return pokemon.card.where({ q: `name:${inputValue}*`}).then(result => {   
                result.data.map((card) => {
                    return arr.push({value: card.id, label: card.name, cardImg: card.images.small})
                    })    
                setLoading(false) 
                return arr               
            })
    }

    const selectionChange = (selectedOption) => {
        if (selectedOption) { 
            setID(selectedOption.value)
        } else { setID('none');  }
    }
    

    const IconOption = (props) => (
        <components.Option {...props}>
            <img src={props.data.cardImg} style={{ height: '100px', marginRight: '10px' }} alt={"Card Img"}/>
            {props.data.label}
        </components.Option>
    );

    if (id === 'none'){
        return (
            <div>
                <label htmlFor="card-name">Card Name (required)</label>
                <AsyncSelect className="basic-single mb-2" classNamePrefix="select" 
                components={{Option: IconOption}} fe
                onChange={selectionChange}
                isLoading={loading} isClearable isSearchable 
                loadOptions={getCards}/>
            </div>
        )
    }
}

export default ChooseCardUpload