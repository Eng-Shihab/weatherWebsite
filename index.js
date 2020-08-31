
let defaultCity =["san francisco" , "san Antonio","London"];
let defaultData =[]; 
let searchData  =[];
document.addEventListener("DOMContentLoaded", () => {
    
    defaultCity.forEach(ele => {
    let urlcity = `https://www.metaweather.com/api/location/search/?query=${ele}`;
    fetchData (urlcity ,defaultData ,true)
  });
}
)

function fetchData (urlcity, array ,flag) {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
     fetch(proxyUrl + urlcity)
    .then((res) => res.json())
    .then((city) => {
      let urldata = `https://www.metaweather.com/api/location/${city[0].woeid}/`;
      console.log(city);
       fetch(proxyUrl + urldata)
      .then((response) => response.json())
      .then((data) => {
          if (flag) {
            array.push(data.consolidated_weather);
          }else{
            array.push(data.consolidated_weather);
          }
      });
    }).catch((error) => {
        console.log(error)
      });
  }
  
  document.getElementById("search-submit").addEventListener("click", () => {
    let city = document.getElementById("search").value;
    let urlcity = `https://www.metaweather.com/api/location/search/?query=${city}`;
    fetchData (urlcity,searchData ,false);
    let repeat = setInterval( () => {repeatShow (searchData[0] ,city,repeat )},3000);
  })

  function showData (data ,city) {
    data.map((ele,ind) => {
       if(ind===0) {
        showDataToday(ele ,city)
       }else{
        showLeftDays(ele, ind );
       }
    })
    
    
  }

  function showDataToday (data ,city) {
    let dayOne = document.querySelector(".large h3");
    dayOne.textContent =dayName(0);
    let dayOneDate = document.getElementById("weather-date");
    dayOneDate.textContent = date ();
    let cityName = document.getElementById("weather-location");
    cityName.textContent = "    ," + city;
    let dayOneTemp = document.querySelector(".mr-auto h4");
    dayOneTemp.textContent =`${Math.round(data.the_temp)} °C`;
    let dayOneWether = document.querySelector(".mr-auto p");
    dayOneWether.textContent = data.weather_state_name;
    let cloudy = document.getElementById("cloudy");
    cloudy.textContent = data.weather_state_name;
    let huidity = document.getElementById("huidity");
    huidity.textContent =`${data.humidity}%`;
    let wind = document.getElementById("wind");
    wind.textContent =`${Math.round(data.wind_speed)}km/h`;
  }

function dayName (day) {
    let d = new Date();
    let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    if((d.getDay()  + day) < weekday.length){
        return weekday[d.getDay()  + day];
    }else{
        return weekday[(d.getDay()  + day) - weekday.length]
    }
    
    
}

function date () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

function showLeftDays (data ,day) {
    let dayN = "day-" + day;
    let dayT = "tem-" + day;
    let dayNam = document.getElementById(dayN);
    dayNam.textContent = dayName(day).slice(0,3);
    let dayTemp = document.getElementById(dayT);
    dayTemp.textContent =`${Math.round(data.the_temp)}°C`;
}

function repeatShow (array = [] , city ,repeat) {
        console.log(array);
        if(array.length !== 0 ){
            showData(array, city);
            clearInterval(repeat);
        }
 }
document.getElementById("francisco").addEventListener("click", () => {
    
    let repeat = setInterval( () => {repeatShow (defaultData[0] ,defaultCity[0],repeat )},3000);
});

document.getElementById("antonio").addEventListener("click", () => {
    let repeat = setInterval( () => {repeatShow (defaultData[1] ,defaultCity[1],repeat )},3000);
});

document.getElementById("london").addEventListener("click", () => {
    let repeat = setInterval( () => {repeatShow (defaultData[2] ,defaultCity[2],repeat )},3000);
});


