import React from 'react';
import './poll-thumb.css';
import {genrateBarChart_sm} from '../utility/graph-generator'


class PollThumb extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
        const elem = document.getElementById(this.props.author+this.props.title);
        genrateBarChart_sm(elem,this.props.data);
        console.log("props:",this.props.data);//todo
    }


  render(){
    const {author,title} = this.props;
    return (
      <div className="thumb-container panel panel-default col-sm-4 col-md-3" >
        <div className="panel-heading">
          <h2 className="panel-title">{title}</h2>
          <span>by {author}</span>
        </div>
        <div className="graph panel-body" id={author+title} ></div>
      </div>
    )
  }

}

export default PollThumb;
