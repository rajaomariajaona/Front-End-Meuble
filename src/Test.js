import React from 'react'
import { Col } from 'shards-react';
import Format from './Components/Other/Format'
import { Loader } from 'react-loaders';
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
            <Col>
            <center>
                <Loader className="mt-5" type="line-scale" active color="#007bff"/>
            </center>
            </Col>
        );
    }
}
