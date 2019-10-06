import React, { Component } from "react";
import ListeCategories from "./ListeCategories";
import { Button, Card, CardBody, CardHeader, Row, Col } from "shards-react";
import FormulaireCategorie from "./FormulaireCategorie";
import history from "../Other/History";
import { Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Confirmation from "../Other/Confirmation";
import { FaPlus, FaFileCsv } from "react-icons/fa";
import { CSVLink } from "react-csv";

export default class Categories extends Component {
  // access web services

  getCategories() {
    this.setState({ loading: true });
    var req = new Request("http://localhost:8000/api/categories");
    fetch(req).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          console.log(data);
          var categories = [];
          data.forEach(categorie => {
            var temp = {};
            temp["categorie"] = categorie.categorie;
            categories.push(temp);
          });
          this.setState({ loading: false, dataCategories: categories });

          return 1;
        });
      } else {
        return Number(response.status);
      }
    });
  }

  deleteCategorie(id, deleteOk) {
    this.setState({ loading: true });
    var parameters = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    var req = new Request(
      "http://localhost:8000/api/categories/" + id,
      parameters
    );
    fetch(req).then(response => {
      if (response.status === 200) {
        deleteOk();
      }
    });
  }

  postCategorie(formData, ajoutOk) {
    var parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var req = new Request("http://localhost:8000/api/categories", parameters);
    fetch(req).then(response => {
      if (response.status === 201) {
        ajoutOk();
      }
    });
  }

  putCategorie(id, formData, modifyOk) {
    var parameters = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var req = new Request(
      "http://localhost:8000/api/categories/" + id,
      parameters
    );
    fetch(req).then(response => {
      if (response.status === 200) {
        modifyOk();
      }
    });
  }

  // fin access web services

  // evenements CRUD
  handleModification(event) {
    var num = event.currentTarget.id;
    this.setState({ modifyID: num });
    history.replace("/main/meubles/categories/modif/" + num);
  }

  handleSuppression(event) {
    var num = event.currentTarget.id;
    console.log(num);
    this.setState({ deleteID: num });
    this.toggleModalConfirmation();
  }

  modificationConfirmed(formData) {
    this.putCategorie(this.state.modifyID, formData, this.redirect);
  }

  deleteConfirmed(id) {
    this.toggleModalConfirmation();
    this.deleteCategorie(id, this.refresh);
  }

  handleAjout(formData) {
    this.postCategorie(formData, this.refresh);
  }

  // fin evenements CRUD

  // evenements Affichage
  goToAjout() {
    history.push("/main/meubles/categories/ajout");
  }

  redirect() {
    history.push("/temp");
    history.replace("/main/meubles/categories");
  }
  toggleModalConfirmation() {
    this.setState({ modalConfirmation: !this.state.modalConfirmation });
  }
  refresh() {
    this.getCategories();
    this.redirect();
  }
  // fin evenement Affichage

  constructor(props) {
    super(props);
    this.state = {
      dataCategories: [],
      deleteID: null,
      modifyID: null,
      loading: true,
      modalConfirmation: false
    };
    this.getCategories = this.getCategories.bind(this);
    this.postCategorie = this.postCategorie.bind(this);
    this.putCategorie = this.putCategorie.bind(this);
    this.deleteCategorie = this.deleteCategorie.bind(this);

    this.handleSuppression = this.handleSuppression.bind(this);
    this.handleModification = this.handleModification.bind(this);
    this.modificationConfirmed = this.modificationConfirmed.bind(this);
    this.deleteConfirmed = this.deleteConfirmed.bind(this);
    this.handleAjout = this.handleAjout.bind(this);

    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this);
    this.goToAjout = this.goToAjout.bind(this);
    this.refresh = this.refresh.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/main/meubles/categories"
              component={() => (
                <Card
                  style={{
                    marginTop: -40
                  }}
                >
                  <CardHeader>
                    <Row>
                      <Col xs={12} md={6}>
                        <h3> Liste des Categories </h3>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        className="d-flex justify-content-end"
                      >
                        <CSVLink
                          filename={"categories.csv"}
                          data={this.state.dataCategories}
                          className="btn btn-primary btn-outline-primary btn-pill"
                        >
                          {" "}
                          <FaFileCsv /> CSV{" "}
                        </CSVLink>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Button
                      className="m-3 p-2 shadow-sm"
                      style={{ float: "right" }}
                      theme="success"
                      onClick={this.goToAjout}
                    >
                      {" "}
                      <FaPlus
                        style={{ fontWeight: "bold", fontSize: "1.5em" }}
                      />{" "}
                      Ajouter{" "}
                    </Button>
                    <ListeCategories
                      onModifyCategorie={this.handleModification}
                      onDeleteCategorie={this.handleSuppression}
                      loading={this.state.loading}
                      categories={this.state.dataCategories}
                    />
                  </CardBody>
                </Card>
              )}
            />

            <Route
              path="/main/meubles/categories/ajout"
              component={() => (
                <FormulaireCategorie
                  ajout
                  onCancel={this.redirect}
                  onSubmit={this.handleAjout}
                />
              )}
            />

            <Route
              path="/main/meubles/categories/modif"
              component={() => (
                <FormulaireCategorie
                  ajout={false}
                  onCancel={this.redirect}
                  onSubmit={this.modificationConfirmed}
                />
              )}
            />
          </Switch>
        </Router>

        <Confirmation
          text=" Voulez vous supprimer? "
          onNo={this.toggleModalConfirmation}
          onYes={() => {
            this.deleteConfirmed(this.state.deleteID);
          }}
          isOpen={this.state.modalConfirmation}
          toggle={this.toggleModalConfirmation}
        />
      </div>
    );
  }
}
