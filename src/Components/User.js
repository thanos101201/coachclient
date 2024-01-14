import React, { useState } from 'react'
import { Button, Card, CardHeader } from 'reactstrap'
import Exercise from './Exercise';
import { Line } from 'react-chartjs-2';

function User() {
  const [index, setIndex] = useState(0);

  const urls = [
    "https://www.youtube.com/watch?v=C5J-WkqFTWE",
    "https://www.youtube.com/watch?v=gsSxzktabTA",
    "https://www.youtube.com/watch?v=Y-UIruB9yLU"
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
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-5 col-md-3 d-flex align-items-center'>
          <Button className='btn btn-danger' onClick={() => handlePrevious()}>Previous</Button>
        </div>
        <div className='col-5 col-md-3 d-flex align-items-center'>
          <Button className='btn btn-success' onClick={() => handleNext()}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default User