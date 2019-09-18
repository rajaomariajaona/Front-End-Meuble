import React, { Component } from 'react'
import FormulaireCommande from '../Commande/FormulaireCommande';
import Loading from '../Other/Loading';
import {Row ,Col} from 'shards-react'
import Format from '../Other/Format';
export default class Contients extends Component {

    constructor(props){
        super(props)
        this.state = { 
            commandes : [] ,
            loading: false
        }
        this.format = new Format()
    }
    getContients(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/commandes/'+ this.props.match.params.numcommande);
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({contient: data, loading: false});
                })
        });
    }
    componentDidMount(){
        this.getContients()
    }
    render() {
        var contient = this.state.contient.map()
        return (
                <div>
                    <Row>
                        <FormulaireCommande />
                    </Row>
                    {this.state.loading? (<Loading/>):(<Row>{contient}</Row>)}
                </div>
        )
    }
                //{this.props.match.params.numcommande}
}
