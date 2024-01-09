import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap';
import { FaGooglePlusG } from "react-icons/fa";
import axios from 'axios';

function Home() {
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-12 col-md-8'>
                <Card>
                    <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 col-md-8 d-flex align-items-center'>
                                <Button onClick={() => {
                                    axios.get('http://localhost:3001/login').then((response) => {
                                        window.open(response.data.url, "_self");
                                    }).catch((eror) => {
                                        alert(eror.message);
                                    })
                                }}>
                                    <FaGooglePlusG />Sign In
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default Home