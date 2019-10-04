import React, { Component } from "react";
import MiniCard from "./Components/MiniCard";
import { Col, Container, Row } from "shards-react";
import StatistiqueVente from "./Components/StatistiqueVente";
import StatistiqueMeuble from "./Components/StatistiqueMeuble";
import StatistiqueCategorie from "./Components/StatistiqueCategorie";
import DatePicker from "react-datepicker";
import { FormRadio } from "shards-react";
import { fr} from "date-fns/esm/locale";

export default class Acceuil extends Component {
  // access web services

  getMeubleplusvendue() {
    var req;
    // eslint-disable-next-line default-case
    switch (this.state.selected) {
      case "jour":
        req = new Request(
          "http://localhost:8000/api/meubleplusvendue?jour=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "mois":
        req = new Request(
          "http://localhost:8000/api/meubleplusvendue?mois=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "annee":
        req = new Request(
          "http://localhost:8000/api/meubleplusvendue?annee=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
    }

    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statMeuble: data });
        console.log(data);
      });
    });
  }

  getCategorieplusvendue() {
    var req;
    // eslint-disable-next-line default-case
    switch (this.state.selected) {
      case "jour":
        req = new Request(
          "http://localhost:8000/api/categorieplusvendue?jour=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "mois":
        req = new Request(
          "http://localhost:8000/api/categorieplusvendue?mois=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "annee":
        req = new Request(
          "http://localhost:8000/api/categorieplusvendue?annee=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
    }

    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statCategorie: data });
        console.log(data);
      });
    });
  }

  getClientplusacheteur() {
    var req;
    // eslint-disable-next-line default-case
    switch (this.state.selected) {
      case "jour":
        req = new Request(
          "http://localhost:8000/api/clientplusacheteur?jour=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "mois":
        req = new Request(
          "http://localhost:8000/api/clientplusacheteur?mois=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
      case "annee":
        req = new Request(
          "http://localhost:8000/api/clientplusacheteur?annee=" +
            this.state.date.toJSON().substring(0, 10)
        );
        break;
    }

    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statClient: data });
        console.log(data);
      });
    });
  }
  getStatvente(){
    var req = new Request(
      "http://localhost:8000/api/statvente?mois=" +
        this.state.date.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statvente: data });
        console.log(data);
      });
    });
  }

  getStatmeuble(){
    var req = new Request(
      "http://localhost:8000/api/statmeuble?mois=" +
        this.state.date.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statmeuble: data });
        console.log(data);
      });
    });
  }
  getStatcategorie(){
    var req = new Request(
      "http://localhost:8000/api/statcategorie?mois=" +
        this.state.date.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statcategorie: data });
        console.log(data);
      });
    });
  }

  getStats() {
    this.getMeubleplusvendue();
    this.getCategorieplusvendue();
    this.getClientplusacheteur();
    this.getStatvente()
    this.getStatmeuble()
    this.getStatcategorie()
  }
  // fin access web services

  // event handler
  changeSelected(selected) {
    this.setState({ selected: selected }, () => {
      this.getStats();
    });
  }

  handleZoom(event) {
    var target = event.currentTarget;
    this.setState({ zoomed: target.id });
  }

  //fin event handler
  constructor(props) {
    super(props);
    this.getMeubleplusvendue = this.getMeubleplusvendue.bind(this);
    this.getCategorieplusvendue = this.getCategorieplusvendue.bind(this);
    this.getClientplusacheteur = this.getClientplusacheteur.bind(this)
    this.getStats = this.getStats.bind(this);
    this.getStatvente = this.getStatvente.bind(this)
    this.getStatmeuble = this.getStatmeuble.bind(this)
    this.getStatcategorie = this.getStatcategorie.bind(this)
    this.state = {
      statMeuble: [],
      statCategorie: [],
      statClient: [],
      statvente: [],
      statmeuble: [],
      statcategorie: [],
      zoomed: "vente",
      date: new Date(),
      selected: "jour"
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }
  componentDidMount() {
    this.getStats();
  }

  render() {
    var stat1 =
      this.state.statMeuble.length > 0 ? (
        <MiniCard
          title=" Meuble le plus vendu "
          theme="success"
          contenu={
            this.state.statMeuble[0]["nomMeuble"] +
            " : " +
            this.state.statMeuble[0]["somme"]
          }
        />
      ) : (
        <MiniCard title=" Meuble le plus vendu " theme="success" contenu={""} />
      );
    var stat2 =
      this.state.statClient.length > 0 ? (
        <MiniCard
          title=" Meilleure cliente "
          theme="danger"
          contenu={
            this.state.statClient[0]["nomClient"] +
            " : " +
            this.state.statClient[0]["prixTotal"] + " Ariary"
          }
        />
      ) : (
        <MiniCard
          title=" Meilleur client "
          theme="danger"
          contenu={""}
        />
      );
    var stat3 =
      this.state.statCategorie.length > 0 ? (
        <MiniCard
          title=" Categorie le plus recherche "
          theme="primary"
          contenu={
            this.state.statCategorie[0]["categorie"] +
            " : " +
            this.state.statCategorie[0]["nombre"]
          }
        />
      ) : (
        <MiniCard
          title=" Categorie le plus recherche "
          theme="primary"
          contenu={""}
        />
      );

    var stats;
    // eslint-disable-next-line default-case
    switch (this.state.zoomed) {
      case "vente":
        stats = (
          <Row className="my-5">
            <Col md={12} className="mb-3">
              <StatistiqueVente data={this.state.statvente} onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueMeuble data={this.state.statmeuble} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueCategorie data={this.state.statcategorie} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
          </Row>
        );
        break;
      case "meuble":
        stats = (
          <Row className="my-5">
            <Col md={12} className="mb-3">
              <StatistiqueMeuble data={this.state.statmeuble} onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueVente data={this.state.statvente} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueCategorie data={this.state.statcategorie} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
          </Row>
        );
        break;
      case "categorie":
        stats = (
          <Row className="my-5">
            <Col md={12} className="mb-3">
              <StatistiqueCategorie data={this.state.statcategorie} onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueVente data={this.state.statvente} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
            <Col md={6}>
              <StatistiqueMeuble data={this.state.statmeuble} canZoom onZoomedChanged={this.handleZoom} />
            </Col>
          </Row>
        );
        break;
    }

    const formRadio = (
      <Col sm={12} md={6} className="text-center">
        <FormRadio
          inline
          name="selected"
          checked={this.state.selected === "jour"}
          onChange={() => {
            this.changeSelected("jour");
          }}
        >
          Jour
        </FormRadio>
        <FormRadio
          inline
          name="selected"
          checked={this.state.selected === "mois"}
          onChange={() => {
            this.changeSelected("mois");
          }}
        >
          Mois
        </FormRadio>
        <FormRadio
          inline
          name="selected"
          checked={this.state.selected === "annee"}
          onChange={() => {
            this.changeSelected("annee");
          }}
        >
          Annee
        </FormRadio>
      </Col>
    );

    return (
      <Container>
        <Row className="align-items-center mt-4">
          <Col sm={12} md={6} className="text-center">
            <DatePicker
              className="form-control"
              name="date"
              id="date"
              locale={fr}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              selected={this.state.date}
              onChange={date =>
                this.setState({ date: date }, () => {
                  this.getStats();
                })
              }
            />
          </Col>
          {formRadio}
        </Row>
        <Row className="mt-5 mb-3">
          <Col className="my-2" md={4} sm={12}>
            {stat1}
          </Col>
          <Col className="my-2" md={4} sm={12}>
            {stat2}
          </Col>
          <Col className="my-2" md={4} sm={12}>
            {stat3}
          </Col>
        </Row>
        {stats}
      </Container>
    );
  }
}
