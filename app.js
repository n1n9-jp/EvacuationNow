$(document).ready(function(){

var Eventer=function(){return this instanceof Eventer?(cache={},this.publish=function(a,b){"object"==typeof cache[a]&&cache[a].forEach(function(a){a.apply(this,b||[])})},this.subscribe=function(a,b){return cache[a]||(cache[a]=[]),cache[a].push(b),[a,b]},this.unsubscribe=function(a,b){cache[a]&&cache[a].forEach(function(c,d){c==b&&cache[a].splice(d,1)})},this.queue=function(){return cache},this.on=this.subscribe,this.off=this.unsubscribe,this.trigger=this.publish,this):new Eventer},eventer=new Eventer;


/* -----------------------------------
	initialize - viewport
----------------------------------- */
var width = 960, height = 500, aspect = width / height;

var margin = {top: 0, right: 0, bottom: 0, left: 0},
    cWidth = width - margin.left - margin.right,
    cHeight = height - margin.top - margin.bottom;

var container = d3.select("#chartArea").append("svg")
    .attr("width", width)
    .attr("height", width * aspect)
    .attr("viewBox", "0 0 "+ width +" " + height +"")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("id", "chart")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* -----------------------------------
	initialize
----------------------------------- */
// colors = colorbrewer.YlGnBu[3].map(function(rgb) { return d3.hsl(rgb); });
// var colors = colorbrewer.PuBu[3].map(function(rgb) { return d3.hsl(rgb); });
// var colors = ["#f7fcf5", "#c7e9c0", "#74c476", "#238b45", "#00441b"];
var colors = ["#f7fcf5", "#74c476", "#00441b"];
var tooltip = d3.select("body").select("#tooltip")


/* -----------------------------------
	responsive with window size
----------------------------------- */
var chart = $("#chart"),
    container = chart.parent();

$(window).on("resize", function() {

    var targetWidth = container.width();
    chart.attr("width", targetWidth);
    chart.attr("height", Math.round(targetWidth / aspect));

}).trigger("resize");



/* ---------------
data manager
--------------- */
dataManage = d3.dataManager();
dataManage();


/*----------------
hide the form if the browser doesn't do SVG
----------------*/
if (!document.createElementNS) {
  document.getElementsByTagName("form")[0].style.display = "none";
}

/*----------------
click or touch
----------------*/
var supportTouch = 'ontouchend' in document;
var EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
var EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
var EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup';


var Graph = function() {

        var proj, color;
        var layer, worldcountries, tokyoframe, markerLayer;
  			// var topology, geometries, dataById = {};
  			var dataById = {};
  			var features, frameFeatures, dataSet, prefData;
        var zoom;
        var path;
        var selectedPref = "";
        var selectedKind = "";
      	var menuKindNum = 0;
        var scale = 300000;
        //var scale = 2000000;

        //東京都国立市
        var gLat;
        var gLon;

        //アーツ千代田3331
        // var gLat = 35.704269;
        // var gLon = 139.770719;



  			var self = this;
  			this.e = new Eventer;

  			this.init = function() {

  					this.e.subscribe( 'init:location', this.getLocation );
  					this.e.subscribe( 'init', this.drawInit );
  					this.e.subscribe( 'load:data', this.loadData );
  					// this.e.subscribe( 'init:menu', this.initMenu );
  					this.e.subscribe( 'init:menu', this.initMenuData );
  					this.e.subscribe( 'draw:map', this.drawMap );

  					this.e.subscribe( 'draw:marker', this.drawUpdate );
  					this.e.subscribe( 'init:zoom', this.zoomInit );
  					this.e.subscribe( 'update:map', this.updateMap );


  					this.e.publish( 'init:location' );
  			};


        /*--------
  			get location
  			--------*/
  			this.getLocation = function() {

            // 対応している場合
            if( navigator.geolocation )
            {
            	// 現在地を取得
            	navigator.geolocation.getCurrentPosition(
                function( position )
            		{
                  console.log("_position", position);
                  var _data = position.coords ;

            			gLat = _data.latitude ;
            			gLon = _data.longitude ;
                  scale = 2000000;
            			// var alt = _data.altitude ;
            			// var accLatlng = _data.accuracy ;
            			// var accAlt = _data.altitudeAccuracy ;
            			// var heading = _data.heading ;			//0=北,90=東,180=南,270=西
            			// var speed = _data.speed ;
                  self.e.publish('init');
                },

            		// [第2引数] 取得に失敗した場合の関数
            		function( error )
            		{
                  //東京都国立市
                  gLat = 35.683885;
                  gLon = 139.44138;
                  scale = 2000000;
  					      self.e.publish('init');
                } ,
            		// [第3引数] オプション
            		{
            			"enableHighAccuracy": false,
            			"timeout": 8000,
            			"maximumAge": 2000,
            		}
              ) ;
            } else {
              //東京都国立市
              gLat = 35.683885;
              gLon = 139.44138;
              scale = 2000000;

  					  self.e.publish('init');
            }


        }



  			/*--------
  			viewport
  			--------*/

  			this.drawInit = function() {

                  console.log("gLat", gLat);
                  console.log("gLon", gLon);
  					//map = d3.select("#chart"),

				    layer = d3.select("#chart").append("g")
				      .attr("id", "layer"),

				    worldcountries = layer.append("g")
				      .attr("id", "worldcountries")
				      .selectAll("path");

						tokyoframe = layer.append("g")
				      .attr("id", "tokyoframe")
				      .selectAll("path");

            markerLayer = layer.append("g")
  				      .attr("id", "markerLayer");

  					// var proj = d3.geo.azimuthalEqualArea(),
  					proj = d3.geo.mercator()
  					      .scale(scale) //300000
                  .translate([width/2,height/2])
  					      .center([gLon, gLat]);



  					color = d3.scale.linear()
  								.range(colors)
  								.domain([0, 5]);

  					self.e.publish('load:data');
  			}





  			/*--------
  			file loading
  			--------*/
  			this.loadData = function() {

  					queue()
  					    // .defer(d3.json, "data/tokyo.topojson")
  					    .defer(d3.json, "data/tokyoDetail30.topojson")
  					    .defer(d3.json, "data/tokyo.topojson")
  					    .defer(d3.tsv, "data/data_bosai.tsv")
  					    .defer(d3.tsv, "data/prefLatLon.tsv")
  					    .await(loadReady);

  					function loadReady(_error, _topology, _frame, _data, _pref) {

  								  features = topojson.feature(_topology, _topology.objects.tokyo).features;

  									frameFeatures = topojson.feature(_frame, _frame.objects.tokyo).features;

  									_data.forEach(function(d) {
  									  // d.ALLH28 = parseFloat(d.ALLH28);
  									  d["建物倒壊危険度"] = parseInt(d["建物倒壊危険度"]);
  									  d["建物倒壊危険度"] = parseInt(d["火災危険度"]);
  									  d["建物倒壊危険度"] = parseInt(d["総合危険度"]);
  									});
  									dataSet = _data;
  									console.log("_data", _data);

                    prefData = _pref;
  									self.e.publish( 'init:menu' );

  					};
  			};










      this.initMenuData = function() {

              console.log("initMenuData");
      				/* menu */

              //selectedKind = dataManage.kindArray()[0];

      				var menuKindItems = d3.select("#kindBlock").append('form').selectAll("span")
      				    .data( dataManage.kindArray() )
      				    .enter().append("span").attr("class", "navColumn");

      				menuKindItems.append("input")
      				    .attr({
      				        type: "radio",
      				        class: "nav",
      				        name: "kind",
      				        value: function(d, i) {return i;}
      				    })
      					.attr('id', function(d, i) {
      						return "kindid" + i;
      					})
      					.attr('value', function(d, i) {
      						return dataManage.kindArray()[i];
      					})
      			    .property("checked", function(d, i) {
      				    if (i === menuKindNum) { return true; } else { return false; };
      			    })
      					.on("change", function(d,i){
      				      	menuKindNum = i;
                      // selectedPref = d[0];
      								// console.log(d);
      				      	self.e.publish('update:map');
      					});

      				menuKindItems.append("label")
      					.attr('for', function(d, i) {
      						return "kindid" + i;
      					})
      					.text(function(d,i) {
      						return dataManage.kindArray()[i];
      					});

      				self.e.publish( 'draw:map' );
      				self.e.publish( 'draw:marker' );

      		}


  this.updateMap = function() {

  						console.log("updateMap");

              worldcountriesTest
  		            .transition()
                  .duration(10)
                  .delay(5)
  		            .attr("fill", function(d){

  									// console.log(d.properties.MOJI);
  									var _i = functiontofindIndexByKeyValue(dataSet, "chome", d.properties.MOJI);

  									if (_i == undefined) {
  										_i = 0;
  										var _index = 0;
  									} else {
  										// var _index = dataSet[_i]["ALLH28"];
  										var _index = dataSet[_i][dataManage.kindArray()[menuKindNum]];
  									}

  									return color(_index);
  								})
  		            .attr("stroke", "#FFF")
  		            .attr("stroke-width", "0.4px")
  		            .attr("d", path)
                  .on(EVENTNAME_TOUCHSTART, function(d){
                        d3.select(this).style("fill", "pink");
  											return tooltip.style("visibility", "visible").text(d.properties.GST_NAME + d.properties.MOJI);
  								})
  						    .on(EVENTNAME_TOUCHMOVE, function(d){
  											return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX)+"px");
  								})
  						    .on(EVENTNAME_TOUCHEND, function(d){
                        var _i = functiontofindIndexByKeyValue(dataSet, "chome", d.properties.MOJI);

      									if (_i == undefined) { _i = 0; var _index = 0; } else {
      										var _index = dataSet[_i][dataManage.kindArray()[menuKindNum]];
      									}

                        d3.select(this).style("fill", color(_index));

  											return tooltip.style("visibility", "hidden");
  								});
  }





  this.drawMap = function() {
  		// function init() {


  		        // var features = carto.features(topology, geometries),
  		            path = d3.geo.path().projection(proj);

  						// console.log("worldcountries", worldcountries);

  		        worldcountriesTest = worldcountries.data(features)
  		          .enter()
  		          .append("path")
  		            .attr("class", "state")
  		            .attr("id", function(d) {
  		              return d.id;
  		            })
  		            .attr("fill", function(d){

  									var _i = functiontofindIndexByKeyValue(dataSet, "chome", d.properties.MOJI);

  									if (_i == undefined) { _i = 0; var _index = 0; } else {
  										var _index = dataSet[_i][dataManage.kindArray()[menuKindNum]];
  									}

  									return color(_index);
  								})
  		            .attr("stroke", "#FFF")
  		            .attr("stroke-width", "0.4px")
  		            .attr("d", path)
  		            .attr("cursor","pointer")
  								.on(EVENTNAME_TOUCHSTART, function(d){
                        d3.select(this).style("opacity", "0.0");
  											return tooltip.style("visibility", "visible").text(d.properties.GST_NAME + d.properties.MOJI);
  								})
  						    .on(EVENTNAME_TOUCHMOVE, function(d){
  											return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX)+"px");
  								})
  						    .on(EVENTNAME_TOUCHEND, function(d){
                        d3.select(this).style("stroke", "none");
                        d3.select(this).style("opacity", "1.0");
  											return tooltip.style("visibility", "hidden");
  								});







  								tokyoframeTest = tokyoframe.data(frameFeatures)
  				          .enter()
  				          .append("path")
  				            .attr("class", "state")
  				            .attr("id", function(d) {
                        // console.log("ward_ja", d.properties.ward_ja);
  				              return d.properties.ward_ja;
  				            })
  				            .attr("fill", "none")
  				            //.attr("fill", "#F09")
  				            .attr("stroke", "#00441b")
  				            .attr("opacity", "0.6")
  				            .attr("stroke-width", "0.4px")
  				            .attr("d", path);
                      // .on("click", clicked);
  				// self.e.publish( 'init:zoom' );

  		}



      // function clicked(d) {
      //   console.log("clicked", d);
      //
      //   var bounds = path.bounds(d),
      //       dx = bounds[1][0] - bounds[0][0],
      //       dy = bounds[1][1] - bounds[0][1],
      //       x = (bounds[0][0] + bounds[1][0]) / 2,
      //       y = (bounds[0][1] + bounds[1][1]) / 2,
      //       scale = 0.4 / Math.max(dx / width, dy / height),
      //       translate = [width / 2 - scale * x, height / 2 - scale * y];
      //
      //   worldcountriesTest.transition()
      //       .duration(750)
      //       .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
      //
      //   tokyoframeTest.transition()
      //       .duration(750)
      //       .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
      //
      //
      // }



      this.drawUpdate = function() {

            markerLayer.append('image')
                .attr("class", "marker")
                .attr("x", function(d) { return proj([gLon, gLat])[0]; })
                .attr("y", function(d) { return proj([gLon, gLat])[1]; })
                .attr("xlink:href", "data/marker-15.svg")
                .attr("fill", "#F09")
                .attr("width", 15)
                .attr("height", 15);

      }



  		function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

  		      for (var i = 0; i < arraytosearch.length; i++) {
  		          if (arraytosearch[i][key] == valuetosearch) {
  		              return i;
  		          }
  		      }
  		      return null;
  		}

  		this.init.apply( this, arguments );

    };

  	new Graph;

});
