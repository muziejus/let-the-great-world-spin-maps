function getAccumulatorPoints(points) {
  return {"type": "FeatureCollection", "features": getAccumulatorArray(points, "points")};
}

function getAccumulatorLine(points) {
  var pointsArray = getAccumulatorArray(points, "line");
  return {"type": "LineString", "coordinates": pointsArray.map(function (item){ return item.geometry.coordinates; })};
}

function getAccumulatorArray(points, option) {
  var step, centroid, pointsArray;
  var centroidArray = [];
  pointsArray = [points[0], points[1]]; // Because we start w/ step 3.
  for (step = 2; step < points.length; step++) {
    pointsArray.push(points[step]);
    centroid = turf.centroid({"type": "FeatureCollection", "features": pointsArray});
    if (option === "points") {
      centroid.popup = "Text: " + points[step].properties.text + "; page: " + points[step].properties.page;
    };
    centroidArray.push(centroid);
  };
  return centroidArray;
}

function getRunningPoints(points) {
  return {"type": "FeatureCollection", "features": getRunningArray(points, "points")};
}

function getRunningLine(points) {
  var pointsArray = getRunningArray(points, "line");
  return {"type": "LineString", "coordinates": pointsArray.map(function (item){ return item.geometry.coordinates; })};
}

function getRunningArray(points, option) {
  var step, centroid;
  var centroidArray = [];
  for (step = 2; step < (points.length - 2); step++) {
    runningArray = [points[step - 2], points[step -1], points[step], points[step + 1], points[step + 2]];
    centroid = turf.centroid({"type": "FeatureCollection", "features": runningArray});
    if (option === "points") {
      centroid.popup = "Text: " + points[step].properties.text + "; page: " + points[step].properties.page;
    };
    centroidArray.push(centroid);
  };
  return centroidArray;
}

function getSpecialPoints(points, specialText) {
   var returnPoints = [];
   points.features.forEach(function (item, index) {
     if (item.properties.place_properties.confidence > 0) {
       if (item.properties.special === specialText) {
         returnPoints.push(item);
       }
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

