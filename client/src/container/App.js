import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../component/header';
import Dashboard from './dashboard';
import PollList from './poll-list-all';
import Login from '../component/login';
import SignUp from '../component/signup';
import EditPoll from './poll-edit';
import UserSettings from '../component/user-settings';
import Poll from './poll';
import Home from './home'
import {setAuthentication,setUsername,getAllPolls_Async,signupUser,signinUser,signOut} from '../actions';

import Test from '../component/test';


class App extends React.Component {
  constructor(props){
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentWillMount(){
    this.props.getAllPolls_Async();
    this.props.setAuthentication(!!localStorage.getItem("jwt"));
    this.props.setUsername(localStorage.getItem("username"));

  }

  handleSignIn({password, email}){
    this.props.signinUser({username:email, password});
  }

  handleSignUp({password, email}){
      this.props.signupUser({username:email, password});
  }

  handleLogout(){
    this.props.signOut()
  }

//todo remove 'test' route
  render() {
    if(!this.props.polls){this.props.getAllPolls_Async(); return null;}//todo
    console.log("app>",this.props)
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Header authenticated={this.props.authenticated} logout={this.handleLogout.bind(this)}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/browse' render={()=><PollList polls={this.props.polls} />} />
            <Route  path='/login'
              render={()=><Login onSubmit={this.handleSignIn} isAuthenticated={this.props.authenticated} errorMessage={this.props.message.error}/>} />
            <Route  path='/signup'
              render={()=><SignUp onSubmit={this.handleSignUp} isAuthenticated={this.props.authenticated}/>} />
            <Route  path='/editpoll/:id' component={EditPoll} />
            <Route  path='/poll-new' component={EditPoll} />
            <Route  path='/settings' component={UserSettings} />
            <Route  path='/test' component={Test} />
            <Route  path='/poll/:id' component={Poll} />
            <Route  path='/error' render={function () {
              return <h2>ERROR</h2>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({user,polls,message}){
    return {
        user: user.username,
        authenticated:user.authenticated,
        message:message,
        polls
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { setAuthentication,setUsername,getAllPolls_Async,signupUser,signinUser,signOut}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
