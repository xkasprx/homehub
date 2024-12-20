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
	let [isAdmin, setIsAdmin] = useState(() => {
		let currentIsAdmin = localStorage.getItem("isAdmin");
		return currentIsAdmin === "true";
	});
	let [currentUser, setCurrentUser] = useState(() => {
		return localStorage.getItem("username") || '';
	});

	useEffect(() => {
		localStorage.setItem("loggedIn", loggedIn);
		localStorage.setItem("isAdmin", isAdmin);
		localStorage.setItem("username", currentUser);

		if (page !== "Settings" && page !== "Admin") {
			setLoggedIn(false);
			setIsAdmin(false);
			setCurrentUser('');
		}
	}, [loggedIn, isAdmin, currentUser, page]);

	let authProps = {
		loggedIn,
		setLoggedIn,
		isAdmin,
		setIsAdmin,
		currentUser,
		setCurrentUser
	};

	return (
		<div className="middleContent">
			{page === "Home" ? <><Calendar /><Album /></> : page === "Chores" ? <Chart /> : page === "Meals" ? <Planner /> : page === "Settings" ? loggedIn ? <Settings {...authProps} /> : <Login {...authProps} /> : null}
		</div>
	);
}

export default MiddleContent;