import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class CharDetails extends Component {

    gotService = new gotService()

    state = {
        char: null,
        error: false,
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    updateChar() {
        const {charId} = this.props
        if(!charId) {
            return
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
    }

    render() {

        if(!this.state.char) {
            return <Spinner />
        }

        if(this.state.error) {
            return <ErrorMessage/>
        }

        const {name, gender, born, died, culture} = this.state.char

        return (
            <div className="char-details rounded">
                <h4>{this.name}</h4>
                <ul className="list-group list-group-flush">
                    {this.props}
                </ul>
            </div>
        );
    }
}