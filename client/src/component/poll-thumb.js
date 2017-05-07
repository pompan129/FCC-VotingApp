import React from 'react';
import './poll-thumb.css';
import {BarChart} from '../utility/graph-generator'


class PollThumb extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
        const {poll} = this.props;
        const elem = document.getElementById("p-"+poll.id);
        this.chart = new BarChart({elem,data:poll.data,width:150,height:150});
        this.chart.create();
  }

  render(){
    const {id,author,title} = this.props.poll;
    return (
      <div className="thumb-container panel panel-default col-sm-4 col-md-3" >
        <div className="panel-heading">
          <h2 className="panel-title">{title}</h2>
          <span>by {author}</span>
        </div>
        <div className="graph panel-body" id={"p-"+id} ></div>
      </div>
    )
  }

}

export default PollThumb;
