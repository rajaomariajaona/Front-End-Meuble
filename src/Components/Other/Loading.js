import React, { Component } from 'react'
import { Loader } from 'react-loaders';

export default class Loading extends Component {
    render() {
        return (
            <div className="" style={{position: "absolute", top: "50%", left: "50%"}}>
                <Loader className="mt-5 d-block" type="line-scale" active color="#007bff"/>
            </div>
        )
    }
}
