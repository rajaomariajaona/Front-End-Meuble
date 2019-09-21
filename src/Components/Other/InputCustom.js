import React, { Component } from 'react'
import { FormGroup, FormInput, FormFeedback } from 'shards-react';
import { PropTypes } from 'prop-types';
export default class InputCustom extends Component {

    render() {
        return (
            <FormGroup>
              <label htmlFor={(this.props.name).toLowerCase()}>{this.props.label}</label>
              <FormInput onBlur={this.props.onBlur} onChange={this.props.onChange} valid={this.props.valid} invalid={this.props.invalid} type={this.props.type} name={(this.props.name).toLowerCase()} id={(this.props.name).toLowerCase()} placeholder={this.props.placeholder} />
              <FormFeedback>{this.props.errorMessage}</FormFeedback>
            </FormGroup>
        )
    }
}

InputCustom.propTypes = {
  errorMessage: PropTypes.string,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  valid: PropTypes.bool
}
InputCustom.defaultProps={
    type: "text",
    invalid: false
}
