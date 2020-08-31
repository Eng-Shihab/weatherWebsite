function dailyWeather(data){
    let output=document.createElement("div");
    let degree=document.createElement("h1");
    let location=document.createElement("h3");
    let date=document.createElement("p");
    let weatherState=document.createElement("p");
    let humidity=document.createElement("p");
    let wind=document.createElement("p");
    let temp=document.createElement("p");
    let weatherIcon=document.createElement("img");
    degree.innerHTML=data[temp];
    location.innerHTML=data[title];
    date=data[time];
    weatherState=data[weather_state_name];
    weatherIcon=data[icon];
    temp.innerHTML="TEMP    "+data[temp]+"%";
    humidity.innerHTML="HUMIDITY    "+data[humidity]+"%";
    wind.innerHTML="WIND    "+data[wind]+"km/h";
    output.appendChild(degree);
    output.appendChild(location);
    output.appendChild(weatherIcon);
    output.appendChild(date);
    output.appendChild(weatherState);
    output.appendChild(temp);
    output.appendChild(humidity);
    output.appendChild(wind);
}