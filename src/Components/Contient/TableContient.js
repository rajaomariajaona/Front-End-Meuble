import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { Button, ButtonGroup } from "shards-react";
import {FaPenAlt, FaTrashAlt} from 'react-icons/fa'
import Confirmation from '../Other/Confirmation';
import history from '../Other/History';
 export default class TableContient extends Component {

  constructor(props){
    super(props)

    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this)
    this.deleteContient = this.deleteContient.bind(this)
    this.state = {
      lignes: [],
      modalConfirmation : false,
      deleteID: '',
      loading: false
    }
  }
  componentDidMount(){
    this.getContients()
  }

  getContients(){
    this.setState({loading: true});
    var req = new Request('http://localhost:8000/api/commandes/'+ this.props.numcommande + '/contients');
    fetch(req)
    .then(response => {
        response.json().then(cont =>{
          var data = []
          cont.forEach((contient) =>{
          var temp = {}
          temp["numserie"] = contient.meubleNumSerie.numSerie
          temp["meuble"] = contient.meubleNumSerie.nomMeuble
          temp["nombre"] = contient.nombreCommande
          data.push(temp)
          })
                this.setState({lignes: data, loading: false});
          })
    });
}

  modifyContient(){
    
  }

  deleteContient(){
    this.toggleModalConfirmation()
    var parameters = {
        method: "DELETE"
    }
    var req = new Request('http://localhost:8000/api/commandes/' + this.props.numcommande + '/contients/' + this.state.deleteID, parameters);
    fetch(req)
    .then(response => {
        if(response.status === 200){
          history.push('/temp')
          history.replace('/main/commandes/'+ this.props.numcommande)
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
           <Confirmation id="test" text=" Voulez vous supprimer? " onNo={this.toggleModalConfirmation} onYes={this.deleteContient} isOpen={this.state.modalConfirmation} toggle={this.toggleModalConfirmation} />
      <Table loading={this.state.loading}
        data={this.state.lignes}
        height={400}
      >
      <Column width={600} sort resizable>
      <HeaderCell>Meuble</HeaderCell>
      <Cell dataKey="meuble" />
      </Column>
      <Column width={300} resizable>
      <HeaderCell>Nombre</HeaderCell>
      <Cell dataKey="nombre" />
      </Column>
      <Column width={150} fixed="right" resizable>
      <HeaderCell>Action</HeaderCell>
      <Cell>

      {row => {

        return(
          <ButtonGroup>
            <Button className="btn-sm" id={'mod' + row.numserie } theme="success" onClick={() => this.props.onModifyContient(row.numserie)}> <span><FaPenAlt/></span>  </Button>
            <Button className="btn-sm" id={'del' + row.numserie} theme="danger" onClick={this.toggleModalConfirmation}> <span><FaTrashAlt/></span>  </Button>
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
 TableContient.defaultProps = {
   categories : []
 }
 