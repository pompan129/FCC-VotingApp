import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import MyPolls from '../component/my-polls';
import Settings from '../component/settings';


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
          {this.state.content==="polls"?<MyPolls/>:""}
          {this.state.content==="settings"?<Settings/>:""}
        </div>
      </div>
    )
  }

}


function mapStateToProps(state){
    return {
        auth: state.user.auth,
    }
}

export default connect(mapStateToProps)(Dashboard);
