import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import UserPolls from '../component/poll-list-user';
import UserSettings from '../component/user-settings';


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content:""
    }
  }


  handleSetContent(content){
    this.setState({content});
  }
  render(){
    console.log("Dashboard>props:",this.props);//todo
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <ul>
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
          {this.state.content==="polls"?<UserPolls  author={this.props.user}  polls={this.props.polls}/>:""}
          {this.state.content==="settings"?<UserSettings/>:""}
        </div>
      </div>
    )
  }

}


function mapStateToProps({user,polls}){
    return {
        user: user.current,
        polls:polls
    }
}

export default connect(mapStateToProps)(Dashboard);
