import React, {Component} from 'react';
import transformEmptyString from "../transfromEmptyString/transformEmptyString"
import './charDetails.css';

const Field = ({selectedChar, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{transformEmptyString(selectedChar[field])}</span>
        </li>
    )
}


class CharDetails extends Component {

    render() {
        const {name} = this.props.selectedChar
        const {selectedChar} = this.props;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                           return React.cloneElement(child, {selectedChar})
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {CharDetails, Field}
