import React, { Component } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";

import { Button, ButtonGroup } from "shards-react";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { PropTypes } from "prop-types";
export default class ListeClients extends Component {
  constructor(props) {
    super(props);
    this.state = { clients: this.props.clients };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    // this.setState({clients: this.props.clients })
  }
  handleSearch(event) {
    var text = event.currentTarget.value.trim().toLowerCase();
    this.setState({ clients: this.props.clients }, () => {
      var filtered = this.state.clients;
      console.log(filtered);

      if (text !== "") {
        filtered = filtered.filter(element => {
          var nom = element.nom.toLowerCase();
          var prenom = element.prenom.toLowerCase();
          return nom.indexOf(text) !== -1 || prenom.indexOf(text) !== -1
        });
        this.setState({ clients: filtered });
      }
    });
  }
  
  render() {
    return (
      <div
        className="shadow py-5 px-4"
        style={{
          backgroundColor: "white",
          zIndex: 100,
          marginTop: -30,
          borderRadius: 2
        }}
      >
        <div className="row my-4">
          <div className="col-12 col-md-6">
            <h3> Liste des clients </h3>
          </div>
          <div className="col-12 col-md-6 input-group">
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
