import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Infinity from '../assets/infinity.gif';
import { Card, CardBody, CardHeader, CardImg } from 'reactstrap';

function Sign() {
  
  const location = useLocation();
//   const clientUrl = "http://localhost:3000";
  const clientUrl = "https://coachclient.vercel.app";
//   const serverUrl = "http://localhost:3001";
  const serverUrl = "https://coacheserver.vercel.app";

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        axios.post(`${serverUrl}/user`,{}, {
            headers: {
                code: code
            }
        }).then((response) => {
            console.log(response);
            if(response.data.message === 'User added' || response.data.message === 'User logged in'){
                console.log(response);
                localStorage.setItem('acctk', response.data.acctk);
                localStorage.setItem("reftk", response.data.reftk);
                window.open(`${clientUrl}/user`, "_self");
            }
            else{
                // alert(response.data.message);
            }
        }).catch((Eror) => {
            // alert(Eror.message);
        })
  }, []);
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-12 d-flex align-items-center'></div>
        </div>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-10 col-md-4 d-flex align-items-center'></div>
            <div className='col-10 col-md-8 d-flex align-items-center'>
                <Card>
                    <CardHeader>
                        <CardImg src={Infinity} />
                    </CardHeader>
                    <CardBody>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 d-flex align-items-center'>
                                <p>
                                    Please wait for 30 seconds if not redirected click <a href={`${clientUrl}/user`}>here</a> 
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default Sign