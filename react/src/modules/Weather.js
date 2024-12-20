import "../assets/css/Weather.css";
import { useEffect, useState } from "react";
import settings from "../assets/json/settings.json";

function Weather() {
	let [weatherData, setWeatherData] = useState(null);
	let [backgroundImage, setBackgroundImage] = useState("");
	let directionToDegrees = {
		n: 0,
		nne: 22.5,
		ne: 45,
		ene: 67.5,
		e: 90,
		ese: 112.5,
		se: 135,
		sse: 157.5,
		s: 180,
		ssw: 202.5,
		sw: 225,
		wsw: 247.5,
		w: 270,
		wnw: 292.5,
		nw: 315,
		nnw: 337.5
	};

	useEffect(() => {
		let fetchWeather = async () => {
			let weatherUrl = `https://api.weather.gov/points/${settings.test.coordX},${settings.test.coordY}`;

			let weatherResponse = await fetch(weatherUrl);
			let weatherData = await weatherResponse.json();
			let forecastUrl = weatherData.properties.forecast;
			
			let forecastResponse = await fetch(forecastUrl);
			let forecastData = await forecastResponse.json();
			let currentPeriod = forecastData.properties.periods[0];
			let iconUrl = currentPeriod.icon;
			let pathSegments = iconUrl.split('/');
			let weatherCondition = pathSegments[pathSegments.length - 1].split(/[?,]/)[0];
			let timeOfDay = pathSegments[pathSegments.length - 2];
			
			setWeatherData(currentPeriod);
			setBackgroundImage(`weather/${timeOfDay}/${timeOfDay === 'night' ? 'n': ''}${weatherCondition}.png`);
			console.log(currentPeriod.windDirection)

		};
		
		let initialFetchTimer = setTimeout(fetchWeather, 2000);
		let weatherUpdateTimer = setInterval(fetchWeather, 300000);
		
		return () => {
			clearTimeout(initialFetchTimer);
			clearInterval(weatherUpdateTimer);
		};
	}, []);

	return (
		<>
			{weatherData ? (
				<div className="weatherData" style={{backgroundImage: `url(${require(`../assets/images/${backgroundImage}`)})`}}>
					<div className="forecast">
						<h1>{weatherData.name}</h1>
						<p>Forecast: {weatherData.detailedForecast}</p>
						<p>Temperature: {weatherData.temperature}°{weatherData.temperatureUnit}</p>
						<span className="windVane fa-solid fa-arrow-up" style={{transform: `rotate(${directionToDegrees[weatherData.windDirection.toLowerCase()] || 0}deg)`}}></span>
						<p>Wind:{weatherData.windSpeed} {weatherData.windDirection} </p>
						<p>Precipitation Probability: {weatherData.probabilityOfPrecipitation?.value || 0}%</p>
					</div>
					<div className="">
						<p>As of {new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
					</div>
				</div>
			) : (
				<p className="weatherData">Loading...</p>
			)}
		</>
	);
}

export default Weather;