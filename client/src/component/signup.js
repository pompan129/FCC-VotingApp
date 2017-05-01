
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';

const SignUp = (props)=>{
   const { handleSubmit, pristine, reset, submitting } = props;
  if(props.isAuthenticated){return  <Redirect to="/dashboard"/>;}
  return(
    <form onSubmit={handleSubmit}>
      <div><h2>SignUp</h2></div>
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
      </form>
  )
}

export default reduxForm({
  form: 'signup', // a unique identifier for this form
})(SignUp);
