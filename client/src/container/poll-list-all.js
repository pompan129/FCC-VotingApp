import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import {getAllPolls_Async} from '../actions';
import PollThumb from '../component/poll-thumb';


class PollList extends React.Component{

  render(){
    let {polls} = this.props;
    console.log("PollList>polls",polls)
    const List = [];

    for (let key in polls) {
      console.log("PollList>render>for in", polls[key]);//todo
      List.push(
        <Link to={`/poll/${polls[key].id}`}   key={polls[key].id} >
          <PollThumb poll={polls[key]} id={"p-"+polls[key].id}></PollThumb>
        </Link>
      )
    }

    /*polls = polls.map(poll=>
      <Link to={`/${poll.id}`}   key={poll.id}>
        <PollThumb poll={poll} id={"p-"+poll.id}></PollThumb>
      </Link>
    )*/

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
