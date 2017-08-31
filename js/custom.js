// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)

var SHADOW = new google.maps.MarkerImage('shadow.png', null, null, new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(37.565580, 126.976162),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var ICON_NAME = 'icon/' + store.getDetails().university + '.png'; 
    var markerOptions = {
      position: store.getLocation(),
      icon: new google.maps.MarkerImage(ICON_NAME, null, null, new google.maps.Point(14, 13)),
      shadow: SHADOW,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  var infoBubble = new InfoBubble;
  view.getInfoWindow = function(store) {
    if (!store) {
      return infoBubble;
    }

    var details = store.getDetails();

    var html = ['<div class="store"><div class="img"><img src="', details.img, '" width="150px"></div>',
      '<div class="title">', details.title,
      '</div><div class="address">', details.address, '</div></div>'].join('');

    infoBubble.setContent($(html)[0]);
    return infoBubble;
  };

  new storeLocator.Panel(panelDiv, {
    view: view
  });
});