import React, { useEffect, useState } from 'react';
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
  
  const [ points, setPoints ] = useState([]);
  const [exercise, setExercise] = useState("");
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: points,
        borderColor: 'red',
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.9,
      },
    ],
  };
  useEffect(() => {
    setExercise(props.exercise.name);
    console.log(`exercise in exercise is : ${exercise}`);
  });
  useEffect(() => {
    console.log(`exercise is : ${props.exercise.name}`);
    console.log(`Email is ${props.email}`);
    axios.get('https://coacheserver.vercel.app/user/cal',{
      headers: {
        acctk: localStorage.getItem('acctk'),
        exercise : props.exercise.name
      }
    }).then((response) => {
      if(response.data.message === 'The calorie data is here'){
        setPoints(response.data.data);
        console.log(points);
      }
      else{
        // // alert(response.data.message);
      }
    }).catch((er) => {
      // // alert(`error occurred \n ${er}`);
    })
  }, [exercise]);

  return (
    <div className='container shadow'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <Button
            className='btn btn-success'
            onClick={() => {
              axios.put('https://coacheserver.vercel.app/user', {
                email: props.email,
                exercise: props.exercise.name,
              }).then((response) => {
                console.log(response);
              }).catch((eror) => {
                console.log(eror);
              })
            }}

            block={props.block}
          >
            Start
          </Button>
        </div>
        <div className='col-6'>
          <Button
            className='btn btn-danger'
            onClick={() => {
              const config = {
                headers: {
                  acctk: localStorage.getItem('acctk'),
                  reftk: localStorage.getItem('reftk'),
                }
              };
              axios
                .get('https://coacheserver.vercel.app/user/update', config)
                .then((response) => {
                  if (response.data.message === 'Data updated') {
                    console.log(`acctk : ${response}`);
                    localStorage.setItem('acctk', response.data.acctk);
                    localStorage.setItem('reftk', response.data.reftk);
                  } else {
                    // // alert(response.data.message);
                  }
                })
                .catch((error) => {
                  // // alert(error.message);
                });
            }}
            block={!props.block}
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
