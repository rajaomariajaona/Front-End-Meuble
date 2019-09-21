import React, { Component } from 'react'
import { Col, Button, FormSelect } from 'shards-react';
import InputCustom from '../Other/InputCustom';
import Masque from '../Other/Masque';
import { Row , Form} from 'shards-react';
import { PropTypes } from 'prop-types';

export default class FormulaireCommandesMeubles extends Component {

    getMeubles(){
        this.setState({loading: true})
        var req = new Request('http://localhost:8000/api/meubles');
        fetch(req)
        .then(response => {
            if(response.status === 200){
                response.json().then(data =>{
                    var meubles = []
                    data.forEach((meuble) =>{
                        var temp = {}
                        temp["num"] = meuble.numSerie
                        temp["nom"] = meuble.nomMeuble
                        temp["prix"] = new Format().formatPrix(meuble.prix.toString()) + " Ar"
                        temp["quantite"] = meuble.quantiteStock
                        temp["categorie"] = meuble.categorie.categorie
                        meubles.push(temp)
                    })
                    this.setState({loading: false, dataMeubles: meubles});
                    return 1
                })
            }else{
                return Number(response.status)
            }
        });
    }

    constructor(props){
        super(props)
        this.state = {error: false, messageError: ''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {

        if(!this.props.ajout){
            var req
              this.setState({loading: true})
              var link = window.location.href.replace("3000", "8000").replace("main", "api").replace("/modif", "").replace("/meubles", "")
              req = new Request(link);
              fetch(req)
              .then(response => {
                var categorie
                  response.json().then(data =>{ 
                    categorie = data
                    this.setState({loading: false})
                  }).then(() =>{
                    document.querySelector("#categorie").value = categorie.categorie
                  })
              });
          }
    }
    handleChange(event){
        var target = event.target
        switch (target.id) {
            case "categorie":
            target.value = new Masque().capitalize(target.value)
            break;
            default:
                break;
        }
        
    }
    handleSubmit(event){
        this.setState({error: false})
        event.preventDefault()
        var formData = Object.fromEntries(new FormData(event.target))
        if(formData.categorie.trim() === ""){
            this.setState({error : true, messageError: 'Champs vide'})
        }
        if(!this.state.error){
            this.props.onSubmit(formData)
        }
    }
    render() {
        const meubles = 
        return (
            <Row className="my-4">
            <Form onSubmit={this.handleSubmit}>

            <Col sm={12} md={6}>
            <label htmlFor="meuble">Meubles : </label>
              <FormSelect name="meuble" id="meuble">
                {meubles}
              </FormSelect>
            </Col>
            <Col sm={12} md={6}>
                <InputCustom />
            </Col>

            <div className="w-100"></div>
            <Col sm={12}>
                <Button type="submit" className="mx-2" theme="primary">OK</Button>
                <Button type="reset" onClick={this.props.onCancel} className="mx-2" theme="secondary">Annuler</Button>
            </Col>
            </Form>
            </Row>
        )
    }
}

FormulaireCommandesMeubles.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
