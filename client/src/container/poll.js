import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BarChart} from '../utility/graph-generator';
import {editVotes} from '../actions';

class Poll extends React.Component {

  constructor(props){
    super(props);
    const poll = this.props.polls.find(poll=>poll.id===this.props.match.params.id);
    this.state = {selectedOption:"",id:poll.id, poll:poll}//todo
    this.onRadioClick = this.onRadioClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    const {poll} = this.state;
    const elem = document.getElementById("p-"+this.state.id);
    this.chart = new BarChart({elem,data:poll.data,width:250,height:250})
    this.chart.create();
  }

  componentWillReceiveProps(nextProps){
    const poll = nextProps.polls.find(poll=>poll.id===this.props.match.params.id);
    this.setState(
      {poll: poll}//todo?
    )
    this.chart.update({data:poll.data})

  }

  onFormSubmit(event){
    event.preventDefault();
    this.props.editVotes(this.state.poll.id, this.state.selectedOption)

  }

  onRadioClick(event){
  //  event.preventDefault();
    this.setState({selectedOption:event.currentTarget.value})
  }

  render(){
    const {poll} = this.state
    const {author,data,title,id} = poll;  //onClick={this.onRadioClick} todo
    const pollChoices = data.map((choice)=>{
    return <div className="form-check" key={choice.name}>
               <label className="form-check-label">
                  <input className="form-check-input"
                    type="radio"
                    checked={(this.state.selectedOption === choice.name)}
                    id={"radio-"+choice.name}
                    value={choice.name}
                    onChange={this.onRadioClick}
                    />
                  {"   " + choice.name + "   " + choice.votes}
               </label>
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
            <div id={"p-" + id}></div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
    return {
        polls:state.polls.polls,
        state:state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editVotes}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Poll);


//resources    todo
