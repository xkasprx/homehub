import "../assets/css/RightContent.css";
import Clock from "../modules/Clock";
import Timers from "../modules/Timers";

function RightContent({page}) {
	return (
		<div className="rightContent">
			{page === "Home" ? <><Clock /><Timers /></> : null}
		</div>
	);
}

export default RightContent;