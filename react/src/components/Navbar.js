import "../assets/css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="nav">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/chores">Chores</Link>
				</li>
				<li>
					<Link to="/meals">Meals</Link>
				</li>
				<li>
					<Link to="/settings">Settings</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;