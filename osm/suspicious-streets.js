/*
 * Copyright 2019 Miklos Vajna. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var center = {x : 19.0045, y : 47.4744};
var zoom = 14;

// Generate KML with overpass, see <http://overpass-turbo.eu/s/gLa> for an
// example.
var tracks = [
  {description : "Sasad", url : "sasad.kml", strokeColor : "green"},
  {description : "Gazdagrét", url : "gazdagret.kml", strokeColor : "green"},
  {description : "Sashegy", url : "sashegy.kml", strokeColor : "green"},
  {description : "Németvölgy", url : "nemetvolgy.kml", strokeColor : "green"},
  {description : "Őrmező", url : "ormezo.kml", strokeColor : "green"},
  {description : "Farkasvölgy", url : "farkasvolgy.kml", strokeColor : "green"},
  {description : "Magasút", url : "magasut.kml", strokeColor : "orange"},
];

// Boilerplate below.

map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());

epsg4326 = new OpenLayers.Projection("EPSG:4326"); // WGS 1984 projection
projectTo = map.getProjectionObject(); // The map projection (Spherical
                                       // Mercator)
map.setCenter(
    new OpenLayers.LonLat(center.x, center.y).transform(epsg4326, projectTo),
    zoom);

// Add the Layer with the GPX Track
tracks.forEach(function(track) {
  var feature = new OpenLayers.Layer.Vector(track.description, {
    strategies : [ new OpenLayers.Strategy.Fixed() ],
    protocol : new OpenLayers.Protocol.HTTP(
        {url : track.url, format : new OpenLayers.Format.KML()}),
    style : {
      strokeColor : track.strokeColor,
      strokeWidth : 5,
      strokeOpacity : 0.5,
      fillColor : track.strokeColor,
      fillOpacity : 0.1,
    },
    projection : epsg4326
  });
  map.addLayer(feature);
});

// vim: shiftwidth=4 softtabstop=4 expandtab:
