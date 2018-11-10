/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}
function get_distance_from_latlon(lat1,lon1,lat2,lon2){
  var R = 6371e3; // metres
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
}

// setting up the score table to match all the participant
var scoreTable = [...Array(data.length)].map(e => Array(data.length));
  var matchPair = [];

  var indexTable = [];
  for (var i = 0; i < data.length; i++) {
    var person = new Person(data[i].ID,data[i].Name,data[i].Gender,data[i].Age,data[i].Ethnicity, data[i].Keywords, data[i].Location);
    indexTable.push(person);
  }

  // initialize the table values
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length; j++) {
      if (indexTable[i].getName() !== indexTable[j].getName()) {
        scoreTable[i][j] = indexTable[i].calculateScore(indexTable[j]);
      }
      else {
        scoreTable[i][j] = -100;
      }
    }
  }

  var max;
  while (max !== -100 || max === undefined) {
    max = -100;
    var index1;
    var index2;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (scoreTable[i][j] > max) {
            index1 = i;
            index2 = j;
            max = scoreTable[i][j];
        }
      }
    }
    for (var i = 0; i < data.length; i++) {
      scoreTable[index1][i] = -100;
    }
    for (var i = 0; i < data.length; i++) {
      scoreTable[i][index2] = -100;
    }    
    matchPair[index1] = indexTable[index2];
    matchPair[index2] = indexTable[index1];
  }
