import "../assets/css/Weather.css";
import { useEffect, useState } from "react";
import settings from "../assets/json/settings.json";
import compass from "../assets/images/compass.png";

function Weather() {
	let [weatherData, setWeatherData] = useState(null);
	let [backgroundImage, setBackgroundImage] = useState("");
	let [forecastPeriods, setForecastPeriods] = useState([]);
	let directionToDegrees = settings.directionToDegrees;

	useEffect(() => {
		let fetchWeather = async () => {
			let weatherUrl = `https://api.weather.gov/points/${settings.location.coordX},${settings.location.coordY}`;

			await fetch(weatherUrl)
			.then(response => response.json())
			.then(async weatherData => {
				let forecastUrl = weatherData.properties.forecast;

				await fetch(forecastUrl)
				.then(response => response.json())
				.then(async forecastData => {
					let currentPeriod = forecastData.properties.periods[0];
					let nextPeriod = forecastData.properties.periods[1];
					let thirdPeriod = forecastData.properties.periods[2];
					let fourthPeriod = forecastData.properties.periods[3];
					let fifthPeriod = forecastData.properties.periods[4];
					let sixthPeriod = forecastData.properties.periods[5];
					
					setWeatherData(currentPeriod);
					setBackgroundImage(currentPeriod.icon);
					setForecastPeriods([nextPeriod, thirdPeriod, fourthPeriod, fifthPeriod, sixthPeriod]);
				})
				.catch(error => {
					console.error("Error fetching forecast data:", error);
					let defaultPeriod = {
						name: "No data",
						detailedForecast: "No forecast data available.",
						windDirection: "N",
						icon: "",
						shortForecast: "N/A",
						temperature: "N/A",
						temperatureUnit: ""
					};
					setWeatherData(defaultPeriod);
					setBackgroundImage("");
					setForecastPeriods([defaultPeriod, defaultPeriod, defaultPeriod, defaultPeriod, defaultPeriod]);
				});
			});
		};
		
		let initialFetchTimer = setTimeout(fetchWeather, 0);
		let weatherUpdateTimer = setInterval(fetchWeather, 300000);
		
		return () => {
			clearTimeout(initialFetchTimer);
			clearInterval(weatherUpdateTimer);
		};
	}, []);

	return (
		<>
			{weatherData ? (
				<div className="weatherData" style={{backgroundImage: `url(${backgroundImage})`}}>
					<div className="forecast">
						<h1>{weatherData.name} in {settings.location.city}</h1>
						<p>{weatherData.detailedForecast}</p>
						<div className="windInfoContainer">
							<div className="compass" style={{position: 'relative'}}>
								<img className="compassRose" src={compass} alt="compass" />
								<span className="redWindVane" style={{transform: `translate(-50%, -50%) rotate(${directionToDegrees[weatherData.windDirection.toLowerCase()].head || "0"}deg)`}}></span>
								<span className="whiteWindVane" style={{transform: `translate(-50%, -50%) rotate(${directionToDegrees[weatherData.windDirection.toLowerCase()].tail || "180"}deg)`}}></span>
								<div className="pin"></div>
							</div>
						</div>
						<div className="forecastGrid">
							{forecastPeriods.map((period, index) => {
								return (
									<div key={index} className="forecastPeriod" style={{backgroundImage: `url(${period.icon})`}}>
										<h2 className="period">{period.name}</h2>
										<p className="shortForecast">{period.shortForecast}</p>
										<p className="temperature">{period.temperature}°{period.temperatureUnit}</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className="weatherFooter">
						<div className="refreshDate">
							<p>As of {new Date().toLocaleString("en-US", { timeZone: "America/Chicago", hour: '2-digit', minute: '2-digit' })}</p>
						</div>
					</div>
				</div>
			) : (
				<p className="weatherLoading">Loading...</p>
			)}
		</>
	);
}

export default Weather;