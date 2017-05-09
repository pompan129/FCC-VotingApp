import React, { Component } from 'react';
import {BarGraph} from '../utility/graph-generator';
import PropTypes from 'prop-types';


export default class Graph extends Component{

    componentDidMount(){
        const {id,poll,width,height} = this.props
        const elem = document.getElementById("p-"+id);
        this.graph = new BarGraph({elem,data:poll.options,width,height})
        this.graph.create();
    }
    componentDidUpdate(){
        const {poll} = this.props;
        this.graph.update({data:poll.options})
    }


    render(){
        return <div id={"p-"+this.props.id}></div>
    }

}

Graph.propTypes = {
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    poll: PropTypes.object
};
