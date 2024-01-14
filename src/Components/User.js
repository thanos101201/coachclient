import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader } from 'reactstrap'
import Exercise from './Exercise';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function User() {
  const [index, setIndex] = useState(0);
  const [ user, setUser ] = useState({});

  const exercises = [
    {
      url : "",
      name: "push ups"
    },
    {
      url : "",
      name: "squats"
    },
    {
      url : "",
      name: "pull ups"
    },
    {
      url : "",
      name: "launge"
    },
    {
      url : "",
      name: "russian curls"
    },
    {
      url : "",
      name: "crunches"
    }
  ]

  useEffect(() => {
    const acctk = localStorage.getItem('acctk');
    if(acctk !== undefined){
      const header = {
        acctk : acctk
      }
      axios.get('http://localhost:3001/user', header).then((response) => {
        if(response.data.message === 'User data is here'){
          setUser(response.data.message);
        }
        else{
          window.open("http://localhost:3000/", "_self");
        }
      }).catch((eror) => {
        alert(eror.message);
      })
    }
    else{
      window.open("http://localhost:3000/", "_self");
    }
  }, []);
  const urls = [
    "https://www.youtube.com/watch?v=IODxDxX7oi4&t=4s",
    "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    "https://www.youtube.com/shorts/SLOkdLLWj8A"
  ]
  const dataPoints = [
    [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
    [10, 120, 120, 160, 160, 120, NaN, 280, 220, 225, 205, 210, 270],
    [0, 2, 2, 6, 6, 12, NaN, 180, 120, 125, 105, 110, 170],
  ]
  const handleNext = () => {
    if(index === urls.length - 1){
      setIndex(0);
    }
    else{
      setIndex(index+1);
    }
  }
  const handlePrevious = () => {
    if(index === 0){
      setIndex(urls.length - 1);
    }
    else{
      setIndex(index-1);
    }
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center mt-5'>
        <Exercise url={urls[index]} datapoint={dataPoints[index]} />
      </div>
      <br></br>
      <div className='row d-flex justify-content-center mt-5 mb-5'>
        <div className='col-3 d-flex align-items-center'>
          <Button className='btn btn-danger' onClick={() => handlePrevious()}>Previous</Button>
        </div>
        <div className='col-3 d-flex align-items-center'>
          <Button className='btn btn-success' onClick={() => handleNext()}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default User