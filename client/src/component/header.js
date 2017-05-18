import React from 'react';
import {Link} from 'react-router-dom'


const Header = (props)=>{
  return <div className="header">
    <Link to="/"  className="login btn btn-info" > Home </Link>
    {props.authenticated?"":<Link to="/login" className="login btn btn-info">
    <span className="glyphicon glyphicon-log-in"></span> Sign in
    </Link>}
    {props.authenticated?"":<Link to="/signup" className="signup btn btn-info"> Sign Up </Link>}
    {props.authenticated?<button className="btn btn-info" onClick={()=>props.logout()}>
      <span className="glyphicon glyphicon-log-out"></span> Sign Out</button>:""}
  </div>
}

export default Header;
