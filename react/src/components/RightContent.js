import "../assets/css/RightContent.css";
import Timers from "../modules/Timers";
import Events from "../modules/Events";

function RightContent({page}) {
	return (
		<div className="rightContent">
			{page === "Home" ? <><Timers /><Events /></> : null}
		</div>
	);
}

export default RightContent;