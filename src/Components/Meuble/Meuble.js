import React, { Component } from 'react'
import { Card, CardFooter, CardBody,
    CardTitle, CardText, CardHeader  } from 'reactstrap';

export default class Meuble extends Component {
    render() {
        return (
            <Card>
            <CardHeader> {this.props.numserie} </CardHeader>
            <CardBody>
              <CardTitle>{this.props.nom} </CardTitle>
              <CardText> Prix : {this.props.prix} ar </CardText>
            </CardBody>
            <CardFooter style={{backgroundColor: this.props.footerBgColor, color: 'white'}}>{this.props.categorie}</CardFooter>
          </Card>
        )
    }
}
