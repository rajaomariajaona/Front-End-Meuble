import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import { FaExpandArrowsAlt } from "react-icons/fa";

// Par categorie
export default class StatistiqueCategorie extends Component {
  render() {
    var x = [];
    var y = [];
    this.props.data.forEach(element => {
      x.push(element.x);
      y.push(element.y);
    });
    const data = {
      labels: x,
      datasets: [
        {
          data: y,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#2c3e50",
            "#8e44ad",
            "#27ae60",
            "#2980b9",
            "#c0392b",
            "#d35400",
            "#16a085"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#2c3e50",
            "#8e44ad",
            "#27ae60",
            "#2980b9",
            "#c0392b",
            "#d35400",
            "#16a085"
          ]
        }
      ]
    };
    var res = !this.props.print ? (
      <Card className="mb-4">
        <CardHeader>
          Statistique des Categories
          {this.props.canZoom && (
            <Button
              onClick={this.props.onZoomedChanged}
              id="categorie"
              theme="secondary"
              className="d-sm-none d-md-block p-1 float-right"
            >
              <FaExpandArrowsAlt style={{ fontSize: "1.25em" }} />
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Pie data={data} />
        </CardBody>
      </Card>
    ) : (
      <div>
        {" "}
        <h4>Statistique des Categories</h4> <Pie data={data} />
      </div>
    );
    return <div>{res}</div>;
  }
}
