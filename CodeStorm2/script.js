const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, 15);
            if (!map.userMarker) {
                map.userMarker = L.marker(userLocation).addTo(map).bindPopup("You are here").openPopup();
            } else {
                map.userMarker.setLatLng(userLocation);
            }
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}