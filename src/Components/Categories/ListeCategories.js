import React, { Component } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { Button, ButtonGroup } from "shards-react";
import { FaPenAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { PropTypes } from "prop-types";
export default class ListeCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
      textSearch: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filtre = this.filtre.bind(this);
  }
  handleSearch(event) {
    var text = event.currentTarget.value.trim().toLowerCase();
    this.setState(
      { categories: this.props.categories, textSearch: text },
      () => {
        this.filtre(this.state.textSearch);
      }
    );
  }

  filtre(text) {
    if (text !== "") {
      var filtered = this.props.categories;
      filtered = filtered.filter(element => {
        var categorie = element.categorie.toLowerCase();
        return categorie.indexOf(text) !== -1;
      });
      this.setState({ categories: filtered });
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
      <div className="py-5 px-4">
        <div className="row my-4">
          <div className="col-12 col-md-6"></div>
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
          </div>
        </div>
        <Table
          loading={this.props.loading}
          data={this.state.categories}
          height={window.innerHeight * 1/ 3}
        >
          <Column width={770} resizable>
            <HeaderCell>Categorie</HeaderCell>
            <Cell dataKey="categorie" />
          </Column>
          <Column width={230} fixed="right" resizable>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {row => {
                return (
                  <ButtonGroup>
                    <Button
                      className="btn-sm"
                      id={row.categorie}
                      theme="success"
                      onClick={this.props.onModifyCategorie}
                    >
                      {" "}
                      <span>
                        <FaPenAlt /> Modifier{" "}
                      </span>{" "}
                    </Button>
                    <Button
                      className="btn-sm"
                      id={row.categorie}
                      theme="danger"
                      onClick={this.props.onDeleteCategorie}
                    >
                      {" "}
                      <span>
                        <FaTrashAlt /> Supprimer{" "}
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

ListeCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleteCategorie: PropTypes.func.isRequired,
  onModifyCategorie: PropTypes.func
};
ListeCategories.defaultProps = {
  categories: []
};
