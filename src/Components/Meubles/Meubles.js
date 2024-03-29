import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Row, Col } from "shards-react";
import Format from "../Other/Format";
import ListeMeubles from "./ListeMeubles";
import history from "../Other/History";
import Confirmation from "../Other/Confirmation";
import { Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import FormulaireMeuble from "./FormulaireMeuble";
import { FaPlus } from "react-icons/fa";
import FormulaireStock from "./FormulaireStock";
import {FaFileCsv} from 'react-icons/fa'
import {CSVLink} from 'react-csv'

export default class Meubles extends Component {
  // Access web service
  getMeubles() {
    this.setState({ loading: true });
    var req = new Request("http://localhost:8000/api/meubles");
    fetch(req).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          var meubles = [];
          data.forEach(meuble => {
            var temp = {};
            temp["num"] = meuble.numSerie;
            temp["nom"] = meuble.nomMeuble;
            temp["prix"] =
              new Format().formatPrix(meuble.prix.toString()) + " Ar";
            temp["quantite"] = meuble.quantiteStock;
            temp["categorie"] = meuble.categorie.categorie;
            meubles.push(temp);
          });
          this.setState({ loading: false, dataMeubles: meubles });
          return 1;
        });
      } else {
        return Number(response.status);
      }
    });
  }

  deleteMeuble(id, deleteOk) {
    this.setState({ loading: true });
    var parameters = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    var req = new Request(
      "http://localhost:8000/api/meubles/" + id,
      parameters
    );
    fetch(req).then(response => {
      if (response.status === 200) {
        deleteOk();
      }
    });
  }

  postMeuble(formData, ajoutOk) {
    var parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var req = new Request("http://localhost:8000/api/meubles", parameters);
    fetch(req).then(response => {
      if (response.status === 201) {
        ajoutOk();
      }
    });
  }

  putMeuble(id, formData, modifyOk) {
    var parameters = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var req = new Request(
      "http://localhost:8000/api/meubles/" + id,
      parameters
    );
    fetch(req).then(response => {
      if (response.status === 200) {
        modifyOk();
      }
    });
  }

  patchStock(formData, stockOk) {
    var parameters = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var req = new Request(
      "http://localhost:8000/api/meubles/" + this.state.stockID + "/stock",
      parameters
    );
    fetch(req).then(response => {
      if (response.status === 200) {
        stockOk();
      }
    });
  }

  // fin access web service

  // evenements CRUD
  handleModification(event) {
    var num = event.currentTarget.id;
    this.setState({ modifyID: num });
    history.replace("/main/meubles/listes/modif/" + num);
  }

  handleSuppression(event) {
    var num = event.currentTarget.id;
    console.log(num);

    this.setState({ deleteID: num });
    this.toggleModalConfirmation();
  }

  modificationConfirmed(formData) {
    this.putMeuble(this.state.modifyID, formData, this.redirect);
  }

  deleteConfirmed(id) {
    this.toggleModalConfirmation();
    this.deleteMeuble(id, this.refresh);
  }

  stockConfirmed(formData) {
    this.patchStock(formData, this.refresh);
  }

  handleAjout(formData) {
    this.postMeuble(formData, this.refresh);
  }
  handleStock(event) {
    var numserie = event.currentTarget.id;
    this.setState({ stockID: numserie });
    history.push("/main/meubles/listes/" + numserie + "/stock");
  }
  // fin evenements CRUD

  // evenements Affichage
  goToAjout() {
    history.replace("/main/meubles/listes/ajout");
  }

  redirect() {
    history.push("/temp");
    history.replace("/main/meubles/listes");
  }
  toggleModalConfirmation() {
    this.setState({ modalConfirmation: !this.state.modalConfirmation });
  }
  refresh() {
    this.getMeubles();
    this.redirect();
  }
  // fin evenement Affichage

  constructor(props) {
    super(props);
    this.state = {
      dataMeubles: [],
      deleteID: null,
      modifyID: null,
      stockID: null,
      loading: true,
      modalConfirmation: false
    };
    this.getMeubles = this.getMeubles.bind(this);
    this.postMeuble = this.postMeuble.bind(this);
    this.putMeuble = this.putMeuble.bind(this);
    this.deleteMeuble = this.deleteMeuble.bind(this);
    this.patchStock = this.patchStock.bind(this);

    this.handleSuppression = this.handleSuppression.bind(this);
    this.handleModification = this.handleModification.bind(this);
    this.modificationConfirmed = this.modificationConfirmed.bind(this);
    this.deleteConfirmed = this.deleteConfirmed.bind(this);
    this.stockConfirmed = this.stockConfirmed.bind(this);
    this.handleAjout = this.handleAjout.bind(this);
    this.handleStock = this.handleStock.bind(this);

    this.toggleModalConfirmation = this.toggleModalConfirmation.bind(this);
    this.goToAjout = this.goToAjout.bind(this);
    this.refresh = this.refresh.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.getMeubles();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/main/meubles/listes"
              component={() => (
                <Card
                  style={{
                    marginTop: -40
                  }}
                >
                <CardHeader>
                    <Row>
                      <Col xs={12} md={6}>
                        <h3> Liste des Meubles </h3>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        className="d-flex justify-content-end"
                      >
                        <CSVLink
                          filename={"meubles.csv"}
                          data={this.state.dataMeubles}
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
                  <ListeMeubles
                    onModifyMeuble={this.handleModification}
                    onDeleteMeuble={this.handleSuppression}
                    onStockMeuble={this.handleStock}
                    loading={this.state.loading}
                    meubles={this.state.dataMeubles}
                  />
                  </CardBody>
                </Card>
              )}
            />
            <Route
              exact
              path="/main/meubles/listes/:num/stock"
              component={() => (
                <FormulaireStock
                  onCancel={this.redirect}
                  onSubmit={this.stockConfirmed}
                />
              )}
            />

            <Route
              path="/main/meubles/listes/ajout"
              component={() => (
                <FormulaireMeuble
                  ajout
                  onCancel={this.redirect}
                  onSubmit={this.handleAjout}
                />
              )}
            />

            <Route
              path="/main/meubles/listes/modif"
              component={() => (
                <FormulaireMeuble
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
