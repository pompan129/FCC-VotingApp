import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PollThumb from '../component/poll-thumb';

class PollList extends React.Component{

  render(){

    let {polls} = this.props;
    polls = polls.map(poll=>
      <Link to={`/${poll.id}`}   key={poll.id}>
        <PollThumb poll={poll} id={"p-"+poll.id}></PollThumb>
      </Link>

    )

    return (
      <div className="container">
        <div className="row">{polls}</div>
      </div>
    )
  }

}

function mapStateToProps(state){
    return {
        polls:state.polls.polls
    }
}

export default connect(mapStateToProps)(PollList);
