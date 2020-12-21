import React from 'react';
import "./app.css"
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorBlock from '../errorBlock/errorBlock';
import CharacterPage from '../characterPage/characterPage'
import gotService from "../../services/gotService"



export default class App extends React.Component {
    state = {
        showRandomChar: true,
        componentError: false
    }

    gotService = new gotService();
    

    componentDidCatch() {
        this.setState(({componentError: true}))
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    
    render() {
        const {showRandomChar, componentError} = this.state;
        const randomChar = showRandomChar ? <RandomChar/> : null;
        if(componentError) {
            return <ErrorBlock></ErrorBlock>
        }
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                            <button className="toggle-button"
                            onClick={this.onToggleRandomChar}>
                                Toggle character
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage getData={this.gotService.getAllCharacters}/>
                </Container>
            </>
        );
    }
};

