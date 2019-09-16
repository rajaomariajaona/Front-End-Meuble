import React, { Component } from 'react'
import { Card, CardFooter, CardBody,
    CardTitle, CardText, CardHeader  } from 'shards-react';

export default class Meuble extends Component {
    render() {
        return (
          <Card className="my-3 mx-3">
            <CardHeader> {this.props.numserie} </CardHeader>
            <CardBody>
              <CardTitle>{this.props.nom} </CardTitle>
              <CardText> Prix : {this.props.prix} ar </CardText>
            </CardBody>
            <CardFooter style={{ color: '#007bff'}}>{this.props.categorie}</CardFooter>
          </Card>
        )
    }
}
