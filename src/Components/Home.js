import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, CardTitle, Button, Form, FormGroup } from 'reactstrap';
import { FaGooglePlusG } from "react-icons/fa";
import { AiOutlineGooglePlus } from 'react-icons/ai';
import axios from 'axios';

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '10px', // Neumorphism border radius
        // boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', // Neumorphism shadow
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Glassmorphism background color
      };
function Home() {
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-12 col-md-4'></div>
            <Form className='col-12 col-md-4 shadow d-flex align-items-center' style={containerStyle}>
                    <FormGroup>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 col-md-10 d-flex align-items-center'>
                                <Button className='btn btn-danger' onClick={() => {
                                    axios.get('https://coacheserver.vercel.app/login').then((response) => {
                                        window.open(response.data.url, "_self");
                                    }).catch((eror) => {
                                        alert(eror.message);
                                    })
                                }}>
                                    <strong>
                                    <AiOutlineGooglePlus />Sign In
                                    </strong>
                                </Button>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
            <div className='col-12 col-md-4'></div>
        </div>
    </div>
  )
}

export default Home