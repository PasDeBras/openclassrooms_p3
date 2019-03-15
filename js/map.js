// ----------------------------------------------------------------------------------------
// ---------------------------------- Map & Markers ---------------------------------------
// ----------------------------------------------------------------------------------------
function initMap () { 
    
    // Google Map
    let myLatLng = {lat: 45.75, lng: 4.85}; 
    let map = new google.maps.Map(
        document.getElementById('section_map_map'), 
        { 
            zoom: 13, 
            center: { 
                lat: 45.75, 
                lng: 4.88 
            } 
        }
    );
    
    // Stations request
    let stations;
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=" + apiKeyJCD, true);
    req.addEventListener("readystatechange", function() {
        if (this.status === 200 && this.readyState == 4) {
            stations = JSON.parse(req.responseText); 
            stationMaker(stations);
        }
    })
    req.send(null);
    
    // Map marker array
    let markers = [];
    
    // Markers creation from stations request
    function stationMaker(stations) {
        stations.forEach(function(station){
            let marker = new google.maps.Marker({
                position: station.position,
                map: map,
                title: station.name,
                status: station.status,
                address: station.address,
                available_bikes: station.available_bikes,
                total_bikes: station.bike_stands,
                icon: markerColor(station.available_bikes),
            });
            // Click on marker brings overlay
            marker.addListener("click", function(){
                initOverlay(marker);
                overlayToggle(); // Overlay ON
            });
            markers.push(marker);
        });
        // Marker Cluster
        let markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
};

// JC Decaux API
let apiKeyJCD = '2ed0dff9c37c1bc4632b54a40ea8761be49f7e4f';

overlayToggle(); // Overlay OFF

// ----------------------------------------------------------------------------------------
// ---------------------------------- Map Overlay -----------------------------------------
// ----------------------------------------------------------------------------------------
function initOverlay (marker) {
    let sectionMapOverlayElt = document.getElementById("section_map_overlay");

    let logoElt = document.createElement("img");
    logoElt.id = "section_map_overlay_logo";
    logoElt.src = "media/header/velovlogo.png";

    let titleElt = document.createElement("h2");
    titleElt.id = "section_map_overlay_title";
    titleElt.textContent = "Station sélectionnée : " + marker.title;

    let addressElt = document.createElement("p");
    addressElt.id = "section_map_overlay_address";
    addressElt.textContent = marker.address;

    let bikesElt = document.createElement("p");
    bikesElt.id = "section_map_overlay_available_bikes";
    bikesElt.textContent = "Nombre de vélos libres : " + marker.available_bikes + "/" + marker.total_bikes;

    let buttonElt = document.createElement("button");
    buttonElt.id = "section_map_overlay_reservation_button";
    buttonElt.textContent = "RESERVER";
    
    // Reservation button color coding
    if (marker.available_bikes > 0) {
        buttonElt.style.backgroundColor = "green";
    } else {
        buttonElt.style.backgroundColor = "red";
    }

    // Button authorize reservation if possible
    buttonElt.addEventListener("click", function(){
        if (marker.available_bikes < 1) {
            alert("Cette station n'a plus de vélos disponibles (" + marker.available_bikes + "/" + marker.total_bikes + ")");
        } else {
            console.log("Reservation demandée");
            document.getElementById("section_reservation").innerHTML = "";
            canvas = new Canvas("section_reservation");
            let form = new Form("section_reservation");
        }
    });
    
    sectionMapOverlayElt.innerHTML = "";
    sectionMapOverlayElt.appendChild(logoElt);
    sectionMapOverlayElt.appendChild(titleElt);
    sectionMapOverlayElt.appendChild(addressElt);
    sectionMapOverlayElt.appendChild(bikesElt);
    sectionMapOverlayElt.appendChild(buttonElt);
};

// ----------------------------------------------------------------------------------------
// --------------------- Marker availability color coding ---------------------------------
// ----------------------------------------------------------------------------------------
function markerColor (bikeleft) {
    if (bikeleft > 0) {
        return "media/map/green-dot.png";
    } else {
        return "media/map/red-dot.png"
    }
}

// ----------------------------------------------------------------------------------------
// ------------------------------- Map Overlay toggler ------------------------------------
// ----------------------------------------------------------------------------------------
function overlayToggle () {
    let overlayPanelElt = document.getElementById("section_map_overlay");
    if (overlayPanelElt.classList.contains('display_none')) {
        overlayPanelElt.classList.remove('display_none');
      } else {
        overlayPanelElt.classList.add('display_none');
        document.getElementById("section_reservation").innerHTML = ""; // Ensure canvas suppression if user changes station on reservation stage
      }
};

