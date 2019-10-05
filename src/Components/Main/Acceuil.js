import React, { Component } from "react";
import MiniCard from "./Components/MiniCard";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardHeader
} from "shards-react";
import StatistiqueVente from "./Components/StatistiqueVente";
import StatistiqueMeuble from "./Components/StatistiqueMeuble";
import StatistiqueCategorie from "./Components/StatistiqueCategorie";
import DatePicker from "react-datepicker";
import { FormRadio } from "shards-react";
import { fr } from "date-fns/esm/locale";
import { savePDF } from "@progress/kendo-react-pdf";
import "./print.css";
import Test from '../Print/Test';
import {FaFilePdf} from 'react-icons/fa'

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
      });
    });
  }
  getStatvente() {
    var req = new Request(
      "http://localhost:8000/api/statvente?mois=" +
        this.state.mois.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statvente: data });
      });
    });
  }

  getStatmeuble() {
    var req = new Request(
      "http://localhost:8000/api/statmeuble?mois=" +
        this.state.mois.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statmeuble: data });

      });
    });
  }
  getStatcategorie() {
    var req = new Request(
      "http://localhost:8000/api/statcategorie?mois=" +
        this.state.mois.toJSON().substring(0, 10)
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ statcategorie: data });

      });
    });
  }

  getStats() {
    this.getMeubleplusvendue();
    this.getCategorieplusvendue();
    this.getClientplusacheteur();
    this.getStatvente();
    this.getStatmeuble();
    this.getStatcategorie();
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
    this.getClientplusacheteur = this.getClientplusacheteur.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getStatvente = this.getStatvente.bind(this);
    this.getStatmeuble = this.getStatmeuble.bind(this);
    this.getStatcategorie = this.getStatcategorie.bind(this);
    this.state = {
      statMeuble: [],
      statCategorie: [],
      statClient: [],
      statvente: [],
      statmeuble: [],
      statcategorie: [],
      zoomed: "vente",
      date: new Date(),
      mois: new Date(),
      selected: "jour"
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.toPrint = React.createRef();
    this.toPrintMensuel = React.createRef();
    this.savePdf = this.savePdf.bind(this);
  }
  savePdf(event) {
    var id = event.currentTarget.id
    var printRef
    switch(id){
      case "toprint" : 
        printRef = this.toPrint
        break
      case "toprintmensuel":
        printRef = this.toPrintMensuel
        break
    }
    savePDF(printRef.current, {
      scale: 0.45,
      paperSize: "A4",
      fileName: "bilan.pdf",
      margin: "2cm",
      forcePageBreak: ".page-break"
    });
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
            this.state.statClient[0]["prixTotal"] +
            " Ariary"
          }
        />
      ) : (
        <MiniCard title=" Meilleur client " theme="danger" contenu={""} />
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
              <StatistiqueVente
                data={this.state.statvente}
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueMeuble
                data={this.state.statmeuble}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueCategorie
                data={this.state.statcategorie}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
          </Row>
        );
        break;
      case "meuble":
        stats = (
          <Row className="my-5">
            <Col md={12} className="mb-3">
              <StatistiqueMeuble
                data={this.state.statmeuble}
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueVente
                data={this.state.statvente}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueCategorie
                data={this.state.statcategorie}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
          </Row>
        );
        break;
      case "categorie":
        stats = (
          <Row className="my-5">
            <Col md={12} className="mb-3">
              <StatistiqueCategorie
                data={this.state.statcategorie}
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueVente
                data={this.state.statvente}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
            <Col md={6}>
              <StatistiqueMeuble
                data={this.state.statmeuble}
                canZoom
                onZoomedChanged={this.handleZoom}
              />
            </Col>
          </Row>
        );
        break;
    }

    const formRadio = (
      <Col sm={12} md={4} className="text-center">
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

    var titre = (
      <h3>
        {" "}
        Bilan du{" "}
        {this.state.selected === "jour"
          ? this.state.date.toLocaleDateString("fr", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "2-digit"
            })
          : this.state.selected === "mois"
          ? this.state.selected +
            " " +
            this.state.date.toLocaleDateString("fr", {
              year: "numeric",
              month: "long"
            })
          : this.state.selected +
            " " +
            this.state.date.toLocaleDateString("fr", { year: "numeric" })}{" "}
      </h3>
    );
    var titreChart = (
      <h3>
        Statistique du mois{" "}
        {this.state.mois.toLocaleDateString("fr", {
          year: "numeric",
          month: "long"
        })}{" "}
      </h3>
    );

    return (
      <Container>
        <Card className="mb-3" style={{marginTop: -40}}>
          <CardHeader>
            <Row className="align-items-center">
              <Col sm={12} md={4} className="text-left px-3">
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
              <Col sm={12} md={4}>
                <Button
                  onClick={this.savePdf}
                  id="toprint"
                  className="btn-outline-primary btn-pill mx-auto mr-md-0 ml-md-auto d-block"
                  theme="primary"
                >
                  {" "}
                  <FaFilePdf/> PDF{" "}
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm={12}>
                <Row className="my-2">
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
              </Col>
            </Row>
          </CardBody>
        </Card>
        
        <Card className="mt-5" style={{marginBottom: -110}}>
          <CardHeader>
            <Row className="align-items-center">
              <Col sm={12} md={8} className="text-left px-3">
                <DatePicker
                  id="mois"
                  dateFormat="MM/yyyy"
                  selected={this.state.mois}
                  onChange={date =>
                    this.setState({ mois: date }, () => {
                      this.getStats();
                    })
                  }
                  className="form-control"
                  showMonthYearPicker
                />
              </Col>
              <Col sm={12} md={4}>
                <Button
                  onClick={this.savePdf}
                  id="toprintmensuel"
                  className="btn-outline-primary btn-pill mx-auto mr-md-0 ml-md-auto d-block"
                  theme="primary"
                >
                  {" "}
                  <FaFilePdf/> PDF{" "}
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>

        {stats}

        <div id="print-container">
          <div ref={this.toPrint}>
            {titre}
            <Row className="mt-5 mb-3">
              <Col className="my-2" sm={12}>
                {this.state.statMeuble.length > 0 ? (
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
                  <MiniCard
                    title=" Meuble le plus vendu "
                    theme="success"
                    contenu={""}
                  />
                )}
              </Col>
              <Col className="my-2" sm={12}>
                {this.state.statClient.length > 0 ? (
                  <MiniCard
                    title=" Meilleure cliente "
                    theme="danger"
                    contenu={
                      this.state.statClient[0]["nomClient"] +
                      " : " +
                      this.state.statClient[0]["prixTotal"] +
                      " Ariary"
                    }
                  />
                ) : (
                  <MiniCard
                    title=" Meilleur client "
                    theme="danger"
                    contenu={""}
                  />
                )}
              </Col>
              <Col className="my-2" sm={12}>
                {this.state.statCategorie.length > 0 ? (
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
                )}
              </Col>
            </Row>
            </div>
            <div ref={this.toPrintMensuel}>
            {titreChart}
            <Row className="my-5">
              <Col md={12} className="my-5">
                <StatistiqueVente print data={this.state.statvente} />
              </Col>
              <Col md={12} className="my-5 page-break">
                <StatistiqueMeuble print data={this.state.statmeuble} />
              </Col>
              <Col md={12} className="my-5 page-break">
                <StatistiqueCategorie print data={this.state.statcategorie} />
              </Col>
            </Row>
          </div>
        </div>
        <Test/>
      </Container>
    );
  }
}
