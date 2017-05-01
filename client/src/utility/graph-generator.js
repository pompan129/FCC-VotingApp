import * as d3 from "d3";
const options = {
  w:150,
  h:150,
  "chart-class":"d3-bar-chart-sm"
}
var _data = [30,8,17,21];

export const genrateBarChart_sm = (elem,data)=>{

  var x = d3.scaleLinear()
		.domain([0,d3.max(data,item=>item.votes)])
		.range([0,options.w - 20]);
  var y = d3.scaleLinear()
  		.domain([0,data.length])
  		.range([0,options.h - 20]);
  var svg = d3.select(elem).append('svg')
            .classed(options["chart-class"], true)
            .attr('width', options.w)
            .attr('height', options.h);
  var chart = svg.append("g")
			.classed("display", true)
			.attr("transform", "translate(10,10)");//todo

  function plot(params){
    	this.selectAll(".bar")
    		.data(params.data)
    		.enter()
    			.append("rect")
    			.classed("bar", true)
    			.attr("x", 0)
    			.attr("y", function(d,i){
    				return y(i);
    			})
    			.attr("width", function(d,i){
    				return x(d.votes);
    			})
    			.attr("height", function(d,i){
    				return y(1)-1;
    			});
    	this.selectAll(".bar-label")
    		.data(params.data)
    		.enter()
    			.append("text")
    			.classed("bar-label", true)
    			.attr("x", function(d,i){
    				return x(d.votes);
    			})
    			.attr("dx", -3)
    			.attr("y", function(d,i){
    				return y(i);
    			})
    			.attr("dy", function(d,i){
    				return y(1)/1.5+2;
    			})
    			.text(function(d,i){
    				return d.name;
    			});
    }
    plot.call(chart, {
    	data: data
    });


}
