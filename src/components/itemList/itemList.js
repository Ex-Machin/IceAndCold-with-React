import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default class ItemList extends Component {

    state = {
        itemList: null,
    }

    componentDidMount() {
        const {getData} = this.props

        getData()
            .then((itemList) => {
                this.setState ({
                    itemList,
                }) 
            })
    }

    renderItems(arr) {
        return arr.map((item) => {

            const {id} = item;
            const label = this.props.renderItem(item)

            return (
                <ListGroupItem  
                    key = {id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}>
                        {label}
                </ListGroupItem>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner />;
        }

        const items = this.renderItems(itemList);


        return (
            <ListGroup className="item-list">
                {items}
            </ListGroup>
        );
    }
}