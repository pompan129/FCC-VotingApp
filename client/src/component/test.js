
import React from 'react';
import Axios from "axios";
//import {getAllPolls_Async} from '../actions';

const testFunction = ()=>{
  Axios.post('/api/user/signup', {
    username:"Bill@test.com",
    password: "1234567"
  })
  .then(function (response) {
    console.log(response);
  })
}

const tester =()=>{

  return (
    <div>
      <button onClick={()=>{testFunction();}}>axios</button>
    </div>
  )
}


export default tester;
