var skuList = [
    "Mobile Native Static Maps", "Mobile Native Dynamic Maps", "Embed", "Embed Advanced", "Static Maps", "Dynamic Maps", "Static Street View", "Dynamic Street View",
    "Directions", "Directions Advanced", "Distance Matrix", "Distance Matrix Advanced", "Roads - Route Traveled", "Roads - Nearest Road", "Roads - Speed Limits",
    "Autocomplete - Per Request", "Query Autocomplete - Per Request", "Autocomplete (included with Places Details) - Per Session", "Autocomplete without Places Details - Per Session",
    "Places Details", "Basic Data", "Contact Data", "Atmosphere Data", "Find Place", "Find Place - ID only", "Find Current Place", "Places Photo", "Places - Nearby Search", "Places - Text Search",
    "Geocoding", "Geolocation", "Time Zone", "Elevation"
];

var serviceList = [
    "Directions API",
    "Distance Matrix API",
    "Geocoding API",
    "Maps and Street View API",
    "Maps Embed API",
    "Places API",
    "Places API for iOS",
    "Roads API"
];

var prices = {
    "Mobile Native Static Maps": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Mobile Native Dynamic Maps": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Embed": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Embed Advanced": {
        rate1: 14.00,
        rate2: 11.20
    },
    "Static Maps": {
        rate1: 2.00,
        rate2: 1.60
    },
    "Dynamic Maps": {
        rate1: 7.00,
        rate2: 5.60
    },
    "Static Street View": {
        rate1: 7.00,
        rate2: 5.60
    },
    "Dynamic Street View": {
        rate1: 14.00,
        rate2: 11.20
    },
    "Directions": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Directions Advanced": {
        rate1: 10.00,
        rate2: 8.00
    },
    "Distance Matrix": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Distance Matrix Advanced": {
        rate1: 10.00,
        rate2: 8.00
    },
    "Roads - Route Traveled": {
        rate1: 10.00,
        rate2: 8.00
    },
    "Roads - Nearest Road": {
        rate1: 10.00,
        rate2: 8.00
    },
    "Roads - Speed Limits": {
        rate1: 20.00,
        rate2: 16.00
    },
    "Autocomplete - Per Request": {
        rate1: 2.83,
        rate2: 2.27
    },
    "Query Autocomplete - Per Request": {
        rate1: 2.83,
        rate2: 2.27
    },
    "Autocomplete (included with Places Details) - Per Session": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Autocomplete without Places Details - Per Session": {
        rate1: 17.00,
        rate2: 13.60
    },
    "Find Place": {
        rate1: 17.00,
        rate2: 13.60
    },
    "Find Place - ID only": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Find Current Place": {
        rate1: 30.00,
        rate2: 24.60
    },
    "Places Photo": {
        rate1: 7.00,
        rate2: 5.60
    },
    "Places - Nearby Search": {
        rate1: 32.00,
        rate2: 25.60
    },
    "Places - Text Search": {
        rate1: 32.00,
        rate2: 25.60
    },
    "Basic Data": {
        rate1: 0.00,
        rate2: 0.00
    },
    "Contact Data": {
        rate1: 3.00,
        rate2: 2.40
    },
    "Atmosphere Data": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Places Details": {
        rate1: 17.00,
        rate2: 13.60
    },
    "Geocoding": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Geolocation": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Time Zone": {
        rate1: 5.00,
        rate2: 4.00
    },
    "Elevation": {
        rate1: 5.00,
        rate2: 4.00
    }
}

var runningsCosts = [];

