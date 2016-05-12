// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {
  initMap();
	$quakesList = $.ajax({
		method: "GET",
		url: weekly_quakes_endpoint
	})
	.done(function(data){
//variable to store earthquakes' data
		var earthquakes = data.features;
		var lat = data.features[3].geometry.coordinates[1];
		var lng = data.features[3].geometry.coordinates[0];

		//reference to source code in template
		var source = $("#quakes-template").html();
		template = Handlebars.compile(source);
		//earthquakes is used to extract data

		earthquakes.forEach(function(quakes) {
			var lat = quakes.geometry.coordinates[1];
			var lng = quakes.geometry.coordinates[0];

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, lng),
				map: map,
				title: quakes.properties.title
			});
		})
		var quakesTemplate = template({quakes: earthquakes});

		$("#info").append(quakesTemplate);
	})
	.fail(function(response){
		console.log("Error: ", response);
	});
});

function initMap() {
var pos = {lat:37.77, lng:-122.44};
map = new google.maps.Map(document.getElementById("map"), {
	center: pos,
	zoom: 2
});

var marker = new google.maps.Marker({
	position: pos,
	map: map,
	title: "San Francisco"
});

}
