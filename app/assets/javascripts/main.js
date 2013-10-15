var visitedCountries = {
    'PE': {'c': '#5689b9', 'n':'Peru'},
    'ID': {'c': '#768e11', 'n':'Indonesia'},
    'CN': {'c': '#ac2e2a', 'n':'China'},
    'UA': {'c': '#eaaf06', 'n':'Ukraine'},
    'BY': {'c': '#768e11', 'n':'Belarus'},
    'KZ': {'c': '#9ce50a', 'n':'Kazakhstan'},
    'TR': {'c': '#e37144', 'n':'Turkey'},
    'ZA': {'c': '#3cb317', 'n':'South Africa'},
    'AR': {'c': '#57b788', 'n':'Argentina'},
    'CL': {'c': '#735331', 'n':'Chile'},
    'CU': {'c': '#e37144', 'n':'Cuba'},
    'MX': {'c': '#eaaf06', 'n':'Mexico'},
    'BR': {'c': '#eaaf06', 'n':'Brazil'},
    'RU': {'c':'#f9ff40', 'n': 'Russian Federation'},
    'US':{'c':'#9ce50a', 'n': 'United States'},
    'GB':{'c':'#768e11', 'n': 'United Kingdom'},
    'FR':{'c':'#eaaf06', 'n': 'France'},
    'IT':{'c':'#9ce50a', 'n': 'Italy'},
    'EG':{'c':'#3cb317', 'n': 'Egypt'},
    'AT':{'c':'#e37144', 'n': 'Austria'}};




function startAPost(){
    //modal activate
    $('#postForm').modal({
        keyboard: true
    });

}

$(document).ready(function()
{
    var paper = Raphael('mapHolder',1000,400);
    panZoom = paper.panzoom({ initialZoom: 0, initialPosition: { x: 0, y: 0} });
    panZoom.enable();
    paper.getXY = function (lat, lon) {
        return {
            cx: lon * 2.6938 + 465.4,
            cy: lat * -2.6938 + 227.066
        };
    };
    paper.getLatLon = function (x, y) {
        return {
            lat: (y - 227.066) / -2.6938,
            lon: (x - 465.4) / 2.6938
        };
    };
    var latlonrg = /(\d+(?:\.\d+)?)[\xb0\s]?\s*(?:(\d+(?:\.\d+)?)['\u2019\u2032\s])?\s*(?:(\d+(?:\.\d+)?)["\u201d\u2033\s])?\s*([SNEW])?/i;
    paper.parseLatLon = function (latlon) {
        var m = String(latlon).split(latlonrg),
            lat = m && +m[1] + (m[2] || 0) / 60 + (m[3] || 0) / 3600;
        if (m[4].toUpperCase() == "S") {
            lat = -lat;
        }
        var lon = m && +m[6] + (m[7] || 0) / 60 + (m[8] || 0) / 3600;
        if (m[9].toUpperCase() == "W") {
            lon = -lon;
        }
        return this.getXY(lat, lon);
    };

    var map = getPaths(paper, { fill: "#333", stroke: "#000", "stroke-width":.5, "stroke-linejoin": "round" });

    for (var countryCode in map) {

        (function (countryPath, countryCode)
        {
            if (visitedCountries[countryCode])
            {
                countryPath.attr({fill: visitedCountries[countryCode].c});
            }
            else
            {
                countryPath.attr({opacity: 0.6});
                countryPath.color = Raphael.getColor();

                countryPath[0].onmouseover = function()
                {
                    countryPath.animate({fill: countryPath.color, stroke: countryPath.color }, 300);
                    paper.safari();
                };
                countryPath[0].onmouseout = function()
                {
                    countryPath.animate({fill: "#333", stroke: "#000"}, 300);
                    paper.safari();
                };
            }
        })(map[countryCode], countryCode);
    };
//    add artificial interview records
    for(var key in arti_postPoints)
    {
        if(!arti_postPoints.hasOwnProperty(key)) {
            continue;
        }
        gon.postPoints[key] = arti_postPoints[key];
    }

    for (var location in gon.postPoints) {
        (function(postValues,postLocation){
            var attr = paper.parseLatLon(postValues["ll"]);//cx, cy
            attr.r = 0;
            var dot = paper.circle().attr({href: postLocation, fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 2});
            if (postValues["video"]!=""){
                var dot = paper.circle().attr({href: postLocation, fill: "r#28e312:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 2});
            }
            //dot.stop().attr(attr).animate({r: 5}, 1000, "elastic");
            dot.attr(attr).animate({r: 5}, 1000, "elastic");
            dot[0].onmouseover = function()
            {
                dot.animate({fill: "r#00BFFF:50-#F57124:100", stroke: dot.color}, 300);
                paper.safari();
            };
//            comment the onmouseout, so that user will know which one he has clicked
//            dot[0].onmouseout = function()
//            {
//                dot.animate({fill: "r#FE7727:50-#F57124:100", stroke: "#fff"}, 300);
//                paper.safari();
//            };
        })(gon.postPoints[location],location);
    };



    $("circle").each(function () {

        //.html() won't work.
       var pointPin = $(this).children('title').text();

       var title_placeHolder = gon.postPoints[pointPin]["name"],
           content_placeHolder = gon.postPoints[pointPin]["comment"] + gon.postPoints[pointPin]["audio"] + gon.postPoints[pointPin]["video"];
        title_placeHolder = title_placeHolder +  '\<a class=\'close\'>×</a>' ;
       $(this).popover({html:true, trigger:'manual', placement:'left', title:title_placeHolder, content:content_placeHolder});
    });

    $('circle').click(function (e) {
       $(this).popover('show');
       var pointPin = $(this).children('title').text();
        e.stopPropagation();
    });

    $(document).on("click",".close",function (e) {
            $(this).parent().parent().parent().remove();
    });

    var finishedPaper = paper.setFinish();


    var hollowDot = paper.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});
    //paper.circle().attr({fill: "none", stroke: "#f00", r: 5}).attr({cx:10, cy:10});

});