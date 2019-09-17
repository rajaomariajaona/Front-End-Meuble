import React, { Component } from 'react'
import { Card, CardBody, CardHeader } from 'shards-react';
import { Button } from 'shards-react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';

export default class Commande extends Component {
    render() {
        return (
            <Card>
        <CardHeader>
        {this.props.numcommande}
        </CardHeader>
        <CardBody>
        {this.props.datecommande}
            
        </CardBody>
      </Card>
        )
    }
}
