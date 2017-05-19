import React from 'react';
import {Link} from 'react-router-dom'
import "./header.css"


const Header = (props)=>{
  return <div className="header">
          <nav role="navigation" className="navbar navbar-default">
              <div className="navbar-header">
                  <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <Link to="/"  className="navbar-brand" > Home </Link>
              </div>
              <div id="navbarCollapse" className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                      {props.authenticated?<li><Link to="/dashboard" className="signup"> Dashboard </Link></li>:""}
                      <li className=""><Link to="/browse"  > Browse </Link></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                      {props.authenticated?"":<li><Link to="/signup" className="signup"> Sign Up </Link></li>}
                      {props.authenticated?"":<li><Link to="/login" className="signin">
                        <span className="glyphicon glyphicon-log-in"></span> Sign in</Link></li>}
                      {props.authenticated?<li><Link to="#" onClick={()=>props.logout()}>
                        <span className="glyphicon glyphicon-log-out"></span> Sign Out</Link></li>:""}
                  </ul>
              </div>
          </nav>

  </div>
}

export default Header;
