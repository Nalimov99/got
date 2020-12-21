import React, {Component} from 'react';
import gotService from '../../services/gotService'
import Spinner from '../spinner/spinner';
import ErrorBlock from '../errorBlock/errorBlock';
import transformEmptyString from '../transfromEmptyString/transformEmptyString'
import './randomChar.css';

export default class RandomChar extends Component {

    state = {
        character: {},
        loading: true,
        error: false,
        erMsg: ''
    };
    gotService = new gotService();

    componentDidMount() {
        this.initCharacter();
    }


    initCharacter = () => {
        const id = Math.floor(Math.random()*140 + 20);
        this.gotService.getCharacter(id)
        .then((character) => {
            this.setState({character, loading: false});
        })
        .catch((res) => {
            this.setState({
                error: true,
                erMsg: res.message,
                loading: false
            })
        })
        
    }

    onErrorRefresh = () => {
        this.setState({error: false, loading: true})
        this.initCharacter();
    }

    render() {
        const {loading, character, error, erMsg} = this.state;
        const content = !(loading || error) ? <Contet char={character}/> : null;
        const errorBlock = error ? <ErrorBlock message={erMsg} onErrorRefresh = {this.onErrorRefresh}/> : null;
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="random-block rounded">
                {content}
                {spinner}
                {errorBlock}
            </div>
        );
    }
}



const Contet = ({char}) => {
    const {name, died, culture, born, gender} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{transformEmptyString(born)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{transformEmptyString(died)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{transformEmptyString(culture)}</span>
                </li>
            </ul>
        </>
    )
}
