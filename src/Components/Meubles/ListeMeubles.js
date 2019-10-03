 import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
 export default class ListeMeubles extends Component {

    render() {
         return (
           <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
           
           <h3> Liste des meubles </h3>
      <Table 
        loading={this.props.loading}
        data={this.props.meubles}
        height={window.innerHeight / 2}
        autoHeight
      >
      <Column width={200} sort resizable>
      <HeaderCell>Numero de serie</HeaderCell>
      <Cell dataKey="num" />
      </Column>
      <Column width={200} resizable>
      <HeaderCell>Nom</HeaderCell>
      <Cell dataKey="nom" />
      </Column>
      <Column width={150} resizable>
      <HeaderCell>Prix</HeaderCell>
      <Cell dataKey="prix" />
      </Column>
      <Column width={125} resizable>
      <HeaderCell>Quantite</HeaderCell>
      <Cell dataKey="quantite" />
      </Column>
      <Column width={150} resizable>
      <HeaderCell>Categorie</HeaderCell>
      <Cell dataKey="categorie" />
      </Column> 
      <Column width={230} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyMeuble}> <span><FaPenAlt/> Modifier </span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteMeuble}> <span><FaTrashAlt/> Supprimer </span>  </Button>
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
 ListeMeubles.defaultProps = {
   meubles : [],
   loading: true
 }
 