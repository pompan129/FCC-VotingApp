
import React from 'react';
import Axios from "axios";
import {getAllPolls_Async} from '../actions';

const testFunction = ()=>{
  Axios.post('/api/polls/test', {
    author: "carl",
    title: "boys names",
    options: [{name:"dave" , votes:5},{name: "john", votes:3}],
    id: "pol98"
  })
  .then(function (response) {
    console.log(response);
  })
}

const tester = ()=>{

  return (
    <div>
      <button onClick = {()=>{testFunction();}}>axios</button>
    </div>
  )
}


export default tester;
