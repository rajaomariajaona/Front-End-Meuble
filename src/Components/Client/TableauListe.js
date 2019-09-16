 import React, { Component } from 'react'
import Format from '../Other/Format';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/lib/less/index.less';

 export default class TableauListe extends Component {

  constructor(props){
    super(props)
    var columns = [
      { headerName: 'Nom', field: 'nom'  },
      { headerName: 'Prenom', field: 'prenom' },
      { headerName: 'Telephone', field: 'tel' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Province', field: 'province' }
    ];
    var data = []
         this.props.clients.forEach((client) =>{
            var temp = {}
            temp["nom"] = client.nomClient
            temp["prenom"] = client.prenomClient
            temp["tel"] = new Format().formatTel(client.telClient)
            temp["email"] = client.emailClient
            temp["province"] = client.provinceClient.province
            data.push(temp)
         })
    this.state = {colonnes: columns, lignes: data}
  }

    render() {
      
      
         return (
      <Table 
        data={this.state.lignes}
        height={400}
      >
      <Column width={100} sort fixed resizable>
      <HeaderCell>Nom</HeaderCell>
      <Cell dataKey="nom" />
      </Column>
      <Column width={100} resizable>
      <HeaderCell>Prenom</HeaderCell>
      <Cell dataKey="prenom" />
      </Column>
      <Column width={100} resizable>
      <HeaderCell>Telephone</HeaderCell>
      <Cell dataKey="tel" />
      </Column>
      </Table>
         )
     }
 }
 TableauListe.defaultProps = {
   clients : []
 }
 