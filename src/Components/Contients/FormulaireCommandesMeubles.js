import React, { Component } from 'react'
import { Col, Button, FormSelect } from 'shards-react';
import InputCustom from '../Other/InputCustom';
import Masque from '../Other/Masque';
import { Row , Form} from 'shards-react';
import { PropTypes } from 'prop-types';

export default class FormulaireCommandesMeubles extends Component {

    getMeubles(getOk){
        this.setState({loading: true})
        var req = new Request('http://localhost:8000/api/meublesdispo');
        fetch(req)
        .then(response => {
            if(response.status === 200){
                response.json().then(data =>{
                    this.setState({loading: false, dataMeublesDispo: data});
                    getOk()
                    return 1
                })
            }else{
                return Number(response.status)
            }
        });
    }

    constructor(props){
        super(props)
        this.state = {error: false, messageError: '', dataMeublesDispo: [], max: 0}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMeubleChange = this.handleMeubleChange.bind(this)
        this.setMax = this.setMax.bind(this)
    }
    componentDidMount() {
        this.getMeubles(() => {
            this.setMax() 
        })
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
        if(!this.state.error){
            this.props.onSubmit(formData)
        }
    }

    handleMeubleChange(event){
        this.setMax()
        var quantite = document.querySelector('#nombrecommande')
        quantite.value = ""
    }
    setMax(){
        var select = document.querySelector('#meuble')
        if(select !== null){
            if(select.options[0]){
                this.setState({max: Number(select.options[select.selectedIndex].getAttribute('max'))})
            }
        }
    }
    render() {
        const meubles = this.state.dataMeublesDispo.map((value, index) =>
            <option key={index} max={value.quantiteStock} value={value.numSerie}> {value.nomMeuble} </option>
        )
        return (
            <Form onSubmit={this.handleSubmit}>
            <Row className="my-4">

            <Col sm={12} md={6}>
            <label htmlFor="meuble">Meubles : </label>
              <FormSelect onChange={this.handleMeubleChange} name="numserie" id="meuble">
                {meubles}
              </FormSelect>
            </Col>
            <Col sm={12} md={6}>
                <InputCustom name="nombrecommande" label="Nombre" placeholder="quantite commande" min={1} max={this.state.max} type="number"  />
            </Col>

            <div className="w-100"></div>
            <Col sm={12}>
                <Button type="submit" className="mx-2" theme="primary">OK</Button>
                <Button type="reset" onClick={this.props.onCancel} className="mx-2" theme="secondary">Annuler</Button>
            </Col>
            </Row>
            </Form>
        )
    }
}

FormulaireCommandesMeubles.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
