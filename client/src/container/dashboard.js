import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link,Redirect} from 'react-router-dom'
import UserPolls from '../component/poll-list-user';
import UserSettings from '../component/user-settings';
import {getUserPolls} from '../actions';


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content:""
    }
  }
  componentDidMount(){
    this.props.getUserPolls(this.props.user);
  }

  handleSetContent(content){
    this.setState({content});
  }

  render(){
    if(!this.props.authenticated || !this.props.username){return <Redirect to="/"/>; }
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <ul>
          <li>
            <Link className="btn btn-info" to={`/poll-new`} >Create Poll</Link>
          </li>
          <li>
            <button  className="btn btn-info" onClick={()=>this.handleSetContent("polls")}>My Polls</button>
          </li>
          <li>
            <Link to='/browse' className="btn btn-info">Browse</Link>
          </li>
          <li>
            <button  className="btn btn-info" onClick={()=>this.handleSetContent("settings")}>Settings</button>
          </li>
        </ul>
        <div>
          {this.state.content==="polls"?<UserPolls  author={this.props.user} polls={this.props.polls} />:""}
          {this.state.content==="settings"?<UserSettings/>:""}
        </div>
      </div>
    )
  }

}


function mapStateToProps({user,polls}){
    return {
        user: user.username,
        uthenticated: user.authenticated,
        polls:polls
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserPolls}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
