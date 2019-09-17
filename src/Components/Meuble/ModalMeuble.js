import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'shards-react';
import FormulaireMeuble from './FormulaireMeuble';
import PropTypes from 'prop-types';
export default class ModalMeuble extends Component {
    render() {
        return (
            <Modal open={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <FormulaireMeuble addValue={this.props.addValue} ajout={this.props.ajout} onCancel={this.props.onCancel} onSubmit={this.props.onSubmit} />
          </ModalBody>
        </Modal>
        )
    }
}

ModalMeuble.propTypes = {
  onSubmit : PropTypes.func,
  ajout: PropTypes.bool,
  onCancel : PropTypes.func
}