$(document).ready(function () {

    var rawtext = "";
    var ptext = "";
    var costArr = [];
    var totalCostArr = [];

    $(".entbtn").click(function () {
        rawtext = $(".inputText").val();
        ptext = parseText(rawtext);
        console.log("parsed text array: ");
        console.log(ptext);
        costArr = genCost(ptext);
        totalCosts = genTotalCost(costArr);
        console.log(costArr);
        console.log(runningCosts);
        console.log(totalCosts);
        printToPage(totalCosts, costArr);
    });


    //////////////////////////////////////////////// functions for printing to screen ////////////////////////////////////////////////

    function printToPage(tArr, cArr) {
        let outStr = "";
        let key = "";
        let tval = 0, cval = 0;
        for(let we = 0; we < tArr.length; we++){
            key = Object.keys(tArr[we])[0];
            // tval = tArr[we][key];
            // cval = cArr[we][key];
            tval = Number.parseFloat(tArr[we][key]).toFixed(2);
            cval = Number.parseFloat(cArr[we][key]).toFixed(2);
            outStr += `<div class = \"row\">
                        <div class=\"col-4\">${key}</div>
                        <div class=\"col-4\">$${cval}</div>
                        <div class=\"col-4\">$${tval}</div>
                    </div>`
        }

        $(".output").html(outStr);
    }

    //////////////////////////////////////////////// functions for printing to screen end////////////////////////////////////////////


    //////////////////////////////////////////////// functions for parsing the text ////////////////////////////////////////////////
    function parseText(inp) {
        var arr = [], arr2 = [];
        arr = inp.split("\n");
        for (k = 0; k < arr.length; k++) {
            if (arr[k]) {
                arr2.push(parseAgain(arr[k]));
            }
        }
        return arr2;
    }

    function parseAgain(inStr) {
        inStr = inStr.replace(/\s/g, ' ');
        rArr = [];
        //get date
        var date = inStr.slice(0, 10);
        inStr = inStr.slice(11);
        inArr = inStr.split(" ");
        rArr.push(date);
        //get service
        var service = getServ(inArr);
        inArr = inArr.splice(service[1]);
        rArr.push(service[0]);
        //get sku
        var sku = getSku(inArr);
        inArr = inArr.splice(sku[1]);
        rArr.push(sku[0]);
        //get billed amount
        rArr.push(parseInt(inArr[0]));
        return rArr
    }

    function getServ(inpArr) {
        var checkStr = inpArr[0];
        var currentFound = false, prevFound = false;
        var index = 0;
        var rService = "";
        while (!(!currentFound && prevFound) && index < 100) {
            if (index > 0) {
                prevFound = currentFound;
            }
            currentFound = checkServList(checkStr);
            if (!currentFound && prevFound) {
                for (j = 0; j < index; j++) {
                    rService += inpArr[j];
                    if (j < index - 1) {
                        rService += " ";
                    }
                }
            }
            else {
                index += 1;
                checkStr = checkStr + " " + inpArr[index];
            }
            // console.log("index: " + index);
            // console.log("check string: " + checkStr);
            // console.log("currentFound: " + currentFound);
            // console.log("prevFound: " + prevFound);       
        }
        // console.log("rService: " + rService);
        return [rService, index];
    }

    function checkServList(serv) {
        for (i = 0; i < serviceList.length; i++) {
            // console.log("Check: " + serv + " === " + serviceList[i]);
            // console.log(serviceList[i] === serv);
            if (serviceList[i] === serv) {
                return true;
            }
        }
        return false;
    }

    function getSku(inpArr) {
        var index = 0;
        var found = false;
        var rSku = inpArr[index];

        while (!found && index < 20) {
            if (numCheck(inpArr[index])) {
                found = true;
            }
            else if (index > 0) {
                rSku += " " + inpArr[index];
                index += 1;
            }
            else {
                index += 1;
            }
        }
        return [rSku, index];
    }

    function numCheck(n) {
        nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (o = 0; o < nums.length; o++) {
            if (n.includes(nums[o])) {
                return true;
            }
        }
        return false;
    }
    //////////////////////////////////////////////// functions for parsing the text end////////////////////////////////////////////


    //////////////////////////////////////////////// functions for calculating cost ////////////////////////////////////////////////

    function genCost(parsedArr) {

        // assuming parsedArr is coming in 'newest => oldest', reverse to be 'oldest => newest'
        parsedArr.reverse();
        var costArr = [];
        runningCosts = [];
        // cost will be stored in an array of {date: daily cost} objects
        // will also need to keep trak of running totals of API usages so as to know when the 100k usage threshold is crossed
        // compare date at current spot in parsedArr,
        //          if it matches the date of the current spot of the obj arr, calculate cost and add to daily cost for that date in the obj array
        //          if the date is different, make a new entry in obj array with new date and calculate that part of the pArr's usage and set it as the daily cost
        // note: this will require the parsedArr to be in chronological order

        for (let i = 0; i < parsedArr.length; i++) {
            // console.log("costArr: ");
            // for(let q = 0; q < costArr.length; q++){
            //     console.log(JSON.stringify(costArr[q]));
            // }
            // console.log("runningCosts: ");
            // for(let w = 0; w < runningCosts.length; w++){
            //     console.log(JSON.stringify(runningCosts[w]));
            // }
            addDate = parsedArr[i][0];
            //pass the sku name (index 2) and then amount of usage (index 3) to calcCost function
            addCost = calcCost(parsedArr[i][2], parsedArr[i][3]);
            updateRunningCosts(parsedArr[i][2], addCost);
            if (costArr.length === 0) {
                costArr.push({ [addDate]: addCost })
            }
            else {
                var ind = costArr.length - 1;
                var cDate = Object.keys(costArr[ind]);
                //if the most recently calculated cost is on the same day as the current index of costArr, add the calulated cost to costArr
                if (checkDate(parsedArr[i][0], cDate[0])) {
                    // console.log("dates are equal");
                    //how to access the numerical cost at cDate
                    // console.log(costArr[ind][cDate[0]]);
                    costArr[ind][cDate[0]] = costArr[ind][cDate[0]] + addCost;
                }
                else {
                    // console.log("dates are not equal");
                    costArr.push({ [addDate]: addCost });
                }

            }
        }
        return costArr;
    }

    function checkDate(inDate, addCostDate) {
        // var cDate = Object.keys(addCostDate);
        // console.log("inDate: " + inDate);
        // console.log("addCostDate: ");
        // console.log(cDate[0]);
        // console.log(inDate === cDate[0]);
        return (inDate === addCostDate);
    }

    function calcCost(sku, num, runningCost) {
        // console.log("sku: " + sku + ", value: " + num);
        var c = (num / 1000) * prices[sku].rate1;
        // console.log("c: " + c);
        c = Math.floor(c * 1000) / 1000;
        return c;
    }

    function updateRunningCosts(sku, num) {
        //if the cost of a sku has already been calculated and exists in the runncingcost array
        //then simply add num to the running cost for that sku
        var alreadyIn = false;
        var skuToIncrement = "";
        var numToIncrement = 0;
        for (let za = 0; za < runningCosts.length; za++) {
            skuToIncrement = Object.keys(runningCosts[za])[0];
            // console.log("skuToIncrement: " + skuToIncrement + ", sku: " + sku);
            // console.log(skuToIncrement === sku);
            if (skuToIncrement === sku) {
                numToIncrement = za;
                alreadyIn = true;
                break;
            }
        }
        if (alreadyIn) {
            runningCosts[numToIncrement][sku] = runningCosts[numToIncrement][sku] + num;
        }
        //otherwise, the calculatd cost is the first for that sku thus make entry for that sku with the currect calculated cost (num)
        else {
            runningCosts.push({ [sku]: num })
        }
    }

    function genTotalCost(cArr) {
        var totals = [];
        var rArr = [];
        for (qw = 0; qw < cArr.length; qw++) {
            var date = Object.keys(cArr[qw])[0];
            if (qw === 0) {
                totals.push(cArr[qw][date]);
            }
            else {
                totals.push(cArr[qw][date] + totals[qw-1]);
            }
            rArr.push({[date]: totals[qw]});
        }

        return rArr;
    }
    //////////////////////////////////////////////// functions for calculating cost end////////////////////////////////////////////

});