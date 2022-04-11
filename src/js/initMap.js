// https://sites.google.com/site/gmapsdevelopment/
const helpProviderIcon = 'https://maps.google.com/mapfiles/ms/micons/green-dot.png';
const helpReceiverIcon = 'https://maps.google.com/mapfiles/ms/micons/red-dot.png';

const convertToGoogleMapCoords = (coords) => ({
    lng: coords.lon,
    lat: coords.lat,
});

const createMarker = (map, coords, content) => {
    const marker = new google.maps.Marker({
        position: convertToGoogleMapCoords(coords),
        map: map,
        icon: {
            url: content.iconUrl,
        },
    });

    if (content.description) {
        const infoWindow = new google.maps.InfoWindow({
            content: `<div class="mc-map-info">${content.description}</div>`,
        });
        marker.addListener("click", () => {
            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }

    return marker;
};

window.initMap = (mapConfig) => {
    const mapInitSettings = {};
    const isAutomaticZoomOut = !mapConfig.centerMapOn;

    if (!isAutomaticZoomOut) {
        mapInitSettings.zoom = 4.5;
        mapInitSettings.center = convertToGoogleMapCoords(mapConfig.centerMapOn);
    }
    const map = new google.maps.Map(document.getElementById("map"), mapInitSettings);

    const latlng = [];
    mapConfig.countriesThatHelped.forEach(({ fields }) => {
        createMarker(map, fields.coords, {
            iconUrl: helpProviderIcon,
            description: fields.description,
        });
        latlng.push(new google.maps.LatLng(fields.coords.lat, fields.coords.lon));
    });
    mapConfig.citiesThatGotHelp.forEach(({ fields }) => {
        createMarker(map, fields.coords, {
            iconUrl: helpReceiverIcon,
            description: fields.description,
        });
        latlng.push(new google.maps.LatLng(fields.coords.lat, fields.coords.lon));
    });

    if (isAutomaticZoomOut) {
        // auto zoom basing on fitting all markers
        const latlngbounds = new google.maps.LatLngBounds();
        latlng.forEach(latlng => latlngbounds.extend(latlng));
        map.fitBounds(latlngbounds);
    }
};
