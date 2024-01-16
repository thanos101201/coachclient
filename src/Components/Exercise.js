import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player/lazy';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Exercise(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const DATA_COUNT = 12;
  const labels = [];
  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }
  const datapoints = props.datapoint;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: datapoints,
        borderColor: 'red',
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className='container shadow'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <Button
            className='btn btn-success'
            onClick={() => {
              axios.put('http://localhost:3001/user', {
                email: props.email,
                exercise: props.exercise.name,
              });
            }}
          >
            Start
          </Button>
        </div>
        <div className='col-6'>
          <Button
            className='btn btn-danger'
            onClick={() => {
              const config = {
                acctk: localStorage.getItem('acctk'),
                reftk: localStorage.getItem('reftk'),
              };
              axios
                .get('http://localhost:3001/user/update', config)
                .then((response) => {
                  if (response.data.message === 'Data updated') {
                    localStorage.setItem('acctk', response.data.acctk);
                    localStorage.setItem('reftk', response.data.reftk);
                  } else {
                    alert(response.data.message);
                  }
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            Stop
          </Button>
        </div>
      </div>
      <div className='row justify-content-center mt-5 d-flex justify-content-center'>
        <div className='col-12 col-md-6 d-flex align-items-center mb-3'>
          <ReactPlayer
            url={props.exercise.url}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className='col-12 col-md-6'>
          <Card>
            <CardHeader>
              <CardTitle>
                <h4>Feedback</h4>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className='row justify-content-center'>
                <div className='col-12'>
                  <Line style={{ width: '100%', height: '100%' }} data={data} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Exercise;
