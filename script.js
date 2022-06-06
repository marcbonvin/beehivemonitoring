// declaration of variables
var sch_hum, sch_temp, sch_weight, wur_hum, wur_temp, wur_weight

min_date = new Date('2017-01-01 13:00:00')
max_date = new Date('2017-12-31 13:00:00')

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
    checkfunc2()
    drawLineChart2()
    checkfunc3()

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

}

function checkfunc2(){

    //check for Schwartau checkbox
    if (document.getElementById('Schwartau').checked == true){
        d3.select('.sch_hum').attr('opacity' , 1)
        d3.select('.sch_temp').attr('opacity' , 1)
    }
    else{  d3.select('.sch_hum').attr('opacity' , 0)
            d3.select('.sch_temp').attr('opacity' , 0)}

    //check for Wurzburg checkbox
    if (document.getElementById('Wurzburg').checked == true){
        d3.select('.wur_hum').attr('opacity' , 1)
        d3.select('.wur_temp').attr('opacity' , 1)
    }
    else{  d3.select('.wur_hum').attr('opacity' , 0)
            d3.select('.wur_temp').attr('opacity' , 0)}

}

function checkfunc3(){

    //check temperature checkbox
    if (document.getElementById('temperature').checked == true){
        d3.select('.sch_temp').attr('opacity' , 1)
        d3.select('.wur_temp').attr('opacity', 1)
    }
    else{d3.select('.sch_temp').attr('opacity' , 0)
        d3.select('.wur_temp').attr('opacity', 0)}

    //check humidity checkbox
    if (document.getElementById('humidity').checked == true){
        d3.select('.wur_hum').attr('opacity' , 1)
        d3.select('.sch_hum').attr('opacity' , 1)
    }
    else{d3.select('.wur_hum').attr('opacity' , 0)
        d3.select('.sch_hum').attr('opacity' , 0)}

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

function drawLineChart2()
{
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);

// define the 1st line
    var valueline = d3.line()
        .x(function(d) { return x(new Date(d.timestamp)); })
        .y(function(d) { return y0(d.temperature); })
        .curve(d3.curveMonotoneX);

    // define the 2nd line
    var valueline2 = d3.line()
    .x(function(d) { return x(new Date(d.timestamp)); })
    .y(function(d) { return y1(d.humidity); }).curve(d3.curveMonotoneX);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(".temp_hum").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
          
    // Scale the range of the data
    x.domain([min_date , max_date]);
    max_hum =  Math.max(d3.max(wur_hum, function(d) { return parseFloat(d.humidity); }) , d3.max(sch_hum, function(d) { return parseFloat(d.humidity); }))
    max_temp =  Math.max(d3.max(wur_temp, function(d) { return parseFloat(d.temperature); }) , d3.max(sch_temp, function(d) { return parseFloat(d.temperature); }))
    y0.domain([0, max_temp]);
    y1.domain([0, max_hum]);

    // Add the X Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add the Y0 Axis
    svg.append("g")
    .attr("class", "axisSteelBlue")
    .call(d3.axisLeft(y0));

    // Add the Y1 Axis
    svg.append("g")
    .attr("class", "axisRed")
    .attr("transform", "translate( " + width + ", 0 )")
    .call(d3.axisRight(y1));

    //append lines for wurzburg
    //temperature line
    svg.append("path")
    .datum(wur_temp)
    .attr("class", "wur_temp")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("d", valueline);

    //humidity line
    svg.append("path")
    .datum(wur_hum)
    .attr("class", "wur_hum")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", valueline2);


      //append lines for schwartau
    //temperature line
    svg.append("path")
    .datum(sch_temp)
    .attr("class", "sch_temp")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("d", valueline);

    //humidity line
    svg.append("path")
    .datum(sch_hum)
    .attr("class", "sch_hum")
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("d", valueline2);

 //append y0 axis label

 svg.append("text").attr("class" , "axisLabel")
   .attr("text-anchor", "middle")
   .attr("transform-origin", "center")       
   .attr("transform", "rotate(-90), translate("+ 0 +","+ 0 +")")
  .attr("y", -350)
  .attr("x", 650)
    .text('Temperature')

   //append y1 axis label

 svg.append("text").attr("class" , "axisLabel")
 .attr("text-anchor", "middle")
 .attr("transform-origin", "center")       
 .attr("transform", "rotate(-90), translate("+ 0 +","+ 0 +")")
 .attr("y",750)
 .attr("x",650)
 .text('Humidity')

  //Add gridlines
  function make_y_gridlines() {		
    return d3.axisLeft(y0)
    .tickSize(-lineInnerWidth - 175)
      .tickFormat("")
  }
  svg.append("g")			
  .attr("class", "grid")
  .attr("transform","translate("+ 0 +","+ 0 +")")
  .call(make_y_gridlines()
  )

  //APPEND LEGEND
  svg.append("text").attr("x", width/4 + 20).attr("y", -60).text("Temperature Wuzburg").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("circle").attr("cx",width/4).attr("cy",-60).attr("r", 6).style("fill", "green")
  
  svg.append("circle").attr("cx",width - width/4).attr("cy",-60).attr("r", 6).style("fill", "red")
  svg.append("text").attr("x", width - width/4 + 20).attr("y", -60).text("Humidity Wuzburg").style("font-size", "15px").attr("alignment-baseline","middle")
  
  svg.append("text").attr("x", width/4 + 20).attr("y", -40).text("Temperature Schwartau").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("circle").attr("cx",width/4).attr("cy",-40).attr("r", 6).style("fill", "blue")
  
  svg.append("circle").attr("cx",width - width/4).attr("cy",-40).attr("r", 6).style("fill", "yellow")
  svg.append("text").attr("x", width - width/4 + 20).attr("y", -40).text("Humidity Schwartau").style("font-size", "15px").attr("alignment-baseline","middle")

}