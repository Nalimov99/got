import React from 'react';
import ItemList from '../itemList';
import {CharDetails, Field} from '../charDetails/charDetails';
import ErrorBlock from '../errorBlock/errorBlock'
import RowBlock from '../rowBlock/rowBlock'

export default class characterPage extends React.Component {
    state = {
        selectedChar: {
            name: "Jon Snow",
            gender: "Male",
            culture: "Northmen",
            born: "In 283 AC",
            died: ""
        },
        componentError: false
    }
    componentDidCatch() {
        this.setState({componentError: true})
    }

    onCharSelected = (selectedChar) => {
        this.setState({selectedChar})
    }

    transformAllCharacters = (char) => {
        return {
            name: char.name,
            key: char.url.split('/')[char.url.split('/').length - 1],
            gender: char.gender,
            born: char.born,
            culture: char.culture
        }
    }

    
    render() {
        if(this.state.componentError) {
            return <ErrorBlock></ErrorBlock>
        }
        const {selectedChar} = this.state;
        const itemList = (
            <ItemList  onItemSelected={this.onCharSelected} 
            getData={this.props.getData} 
            transformChars = {this.transformAllCharacters}/>
        )
        const charDetails = (
            <CharDetails selectedChar={selectedChar}>
                <Field label="Gender" field="gender"/>
                <Field label="Born" field="born"/>
                <Field label="Died" field="died"/>
                <Field label="Culture" field="culture"/>
            </CharDetails>
        )



        
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}