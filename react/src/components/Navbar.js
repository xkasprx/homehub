import "../assets/css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({page}) {
	return (
		<div className="nav">
			<ul>
				<li className={page === "Home" ? "activeTab" : ""}>
					<Link to="/" >Home</Link>
				</li>
				<li className={page === "Chores" ? "activeTab" : ""}>
					<Link to="/chores">Chores</Link>
				</li>
				<li	className={page === "Meals" ? "activeTab" : ""}>
					<Link to="/meals">Meals</Link>
				</li>
				<li	className={page === "Settings" ? "activeTab" : ""}>
					<Link to="/settings">Settings</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;