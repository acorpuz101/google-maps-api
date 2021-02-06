const fetch = require("node-fetch");
const auth = require("./auth.json");

module.exports = class GoogleMapsApi {
  constructor() {
	  this.apiHostname = "";
	  this.endpoint = "";
	  this.method = "POST";
	  this.headers = { 'Content-Type': 'application/json'};
	  this.geocodeHostname = "https://maps.googleapis.com/maps/api/geocode/json?address=";
	  this.apiKey = auth.apiKeys.googleMaps;
  }
  
  async getGeocode(inputString) {
	  try {
		  let uri = this.geocodeHostname + inputString.trim().split(" ").join("+") + "&key=" + this.apiKey;
		  const response = await fetch(uri, {
			  method: "GET",
			  headers: this.headers
		  });
		  return await response.json();
	  } catch (e) {
		  console.log('map err', e);
		  return e;
		}
  }
  

}