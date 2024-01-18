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
      url : "https://www.youtube.com/watch?v=IODxDxX7oi4&t=2s",
      name: "push ups"
    },
    {
      url : "https://www.youtube.com/watch?v=eGo4IYlbE5g",
      name: "squats"
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "pull ups"
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "launge"
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "russian curls"
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "crunches"
    }
  ]
  const urls = [
    "https://www.youtube.com/watch?v=IODxDxX7oi4&t=4s",
    "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    "https://www.youtube.com/shorts/SLOkdLLWj8A"
  ]
  useEffect(() => {
    const acctk = localStorage.getItem('acctk');
    if(acctk !== undefined){
      console.log(acctk);
      const config = {
        headers : {
          acctk : acctk
        }
      }
      axios.get('http://localhost:3001/user', config).then((response) => {
        if(response.data.message === 'User data is here'){
          setUser(response.data.data[0]);
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
      <div className='row d-flex justify-content-center m-5'>
        <Exercise exercise={exercises[index]} email={user.email} datapoint={dataPoints[index]} />
      </div>
      <br></br>
      <div className='row d-flex justify-content-center m-5'>
        <div className='col-6 d-flex align-items-center'>
          <Button className='btn btn-danger' onClick={() => handlePrevious()}>Previous</Button>
        </div>
        <div className='col-6 d-flex align-items-center'>
          <Button className='btn btn-success' onClick={() => handleNext()}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default User