import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player/lazy';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { Chart as ChartJS, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';

function Exercise(props){
  ChartJS.register( CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend );

  const DATA_COUNT = 12;
  const labels = [];
  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }
  const datapoints = props.datapoint;//[0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: datapoints,
        borderColor: "red",
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      }
    ]
  };

  return(
    <div className='row g-3 d-flex justify-content-center'>
      <div className='col-10 col-md-7 d-flex align-items-center'>
        <ReactPlayer
        url={props.url}
        className="embed-responsive-item"
        width="100%"
        height="100%"
        />
      </div>
      <div className='col-10 col-md-5 d-flex align-items-center'>
        <Card>
          <CardHeader>
            <CardTitle>
              <h4>Feedback</h4>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className='row d-flex justify-content-center'>
              <div>
                <Line
                data={data} 
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Exercise;
