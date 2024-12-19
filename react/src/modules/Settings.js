import "../assets/css/Settings.css";
import { useEffect } from "react";

function Settings(props) {
	// useEffect(() => {
	// 	let timer;

	// 	const resetTimer = () => {
	// 		clearTimeout(timer);
	// 		timer = setTimeout(() => {
	// 			props.setLoggedIn(false);
	// 		}, 120000);
	// 	};

	// 	const handleActivity = () => {
	// 		resetTimer();
	// 	};

	// 	window.addEventListener("scroll", handleActivity);
	// 	window.addEventListener("click", handleActivity);
	// 	window.addEventListener("mousemove", handleActivity);
	// 	window.addEventListener("keypress", handleActivity);
	// 	window.addEventListener("touchstart", handleActivity);
	// 	window.addEventListener("touchmove", handleActivity);

	// 	resetTimer();

	// 	return () => {
	// 		clearTimeout(timer);
	// 		window.removeEventListener("scroll", handleActivity);
	// 		window.removeEventListener("click", handleActivity);
	// 		window.removeEventListener("mousemove", handleActivity);
	// 		window.removeEventListener("keypress", handleActivity);
	// 		window.removeEventListener("touchstart", handleActivity);
	// 		window.removeEventListener("touchmove", handleActivity);
	// 	};
	// }, [props]);

	return (
		<div className="settingsScreen">

		</div>
	);
}

export default Settings;

// add buttons that do the following tasks:

// edit chores, edit meals, reset chores, edit points, reset points, edit timers, change code, logout, reboot

// These buttons will be in rows of 3 and each button will trigger a fuction that makes a call to /api/${buttonName}, when the response is 