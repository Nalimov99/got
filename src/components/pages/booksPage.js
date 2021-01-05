import React from 'react';
import ItemList from '../itemList';
import ErrorBlock from '../errorBlock/errorBlock'



export default class BooksPage extends React.Component {
    state = {
        componentError: false
    }
    componentDidCatch() {
        this.setState({componentError: true})
    }


    urlSplit = (url) => {
        return url.split('/')[url.split('/').length - 1]
    }


    
    render() {
        if(this.state.componentError) {
            return <ErrorBlock></ErrorBlock>
        }  
        return (

            <ItemList  onItemSelected={(item) => {
                this.props.history.push(`/books/${item.key}`);
            }} 
            getData={this.props.getData}/>
        )
    }
}





