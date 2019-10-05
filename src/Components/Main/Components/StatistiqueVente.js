import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { PropTypes } from "prop-types";
export default class StatistiqueVente extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: new Date() };
  }
  render() {
    const data = {
      datasets: [
        {
          label: "Courbe de vente",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          data: this.props.data
        }
      ]
    };

    const options = {
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              unit: "day"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              callback: function(value, index, values) {
                return value + " Ar";
              }
            }
          }
        ]
      }
    };
    var test = !this.props.print ? (
      <Card>
        <CardHeader>
          Statistique de vente
          {this.props.canZoom && (
            <Button
              onClick={this.props.onZoomedChanged}
              id="vente"
              theme="secondary"
              className="d-sm-none d-md-block p-1 float-right"
            >
              <FaExpandArrowsAlt style={{ fontSize: "1.25em" }} />
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Line data={data} options={options} />
        </CardBody>
      </Card>
    ) : (
      <div>
        <h4> Statistique de vente </h4>
        <Line data={data} options={options} />
      </div>
    );

    return <div>{test}</div>;
  }
}

StatistiqueVente.propTypes = {
  data: PropTypes.any,
  onZoomedChanged: PropTypes.func,
  print: PropTypes.bool
};
