import "../assets/css/Header.css";
import logo from "../assets/images/homehub.png";
import Navbar from "./Navbar";

function Header() {
	return (
		<div className="header">
			<div className="logo">
				<img src={logo} alt="HomeHub" />
			</div>
			<Navbar />
			<div className="refresh">
				<button onClick={() => window.location.reload(true)}>
					<i className="fas fa-rotate-right"></i>
				</button>
			</div>
		</div>
	);
}

export default Header;