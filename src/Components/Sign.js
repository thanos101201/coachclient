import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function Sign() {
  
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        axios.get('http://localhost:3001/user/fetchData', {
            headers: {
                code: code
            }
        }).then((response) => {
            if(response.data.message === 'User added' || response.data.message === 'User updated'){
                localStorage.setItem('acc_tk', response.data.acc_tk);
                localStorage.setItem("ref_tk", response.data.ref_tk);
                localStorage.setItem("loc_tk", response.data.loc_tk);
                window.open("http://localhost:3000/user", "_self");
            }
            else{
                alert(response.data.message);
            }
        }).catch((Eror) => {
            alert(Eror.message);
        })
  }, []);
  return (
    <div> Please wait for 10 seconds if not redirected click <a href="http://localhost:3000/user">here</a> </div>
  )
}

export default Sign