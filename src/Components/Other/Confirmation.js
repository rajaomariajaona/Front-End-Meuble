 import React, { Component } from 'react'
 import { Modal, ModalHeader, Button, ModalFooter } from 'shards-react';

 export default class Confirmation extends Component {
     render() {
         return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader> {this.props.text} </ModalHeader>
            <ModalFooter>
              <Button theme="primary" onClick={this.props.onYes}>Oui</Button>{' '}
              <Button theme="secondary" onClick={this.props.onNo}>Non</Button>
            </ModalFooter>
          </Modal>
         )
     }
 }
 