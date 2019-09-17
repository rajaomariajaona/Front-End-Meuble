import React, { Component } from 'react'
import TableauListeCategorie from './TableauListeCategorie';
import { Button, Collapse, Row, Col } from "shards-react";
import FormulaireCategorie from './FormulaireCategorie';
import history from '../../Other/History';

export default class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
            adding : true,
            modifyID : '',
            collapse: false
        }
        this.toggle = this.toggle.bind(this)
        this.postCategorie = this.postCategorie.bind(this)
        this.modify = this.modify.bind(this)
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

    putCategorie(formData){
        var parameters = {
          method: "PUT",
          headers:{
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formData)
      }
      var req = new Request('http://localhost:8000/api/categories/' + this.state.modifyID , parameters);
      fetch(req)
      .then(response => {
          if(response.status === 200){
              history.push('/empt')
            history.replace('/main/meubles/categories/')
          }
      });
    }

    modify(data){
        this.toggle()
        this.setState({
            adding : false,
            modifyID: data
        })
        document.querySelector('#categorie').value = data
    }
    render() {
        return (
            <div>
                <Row>

                <Col sm={this.state.collapse ? 8 : 12}>
                <TableauListeCategorie onModifyCategorie={this.modify} />
                </Col>
                <Col sm={4}>
                <Collapse open={this.state.collapse}>
                    <FormulaireCategorie onSubmit={(data) => this.state.adding?(this.postCategorie(data)) : (this.putCategorie(data))} toggle={this.toggle} />
                </Collapse>
                </Col>
                </Row>
                <Button className="mt-3" onClick={this.toggle} theme="success">Ajouter</Button>
                
            </div>
        )
    }
}
