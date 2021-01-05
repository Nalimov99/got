import React from 'react';
import "./app.css"
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorBlock from '../errorBlock/errorBlock';
import CharacterPage from '../pages/characterPage'
import gotService from "../../services/gotService"
import HousePage from '../pages/housePage'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksPage from '../pages/booksPage';
import BookItem from '../pages/bookItem'



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
            <Router>
                <div className="app"> 
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
                        <Route path="/characters" exact render={(props) => 
                            <CharacterPage {...props} getData={this.gotService.getAllCharacters}/>
                        }/>
                        <Route path="/houses" exact render={(props) => 
                            <HousePage {...props} getData={this.gotService.getAllHouses} getChar={this.gotService.getCharacter}/>
                        }/>
                        <Route path="/books/" exact render={(props) => 
                            <BooksPage {...props} getData={this.gotService.getAllBooks} onBookSelected={this.onBookSelected}/>
                        }/>
                        <Route path="/books/:id" render={(props) => 
                            <BookItem {...props} getData={this.gotService.getBook}/>}/>
                    </Container>
                </div>
            </Router>
        );
    }
};

