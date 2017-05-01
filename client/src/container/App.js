import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../component/header';
import Dashboard from './dashboard';
import PollList from './poll-list';
import Login from '../component/login';
import SignUp from '../component/signup';
import EditPoll from '../component/edit-poll';
import Settings from '../component/settings';
import Poll from '../component/poll';
import Home from './home'
import {setAuth} from '../actions';


class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleLogin(values){
    console.log("login:",values);//todo
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


  render() {
    console.log("authenticated?>",this.props.auth);//todo
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Header />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/browse' component={PollList} />
            <Route  path='/login'
              render={()=><Login onSubmit={this.handleLogin} isAuthenticated={this.props.auth} />} />
            <Route  path='/signup'
              render={()=><SignUp onSubmit={this.handleSignUp} isAuthenticated={this.props.auth}/>} />
            <Route  path='/editpoll' component={EditPoll} />
            <Route  path='/settings' component={Settings} />
            <Route  path='/poll' component={Poll} />
            <Route render={function () {
              return <h2>ERROR</h2>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAuth}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
