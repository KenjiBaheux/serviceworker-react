L.mapbox.accessToken = 'pk.eyJ1IjoibGV3aXNjb3dwZXIiLCJhIjoiaGl1T2hNdyJ9.laORI6ZYpiizWtPfceRMfQ';

var map = L.mapbox.map('map', 'lewiscowper.lgjh3npk').setView([51.5182, -0.1368], 13);

var stationData = L.mapbox.featureLayer().loadURL('data/stations.json')
  .setFilter(function() {
    // This should be where I do my check to display stations
    return true;
  })
  .addTo(map);
