


function customMarker(AssetName){
	var markerLoc;
	var fileLoc = "images/custom-marker/";

	switch (AssetName) {
	    case "Transformer":
	        return fileLoc + "transformer.png";
	        break;
	    case "EHV lines & Tower":
	        return fileLoc + "high_voltage.png";
	        break;
	    case "Distr. underground lines":
	        return fileLoc + "distribution.png";
	        break;
	    case "Electric grid Operation":
	        return fileLoc + "electric_grid_operation.png";
	        break;
	    case "Base Station Building":
	        return fileLoc + "base_station_building.png";
	        break;
	    case "Step Up/down SubStation":
	        return fileLoc + "step_up_and_down_substation.png";
	        break;
	    case "Antennae":
	        return fileLoc + "antennae.png";
	        break;
	    case "Cable landing Station":
	        return fileLoc + "cable_landing_station.png";
	        break;
	    case "Fossil Fuel Plant":
	        return fileLoc + "fossil_fuel_plant.png";
	        break;
	    case "Wired Copper Cable":
	        return fileLoc + "wired_copper_cable.png";
	        break;
	    default:
	        return fileLoc + "flame.png";
	        break;
	}


}

// <option>Transformer</option>
// <option>EHV lines &amp; Tower</option>
// <option>Distribution underground lines</option>
// <option>Elect. grid Operation </option>
// <option>Antennae</option>
// <option>Base Station Building</option>
// <option>Step Up/down SubStation</option>
// <option>Cable landing Station</option>
// <option>Fossil Fuel Plant</option>
// <option>Wired Copper Cable</option>