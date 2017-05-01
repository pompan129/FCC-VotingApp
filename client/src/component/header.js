import React from 'react';
import {Link} from 'react-router-dom'


const Header = (props)=>{
  return <div className="header">
    <Link to="/"> Home </Link>
    <Link to="/login" className="login"> Login </Link>
    <Link to="/signup" className="signup"> Sign Up </Link>
  </div>
}

export default Header;
