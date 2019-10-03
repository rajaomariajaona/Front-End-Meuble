import React, { Component } from 'react'
import { Button } from 'shards-react'
import Format from '../Other/Format';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { ButtonGroup } from 'shards-react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { PropTypes } from 'prop-types';
import history from '../Other/History';
export default class ListeCommandesMeubles extends Component {
    constructor(props){
        super(props)
        this.format = new Format()
        this.handleRetour = this.handleRetour.bind(this)
    }

    handleRetour(){
      history.replace('/main/commandes')
    }

    render() {

        var total = 0;
        this.props.commandesMeubles.forEach(element => {
          total += Number(this.format.unformatPrix(element.prix))
        }); 
        return (
            <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
            <h3> Liste des Meubles Commandee </h3>
            
       <Table
         loading={this.props.loading}
         data={this.props.commandesMeubles}
         height={window.innerHeight/2}
         autoHeight
       >
       <Column width={300} resizable>
       <HeaderCell>Nom</HeaderCell>
       <Cell dataKey="nom" />
       </Column>
       <Column width={100} resizable>
       <HeaderCell>Nombre</HeaderCell>
       <Cell dataKey="nombre" />
       </Column>
       <Column width={240} resizable>
       <HeaderCell>Prix unitaire</HeaderCell>
       <Cell dataKey="prixUnitaire" />
       </Column>
       <Column width={240} resizable>
       <HeaderCell>Prix</HeaderCell>
       <Cell dataKey="prix" />
       </Column>
        <Column width={230} fixed="right" resizable>
       <HeaderCell>Action</HeaderCell>
       <Cell>
 
       {row => {
 
         return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyCommande}> <span><FaPenAlt/> Modifier </span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteCommande}> <span><FaTrashAlt/> Supprimer </span>  </Button>
          </ButtonGroup>
         )
       }
       }
       </Cell>
       </Column> 
       </Table>
       <h5 className="text-right mt-3">Total : {this.format.formatPrix(total + "") + " Ariary"}</h5>
       <Button className="d-block ml-auto" theme="secondary" onClick={this.handleRetour}> Retour </Button>

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
