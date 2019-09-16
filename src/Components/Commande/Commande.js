import React, { Component } from 'react'
import { Card, CardBody, CardHeader } from 'shards-react';

export default class Commande extends Component {
    render() {
        return (
            <Card>
        <CardHeader>
        {this.props.numcommande}
        </CardHeader>
        <CardBody>
        
        </CardBody>
      </Card>
        )
    }
}
