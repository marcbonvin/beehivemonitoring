// declaration of variables
var sch_hum, sch_temp, sch_weight, wur_hum, wur_temp, wur_weight

min_date = new Date('2017-01-01 13:00:00')
max_date = new Date('2019-01-01 13:00:00')

var margin = {top: 80, right: 100, bottom: 30, left: 90},
width = 1200 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

lineInnerWidth = width - margin.left - margin.right;
lineInnerHeight = height - margin.top - margin.bottom;

console.log("a")
document.addEventListener('DOMContentLoaded', () => {

    // Load all files before doing anything else
    Promise.all([d3.csv('Data/schwartau/humidity_schwartau.csv'),
                d3.csv('Data/schwartau/temperature_schwartau.csv'),
                d3.csv('Data/schwartau/weight_schwartau.csv'),
                d3.csv('Data/wurzburg/humidity_wurzburg.csv'),
                d3.csv('Data/wurzburg/temperature_wurzburg.csv'),
                d3.csv('Data/wurzburg/weight_wurzburg.csv')])
                 .then(function(values){
    
                    sch_hum = values[0];
                    sch_temp = values[1];
                    sch_weight = values[2];
                    wur_hum = values[3];
                    wur_temp = values[4];
                    wur_weight = values[5];

                    //data preprocessing
                    wur_temp = wur_temp.filter( a => {return a.temperature >0 })
                    wur_temp = wur_temp.filter( a => {return new Date(a.timestamp) < max_date })
                    wur_hum = wur_hum.filter( a => {return a.humidity >0 })
                    sch_hum = sch_hum.filter( a => {return a.humidity >0 })
                    wur_hum = wur_hum.filter( a => {return new Date(a.timestamp) < max_date })
                    sch_temp = sch_temp.filter( a => {return a.temperature >0 })
                    sch_temp = sch_temp.filter( a => {return new Date(a.timestamp) < max_date })
                    sch_hum = sch_hum.filter( a => {return new Date(a.timestamp) < max_date })
                    sch_weight = sch_weight.filter( a => {return new Date(a.timestamp) < max_date })
                    wur_weight = wur_weight.filter( a => {return new Date(a.timestamp) < max_date })
                    wur_temp = wur_temp.sort(function (a,b) {return d3.ascending(a.timestamp, b.timestamp); });

    checkfunc()
    drawLineChart()

    });

});

// check if the checkboxes are active or not

function checkfunc(){

    // check for schwartau weight checkbox
    if (document.getElementById("sch_weight").checked == true){
        d3.select('.sch_weight').attr('opacity', 1)
    }
    else{ d3.select('.sch_weight').attr('opacity', 0)}

    // check for wurzburg weight checkbox
    if (document.getElementById("wur_weight").checked == true){
        d3.select('.wur_weight').attr('opacity', 1)
    }
    else{ d3.select('.wur_weight').attr('opacity', 0)}

    // check for temperature check box
    if (document.getElementById("temperature").checked == true){
        d3.select('.sch_temp').attr('opacitiy', 1)
        d3.select('.wur_temp').attr('opacitiy', 1)
    }
    else{ d3.select('.sch_hum').attr('opacity', 0)
            d3.select('.wur_hum').attr('opacity', 0)}

}

function drawLineChart()
{
    var svg = d3.select(".weight")
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 
            'translate(' + margin.left + ',' + margin.top +')');
    
    var x = d3.scaleTime()
        .domain([min_date , max_date])
        .range([ 0, width ]);
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // add Y axis
    max_weight = Math.max(d3.max(wur_weight, function(d) { return parseFloat(d.weight); }) , d3.max(sch_weight, function(d) { return parseFloat(d.weight); }))
    var y = d3.scaleLinear()
    .domain([0, max_weight])
    .range([ height, 0 ]);
    svg.append('g')
    .call(d3.axisLeft(y));

    function make_y_gridlines() {		
        return d3.axisLeft(y)
        .tickSize(-lineInnerWidth - 175)
          .tickFormat("")
    }
    svg.append('g')			
    .attr('class', 'grid')
    .attr('transform','translate('+ 0 +','+ 0 +')')
    .call(make_y_gridlines()
    )

    var prev;
    // Add the line
    svg.append('path')
    .datum(sch_weight)
    .attr('class' , 'sch_weight')
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
       .x(function(d) { return x(new Date(d.timestamp)) })
       .y(function(a) { if (a.weight == 0)
        {
            // console.log(a.weight)
            return y((prev))
        }
        else{
            prev = a.weight;
            return y((a.weight)); 
        }})
        .curve(d3.curveMonotoneX)
       )

        prev = 0;
    svg.append('path')
    .datum(wur_weight)
    .attr('class' , 'wur_weight')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
       .x(function(d) { return x(new Date(d.timestamp)) })
       .y(function(a) { if (a.weight == 0)
        {
            // console.log(a.weight)
            return y((prev))
        }
        else{
            prev = a.weight;
           return y((a.weight)); 
        }})
        .curve(d3.curveMonotoneX)
       )

    //Append y-axis label
    svg.append('text').attr('class' , 'axisLabel')
            .attr('text-anchor', 'middle')
            .attr('transform-origin', 'center')       
            .attr('transform', 'rotate(-90), translate('+ 0 +','+ 0 +')')
            .attr('y', -350)
            .attr('x', 650)
            .text('Weight')

    //Append legend
    svg.append('circle').attr('cx',width/4).attr('cy',-50).attr('r', 6).style('fill', 'blue')
    svg.append('circle').attr('cx',width - width/4).attr('cy',-50).attr('r', 6).style('fill', 'red')
    svg.append('text').attr('x', width/4 + 20).attr('y', -50).text('Weight Wuzburg').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', width - width/4 + 20).attr('y', -50).text('Weight Schwartau').style('font-size', '15px').attr('alignment-baseline','middle')

}