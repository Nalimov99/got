import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorBlock from '../errorBlock/errorBlock';

export default class ItemList extends Component {
    state = {
        itemList: null,
        erMsg: '',
        error: false,
        loading: true
    }

    componentDidMount() {
        this.initChars()
    }

    initChars = () => {
        this.props.getData()
        .then(res => {
            this.setState({itemList: res, loading: false, error: false})
        })
        .catch(res => {
            this.setState({loading: false, error: true, erMsg: res.message})
        })
    }



    renderItems = (arr) => {
        return arr.map((item) => {
            return (
                <li className="list-group-item"
                key={item.key}
                onClick={() => {
                    this.props.onItemSelected(item)
                }}>
                    {item.name}
                </li>
            )
        })
    }

    onErrorRefresh = () => {
        this.setState({loading: true, error: false})
        this.initChars()
    }

    render() {
        const {itemList, loading, error, erMsg} = this.state;
        const items = !(loading || error) ? this.renderItems(itemList) : null;
        const er = error ? <ErrorBlock message={erMsg} onErrorRefresh = {this.onErrorRefresh}/> : null;
        const load = loading ? <Spinner/> : null; 
        return (
            <ul className="item-list list-group">
                {items}
                {er}
                {load}
            </ul>
        );
    }
}