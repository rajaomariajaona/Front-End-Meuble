 import React, { Component } from 'react'
import Format from '../Other/Format';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import Confirmation from '../Other/Confirmation';
 export default class TableauListe extends Component {

  constructor(props){
    super(props)
    var data = []
         this.props.clients.forEach((client) =>{
            var temp = {}
            temp["num"] = client.numClient
            temp["nom"] = client.nomClient
            temp["prenom"] = client.prenomClient
            temp["tel"] = new Format().formatTel(client.telClient)
            temp["email"] = client.emailClient
            temp["adresse"] = client.adresseClient
            temp["province"] = client.provinceClient.province
            temp["cp"] = client.cpClient
            data.push(temp)
         })
    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
    this.deleteClient = this.deleteClient.bind(this)
    this.state = {lignes: data,
      modalConfirmation : false,
      deleteID: ''
    }
  }

  deleteClient(){
    this.toggleModalConfirmation()
    var parameters = {
        method: "DELETE"
    }
    var req = new Request('http://localhost:8000/api/clients/'+ this.state.deleteID, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
            window.location.reload()
        }
    });
}

toggleModalConfirmation(e){
  if(e){
    this.setState({
      modalConfirmation : !this.state.modalConfirmation,
      deleteID: e.currentTarget.id.replace('del', '')
    })
  }else{
    this.setState({
      modalConfirmation : !this.state.modalConfirmation,
    })
  }
}


    render() {
         return (
           <div>
           <Confirmation id="test" text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={this.deleteClient} isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
      <Table 
        data={this.state.lignes}
        height={600}
      >
      <Column width={200} sort resizable>
      <HeaderCell>Nom</HeaderCell>
      <Cell dataKey="nom" />
      </Column>
      <Column width={200} resizable>
      <HeaderCell>Prenom</HeaderCell>
      <Cell dataKey="prenom" />
      </Column>
      <Column width={150} resizable>
      <HeaderCell>Telephone</HeaderCell>
      <Cell dataKey="tel" />
      </Column>
      <Column width={300} resizable>
      <HeaderCell>Email</HeaderCell>
      <Cell dataKey="email" />
      </Column>
      <Column width={300} resizable>
      <HeaderCell>Adresse</HeaderCell>
      <Cell dataKey="adresse" />
      </Column> 
      <Column width={150} resizable>
      <HeaderCell>Province</HeaderCell>
      <Cell dataKey="province" />
      </Column>
      <Column width={100} resizable>
      <HeaderCell>Code Postale</HeaderCell>
      <Cell dataKey="cp" />
      </Column>
       <Column width={150} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={'mod' + row.num} theme="success" onClick={this.props.onModifyClient}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={'del' + row.num} theme="danger" onClick={this.toggleModalConfirmation}> <span><FaTrashAlt/></span>  </Button>
          </ButtonGroup>
        )
      }
      }
      </Cell>
      </Column> 
      </Table>
      
      </div>
         )
     }
 }
 TableauListe.defaultProps = {
   clients : []
 }
 