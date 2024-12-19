import "../assets/css/MiddleContent.css";
import Calendar from "../modules/Calendar";
import Album from "../modules/Album";
import Chart from "../modules/Chart";
import Planner from "../modules/Planner";
import Login from "../modules/Login";
import Settings from "../modules/Settings";
import { useState, useEffect } from "react";

function MiddleContent({page}) {
	let [loggedIn, setLoggedIn] = useState(() => {
		let currentLoggedIn = localStorage.getItem("loggedIn");
		return currentLoggedIn === "true";
	});

	useEffect(() => {
		localStorage.setItem("loggedIn", loggedIn);
		console.log("loggedIn changed to " + loggedIn);
		// This will run when loggedIn changes
	}, [loggedIn]);

	
	return (
		<div className="middleContent">
			{page === "Home" ? <><Calendar /><Album /></> : page === "Chores" ? <Chart /> : page === "Meals" ? <Planner /> : page === "Settings" ? loggedIn ? <Settings loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> : null}
		</div>
	);
}

export default MiddleContent;