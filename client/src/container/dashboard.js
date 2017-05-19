import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link,Redirect} from 'react-router-dom'
import UserPolls from '../component/poll-list-user';
import UserSettings from '../component/user-settings';
import {getUserPolls} from '../actions';
import './dashboard.css';


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
    console.log("dashboard>",this.props)
    if(!this.props.authenticated || !this.props.user){
      return <Redirect to="/"/>;
    }
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="btn-group">
            <Link className="btn btn-info" to={`/poll-new`} >Create Poll</Link>
            <button  className="btn btn-info" onClick={()=>this.handleSetContent("polls")}>My Polls</button>
            <button  className="btn btn-info" onClick={()=>this.handleSetContent("settings")}>Settings</button>
        </div>
        <div>
          {this.state.content!=="polls"?"":<UserPolls  author={this.props.user} polls={this.props.polls} />}
          {this.state.content==="settings"?<UserSettings/>:""}
        </div>
      </div>
    )
  }

}


function mapStateToProps({user,polls}){
    return {
        user: user.username,
        authenticated:user.authenticated,
        polls:polls
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserPolls}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
