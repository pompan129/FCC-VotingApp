import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {editVotes,getPoll} from '../actions';
import BarGraph from './graph-bar';
import './poll.css';

class Poll extends React.Component {

  constructor(props){
    super(props);
    this.state = {selectedOption:""}//todo
    this.onRadioClick = this.onRadioClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getPoll(id);
  }

  onFormSubmit(event){
    event.preventDefault();
    let voted = localStorage.getItem("voted");
    if(voted){
      voted = JSON.parse(voted);
      if(voted[this.props.poll.id]){
        this.setState({message:"You have already voted. You can Only Vote Once."});
        return;
      }
    }else{ voted = {};}
    voted[this.props.poll.id] = true;
    localStorage.setItem("voted",JSON.stringify(voted));
    this.props.editVotes(this.props.poll, this.state.selectedOption)
  }

  onRadioClick(event){
  //  event.preventDefault();
    this.setState({selectedOption:event.currentTarget.value})
  }

  render(){
    if(!this.props.poll){return null;}
    const {poll} = this.props;
    const {author,options,title,id} = poll;  //onClick={this.onRadioClick} todo
    const pollChoices = options.map((choice)=>{
        return <div className="form-check" key={choice.name}>
                   <label className="form-check-label">
                      <input className="form-check-input"
                        type="radio"
                        checked={(this.state.selectedOption === choice.name)}
                        id={"radio-"+choice.name}
                        value={choice.name}
                        onChange={this.onRadioClick}
                        />
                      {"   " + choice.name + "   "}
                   </label>
                   <span className="badge">{choice.votes}</span>
                 </div>
        })

    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form onSubmit={this.onFormSubmit}>
              <fieldset  className="form-group-row">
                <legend className="col-form-legend col-sm-6">{title}</legend>
                <span>by {author}</span>
                <div className="col-sm-10">
                  {pollChoices}
                </div>
              </fieldset>
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                  <button type="submit" className="btn btn-primary">Vote</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-6">
            <BarGraph  id={"p-"+ id} width={300} height={300} poll={poll}/>
          </div>
        </div>
        <div className="msg">
          {this.state.message?<h2>{this.state.message}</h2>:""}
        </div>
      </div>
    )
  }
}


function mapStateToProps({polls},ownProps){
    return {
        poll: polls[ownProps.match.params.id]
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editVotes,getPoll}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Poll);


//resources    todo
