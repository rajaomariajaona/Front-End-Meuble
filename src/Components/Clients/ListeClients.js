import React, { Component } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";

import { Button, ButtonGroup, FormCheckbox } from "shards-react";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { PropTypes } from "prop-types";
import Format from '../Other/Format';
export default class ListeClients extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      clients: this.props.clients,
      telephone: false,
      nom: true,
      prenom:true,
      adresse:false,
      email: false,
      textSearch: ''
    
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.filtre = this.filtre.bind(this)
  }
  componentDidMount() {
    // this.setState({clients: this.props.clients })
  }
  handleSearch(event) {
    var text = event.currentTarget.value.trim().toLowerCase();
    this.setState({ clients: this.props.clients , textSearch: text}, () => {
      this.filtre(this.state.textSearch)
    });
  }
  filtre(text){
    if (text !== "") {
      var filtered = this.props.clients;
      var arr = ["nom", 'prenom', "telephone", "adresse", "email"]
      var test = false;
      arr.forEach(element => {
        test = test || this.state[element];
      });
      if(test){
        filtered = filtered.filter(element => {
          var nom = element.nom.toLowerCase();
          var prenom = element.prenom.toLowerCase();
          var telephone = new Format().unformatTel(element.tel)
          var email = element.email.toLowerCase()
          var adresse = (element.adresse + " " + element.province).toLowerCase()
          return  (this.state.nom && nom.indexOf(text) !== -1) || (this.state.prenom && prenom.indexOf(text) !== -1) || (this.state.telephone && telephone.indexOf(text) !== -1) || (this.state.email && email.indexOf(text) !== -1) || (this.state.adresse && adresse.indexOf(text) !== -1) ;
        });
      }
      this.setState({ clients: filtered });
    }
  }
  handleChange(event, name){
    const newState = {};
    newState[name] = !this.state[name];
    this.setState({ ...this.state, ...newState },() => {
      this.filtre(this.state.textSearch);
    });
  }


  render() {
    return (
      <div
        className="py-5 px-4"
      >
        <div className="row my-4">
          <div className="col-12 col-md-6">
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FaSearch />
                  </div>
                </div>
                <input
                  className="form-control"
                  type="text"
                  id="searchInput"
                  placeholder="Recherche..."
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            <div className="row">
              <FormCheckbox
                inline
                checked={this.state.nom}
                onChange={e => this.handleChange(e, "nom")}
              >
                Nom
              </FormCheckbox>
              <FormCheckbox
                inline
                checked={this.state.prenom}
                onChange={e => this.handleChange(e, "prenom")}
              >
                Prenom
              </FormCheckbox>
              <FormCheckbox
                inline
                checked={this.state.email}
                onChange={e => this.handleChange(e, "email")}
              >
                Email
              </FormCheckbox>
              <FormCheckbox
                inline
                checked={this.state.telephone}
                onChange={e => this.handleChange(e, "telephone")}
              >
                Telephone
              </FormCheckbox>
              <FormCheckbox
                inline
                checked={this.state.adresse}
                onChange={e => this.handleChange(e, "adresse")}
              >
                Adresse
              </FormCheckbox>
            </div>
          </div>
        </div>

        <Table
          loading={this.props.loading}
          data={this.state.clients}
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
          <Column width={230} fixed="right" resizable>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {row => {
                return (
                  <ButtonGroup>
                    <Button
                      className="btn-sm"
                      id={row.num}
                      theme="success"
                      onClick={this.props.onModifyClient}
                    >
                      {" "}
                      <span>
                        <FaPenAlt /> Modifier
                      </span>{" "}
                    </Button>
                    <Button
                      className="btn-sm"
                      id={row.num}
                      theme="danger"
                      onClick={this.props.onDeleteClient}
                    >
                      {" "}
                      <span>
                        <FaTrashAlt /> Supprimer
                      </span>{" "}
                    </Button>
                  </ButtonGroup>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

ListeClients.propTypes = {
  clients: PropTypes.array,
  loading: PropTypes.bool,
  onDeleteClient: PropTypes.func,
  onModifyClient: PropTypes.func,
  onSearch: PropTypes.func
};
ListeClients.defaultProps = {
  clients: [],
  loading: true
};
