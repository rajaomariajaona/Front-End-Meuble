 import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import { PropTypes } from 'prop-types';
 export default class ListeCategories extends Component {
    render() {
         return (
           <div className="shadow py-5 px-4" style={{backgroundColor:'white', zIndex: 100, marginTop: -30, borderRadius: 2}}>
           <h3> Liste des categories </h3>
      <Table loading={this.props.loading}
        data={this.props.categories}
        height={window.innerHeight/2}
      >
      <Column width={770} resizable>
      <HeaderCell>Categorie</HeaderCell>
      <Cell dataKey="categorie" />
      </Column>
       <Column width={230} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.categorie} theme="success" onClick={this.props.onModifyCategorie}> <span><FaPenAlt/> Modifier </span>  </Button>
            <Button className="btn-sm" id={row.categorie} theme="danger" onClick={this.props.onDeleteCategorie}> <span><FaTrashAlt/> Supprimer </span>  </Button>
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

ListeCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteCategorie: PropTypes.func.isRequired,
  onModifyCategorie: PropTypes.func
}
 ListeCategories.defaultProps = {
   categories : []
 }
 