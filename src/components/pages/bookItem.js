import React from "react";
import {ItemDetails, Field} from '../itemDetails/itemDetails';
import Spinner from "../spinner/spinner";
import ErrorBlock from "../errorBlock/errorBlock"

export default class BookItem extends React.Component {
    state = {
        selectedBook: {
            key: "unknown",
            name: "unknown",
            numberOfPages: 'unknown',
            publisher: "unknown",
            released: "unknown",
            url: "unknown"
        },
        loading: true,
        erMsg: '',
        error: false
    }
    
    componentDidMount() {
        this.initBook()
    }

    initBook = () => {
        this.props.getData(this.props.match.params.id)
        .then(selectedBook => {
            this.setState({selectedBook, loading: false})
        })
        .catch(msg => {
            this.setState({loading: false, error: true, erMsg: msg.message})
        })
    }

    onErrorRefresh = () => {
        this.setState({loading: true, error: false});
        this.initBook();
    }

    render() {
        const {selectedBook, loading, error, erMsg} = this.state;
        const book = !(loading || error) ? <Content selectedBook={selectedBook}/> : null
        const load = loading ? <Spinner/> : null
        const err = error ? <ErrorBlock message={erMsg} onErrorRefresh={this.onErrorRefresh}/> : null
        return (
            <>
                {book};
                {load};
                {err};
            </>
        )
    }
}

const Content = ({selectedBook}) => {
    return (
        <ItemDetails selectedItem={selectedBook}>
            <Field label="Number of pages" field="numberOfPages"/>
            <Field label="Publisher" field="publisher"/>
            <Field label="Released" field="released"/>
        </ItemDetails>
    )
}