import React from 'react';
import ItemList from '../itemList';
import {ItemDetails, Field} from '../itemDetails/itemDetails';
import ErrorBlock from '../errorBlock/errorBlock'
import RowBlock from '../rowBlock/rowBlock'
import Spinner from "../spinner/spinner"

export default class HousePage extends React.Component {
    state = {
        selectedHouse: {
            name: "House Baelish of Harrenhal",
            region: "The Riverlands",
            currentLord: "Petyr Baelish",
            founded: "299 AC",
            founder: "Petyr Baelish"
        },
        componentError: false,
        loading: false
    }
    componentDidCatch() {
        this.setState({componentError: true})
    }
    getCharName = async (url) => {
        const id = this.urlSplit(url) ? this.urlSplit(url) : null
        const res = await this.props.getChar(id)
            .then(char => {
                if(!char) {
                    return "unknown"
                }
                return char.name;
            });
        return await res;
    }

    onHouseSelected = async (house) => {
        this.setState({loading: true})
        const currentLord = await this.getCharName(house.currentLord)
        const founder = await this.getCharName(house.founder)
        const selectedHouse = {
            name: house.name,
            region: house.region,
            founded: house.founded,
            founder: founder,
            currentLord: currentLord
        }
        this.setState({selectedHouse, loading: false})

    }

    urlSplit = (url) => {
        return url.split('/')[url.split('/').length - 1]
    }


    
    render() {
        if(this.state.componentError) {
            return <ErrorBlock></ErrorBlock>
        }
        const {selectedHouse, loading} = this.state;
        const itemList = (
            <ItemList  onItemSelected={this.onHouseSelected} 
            getData={this.props.getData}/>
        )
        const houseDetails = (
            <ItemDetails selectedItem={selectedHouse}>
                <Field label="Region" field="region"/>
                <Field label="Founded" field="founded"/>
                <Field label="Founder" field="founder"/>
                <Field label="Current Lord" field="currentLord"/>
            </ItemDetails>
        )

        const righBlock = loading ? <Spinner/> : houseDetails

        
        return (
            <RowBlock left={itemList} right={righBlock}/>
        )
    }
}