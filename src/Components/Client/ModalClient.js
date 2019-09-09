import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormulaireClient from './FormulaireClient';

export default class ModalClient extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader> {this.props.modalType} client </ModalHeader>
          <ModalBody>
            <FormulaireClient addValue={this.props.addValue} ajout={this.props.ajout} onCancel={this.props.onCancel} onSubmit={this.props.onSubmit} />
          </ModalBody>
        </Modal>
        )
    }
}
ModalClient.defaultProps ={modalType : "Ajout"}