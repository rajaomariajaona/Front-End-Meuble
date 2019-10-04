import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  ButtonGroup,
  Button
} from "shards-react";
import PropTypes from "prop-types";
import { FaPenAlt } from "react-icons/fa";
export default class FormulaireStock extends Component {
  constructor(props) {
    super(props);
    this.state = { quantite: 0, newQuantite: 0 };
    this.getStock = this.getStock.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getStock();
    document.querySelector("#stock").value = this.state.quantite;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = Object.fromEntries(new FormData(event.target));    
    this.props.onSubmit(formData);
  }
  getStock() {
    var link = window.location.href
      .replace("3000", "8000")
      .replace("main", "api")
      .replace("listes/", "");
    var req = new Request(link);
    fetch(req).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          console.log(data);
          this.setState({
            loading: false,
            quantite: data.quantiteStock,
            newQuantite: data.quantiteStock
          });
        });
      } else {
        return Number(response.status);
      }
    });
  }
  add(event) {
    var input = document.querySelector("#stock");
    switch (event.currentTarget.id) {
      case "10":
        input.value = Number(input.value) + 10;
        break;
      case "5":
        input.value = Number(input.value) + 5;
        break;
      case "2":
        input.value = Number(input.value) + 2;
        break;
      case "1":
        input.value = Number(input.value) + 1;
        break;

      default:
        input.value = Number(input.value) + 0;
        break;
    }
  }
  render() {
    return (
      <Container>
        <Row className="my-4">
          <Col sm={12} md={6}>
            <h3 className="d-inline">Stock Courrant : </h3>
            <h3 className="d-inline" id="stockCourrant">
              {" "}
              {this.state.quantite}{" "}
            </h3>
          </Col>
        </Row>
        <Row className="my-4">
          <ButtonGroup>
            <Button
              id="10"
              theme="success"
              onClick={this.add}
              className="btn-stock"
            >
              + 10
            </Button>
            <Button
              id="5"
              theme="danger"
              onClick={this.add}
              className="btn-stock"
            >
              + 5
            </Button>
            <Button
              id="2"
              theme="primary"
              onClick={this.add}
              className="btn-stock"
            >
              + 2
            </Button>
            <Button
              id="1"
              theme="warning"
              onClick={this.add}
              className="btn-stock"
            >
              + 1
            </Button>
          </ButtonGroup>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <label htmlFor="stock">Stock</label>
              <FormInput
                min={0}
                type="number"
                id="stock"
                onChange={evt =>
                  this.setState({ newQuantite: evt.currentTarget.value })
                }
                value={this.state.newQuantite}
                name="quantitestock"
              />
            </FormGroup>
            <Button theme="success" type="submit" className="mx-3">
              {" "}
              Confirmer{" "}
            </Button>
            <Button
              theme="secondary"
              type="reset"
              onClick={this.props.onCancel}
              className="mx-3"
            >
              {" "}
              Annuler{" "}
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
FormulaireStock.propTypes = {
  match: PropTypes.any
};
