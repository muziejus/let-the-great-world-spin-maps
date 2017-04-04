function getAccumulatorPoints(points) {
  return {"type": "FeatureCollection", "features": getAccumulatorArray(points, "points")};
}

function getAccumulatorLine(points) {
  var pointsArray = getAccumulatorArray(points, "line");
  return {"type": "LineString", "coordinates": pointsArray.map(function (item){ return item.geometry.coordinates; })};
}

function getAccumulatorArray(points, option) {
  var centroid; var pointsArray;
  var centroidArray = [];
  pointsArray = [points[0], points[1]]; // Because we start w/ step 3.
  points.forEach(function(item, index) {
    if (index > 1) {
      pointsArray.push(item);
      centroid = turf.centroid({"type": "FeatureCollection", "features": pointsArray});
      if (option === "points") {
        centroid.popup = "Text: " + item.properties.text + "; page: " + item.properties.page;
        centroid.tooltip = item.properties.text + ", p. " + item.properties.page;
      }
      centroidArray.push(centroid);
    }
  });
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
  var centroid;
  var centroidArray = [];
  points.forEach(function(item, index) {
    if (index > 1 && index < points.length - 2) {
      runningArray = [points[index - 2], points[index -1], item, points[index + 1], points[index + 2]];
      centroid = turf.centroid({"type": "FeatureCollection", "features": runningArray});
      if (option === "points") {
        centroid.popup = "Text: " + item.properties.text + "; page: " + item.properties.page;
      }
      centroidArray.push(centroid);
    }
  });
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
}

// from http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor2(color, percent) {   
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
