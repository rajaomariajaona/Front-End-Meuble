 import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import Confirmation from '../../Other/Confirmation';
import history from '../../Other/History';
 export default class TableauListeCategorie extends Component {

  constructor(props){
    super(props)

    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
    this.deleteCategorie = this.deleteCategorie.bind(this)
    this.state = {lignes: [],
      modalConfirmation : false,
      deleteID: '',
      loading: false
    }
  }
  componentDidMount(){
    this.getCategories()
  }

  getCategories(){
    this.setState({loading: true});
    var req = new Request('http://localhost:8000/api/categories');
    fetch(req)
    .then(response => {
        response.json().then(categ =>{
          var data = []
          categ.forEach((categorie) =>{
          var temp = {}
          temp["categorie"] = categorie.categorie
          data.push(temp)
          })
          this.setState({lignes: data, loading: false})
            })
    });
}

  deleteCategorie(){
    this.toggleModalConfirmation()
    var parameters = {
        method: "DELETE"
    }
    var req = new Request('http://localhost:8000/api/categories/'+ this.state.deleteID, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
          history.push('/temp')
          history.replace('/main/meubles/categories/')
        }
    });
  }

toggleModalConfirmation(e){
  if(e){
    this.setState({
      modalConfirmation : !this.state.modalConfirmation,
      deleteID: e.currentTarget.id.replace('del', '')
    })
    console.log(e.currentTarget.id);
    
  }else{
    this.setState({
      modalConfirmation : !this.state.modalConfirmation,
    })
  }
}
    render() {
         return (
           <div>
           <Confirmation id="test" text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={this.deleteCategorie} isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
      <Table loading={this.state.loading}
        data={this.state.lignes}
        height={400}
      >
      <Column width={window.innerWidth - 345} sort resizable>
      <HeaderCell>Nom</HeaderCell>
      <Cell dataKey="categorie" />
      </Column>
       <Column width={150} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={'mod' + row.categorie} theme="success" onClick={() => this.props.onModifyCategorie(row.categorie)}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={'del' + row.categorie} theme="danger" onClick={this.toggleModalConfirmation}> <span><FaTrashAlt/></span>  </Button>
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
 TableauListeCategorie.defaultProps = {
   categories : []
 }
 