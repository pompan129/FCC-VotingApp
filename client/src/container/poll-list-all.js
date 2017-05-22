import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import {getAllPolls_Async} from '../actions';
import PollThumb from '../component/poll-thumb';


class PollList extends React.Component{
  componentWillMount(){
    this.props.getAllPolls_Async();
  }

  render(){
    let {polls} = this.props;
    const List = [];

    for (let key in polls) {
      List.push(
        <Link to={`/poll/${polls[key].id}`}   key={polls[key].id} >
          <PollThumb poll={polls[key]} id={"p-"+polls[key].id}></PollThumb>
        </Link>
      )
    }

    return (
      <div className="container">
        <div className="row">{List}</div>
      </div>
    )
  }

}

/*function mapStateToProps(state){
    return {
        polls:state.polls.polls
    }
}*/

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAllPolls_Async}, dispatch);
}


export default connect(null,mapDispatchToProps)(PollList);
