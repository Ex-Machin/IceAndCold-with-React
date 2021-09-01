import React, {Component} from "react"
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';

import './app.css'

export default class App extends Component {

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

    onCharSelected = (id) => {
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
                    <CharacterPage/>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};