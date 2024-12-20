import "../assets/css/Tracker.css";
import { useState, useEffect } from "react";
import settings from "../assets/json/settings";

function Tracker() {
	const [kids, setKids] = useState([]);

	useEffect(() => {
		setKids(settings.kids);
	}, []);

	return (
		<div className="tracker-container">
			{kids.map((kid, index) => (
				<div key={index} className="kid-container">
					<div className="kid-info">
						<img src={require(`../assets/images/users/${kid.name.toLowerCase()}.jpg`)} alt={`${kid.name}'s avatar`} className="kid-avatar" />
						<span className="kid-name">{kid.name}</span>
					</div>
					<div className="star">
						<span className="points">{kid.points}</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default Tracker;