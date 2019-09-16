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
            ModalMeubleModif: false,
            loading: false
        }
        this.getMeubles = this.getMeubles.bind(this)
        this.postMeubles = this.postMeubles.bind(this)
        this.toggleModalMeubleAjout = this.toggleModalMeubleAjout.bind(this)
        this.toggleModalMeubleModif = this.toggleModalMeubleModif.bind(this)
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

        const meubles = this.state.meubles.map((value, index) => <Col key={index} sm={10} md={3} ><Meuble footerBgColor='#ff0000' categorie={value.categorie.categorie} prix={new Format().formatPrix(value.prix.toString())} nom={value.nomMeuble} numserie={value.numSerie}/></Col>)
        return (
        <div>
            {this.state.loading? (<Loading/>):
            (<Row className="mt-3">
                {meubles}
            </Row>)}
            
                <Button className="shadow mb-4" theme="success" onClick={this.toggleModalMeubleAjout}> Ajouter </Button>
                <ModalMeuble ajout={true} isOpen={this.state.modalMeubleAjout} onCancel={this.toggleModalMeubleAjout} onSubmit={this.postMeubles}/>
                <ModalMeuble ajout={false} isOpen={this.state.modalMeubleModif} onCancel={this.toggleModalMeubleModif}/>
        </div>
            
        )
    }
}
