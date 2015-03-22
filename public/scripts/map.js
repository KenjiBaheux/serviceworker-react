L.mapbox.accessToken = 'pk.eyJ1IjoibGV3aXNjb3dwZXIiLCJhIjoiaGl1T2hNdyJ9.laORI6ZYpiizWtPfceRMfQ';
var loader = document.getElementById('loading');

startLoading();

var map = L.mapbox.map('map', 'lewiscowper.lgjh3npk').setView([51.5182, -0.1368], 13);

var stationData = L.mapbox.featureLayer().loadURL('data/stations.json')
  .setFilter(function() {
    // This should be where I do my check to display stations
    return true;
  })
  .addTo(map)
  .on('ready', finishedLoading);

function startLoading() {
    loader.className = '';
}

function finishedLoading() {
    // first, toggle the class 'done', which makes the loading screen
    // fade out
    loader.className = 'done';
    setTimeout(function() {
        // then, after a half-second, add the class 'hide', which hides
        // it completely and ensures that the user can interact with the
        // map again.
        loader.className = 'hide';
    }, 500);
}
