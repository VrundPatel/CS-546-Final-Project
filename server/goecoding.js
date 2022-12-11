var http = require("http");
const axios = require("axios");

async function getCoords(addr) {
  console.log(addr);
  let resp;
  try {
    resp = await axios.get("https://api.radar.io/v1/geocode/forward", {
      params: { query: addr, country: "US" },
      headers: {
        Authorization: "prj_test_pk_51f749bc6ca58819ae6e7b44da48771673db75d8",
      },
    });
  } catch (e) {
    console.log(e);
  }

  //analyze the response if necessary
  //noop

  //pull the data
  if (resp.data.addresses[0]) {
    let details = {
      latitude: resp.data.addresses[0].latitude,
      longitude: resp.data.addresses[0].longitude,
      confidence: resp.data.addresses[0].confidence,
      geometry: resp.data.addresses[0].geometry,
      fullResponse: resp.data.addresses[0],
    };
    return details;
  }
}

module.exports = { getCoords };
