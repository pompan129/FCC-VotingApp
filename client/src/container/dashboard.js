import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link,Redirect} from 'react-router-dom'
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
    if(this.state.content ==="browse"){return <Redirect to='/browse' />}
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <ul>
          <li>
            <button onClick={()=>this.handleSetContent("polls")}>My Polls</button>
          </li>
          <li>
            <button onClick={()=>this.handleSetContent("browse")}>Browse</button>
          </li>
          <li>
            <button onClick={()=>this.handleSetContent("settings")}>Settings</button>
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
