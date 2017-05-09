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
import {setAuth,getAllPolls_Async} from '../actions';

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
      this.props.setAuth(false):
      this.props.setAuth(true);
  }
  handleSignUp(values){
    console.log("SignUp:",values);//todo
    this.props.auth?
      this.props.setAuth(false):
      this.props.setAuth(true);
  }

//todo remove 'test' route
  render() {
    console.log("App render props=",this.props)
    if(!this.props.polls){this.props.getAllPolls_Async(); return null;}//todo

    return (
      <BrowserRouter>
        <div className='app-container'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/browse' render={()=><PollList polls={this.props.polls} />} />
            <Route  path='/login'
              render={()=><Login onSubmit={this.handleLogin} isAuthenticated={this.props.auth} />} />
            <Route  path='/signup'
              render={()=><SignUp onSubmit={this.handleSignUp} isAuthenticated={this.props.auth}/>} />
            <Route  path='/editpoll/:id' component={EditPoll} />
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
        auth:user.auth,
        polls
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAuth,getAllPolls_Async}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
