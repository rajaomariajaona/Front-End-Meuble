import React, { Component } from 'react'
import Meuble from './Meuble';
import { Col, Row,Button } from 'shards-react';
import ModalMeuble from './ModalMeuble';
import Format from '../Other/Format';
import Loading from '../Other/Loading';

export default class Meubles extends Component {
    constructor(props){
        super(props)
        this.state = {
            meubles : [],
            modalMeubleAjout: false,
            modalMeubleModif: false,
            loading: false,
            modifyID: ''
        }
        this.getMeubles = this.getMeubles.bind(this)
        this.postMeubles = this.postMeubles.bind(this)
        this.putMeubles = this.putMeubles.bind(this)
        this.toggleModalMeubleAjout = this.toggleModalMeubleAjout.bind(this)
        this.toggleModalMeubleModif = this.toggleModalMeubleModif.bind(this)
        this.addValue =this.addValue.bind(this)
    }

    addValue(){
        var req = new Request('http://localhost:8000/api/meubles/'+this.state.modifyID);
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                document.querySelector('#numserie').value = data.numSerie
                document.querySelector('#nom').value = data.nomMeuble
                document.querySelector('#prix').value = (new Format()).formatPrix(data.prix.toString())
                })
        });
    }

    getMeubles(){
        this.setState({loading: true});
        var req = new Request('http://localhost:8000/api/meubles');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({meubles: data, loading: false});
                })
        });
    }
    postMeubles(formData){
        var parameters = {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formData)
      }
      var req = new Request('http://localhost:8000/api/meubles', parameters);
      fetch(req)
      .then(response => {
          if(response.status === 201){
           this.getMeubles()
            this.toggleModalMeubleAjout()
          }
      });
    }
    putMeubles(formData){
        var parameters = {
          method: "PUT",
          headers:{
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formData)
      }
      var req = new Request('http://localhost:8000/api/meubles/'+ this.state.modifyID, parameters);
      fetch(req)
      .then(response => {
          if(response.status === 200){
           this.getMeubles()
            this.toggleModalMeubleModif()
          }
      });
    }

    componentDidMount(){
        this.getMeubles()
    }
    toggleModalMeubleAjout(){
        this.setState({modalMeubleAjout: !this.state.modalMeubleAjout})
    }
    toggleModalMeubleModif(){
        this.setState({modalMeubleModif: !this.state.modalMeubleModif})
    }
    render() {

        const meubles = this.state.meubles.map((value, index) => 
        <Col key={index} sm={10} md={3} >
        <Meuble onDelete={(e) => { this.setState({deleteID : e.currentTarget.id})}} 
        onModify={(e) => {
             this.setState({modifyID : e.currentTarget.id});
                this.toggleModalMeubleModif() 
                } 
            } 
        categorie={value.categorie.categorie} prix={new Format().formatPrix(value.prix.toString())} nom={value.nomMeuble} numserie={value.numSerie}/></Col>)

        return (
        <div>
            {this.state.loading? (<Loading/>):
            (<Row className="mt-3">
                {meubles}
            </Row>)}
            
                <Button className="shadow mb-4" theme="success" onClick={this.toggleModalMeubleAjout}> Ajouter </Button>
                <ModalMeuble ajout isOpen={this.state.modalMeubleAjout} onCancel={this.toggleModalMeubleAjout} onSubmit={this.postMeubles}/>
                <ModalMeuble addValue={this.addValue} ajout={false} isOpen={this.state.modalMeubleModif} onSubmit={this.putMeubles} onCancel={this.toggleModalMeubleModif}/>
        </div>
            
        )
    }
}
