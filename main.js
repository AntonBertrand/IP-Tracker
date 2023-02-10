const baseURL = "https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM&ipAddress=8.8.8.8";
const userIpAddress = document.getElementById("ipAddress");
const userLocation = document.getElementById("location");
const userTimeZone = document.getElementById("timeZone");
const userIsp = document.getElementById("isp");
const submitBtn = document.querySelector(".submit");

getDetails();


var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
script.async = true;


document.head.appendChild(script);

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    disableDefaultUI: true,
    zoom: 8,
  });
}

window.initMap = initMap;

submitBtn.addEventListener("click", getDetails);

async function getDetails() {

    let input = document.querySelector(".input").value;

    let response;

    console.log("Input is " + input);

    if (input.length > 3) {
        response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM&ipAddress=${input}`);

    } else {
       response = await fetch("https://geo.ipify.org/api/v2/country?apiKey=at_4pIwPZXGXutj4zQAE9GvFA7Lk72UM");
    }

   let data = await response.json();

    console.log(data);

    

    userIpAddress.innerHTML = data.ip;
    userLocation.innerHTML = `${data.location.region}, ${data.location.country}`
    userTimeZone.innerHTML = data.location.timezone;
    userIsp.innerHTML = data.isp; 
}