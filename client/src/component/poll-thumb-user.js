import React from 'react';
import BarGraph from '../container/graph-bar';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deletePoll} from '../actions';


class PollThumbUser extends React.Component {
  handleDeletePoll(id){
      this.props.deletePoll(id)
  }

    render(){
      const {id,title,author} = this.props.poll;
      return (
        <div className="thumb-container panel panel-default col-sm-4 col-md-3" >
          <div>
            <Link to={`/editpoll/${id}`}   className="btn btn-default">Edit</Link>
            <button
              onClick={()=>this.handleDeletePoll(id)}
              className="btn btn-default">Delete</button>
          </div>
          <BarGraph width={150} height={150} id={id} poll={this.props.poll}/>
          <div className="panel-heading">
            <h2 className="panel-title">{title}</h2>
            <span>by {author}</span>
          </div>
        </div>
      )
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({deletePoll}, dispatch);
}

export default connect(null,mapDispatchToProps)(PollThumbUser);
