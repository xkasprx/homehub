import "../assets/css/RightContent.css";
import Timers from "../modules/Timers";

function RightContent({page}) {
	return (
		<div className="rightContent">
			{page === "Home" ? <><Timers /></> : null}
		</div>
	);
}

export default RightContent;