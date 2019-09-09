import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
export default class InputCustom extends Component {

    render() {
        return (
            <FormGroup>
              <Label for={(this.props.name).toLowerCase()}>{this.props.label}</Label>
              <Input type={this.props.type} name={(this.props.name).toLowerCase()} id={(this.props.name).toLowerCase()} placeholder={this.props.placeholder} />
            </FormGroup>
        )
    }
}
InputCustom.defaultProps={
    type: "text"
}
