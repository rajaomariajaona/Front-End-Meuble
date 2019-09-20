 import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
 export default class ListeClients extends Component {

  constructor(props){
    super(props)
    this.state = {clients: this.props.clients}
  }
    render() {
         return (
           <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
           
           <h3> Liste des clients </h3>
      <Table 
        loading={this.props.loading}
        data={this.props.clients}
        height={window.innerHeight / 2}
        autoHeight
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
      <Column width={150} resizable>
      <HeaderCell>Code Postale</HeaderCell>
      <Cell dataKey="cp" />
      </Column>
       <Column width={150} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyClient}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteClient}> <span><FaTrashAlt/></span>  </Button>
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
 ListeClients.defaultProps = {
   clients : [],
   loading: true
 }
 