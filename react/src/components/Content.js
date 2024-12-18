import "../assets/css/Content.css";
import LeftContent from "./LeftContent";
import MiddleContent from "./MiddleContent";
import RightContent from "./RightContent";

function Content({page}) {
	return (
		<div className="content">
			<div className={`leftColumn${page}`}>
				<LeftContent page={page} />
			</div>
			<div className={`middleColumn${page}`}>
				<MiddleContent page={page} />
			</div>
			<div className={`rightColumn${page}`}>
				<RightContent page={page} />
			</div>
		</div>
	);
}

export default Content;