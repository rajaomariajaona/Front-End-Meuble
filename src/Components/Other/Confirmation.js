 import React, { Component } from 'react'
 import { Modal, ModalHeader, Button, ModalFooter } from 'reactstrap';

 export default class Confirmation extends Component {
     render() {
         return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader> {this.props.text} </ModalHeader>
            <ModalFooter>
              <Button color="primary" onClick={this.props.onYes}>Oui</Button>{' '}
              <Button color="secondary" onClick={this.props.onNo}>Non</Button>
            </ModalFooter>
          </Modal>
         )
     }
 }
 