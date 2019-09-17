import React, { Component } from 'react'
import { Card, CardFooter, CardBody, CardTitle, CardText, CardHeader, Button, Col } from 'shards-react';
    import { FaPenAlt }from 'react-icons/fa';
    import { FaTrashAlt } from 'react-icons/fa';
import { Row } from 'react-flexbox-grid';
export default class Meuble extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  deleteMeuble(){

  }
  modifyMeuble(){
    
  }

    render() {
        return (
          <Card className="my-3 mx-3">
            <CardHeader> {this.props.numserie} </CardHeader>
            <CardBody>
              <CardTitle>{this.props.nom} </CardTitle>
              <CardText> Prix : {this.props.prix} ar </CardText>
            </CardBody>
            <CardFooter style={{ color: '#007bff'}}>
              <Row>
                <Col sm={8}>{this.props.categorie}</Col>
                <Col sm={4}>
                <Row>
                  <Col sm={6}>
                <FaPenAlt onClick={this.props.onModify} id={this.props.numserie} className="icons text-success"/>
                  </Col>
                  <Col sm={6}>
                <FaTrashAlt onClick={this.props.onDelete} id={this.props.numserie} className="icons text-danger"/>
                  </Col>
                </Row>
                </Col> 
              </Row>
            </CardFooter>
          </Card>
        )
    }
}
