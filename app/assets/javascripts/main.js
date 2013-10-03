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

var postPoints = {
    "fuzhou":{"ll":	"26.0761° N, 119.3064° E","country":"China","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"audio/irene.mp3\" type=\"audio/mpeg\"></audio>","name":"Irene","video":"video_holder","comment":"Revenge!!!","likes":"","dislikes":""},
    "zhang jiakou":{"ll": "40.7667° N, 114.8833° E" ,"country":"China","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"ran.mp3\" type=\"audio/mpeg\"></audio>","name":"Ran","video":"video_holder","comment":"Interesting","likes":"","dislikes":""},
    "Moscow":{"ll": "55.7500° N, 37.6167° E","country":"Russia","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"audio/dmitry.mp3\" type=\"audio/mpeg\"></audio>","name":"Dmitry","video":"video_holder","comment":"I don't like it","likes":"","dislikes":""},
    "honduras":{"ll":"14.1000° N, 87.2167° W","country":"","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"audio/danny.mp3\" type=\"audio/mpeg\"></audio>","name":"Danny","video":"video_holder","comment":"Reminds me of another author","likes":"","dislikes":""} ,
    "Myanmar":{"ll":"22.0000° N, 96.0000° E","country":"","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"audio/aung.mp3\" type=\"audio/mpeg\"></audio>","name":"Anh","video":"video_holder","comment":"Reflection","likes":"","dislikes":""},
    "India"	:{"ll":"21.0000° N, 78.0000° E","country":"","audio":"\<audio controls autoplay style=\"display:none\"><source src=\"audio/ashwin.mp3\" type=\"audio/mpeg\"></audio>","name":"Ashwin","video":"video_holder","comment":"Merchants in modern society","likes":"","dislikes":""}
};

$(document).ready(function()
{
    $(document).mousemove(function(event){
        $(".mousePose").text(event.offsetX + ", " + event.offsetY);
    });

    $('.inputCoordBtn').click(function(){
        var inputCoord = $('.inputCoord').val();
        var attr = paper.parseLatLon(inputCoord);
        console.log(attr);
        }
    );

    function lon2x(lon)
    {
        var xfactor = 2.6938;
        var xoffset = 465.4;
        var x = (lon * xfactor) + xoffset;
        return x;
    }
    function lat2y(lat)
    {
        var yfactor = -2.6938;
        var yoffset = 227.066;
        var y = (lat * yfactor) + yoffset;
        return y;
    }



//			var paper = Raphael('mapHolder');

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

    var map = getPaths(paper, { fill: "#333", stroke: "#000", "stroke-width": .5, "stroke-linejoin": "round" });
    var galleriaThemeLoaded = false;
    var blackShim;


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


    for (var point in postPoints) {
        (function(point,pointName){
            var attr = paper.parseLatLon(point["ll"]);
            attr.r = 0;
            var dot = paper.circle().attr({href: pointName, fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});
            dot.stop().attr(attr).animate({r: 5}, 1000, "elastic");
            dot[0].onmouseover = function()
            {
                dot.animate({fill: "r#00BFFF:50-#F57124:100", stroke: dot.color}, 300);
                paper.safari();
            };
            dot[0].onmouseout = function()
            {
                dot.animate({fill: "r#FE7727:50-#F57124:100", stroke: "#fff"}, 300);
                paper.safari();
            };
        })(postPoints[point],point);
    };

    $("circle").each(function () {

        //.html() won't work.
       var pointPin = $(this).children('title').text();

       var title_placeHolder = postPoints[pointPin]["name"],
           content_placeHolder = postPoints[pointPin]["comment"] + postPoints[pointPin]["audio"];
        title_placeHolder = title_placeHolder +  '\<a class=\'close\'>×</a>' ;
       $(this).popover({html:true, trigger:'manual', placement:'right', title:title_placeHolder, content:content_placeHolder});
    });
    console.log("befreo");

    $('circle').click(function (e) {
       $(this).popover('show');
       var pointPin = $(this).children('title').text();
       var title_placeHolder = postPoints[pointPin]["name"],
           content_placeHolder = postPoints[pointPin]["comment"];
        e.stopPropagation();
    });

    $(document).on("click",".close",function (e) {
            $(this).parent().parent().parent().remove();
    });

    var finishedPaper = paper.setFinish();



//    dot.click(clicked);
    function clicked(){
        console.log("dfd");
    }
    var hollowDot = paper.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});
    //paper.circle().attr({fill: "none", stroke: "#f00", r: 5}).attr({cx:10, cy:10});

//    console.log("dfd");
});