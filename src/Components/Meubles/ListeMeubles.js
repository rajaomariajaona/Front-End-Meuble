import React, { Component } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";

import { Button, ButtonGroup, FormCheckbox } from "shards-react";
import { FaPenAlt, FaTrashAlt, FaDolly } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Format from "../Other/Format";
export default class ListeMeubles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meubles: this.props.meubles,
      nom: true,
      categorie: false,
      textSearch: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filtre = this.filtre.bind(this);
  }
  handleSearch(event) {
    var text = event.currentTarget.value.trim().toLowerCase();
    this.setState({ meubles: this.props.meubles, textSearch: text }, () => {
      this.filtre(this.state.textSearch);
    });
  }

  filtre(text) {
    if (text !== "") {
      var filtered = this.props.meubles;
      var arr = ["nom", "categorie"];
      var test = false;
      arr.forEach(element => {
        test = test || this.state[element];
      });
      if (test) {
        filtered = filtered.filter(element => {
          var nom = element.nom.toLowerCase();
          var categorie = element.categorie.toLowerCase();
          return (
            (this.state.nom && nom.indexOf(text) !== -1) ||
            (this.state.categorie && categorie.indexOf(text) !== -1)
          );
        });
      }
      this.setState({ meubles: filtered });
    }
  }
  handleChange(event, name) {
    const newState = {};
    newState[name] = !this.state[name];
    this.setState({ ...this.state, ...newState }, () => {
      this.filtre(this.state.textSearch);
    });
  }
  render() {
    return (
      <div>
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
                checked={this.state.categorie}
                onChange={e => this.handleChange(e, "categorie")}
              >
                Categorie
              </FormCheckbox>
            </div>
          </div>
        </div>
        <Table
          loading={this.props.loading}
          data={this.state.meubles}
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
          <Column width={340} fixed="right" resizable>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {row => {
                return (
                  <ButtonGroup>
                    <Button
                      className="btn-sm"
                      id={row.num}
                      theme="success"
                      onClick={this.props.onModifyMeuble}
                    >
                      {" "}
                      <span>
                        <FaPenAlt /> Modifier{" "}
                      </span>{" "}
                    </Button>
                    <Button
                      className="btn-sm"
                      id={row.num}
                      theme="danger"
                      onClick={this.props.onDeleteMeuble}
                    >
                      {" "}
                      <span>
                        <FaTrashAlt /> Supprimer{" "}
                      </span>{" "}
                    </Button>
                    <Button
                      className="btn-sm"
                      id={row.num}
                      theme="primary"
                      onClick={this.props.onStockMeuble}
                    >
                      {" "}
                      <span>
                        <FaDolly /> Stock{" "}
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
ListeMeubles.defaultProps = {
  meubles: [],
  loading: true
};
