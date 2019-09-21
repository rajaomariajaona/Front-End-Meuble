import React, { Component } from 'react'
import { Row, Col, Button } from 'shards-react'
import Format from '../Other/Format';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { ButtonGroup } from 'shards-react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { PropTypes } from 'prop-types';
export default class ListeCommandesMeubles extends Component {
    constructor(props){
        super(props)
        this.format = new Format()
    }

    render() {
        console.log();
        return (
            <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
            <h3> Liste des Meubles Commandee </h3>
       <Table
         loading={this.props.loading}
         data={this.props.commandesMeubles}
         height={window.innerHeight/2}
         autoHeight
       >
       <Column width={500} resizable>
       <HeaderCell>Nom</HeaderCell>
       <Cell dataKey="nom" />
       </Column>
       <Column width={350} resizable>
       <HeaderCell>Nombre</HeaderCell>
       <Cell dataKey="nombre" />
       </Column>
        <Column width={150} fixed="right" resizable>
       <HeaderCell>Action</HeaderCell>
       <Cell>
 
       {row => {
 
         return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyCommande}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteCommande}> <span><FaTrashAlt/></span>  </Button>
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

ListeCommandesMeubles.propTypes = {
  commandesMeubles: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteCommande: PropTypes.func,
  onModifyCommande: PropTypes.func
}
