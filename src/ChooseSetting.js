import GenSetting from './GenSetting'
import AccessSetting from './AccessSetting'
import PaySettings from './PaySettings'
import PortfolioSettings from './PortfolioSettings'
import MyListings from './MyListings'


const ChooseSettings = (props) => {
    if (props.gen && !props.access && !props.pay && !props.portfolio && !props.listing){
        return <GenSetting/>
    } else if (!props.gen && props.access && !props.pay && !props.portfolio && !props.listing) {
        return <AccessSetting/>
    } else if (!props.gen && !props.access && props.pay && !props.portfolio && !props.listing) {
        return <PaySettings/>
    } else if (!props.gen && !props.access && !props.pay && props.portfolio && !props.listing) {
        return <PortfolioSettings/>
    } else {
        return <MyListings/>
    }
}

export default ChooseSettings