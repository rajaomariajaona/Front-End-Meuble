 import React, { Component } from 'react'
 import { Table, ButtonGroup , Button } from 'reactstrap';
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
                    <Button id={'del' + client.numClient} color="danger" onClick={this.props.onDeleteClient}> <span><FaTrashAlt/></span>  </Button>
                    <Button id={'mod' + client.numClient} color="success" onClick={this.props.onModifyClient}> <span><FaPenAlt/></span>  </Button>
                </ButtonGroup></td>
            </tr>
         );

         return (
            <Table>
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
          </Table>
         )
     }
 }
 TableauListe.defaultProps = {
   clients : []
 }
 