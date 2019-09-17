import React, { Component } from 'react'
import TableauListeCategorie from './TableauListeCategorie';
import { Button, Collapse } from "shards-react";
import FormulaireCategorie from './FormulaireCategorie';
import history from '../../Other/History';

export default class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {collapse: false}
        this.toggle = this.toggle.bind(this)
        this.postCategorie = this.postCategorie.bind(this)
    }
    toggle(){
        this.setState({collapse : !this.state.collapse})
    }

    postCategorie(formData){
            var parameters = {
              method: "POST",
              headers:{
                'Content-Type': 'application/json'
              },
                body: JSON.stringify(formData)
          }
          var req = new Request('http://localhost:8000/api/categories', parameters);
          fetch(req)
          .then(response => {
              if(response.status === 201){
                  history.push('/empt')
                history.replace('/main/meubles/categories/')
              }
          });
    }

    render() {
        return (
            <div>
                <TableauListeCategorie />
                <Button className="mt-3" onClick={this.toggle} theme="success">Ajouter</Button>
                <Collapse open={this.state.collapse}>
                    <FormulaireCategorie onSubmit={this.postCategorie} toggle={this.toggle} />
                </Collapse>
            </div>
        )
    }
}
