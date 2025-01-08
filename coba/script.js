// Initialize the map
const map = L.map('map').setView([-6.200000, 106.816666], 11); // Jakarta coordinates

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Data for masjid locations
const masjidLocations = [
  {
    name: "Masjid Alfalah",
    address: "Sariasih",
    food: "Nasi Kotak",
    coords: [-6.875579821316866, 107.57563926467307]
  },
  {
    name: "Masjid Sunda Kelapa",
    address: "Jakarta Pusat",
    food: "Makanan Siap Saji",
    coords: [-6.1995, 106.8326]
  },
  {
    name: "Masjid Al-Azhar",
    address: "Jakarta Selatan",
    food: "Nasi Bungkus",
    coords: [-6.24263, 106.7992]
  }
];

// Add markers to the map and update the list
const masjidList = document.getElementById('masjid-list');
masjidLocations.forEach((masjid) => {
  // Add marker
  const marker = L.marker(masjid.coords).addTo(map);
  marker.bindPopup(`<b>${masjid.name}</b><br>${masjid.address}<br>Makanan: ${masjid.food}`);

  // Add to the list
  const listItem = document.createElement('li');
  listItem.innerHTML = `<b>${masjid.name}</b><br>${masjid.address}<br>Makanan: ${masjid.food}`;
  masjidList.appendChild(listItem);
});
