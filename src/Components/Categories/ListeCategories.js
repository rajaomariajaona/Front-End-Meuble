 import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import Confirmation from '../Other/Confirmation';
import history from '../Other/History';
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
      <Column width={600} resizable>
      <HeaderCell>Categorie</HeaderCell>
      <Cell dataKey="categorie" />
      </Column>
       <Column width={150} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={row.num} theme="success" onClick={this.props.onModifyCategorie}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={row.num} theme="danger" onClick={this.props.onDeleteCategorie}> <span><FaTrashAlt/></span>  </Button>
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
 