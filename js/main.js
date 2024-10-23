function loadMap() {
	require([
		"esri/Map",
		"esri/views/MapView",
		"esri/layers/FeatureLayer",
		"esri/Graphic",
		"esri/widgets/Zoom"
	], function(Map, MapView, FeatureLayer, Graphic, Zoom) {

		// Create the map and view
		var map = new Map({
			basemap: "dark-gray"
		});

		var view = new MapView({
			container: "viewDiv",
			map: map,
			zoom: 9,
			center: [-83.372261, 42.373177] 
		});

		view.ui.remove("zoom");

		var zoomWidget = new Zoom({
			view: view
		});

		view.ui.add(zoomWidget, {
			position: "bottom-left"
		});
		
		// Create park renderer for styling
		var parkRenderer = {
			"type": "simple",
			"symbol": {
				"type": "simple-fill",
				"color": "RGB(138, 240, 151)",
				"style": "solid"	
			}
		}
		// Add a feature layer
		var parkLayer = new FeatureLayer({
			url: "https://services.arcgis.com/W8lmhbiyq5nrZIV6/arcgis/rest/services/Huron_Clinton_Metroparks/FeatureServer", 
			renderer: parkRenderer
		});
		map.add(parkLayer);

		 // Query the features from the FeatureLayer and populate the sidebar
		function queryFeaturesAndPopulateSidebar() {
			parkLayer.queryFeatures({
				where: "1=1",  
				outFields: "name",  
				returnGeometry: true  
			}).then(function(response) {
				var features = response.features;
				console.log(response)
				populateSidebar(features);
			}).catch(function(error) {
				console.error("Query failed: ", error);
			});
		}
		
		function populateSidebar(features) {
			var locationList = document.getElementById("locationList");
			locationList.innerHTML = "";  // Clear previous content

			features.forEach(function(feature) {
				var locationItem = document.createElement("div");
				locationItem.classList.add("location-item");
				locationItem.innerHTML = feature.attributes.name;  // Display the feature's name

				// Add click event to zoom into the feature
				locationItem.addEventListener("click", function() {
					view.goTo({
						target: feature.geometry,
						zoom: 12.5
					});
				});

				locationList.appendChild(locationItem);
			});
		}

		// Populate the sidebar with locations
		queryFeaturesAndPopulateSidebar() 
	});
};

document.addEventListener('DOMContentLoaded', loadMap)