import React, {Component} from 'react';
import transformEmptyString from "../transfromEmptyString/transformEmptyString"
import './itemDetails.css';

const Field = ({selectedItem, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{transformEmptyString(selectedItem[field])}</span>
        </li>
    )
}


class ItemDetails extends Component {

    render() {
        const {selectedItem} = this.props;
        const {name} = selectedItem;
        
        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                           return React.cloneElement(child, {selectedItem})
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {ItemDetails, Field}
