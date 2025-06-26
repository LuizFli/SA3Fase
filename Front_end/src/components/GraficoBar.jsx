import React, { Component } from "react";
import Chart from "react-apexcharts";

class GraficoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "end",
            horizontal: true,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 100,
                  color: "#80FF00"
                }
              ]
            }
          }
        },
        dataLabels: { enabled: false },
        xaxis: {
          max: 100,
          labels: {
            formatter: function (value) {
              return `${value}%`;
            }
          }
        },
        yaxis: { show: false }
      },
      series: [
        {
          data: [this.parseMeta(props.meta)]
        }
      ]
    };
  }

  parseMeta(meta) {
    // Garante que sempre será um número entre 0 e 100
    const value = Math.max(0, Math.min(100, Number(meta) || 0));
    return value;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meta !== this.props.meta) {
      this.setState({
        series: [
          {
            data: [this.parseMeta(this.props.meta)]
          }
        ]
      });
    }
  }

  render() {
    return (
      <div className="grafico-bar">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="98%"
              height="100"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GraficoBar;