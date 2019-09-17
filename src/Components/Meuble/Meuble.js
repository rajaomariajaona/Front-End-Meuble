import React, { Component } from 'react'
import { Card, CardFooter, CardBody, CardTitle, CardText, CardHeader, Col } from 'shards-react';
    import { FaPenAlt }from 'react-icons/fa';
    import { FaTrashAlt } from 'react-icons/fa';
import { Row } from 'react-flexbox-grid';
import Confirmation from '../Other/Confirmation'
export default class Meuble extends Component {
  constructor(props){
    super(props)
    this.state = {modalConfirmation:false}
    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
    this.deleteMeuble = this.deleteMeuble.bind(this)
  }

  deleteMeuble(){
    this.toggleModalConfirmation()
    var parameters = {
        method: "DELETE"
    }
    var req = new Request('http://localhost:8000/api/meubles/'+ this.props.numserie, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
            window.location.reload()
        }
    });
  }
  toggleModalConfirmation(){
    this.setState({modalConfirmation: !this.state.modalConfirmation})
  }
    render() {
        return (
          <div>
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
                <FaTrashAlt onClick={this.toggleModalConfirmation} id={this.props.numserie} className="icons text-danger"/>
                  </Col>
                </Row>
                </Col> 
              </Row>
            </CardFooter>
            
          </Card>
          <Confirmation id="test" text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={this.deleteMeuble} isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
          </div>
        )
    }
}
