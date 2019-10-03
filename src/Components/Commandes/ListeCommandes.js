import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt, FaCartArrowDown, FaLuggageCart} from 'react-icons/fa'
import { PropTypes } from 'prop-types';

export default class ListeCommandes extends Component {

    constructor(props){
        super(props)
        this.state = {commandes: this.props.commandes, open: false}
        this.toggle = this.toggle.bind(this)
      }
    
      toggle(){
        this.setState({open : !this.state.open})
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
       <Column width={50} sort resizable>
       <HeaderCell>#</HeaderCell>
       <Cell dataKey="num" />
       </Column>
       <Column width={200} resizable>
       <HeaderCell>Nom</HeaderCell>
       <Cell dataKey="nomclient" />
       </Column>
       <Column width={250} resizable>
       <HeaderCell>Date</HeaderCell>
       <Cell dataKey="date" />
       </Column>
       <Column width={110} resizable>
       <HeaderCell>Etat</HeaderCell>
       <Cell dataKey="livree" />
       </Column>
        <Column width={400} fixed="right" resizable>
       <HeaderCell>Action</HeaderCell>
       <Cell>
        
       {row => {
 
         return(
          <ButtonGroup>
          {!row.etat && (<Button className="btn-sm text-white" id={row.num} theme="success" onClick={this.props.onModifyCommande}> <span><FaPenAlt/> Modifier </span>  </Button>)}
            <Button className="btn-sm text-white" id={row.num} theme="danger" onClick={this.props.onDeleteCommande}> <span><FaTrashAlt/> Supprimer </span>  </Button>
            {!row.etat && (<Button className="btn-sm text-white" id={row.num} theme="warning" onClick={this.props.onEtatChange} > <span> <FaLuggageCart /> Livrer </span> </Button>)}
            <Button className="btn-sm text-white" id={row.num} theme="primary" onClick={this.props.onPanierCommande}> <span><FaCartArrowDown/> Panier</span></Button>
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
  onEtatChange: PropTypes.func,
  onModifyCommande: PropTypes.func,
  onPanierCommande: PropTypes.func
}
