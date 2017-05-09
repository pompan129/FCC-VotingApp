import * as d3 from "d3";

export class BarGraph{
  constructor({elem,data,width,height,tooltip}){
      this.elem = elem;
      this.data = data;
      this.width = width;
      this.height = height;
      this.tooltip = tooltip || "";
  }

  create(){
    var svg = d3.select(this.elem).append('svg')
              .classed("bar-chart", true)
              .attr('width', this.width)
              .attr('height', this.height);
    this.svg=svg;

    var chart = svg.append("g")
  			.classed("display", true)
  			.attr("transform", "translate(10,10)");//todo
    this.chart=chart;
    this.update();

  }

  update(data){

    if(data){
      this.data = data.data || this.data;
      this.height = data.height || this.height;
      this.width = data.width || this.width;
      this.tooltip = data.tooltip || this.tooltip;
    }

    this.x = d3.scaleLinear()
  		.domain([0,d3.max(this.data,item=>item.votes)])
  		.range([0,this.width - 20]);
    this.y = d3.scaleLinear()
    		.domain([0,this.data.length])
    		.range([0,this.height - 20]);
    this.plot.call(this.chart, {data:this.data,y:this.y,x:this.x})
  }

  plot(params){

      this.selectAll(".bar").remove();
      this.selectAll(".bar-label").remove();

    	this.selectAll(".bar")
    		.data(params.data)
    		.enter()
    			.append("rect")
    			.classed("bar", true)
    			.attr("x", 0)
    			.attr("y", function(d,i){
    				return params.y(i);
    			})
    			.attr("width", function(d,i){
    				return params.x(d.votes);
    			})
    			.attr("height", function(d,i){
    				return params.y(1)-1;
    			});
    	this.selectAll(".bar-label")
    		.data(params.data)
    		.enter()
    			.append("text")
    			.classed("bar-label", true)
    			.attr("x", function(d,i){
    				return params.x(d.votes);
    			})
    			.attr("dx", -3)
    			.attr("y", function(d,i){
    				return params.y(i);
    			})
    			.attr("dy", function(d,i){
    				return params.y(1)/1.5+2;
    			})
    			.text(function(d,i){
    				return d.name;
    			});
    }
}
