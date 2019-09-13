import React from 'react'
import Meuble from './Components/Meuble/Meuble';
import { Col } from 'reactstrap';
export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {isOpen: false}
    }
    render() {
        return (
            <Col md={3}>
                <Meuble />
            </Col>
        );
    }
}
