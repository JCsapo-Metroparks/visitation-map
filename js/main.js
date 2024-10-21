function loadMap() {
	require([
		"esri/Map",
		"esri/views/MapView",
		"esri/layers/FeatureLayer",
		"esri/Graphic"
	], function(Map, MapView, FeatureLayer, Graphic) {

		// Create the map and view
		var map = new Map({
			basemap: "terrain"
		});

		var view = new MapView({
			container: "viewDiv",
			map: map,
			zoom: 15,
			center: [-81.6396800, 41.4175500] // Cleveland Metroparks coordinates
		});

		// Add a feature layer
		var featureLayer = new FeatureLayer({
			url: "https://services.arcgis.com/W8lmhbiyq5nrZIV6/arcgis/rest/services/Huron_Clinton_Metroparks/FeatureServer"
		});
		map.add(featureLayer);

		// List of locations for sidebar (mock data)
		var locations = [
			{ name: "Attraction A", lat: 41.419, lng: -81.639 },
			{ name: "Attraction B", lat: 41.415, lng: -81.637 },
			{ name: "Attraction C", lat: 41.420, lng: -81.640 }
		];

		// Function to add items to sidebar
		function populateSidebar(locations) {
			var locationList = document.getElementById("locationList");
			locations.forEach(function(location) {
				var locationItem = document.createElement("div");
				locationItem.classList.add("location-item");
				locationItem.innerHTML = location.name;

				// Add click event to zoom into feature
				locationItem.addEventListener("click", function() {
					view.goTo({
						center: [location.lng, location.lat],
						zoom: 17
					});
				});

				locationList.appendChild(locationItem);
			});
		}

		// Populate the sidebar with locations
		populateSidebar(locations);
	});
};

document.addEventListener('DOMContentLoaded', loadMap)