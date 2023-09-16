const ul = document.querySelector("ul");

const n = document.createElement("li");
n.innerText = "Invalid City Name!!! Please enter valid City Name";

$("input").keypress(function weather(e) {
  if (e.which === 13) {
    $("li").remove();

    const city = $(this).val();


    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a30a244ffbf3a9eb6da22d4e4f973fd5&units=metric&exclude=hourly,daily`
    )
      .then((data) => {
    
        return data.json();
      })
      .then((parsedData) => {
        console.log(parsedData);

        const name = document.createElement("li");
        name.innerText = `${parsedData.name}, ${parsedData.sys.country}`;
        ul.append(name);

        const temp = document.createElement("li");
        temp.innerHTML = `${parsedData.main.temp}<span>&#8451<span/>`;
        ul.append(temp);



        const description = document.createElement("li");
        description.innerText = `${parsedData.weather[0].main}`;
        ul.append(description);

        const imgLi = document.createElement("li");
        const img = document.createElement("img");
        console.log(parsedData.weather[0].id);
        if (parsedData.weather[0].id > 800 && parsedData.weather[0].id < 805) {
          if (
            parsedData.weather[0].id === 801 ||
            parsedData.weather[0].id === 802
          ) {
            img.setAttribute("src", "./Assets/IMAGES/sun with cloud.png");
            img.setAttribute("height", "200px");
          } else {
            img.setAttribute("src", "./Assets/IMAGES/cloud.png");
            img.setAttribute("height", "200px");
          }
        } else if (parsedData.weather[0].id === 800) {
          img.setAttribute("src", "./Assets/IMAGES/sun.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id > 700 &&
          parsedData.weather[0].id < 800
        ) {
          img.setAttribute("src", "./Assets/IMAGES/mist.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id >= 600 &&
          parsedData.weather[0].id < 700
        ) {
          img.setAttribute("src", "./Assets/IMAGES/snow.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id >= 300 &&
          parsedData.weather[0].id < 600
        ) {
          if (parsedData.weather[0].id === 500) {
            img.setAttribute("src", "./Assets/IMAGES/sun with rain.png");
            img.setAttribute("height", "200px");
          } else {
            img.setAttribute("src", "./Assets/IMAGES/rain.png");
            img.setAttribute("height", "200px");
          }
          img.setAttribute("src", "./Assets/IMAGES/rain.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id > 200 &&
          parsedData.weather[0].id < 300
        ) {
          img.setAttribute("src", "./Assets/IMAGES/thunderstrom.png");
          img.setAttribute("height", "200px");
        }
        imgLi.append(img);
        ul.append(imgLi);

        const temprature = document.createElement("div");
        temprature.innerHTML = `<strong>Temprature</strong> <div> <strong>${parsedData.main.temp}&#8451</strong> <p>Max-temp=${parsedData.main.temp_max} &#8451</p> <p>Min-temp=${parsedData.main.temp_min} &#8451<p/> <p>feels-like=${parsedData.main.feels_like} &#8451</p> </div>`;

        const wind = document.createElement("div");
        wind.innerHTML = `<strong>Wind</strong> <div> <strong>${parsedData.wind.speed} m/s</strong> <p>Degree=${parsedData.wind.deg} &#176</p> <p>Gust=${parsedData.wind.gust} meter/sec</p> <p>cloud=${parsedData.clouds.all} %</p> </div>`;

        const humidity = document.createElement("div");
        humidity.innerHTML = `<strong>Humidity</strong> <div> <strong>${parsedData.main.humidity} %</strong> <p>Pressure=${parsedData.main.pressure} hPa</p><p>Sunrise=${parsedData.sys.sunrise}</p> <p>Sunset=${parsedData.sys.sunset}</p> </div>`;

        const deatil = document.createElement("li");
        deatil.append(temprature);
        deatil.append(wind);
        deatil.append(humidity);

        ul.append(deatil);

     
      })
      .catch((err) => {
        ul.append(n);
        console.log("ERROR");
        console.log(err);
      });
    $(this).val("");
  }
});



const btn=document.getElementById("live");

function getLocation(){
  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(showPosition);
  }
  else
  {
   btn.innerHTML="not Found"; 
  }
}

var lat;
var lon;


function showPosition(position){
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
  .then((fatchedData)=>{
    // console.log(fatchedData);
    city=fatchedData.data.address.city;
    // console.log(fatchedData.data.address.city);
    $("li").remove();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a30a244ffbf3a9eb6da22d4e4f973fd5&units=metric&exclude=hourly,daily`
    )
      .then((data) => {
      
        return data.json();
      })
      .then((parsedData) => {
        console.log(parsedData);
        const name = document.createElement("li");
        name.innerText = `${parsedData.name}, ${parsedData.sys.country}`;
        ul.append(name);
        const temp = document.createElement("li");
        temp.innerHTML = `${parsedData.main.temp}<span>&#8451<span/>`;
        ul.append(temp);
        const description = document.createElement("li");
        description.innerText = `${parsedData.weather[0].main}`;
        ul.append(description);
        const imgLi = document.createElement("li");
        const img = document.createElement("img");
        console.log(parsedData.weather[0].id);
        if (parsedData.weather[0].id > 800 && parsedData.weather[0].id < 805) {
          if (
            parsedData.weather[0].id === 801 ||
            parsedData.weather[0].id === 802
          ) {
            img.setAttribute("src", "./Assets/IMAGES/sun with cloud.png");
            img.setAttribute("height", "200px");
          } else {
            img.setAttribute("src", "./Assets/IMAGES/cloud.png");
            img.setAttribute("height", "200px");
          }
        } else if (parsedData.weather[0].id === 800) {
          img.setAttribute("src", "./Assets/IMAGES/sun.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id > 700 &&
          parsedData.weather[0].id < 800
        ) {
          img.setAttribute("src", "./Assets/IMAGES/mist.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id >= 600 &&
          parsedData.weather[0].id < 700
        ) {
          img.setAttribute("src", "./Assets/IMAGES/snow.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id >= 300 &&
          parsedData.weather[0].id < 600
        ) {
          if (parsedData.weather[0].id === 500) {
            img.setAttribute("src", "./Assets/IMAGES/sun with rain.png");
            img.setAttribute("height", "200px");
          } else {
            img.setAttribute("src", "./Assets/IMAGES/rain.png");
            img.setAttribute("height", "200px");
          }
          img.setAttribute("src", "./Assets/IMAGES/rain.png");
          img.setAttribute("height", "200px");
        } else if (
          parsedData.weather[0].id > 200 &&
          parsedData.weather[0].id < 300
        ) {
          img.setAttribute("src", "./Assets/IMAGES/thunderstrom.png");
          img.setAttribute("height", "200px");
        }
        imgLi.append(img);
        ul.append(imgLi);
        const temprature = document.createElement("div");
        temprature.innerHTML = `<strong>Temprature</strong> <div> <strong>${parsedData.main.temp}&#8451</strong> <p>Max-temp=${parsedData.main.temp_max} &#8451</p> <p>Min-temp=${parsedData.main.temp_min} &#8451<p/> <p>feels-like=${parsedData.main.feels_like} &#8451</p> </div>`;
        const wind = document.createElement("div");
        wind.innerHTML = `<strong>Wind</strong> <div> <strong>${parsedData.wind.speed} m/s</strong> <p>Degree=${parsedData.wind.deg} &#176</p> <p>Gust=${parsedData.wind.gust} meter/sec</p> <p>cloud=${parsedData.clouds.all} %</p> </div>`;
        const humidity = document.createElement("div");
        humidity.innerHTML = `<strong>Humidity</strong> <div> <strong>${parsedData.main.humidity} %</strong> <p>Pressure=${parsedData.main.pressure} hPa</p><p>Sunrise=${parsedData.sys.sunrise}</p> <p>Sunset=${parsedData.sys.sunset}</p> </div>`;
        const deatil = document.createElement("li");
        deatil.append(temprature);
        deatil.append(wind);
        deatil.append(humidity);
        ul.append(deatil);
      
      })
      .catch((err) => {
        ul.append(n);
        console.log("ERROR");
        console.log(err);
      });
    });
}


$("#live").click(async function(e) {
  getLocation();
  
  
});


