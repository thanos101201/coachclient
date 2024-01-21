import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader } from 'reactstrap'
import Exercise from './Exercise';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function User() {
  const [index, setIndex] = useState(0);
  const [ user, setUser ] = useState({});
  const [calorie, setCalorie] = useState([
    {
      url : "https://www.youtube.com/watch?v=IODxDxX7oi4&t=2s",
      name: "push ups",
      cal : []
    },
    {
      url : "https://www.youtube.com/watch?v=eGo4IYlbE5g",
      name: "squats",
      cal : []
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "pull ups",
      cal: []
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "launge",
      cal : []
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "russian curls",
      cal : []
    },
    {
      url : "https://www.youtube.com/shorts/SLOkdLLWj8A",
      name: "crunches",
      cal : []
    }
  ]);
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
      axios.get('https://coacheserver.vercel.app/user', config).then((response) => {
        // console.log(response);
        if(response.data.message === 'User data is here'){
          setUser(response.data.data[0]);
          let ar = [];
          // console.log();
          if(response.data.data[0].calorieBurnt !== undefined && response.data.data[0].calorieBurnt.length !== 0){
            calorie.map((e) => {
              const cal1 = response.data.data[0].calorieBurnt.filter(((e1) => {
                // console.log(`e.name : ${e.name}, e1.name : ${e1.exercise}`);
                if(e1.exercise === e.name){
                  return true;
                }
                return false;
              }));
              console.log(cal1);
              const obj = {
                url : e.url,
                name: e.name,
                cal : cal1
              }
              // console.log(obj);
              ar.push(obj);
            });
            setCalorie(ar);
            console.log(`calor : ${calorie[index].cal[0].calories}`);
            console.log(`calorie : ${Object.keys(calorie[0])}`);
          }
        }
        else{
          window.open("https://coachclient.vercel.app/", "_self");
        }
      }).catch((eror) => {
        // // alert(eror.message);
        // window.open("https://coachclient.vercel.app/", "_self");
      })
    }
    else{
      window.open("https://coachclient.vercel.app/", "_self");
    }
  }, []);
  const dataPoints = [
    [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
    [10, 120, 120, 160, 160, 120, NaN, 280, 220, 225, 205, 210, 270],
    [0, 2, 2, 6, 6, 12, NaN, 180, 120, 125, 105, 110, 170],
    [0, 2, 2, 6, 6, 12, NaN, 180, 120, 125, 105, 110, 170],
    [0, 2, 2, 6, 6, 12, NaN, 180, 120, 125, 105, 110, 170],
    [0, 2, 2, 6, 6, 12, NaN, 180, 120, 125, 105, 110, 170]
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
  const getCalData = (name) => {
    if(user.calorieBurnt === undefined || user.calorieBurnt.length == 0){
      return [];
    }
    else{
      return user.calorieBurnt.filter((e) => {
        if(e.exercise === name){
          return true;
        }
        return false;
      })
    }
  }
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center m-5'>
        <Exercise exercise={calorie[index]} email={user.email} datapoint={dataPoints[index]} block={user.exercise !== 'none'} />
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