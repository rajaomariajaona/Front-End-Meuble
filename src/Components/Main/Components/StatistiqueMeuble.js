import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import { FaExpandArrowsAlt } from "react-icons/fa";

// Par categorie
export default class StatistiqueMeuble extends Component {
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
          label: "Statistique Meubles",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: y
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    var res = !this.props.print ? (
      <Card className="mb-4">
        <CardHeader>
          Statistique de Meubles
          {this.props.canZoom && (
            <Button
              onClick={this.props.onZoomedChanged}
              id="meuble"
              theme="secondary"
              className="d-sm-none d-md-block p-1 float-right"
            >
              <FaExpandArrowsAlt style={{ fontSize: "1.25em" }} />
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Bar data={data} options={options} />
        </CardBody>
      </Card>
    ) : (
      <div>
        <h4>Statistique de Meubles</h4>
        <Bar data={data}
        options={options}/>
      </div>
    );

    return <div>{res}</div>;
  }
}
