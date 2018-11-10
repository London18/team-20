class Person {
 constructor(id, name, gender, age, ethnicity, keywords, location) {
   this.id = id;
   this.name = name;
   this.gender = gender;
   this.age = age;
   this.ethnicity = ethnicity;
   this.keywords = keywords;
   this.location = location;
 }
  
 setKeyword(newKeyword) {
   this.keywords = newKeyword;
 }
 
 setLocation(newLocation) {
   this.location = newLocation;
 }
 
 getId() {
   return this.id;
 }
  
 getName() {
   return this.name;
 }
  
 getGender() {
   return this.gender;
 }
  
 getAge() {
  return this.age;
 }
  
 getEthnicity() {
   return this.ethnicity;
 }
  
 getKeywords() {
   return this.keywords;
 }
  
 getLocation() {
   return this.location;
 }
  calculateScore(person) {
   var matchingScore = 0;
   if (person.getGender() == this.getGender()) {
    matchingScore += 2;
   }
   if (person.getEthnicity() == this.getEthnicity()) {
    matchingScore += 3.5;
   }
   matchingScore -= Math.abs(this.getAge() - person.getAge()) * 0.5;
   var otherpersonKeywords = person.getKeywords();
   var myKeywords = this.keywords;
   otherpersonKeywords.forEach(function(keyword) {
     if (myKeywords.includes(keyword)) {
       matchingScore += 7.5;
     }
   });
   var thisLocation = this.getLocation();
   var otherLocation = person.getLocation();
   matchingScore -= 0.001 * Math.log(get_distance_from_latlon(thisLocation["Lat"], thisLocation["Lon"], otherLocation["Lat"], otherLocation["Lon"]));
   return matchingScore;
 }
  findclosestmatch(data){
    var match;
    for (var i = 0; i < data.length; i++) {
      if (this.name === data[i].Name) {
        match = matchPair[i];
      }
    }
    //alert(match.getName());
    return match;
  }
  

} 