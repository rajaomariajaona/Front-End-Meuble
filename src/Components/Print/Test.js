import React, { Component } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import { PropTypes } from "prop-types";
import { Row, Col, Card, CardBody, Button } from "shards-react";
import { CardHeader } from "shards-react";
import { FaFilePdf } from "react-icons/fa";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.facture = React.createRef();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    savePDF(this.facture.current, {
      paperSize: "A4",
      scale: 0.45,
      fileName: "fact.pdf",
      margin: '2cm'
    });
  }

  render() {
    return (
      <Row className="my-5">
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
                      {" "}
                      {this.props.numcommande}{" "}
                    </p>
                    <p className="text-muted">{this.props.datecommande}</p>
                  </Col>
                  <Col xs={6} className="text-right">
                    <p className="font-weight-bold mb-4">Client</p>
                    <p className="mb-1">{this.props.client["nom"]}</p>
                    <p>{this.props.client["tel"]}</p>
                    <p className="mb-1">{this.props.client["adresse"]}</p>
                    <p className="mb-1">
                      {this.props.client["province"] +
                        " " +
                        this.props.client["cp"]}
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
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Software</td>
                          <td>LTS Versions</td>
                          <td>21</td>
                          <td>$321</td>
                          <td>$3452</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Total</div>
                    <div className="h2 font-weight-light"></div>
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

Test.propTypes = {
  client: PropTypes.any,
  datecommande: PropTypes.any,
  numcommande: PropTypes.any
};
Test.defaultProps = {
  client: []
};
