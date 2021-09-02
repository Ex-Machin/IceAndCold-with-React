import React, {Component} from "react"
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from "../charDetails";
import gotService from '../../services/gotService';


import './app.css'

export default class App extends Component {

    gotService = new gotService()

    state = {
        isToggleOn: true,
    }

    handleClick = () => {
        this.setState((prevState) => {
            return {
                isToggleOn: !prevState.isToggleOn
            }
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        
        const header = this.state.isToggleOn ? <RandomChar/> : null

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {header}
                            <Button outline color="info" size="lg" onClick={this.handleClick} className="btn-toogle">Toggle</Button>{' '}
                        </Col>
                    </Row>
                    <CharacterPage/> 
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}
                                /> 
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row> 
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                                />
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                                charId = {this.state.selectedChar} 
                                
                                />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};