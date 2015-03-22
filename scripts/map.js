L.mapbox.accessToken = 'pk.eyJ1IjoibGV3aXNjb3dwZXIiLCJhIjoiaGl1T2hNdyJ9.laORI6ZYpiizWtPfceRMfQ';
var loader = document.getElementById('loading');

startLoading();

var map = L.mapbox.map('map', 'lewiscowper.lgjh3npk')
  .setView([51.5182, -0.1368], 13)
  .on('ready', finishedLoading);

var stationData = omnivore.kml('https://cors-anywhere.herokuapp.com/data.tfl.gov.uk/tfl/syndication/feeds/stations.kml?app_id=bd960a5c&app_key=b8b676fb485340bb1a9352b3d9b44617')
  .on('ready', function(layer) {
    this.eachLayer(function (marker) {
      if (marker.toGeoJSON().properties.styleUrl === '#dlrStyle') {
        marker.toGeoJSON().properties.image = 'https://www.tfl.gov.uk/cdn/static/cms/images/logos/dlr-partner.png';
        marker.setIcon(L.mapbox.marker.icon({
            'marker-color': '#009999'
        }));
      } else if (marker.toGeoJSON().properties.styleUrl === '#tubeStyle') {
        marker.toGeoJSON().properties.image = 'https://www.tfl.gov.uk/tfl-global/images/syndication/roundel-tube.png';
        marker.setIcon(L.mapbox.marker.icon({
            'marker-color': '#CC3333'
        }));
      } else {
        marker.setIcon(L.mapbox.marker.icon({}));
      }

      var popupContent =  '<img src="' + marker.toGeoJSON().properties.image + '" />' +
                            marker.toGeoJSON().properties.name +
                          '</a>';

      marker.bindPopup(popupContent, {
        closeButton: false,
        minWidth: 200,
        maxWidth: 300
      });
    });
  })
  .addTo(map);

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
