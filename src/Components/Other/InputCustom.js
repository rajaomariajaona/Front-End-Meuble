import React, { Component } from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
export default class InputCustom extends Component {

    render() {
        return (
            <FormGroup>
              <Label for={(this.props.name).toLowerCase()}>{this.props.label}</Label>
              <Input onBlur={this.props.onBlur} onChange={this.props.onChange} valid={this.props.valid} invalid={this.props.invalid} type={this.props.type} name={(this.props.name).toLowerCase()} id={(this.props.name).toLowerCase()} placeholder={this.props.placeholder} />
              <FormFeedback>{this.props.errorMessage}</FormFeedback>
            </FormGroup>
        )
    }
}
InputCustom.defaultProps={
    type: "text",
    invalid: false
}
