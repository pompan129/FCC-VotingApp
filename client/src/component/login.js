import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import './login.css';

const Login = (props)=>{
  const { handleSubmit, pristine, reset, submitting } = props;
  if(props.isAuthenticated){return <Redirect to="/dashboard"/>;}
  console.log("Login",props);//todo
  return(
    <form onSubmit={handleSubmit}>
        <div><h2>Login</h2></div>
        <div>
          <label>Email</label>
          <div>
            <Field name="email" component="input" type="email" placeholder="Email"/>
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <Field name="password" component="input" type="text" placeholder="password"/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
        <div className="error-message">{props.errorMessage?props.errorMessage:""}</div>
      </form>
  )
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
})(Login);
