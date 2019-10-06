import React, { Component } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import { PropTypes } from "prop-types";
import { Row, Col, Card, CardBody, Button } from "shards-react";
import { CardHeader } from "shards-react";
import { FaFilePdf } from "react-icons/fa";
import Loading from "../Other/Loading";
import Format from "../Other/Format";
import ReactWOW from "react-wow";

export default class Facture extends Component {
  constructor(props) {
    super(props);
    this.facture = React.createRef();
    this.state = { data: [] };
    this.handleClick = this.handleClick.bind(this);
    this.getFacture = this.getFacture.bind(this);
    this.format = new Format();
  }

  handleClick(event) {
    savePDF(this.facture.current, {
      paperSize: "A4",
      scale: 0.45,
      fileName: "fact.pdf",
      margin: "2cm"
    });
  }

  getFacture() {
    this.setState({ loading: true });
    var req = new Request(
      "http://localhost:8000/api/factures/" + this.props.match.params.num
    );
    fetch(req).then(response => {
      response.json().then(data => {
        this.setState({ data: data, loading: false });
      });
    });
  }

  componentDidMount() {
    this.getFacture();
  }
  render() {
    var total = 0;
    const rows = this.state.data.map((value, index) => {
      total += Number(value.prixTotal);
      return (
        <tr key={index}>
          <td>{value.numSerie}</td>
          <td>{value.nomMeuble}</td>
          <td>{value.categorie}</td>
          <td>{value.quantiteCommande}</td>
          <td>{this.format.formatPrix(value.prixUnitaire)}</td>
          <td>{this.format.formatPrix(value.prixTotal)}</td>
        </tr>
      );
    });
    return (
      <Row className="mb-4" style={{ marginTop: -40 }}>
        {this.state.data.length > 0 ? (
          <ReactWOW animation="zoomIn">
            <Col sm={12}>
              <Card>
                <CardHeader>
                  <Button
                    onClick={this.handleClick}
                    id="toprint"
                    className="btn-outline-primary btn-pill mx-auto mr-md-0 ml-md-auto d-block"
                    theme="primary"
                  >
                    {" "}
                    <FaFilePdf /> PDF{" "}
                  </Button>
                </CardHeader>
                <div ref={this.facture}>
                  <CardBody className="p-0 facture">
                    <Row className="p-5">
                      <Col xs={6}>
                        <h1 className="display-4"> Facture </h1>
                        <p className="font-weight-bold mb-1">
                          <span>Commande numero : </span>{" "}
                          <span className="mx-1">
                            {" "}
                            {this.state.data[0].numCommande}{" "}
                          </span>
                        </p>
                        <p className="text-muted">
                          {" "}
                          Date commande : {this.state.data[0].dateCommande}
                        </p>
                      </Col>
                      <Col xs={6} className="text-right">
                        <p className="font-weight-bold mb-4">Client</p>
                        <p className="mb-1">{this.state.data[0].nomClient}</p>
                        <p className="mb-1">
                          {this.state.data[0].prenomClient}
                        </p>
                        <p className="mb-1">
                          <b>Tel : </b>
                          {this.format.formatTel(this.state.data[0].telClient)}
                        </p>
                        <p className="mb-1">
                          {this.state.data[0].adresseClient}
                        </p>
                        <p className="mb-1">
                          {this.state.data[0].provinceClient}
                        </p>
                      </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row className="p-5">
                      <Col md={12} className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Numero de serie
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Nom
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Categorie
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Quantite
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Prix unitaire
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Prix total
                              </th>
                            </tr>
                          </thead>
                          <tbody>{rows}</tbody>
                        </table>
                      </Col>
                    </Row>
                    <Row className="bg-dark p-4 m-0">
                      <Col className="ml-auto text-right" md={4}>
                        <div className="mb-2 text-white">Total</div>
                        <div className="text-white">
                          {" "}
                          <span>
                            {" "}
                            {this.format.formatPrix(total + "")}
                          </span>{" "}
                          <span className="mx-1"> Ariary </span>{" "}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </ReactWOW>
        ) : (
          <Loading />
        )}
      </Row>
    );
  }
}

Facture.propTypes = {
  client: PropTypes.any,
  datecommande: PropTypes.any,
  numcommande: PropTypes.any
};
Facture.defaultProps = {
  client: []
};
