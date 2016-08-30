function getSpecialPoints(points, specialText){
   var returnPoints = [];
   points.features.forEach(function(item, index){
     if(item.properties.special === specialText){
       returnPoints.push(item);
     }
   });
  return returnPoints;
};

// Styles

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#adaada",
  color: "#666",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.5
};

var averageMarkerOptions = {
  radius: 4,
  fillColor: "#7800ff",
  color: "#666",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.5
};

