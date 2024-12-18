import "../assets/css/Footer.css";
import { useEffect, useState } from "react";

function Footer() {
	const [dateTime, setDateTime] = useState("");

	useEffect(() => {
		let timeInterval = 1000;

		const updateDateTime = () => {
			let timeOption = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
			setDateTime(new Date().toLocaleString('en-US', timeOption));
		};

		const intervalId = setInterval(updateDateTime, timeInterval);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="footer">
			<h2>HomeHub</h2>
			<h2 className="infoSection">{dateTime}</h2>
		</div>
	);
}

export default Footer