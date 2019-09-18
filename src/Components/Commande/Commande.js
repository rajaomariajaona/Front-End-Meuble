import React, { Component } from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'shards-react';
import { FaCartArrowDown } from 'react-icons/fa';
import history from '../Other/History';

export default class Commande extends Component {
    constructor(props){
        super(props)
        this.handleCart = this.handleCart.bind(this)
    }
    handleCart(){
        history.push('/main/commandes/' + this.props.numcommande)
    }
    render() {
        return (
            <Card className={this.props.className}>
        <CardHeader>
        {this.props.numcommande}
            <FaCartArrowDown onClick={this.handleCart} className="text-success float-right" style={{fontSize: '1.75em', cursor: 'pointer'}}/>
        </CardHeader>
        <CardBody>
        <CardTitle>
        {this.props.client}
        </CardTitle>
        <CardText>
        {this.props.datecommande}
        </CardText>
        </CardBody>
      </Card>
        )
    }
}
