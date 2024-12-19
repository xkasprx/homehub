import "../assets/css/LeftContent.css";
import Weather from "../modules/Weather";
import Planner from "../modules/Planner";

function LeftContent({page}) {
	return (
		<div className="leftContent">
			{page === "Home" ? <Weather /> : page === "Meals" ? <Planner /> : null}
		</div>
	);
}

export default LeftContent;