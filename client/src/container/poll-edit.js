import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {editPoll,createPoll,getPoll} from '../actions';
import idGenerator from '../utility/id-generator';

//import IDGenerator from '../utility/id-generator' //todo
import './poll-editor.css';

class EditPoll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      poll:this.props.match.params.id?props.poll:{
          author: "",
          title: "",
          options: [],
          id: ""
      },
      newOptionTxt:""
    }
    this.handleNewInputTxtChange = this.handleNewInputTxtChange.bind(this);
    this.handleAdddOption = this.handleAdddOption.bind(this);
    this.addNewOptionInput = this.addNewOptionInput.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleExistingInputTxtChange = this.handleExistingInputTxtChange.bind(this);
    this.handlePollReset = this.handlePollReset.bind(this);
    this.handleSavePoll = this.handleSavePoll.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.poll){
      this.setState({poll:nextProps.poll})
    }
  }

  handlePollReset(){
    this.setState(
      {poll:this.props.poll||{
          author: "",
          title: "",
          options: [],
          id: ""
      },
      newOptionTxt:""}
    )
  }

  handleSavePoll(poll){//todo
    if(!this.state.poll.id){
      let newPoll = JSON.parse(JSON.stringify(this.state.poll));
      newPoll.id = idGenerator(this.props.user);
      newPoll.author = this.props.user;
      this.props.createPoll(newPoll,this.props.history.push("/dashboard"));
    }else{
      this.props.editPoll(this.state.poll,this.props.history.push("/dashboard"));
    }
  }

  handleExitPoll(){
    //todo
    this.props.history.push("/dashboard");
  }

  handleNewInputTxtChange(event){
    this.setState({newOptionTxt: event.target.value});//todo
  }

  handleTitleTextChange(event){
    this.setState({
      poll: {...this.state.poll,title:event.target.value}
    })
  }

  handleExistingInputTxtChange(event){
    let options = JSON.parse(JSON.stringify(this.state.poll.options));
    const changeIndex = options.findIndex(item=>item.name===event.target.dataset.optionName);
    options[changeIndex] = {name:event.target.value,votes:options[changeIndex].votes};
    this.setState({poll: {...this.state.poll, options:options}, newOptionTxt:""})
  }

  handleDeleteOption(event){
      let options = JSON.parse(JSON.stringify(this.state.poll.options));
      options = options.filter(o=>o.name!==event.target.dataset.optionName);
      this.setState({poll: {...this.state.poll, options:options}, newOptionTxt:""})
  }

  handleAdddOption(){
    if(!this.state.newOptionTxt)return;
    let options = JSON.parse(JSON.stringify(this.state.poll.options));

    options.push({name:this.state.newOptionTxt, votes:0});
    this.setState({poll: {...this.state.poll, options:options}, newOptionTxt:""})
  }

  addNewOptionInput(){
    return(
      <div className="input-group" key="new">
          <input type="text" className="form-control"
            onChange={this.handleNewInputTxtChange}
            value={this.state.newOptionTxt}
            placeholder="option&hellip;"
            onKeyUp={(e)=>{ if (e.keyCode === 13) {
                                    this.handleAdddOption();
                                    e.target.blur();
                                }}}
            />
          <span className="input-group-btn">
            <button
                type="button"
                onClick={this.handleAdddOption}
                className="btn btn-info">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>
          </span>
      </div>
    )
  }

  render(){
    const options = this.state.poll.options.map((option,index)=>
        <div className="input-group" key={option + index + this.state.poll.id}>
            <input type="text"
              data-option-name={option.name}
              onChange={this.handleExistingInputTxtChange}
              className="form-control"
              value={option.name} />
            <span className="input-group-btn">
                <button type="button"
                  data-option-name={option.name}
                  onClick={this.handleDeleteOption}
                  className="btn btn-default btn-danger">
                  <span className="glyphicon glyphicon-remove"
                    data-option-name={option.name}
                    aria-hidden="true"></span>
                </button>
            </span>
        </div>
    )

    options.push(this.addNewOptionInput());

    return(
      <div>
        <h2>poll editor</h2>
          <div className="input-group input-group-lg">
              <input type="text"
                onKeyUp={(e)=>{ if (e.keyCode === 13) {
                                        e.target.blur()
                                    }}}
                onChange={(event)=>{this.handleTitleTextChange(event)}}
                className="form-control"
                placeholder="Title&hellip;"
                value={this.state.poll.title} />
          </div>
        {options}
        <button onClick={this.handleSavePoll}>save</button>
        <button onClick={this.handlePollReset.bind(this)}>reset</button>
        <button onClick={this.handleExitPoll.bind(this)}>Exit</button>
      </div>
    )
  }
}


function mapStateToProps({polls,user},ownProps){
    return {
        poll: polls[ownProps.match.params.id],
        user: user.current
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editPoll,createPoll,getPoll}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(EditPoll);
