 import React, { Component } from 'react'
 import { ButtonGroup , Button } from 'shards-react';
import {FaTrashAlt, FaPenAlt} from 'react-icons/fa'
import Format from '../Other/Format';
 export default class TableauListe extends Component {

    render() {
         const rows = this.props.clients.map(client => 
            <tr key={client.numClient}>
                <td>{client.nomClient}</td>
                <td>{client.prenomClient}</td>
                <td>{new Format().formatTel(client.telClient)}</td>
                <td>{client.emailClient}</td>
                <td>{client.provinceClient.province}</td>
                <td>
                <ButtonGroup>
                    <Button id={'del' + client.numClient} theme="danger" onClick={this.props.onDeleteClient}> <span><FaTrashAlt/></span>  </Button>
                    <Button id={'mod' + client.numClient} theme="success" onClick={this.props.onModifyClient}> <span><FaPenAlt/></span>  </Button>
                </ButtonGroup></td>
            </tr>
         );

         return (
            <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>Province</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
         )
     }
 }
 TableauListe.defaultProps = {
   clients : []
 }
 