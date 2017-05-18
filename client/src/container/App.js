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
import {setAuthentication,getAllPolls_Async,signupUser} from '../actions';

import Test from '../component/test';


class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentWillMount(){
    this.props.getAllPolls_Async();
  }

  handleLogin(values){
    this.props.auth?
      this.props.setAuthentication(false):
      this.props.setAuthentication(true);
  }

  handleLogout(){
    this.props.setAuthentication(false)
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  }

  handleSignUp({password, email}){
      this.props.setAuthentication(true);
      console.log("handleSignUp",password, email);//todo
      this.props.signupUser({username:email, password});
  }

//todo remove 'test' route
  render() {
    if(!this.props.polls){this.props.getAllPolls_Async(); return null;}//todo

    return (
      <BrowserRouter>
        <div className='app-container'>
          <Header authenticated={this.props.authenticated} logout={this.handleLogout.bind(this)}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/browse' render={()=><PollList polls={this.props.polls} />} />
            <Route  path='/login'
              render={()=><Login onSubmit={this.handleLogin} isAuthenticated={this.props.authenticated} />} />
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

function mapStateToProps({user,polls,}){
    return {
        user: user.current,
        authenticated:user.authenticated,
        polls
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAuthentication,getAllPolls_Async,signupUser}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
