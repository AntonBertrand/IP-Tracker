const baseURL = "https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM&ipAddress=8.8.8.8";
const userIpAddress = document.getElementById("ipAddress");
const userLocation = document.getElementById("location");
const userTimeZone = document.getElementById("timeZone");
const userIsp = document.getElementById("isp");
const submitBtn = document.querySelector(".submit");
let latLon;
let map;

getDetails();



function initMap() {

  let lat = Number(latLon[1]);
  let lon = Number(latLon[0]);

  const myLatLng = { lat: lat, lng: lon};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    disableDefaultUI: true,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

submitBtn.addEventListener("click", getDetails);

async function getDetails() {

    let input = document.querySelector(".input").value;

    let response;

    if (input.length > 3) {
        response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM&ipAddress=${input}`);

    } else {
       response = await fetch("https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM");
    }

   let data = await response.json();

    userIpAddress.innerHTML = data.ip;
    userLocation.innerHTML = `${data.location.region}, ${data.location.country}`
    userTimeZone.innerHTML = data.location.timezone;
    userIsp.innerHTML = data.isp; 

    latLon = await getLatLon(data.location.region);

    var script = document.createElement('script');
    document.head.appendChild(script);
 
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    
    window.initMap = initMap;

}

async function getLatLon(location) {
  let response = await fetch(`https://geocode.maps.co/search?q=${location}`);
  let data = await response.json();
  return [data[0].lon, data[0].lat];
}

function changeMarkerPosition(marker) {
  var latlng = new google.maps.LatLng(40.748774, -73.985763);
  marker.setPosition(latlng);
}