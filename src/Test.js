import React from 'react'
import Meuble from './Components/Meuble/Meuble';
import { Col } from 'reactstrap';
import Format from './Components/Other/Format'
export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {isOpen: false}
        
    }
    componentDidMount(){
        console.log(new Format().formatTel("0"))
    }
    render() {
        return (
            <Col md={3}>
                <Meuble />
            </Col>
        );
    }
}
