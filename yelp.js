//Done
var map;
var json;
var marker = new Array();

function initialize () {
    map = new google.maps.Map(document.getElementById('map'), {
             center: {lat: 32.75, lng: -97.13},
		zoom: 16
           });
		   
		
}


function sendRequest () {
/*	for(var i=0; i<marker.length; i++){
		marker[i].setMap(null);
		marker.length = 0;
	} */
	
    map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 32.75, lng: -97.13},
	zoom: 16
          });

	
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?term=" + document.getElementById("search").value +"&location=" + document.getElementById("area").value + "&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          json = JSON.parse(this.responseText);
          //var str = JSON.stringify(json,undefined,2);
          console.log(JSON.stringify(json,undefined,2));
		  listBusinesses(json);
		   
				 
		  map.panTo({
			  lat: json.region.center.latitude,
			  lng: json.region.center.longitude
		  })
       }
   };
   xhr.send(null);
}

function listBusinesses(data) {
	var count =1;
	document.getElementById("output").innerHTML = "<h1><u>Top Businesses</u></h1>";
	
	for(var x=0; x<data.businesses.length; x++) {
		document.getElementById("output").innerHTML += "<p> <a href=" + data.businesses[x].url + ">" + 
		"<h3>" + count + ") " + data.businesses[x].name + "</a></h3>" +  "<img src=" + data.businesses[x].image_url + ">" + "</br>Rating: "+
		data.businesses[x].rating + "</br>Address: " + data.businesses[x].location.display_address + "</p>";
		
		    marker[x] = new google.maps.Marker({
			position: {lat: data.businesses[x].coordinates.latitude, lng: data.businesses[x].coordinates.longitude},
			map: map,
			animation: google.maps.Animation.BOUNCE,
			label: {text: String(count)}	
		});
		
		count++;
	}
	
}
