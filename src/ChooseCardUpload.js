
import { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import {useState} from 'react'
import pokemon from './config/pokemontcgsdk'

const ChooseCardUpload = ({changeID}) => {

    const [loading, setLoading] = useState(false)
    
    const getCards = async inputValue => {
        
        let arr = []
        setLoading(true)
            return pokemon.card.where({ q: `name:${inputValue}*`}).then(result => {   
                result.data.map((card) => {
                    return arr.push({value: card.id, label: card.name, setSymbol: card.set.images.symbol})
                    })    
                setLoading(false) 
                return arr               
            })
    }

    const selectionChange = (selectedOption) => {
        if (selectedOption) { 
            changeID(selectedOption.value)
        } else { changeID('none');  }
    }
    

    const IconOption = (props) => (
        <components.Option {...props}>
            <img src={props.data.setSymbol} style={{ height: '30px', borderRadius: '50%', marginRight: '10px' }} alt={"set symbol"}/>
            {props.data.label}
        </components.Option>
    );

    return (
        <div>
            <AsyncSelect className="basic-single mb-2" classNamePrefix="select" 
            components={{Option: IconOption}} fe
            onChange={selectionChange}
            isLoading={loading} isClearable isSearchable 
            loadOptions={getCards}/>
        </div>
    )
}

export default ChooseCardUpload