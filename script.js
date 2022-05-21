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


// declaration of variables

var sch_weight, wur_weight

// add data

document.addEventListener('DOMContentLoaded', () => {

    // load weight files 
    Promise.all([d3.csv('Data/schwartau/weight_schwartau.csv'),
                d3.csv('Data/wurzburg/weight_wurzburg.csv')])
                    .then(function(values){

                        sch_weight = values[0];
                        wur_weight = values[1];

                    })
})


// check if the checkboxes are active or not

function checkfunction(){

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

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
},


function(data){
    // from https://d3-graph-gallery.com/graph/line_basic.html
    // append the svg object to the weight section

    var svg = d3.select(".weight")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // add X axis

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
            
    
})