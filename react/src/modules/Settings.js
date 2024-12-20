import "../assets/css/Settings.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings(props) {
	let [modalVisible, setModalVisible] = useState(false);
	let [modalContent, setModalContent] = useState("");
	let navigate = useNavigate();

	let buttonNames = [
		"Edit Chores",
		"Reset Chores",
		"Edit Meals",
		"Edit Points",
		"Reset Points",
		"Edit Timers",
		"Change Code",
		"Logout",
		"Admin Tools"
	];
	let buttonIcons = [
		"fas fa-broom",
		"fas fa-retweet",
		"fas fa-utensils",
		"fas fa-star",
		"fas fa-rotate",
		"fas fa-stopwatch",
		"fas fa-key",
		"fas fa-sign-out-alt",
		"fas fa-screwdriver-wrench"
	]

	let handleButtonClick = (buttonName) => {
		if (buttonName === "logout") {
			props.setLoggedIn(false);
			navigate("/"); 
		} else {
			fetch(`/api/${buttonName}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => {
				setModalContent(data);
				setModalVisible(true);
			})
			.catch(error => {
				console.error(`Error with ${buttonName}:`, error);
			});
		}
	};

	// useEffect(() => {
	// 	let timer;

	// 	let resetTimer = () => {
	// 		clearTimeout(timer);
	// 		timer = setTimeout(() => {
	// 			props.setLoggedIn(false);
	// 			window.location.href = "/";
	// 		}, 120000);
	// 	};

	// 	let handleActivity = () => {
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
			<h2 className="greeting">Welcome, {localStorage.getItem("username")}!</h2>
			<div className="buttonGrid">
				{buttonNames.map((buttonName, index) => {
					if (!props.isAdmin && index === buttonNames.length - 1) {
						return null;
					}
					return (
						<button key={index} onClick={() => handleButtonClick(buttonName.replace(` `, ``).toLowerCase())} className={`${buttonIcons[index]} button`}>
							<p className="buttonTitle">{` ${buttonName}`}</p>
						</button>
					);
				})}
			</div>
			{modalVisible && (
				<div className="modal">
					<div className="modalContent">
						<span className="fas fa-circle-xmark close" onClick={() => setModalVisible(false)}>
						</span>
						<p>{modalContent}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Settings;

