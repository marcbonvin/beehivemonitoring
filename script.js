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