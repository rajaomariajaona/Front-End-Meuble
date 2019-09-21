import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt, FaCartArrowDown} from 'react-icons/fa'
import { PropTypes } from 'prop-types';

export default class ListeCommandes extends Component {

    constructor(props){
        super(props)
        this.state = {commandes: this.props.commandes}
      }
    
    render() {
        return (
            <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
            <h3> Liste des commandes </h3>
       <Table 
         loading={this.props.loading}
         data={this.state.commandes}
         height={500}
         autoHeight
       >
       <Column width={100} sort resizable>
       <HeaderCell>#</HeaderCell>
       <Cell dataKey="num" />
       </Column>
       <Column width={400} resizable>
       <HeaderCell>Nom</HeaderCell>
       <Cell dataKey="nomclient" />
       </Column>
       <Column width={300} resizable>
       <HeaderCell>Date</HeaderCell>
       <Cell dataKey="date" />
       </Column>
        <Column width={150} fixed="right" resizable>
       <HeaderCell>Action</HeaderCell>
       <Cell>
 
       {row => {
 
         return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyCommande}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteCommande}> <span><FaTrashAlt/></span>  </Button>
            <Button className="btn-sm" id={row.num} theme="primary" onClick={this.props.onPanierCommande}> <span><FaCartArrowDown/></span></Button>
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

ListeCommandes.propTypes = {
  commandes: PropTypes.array,
  loading: PropTypes.bool,
  onDeleteCommande: PropTypes.func,
  onModifyCommande: PropTypes.func,
  onPanierCommande: PropTypes.func
}
