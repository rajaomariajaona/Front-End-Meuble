import React, { Component } from 'react'
import Meuble from './Meuble';
import { Col, Row,Button } from 'reactstrap';
import ModalMeuble from './ModalMeuble';
import Format from '../Other/Format';

export default class Meubles extends Component {
    constructor(props){
        super(props)
        this.state = {
            meubles : [],
            modalMeubleAjout: false,
            ModalMeubleModif: false
        }
        this.getMeubles = this.getMeubles.bind(this)
        this.postMeubles = this.postMeubles.bind(this)
        this.toggleModalMeubleAjout = this.toggleModalMeubleAjout.bind(this)
        this.toggleModalMeubleModif = this.toggleModalMeubleModif.bind(this)
    }
    getMeubles(){
        var req = new Request('http://localhost:8000/api/meubles');
        fetch(req)
        .then(response => {
            response.json().then(data =>{
                    this.setState({meubles: data});
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
            <Row>
                {meubles}
            </Row>
                <Button color="success" onClick={this.toggleModalMeubleAjout}> Ajouter </Button>
                <ModalMeuble ajout={true} isOpen={this.state.modalMeubleAjout} onCancel={this.toggleModalMeubleAjout} onSubmit={this.postMeubles}/>
                <ModalMeuble ajout={false} isOpen={this.state.modalMeubleModif} onCancel={this.toggleModalMeubleModif}/>
        </div>
            
        )
    }
}
