import React from 'react'
import { Button } from 'reactstrap';
import Confirmation from './Components/Other/Confirmation';

export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {isOpen: false}
        this.toggleConfirmation = this.toggleConfirmation.bind(this)
        this.handleNo = this.handleNo.bind(this)
        this.handleYes = this.handleYes.bind(this)
    }
    toggleConfirmation(){
        this.setState({isOpen : !this.state.isOpen})
    }
    handleNo(){
        console.log("No");
        this.toggleConfirmation()
    }
    handleYes(){
        console.log("Yes")
        this.toggleConfirmation()
    }
    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggleConfirmation}> Open it </Button>
                <Confirmation text="Voulez vous supprimer?" onNo={this.handleNo} onYes={this.handleYes} isOpen={this.state.isOpen} toggle={this.toggleConfirmation} />
            </div>
        );
    }
}
