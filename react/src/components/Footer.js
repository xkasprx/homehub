import "../assets/css/Footer.css";
import { useEffect, useState } from "react";

function Footer() {
	const [dateTime, setDateTime] = useState("");

	useEffect(() => {
		const updateDateTime = () => {
			let timeOption = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
			setDateTime(new Date().toLocaleString('en-US', timeOption));
		};

		updateDateTime();

		let secondsUntilNextMinute = 60 - new Date().getSeconds();
		let intervalId;

		let initialTimeoutId = setTimeout(() => {
			updateDateTime();
			intervalId = setInterval(updateDateTime, 60000);
		}, secondsUntilNextMinute * 1000);

		return () => {
			clearTimeout(initialTimeoutId);
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="footer">
			<h2>HomeHub</h2>
			<h2 className="infoSection">{dateTime}</h2>
		</div>
	);
}

export default Footer