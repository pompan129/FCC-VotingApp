import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../component/header';
import Dashboard from './dashboard';
import PollList from './poll-list';
import Login from '../component/login';
import SignUp from '../component/signup';
import EditPoll from './poll-editor';
import Settings from '../component/settings';
import Poll from './poll';
import Home from './home'
import {setAuth,getAllPolls} from '../actions';


class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentWillMount(){
    this.props.getAllPolls();
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
    console.log("App>props=",this.props)
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
            <Route  path='/:id' component={Poll} />
            <Route  path='/error' render={function () {
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
        polls:state.polls.polls
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setAuth,getAllPolls}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
