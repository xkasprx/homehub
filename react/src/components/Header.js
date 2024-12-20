import "../assets/css/Header.css";
import logo from "../assets/images/homehub.png";
import Navbar from "./Navbar";
import { useState } from "react";

function rebootHomeHub() {
    fetch('http://localhost:3001/api/reboot', { method: 'POST' })
	.then((response) => {
		if (response.status === 200) {
			response.text().then((data) => {
					alert(data);
				});
		}else{
			response.text().then((data) => {
				alert(data);
			});
		}
	})
	.catch((error) => {
		console.error('Failed to reboot HomeHub. Please power cycle the HomeHub.', error)
		alert('Failed to reboot HomeHub. Please power cycle the HomeHub.');
	});
}

function Header({ page }) {
    let [isTouching, setIsTouching] = useState(false);
    let [touchStartTime, setTouchStartTime] = useState(null);
    let [startX, setStartX] = useState(null);
    let [startY, setStartY] = useState(null);

    let handleTouchStart = (e) => {
		let clientX = e.touches ? e.touches[0].clientX : e.clientX;
		let clientY = e.touches ? e.touches[0].clientY : e.clientY;

        setIsTouching(true);
        setTouchStartTime(Date.now());
		setStartX(clientX);
		setStartY(clientY);
    };

    let handleTouchEnd = () => {
		setIsTouching(false);
        setTouchStartTime(null);
        setStartX(null);
        setStartY(null);

		if (isTouching && Date.now() - touchStartTime >= 15000) {
            rebootHomeHub();
        }
    };

    let handleTouchMove = (e) => {
        let currentX = e.touches ? e.touches[0].clientX : e.clientX;
        let currentY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaX = Math.abs(currentX - startX);
        let deltaY = Math.abs(currentY - startY);

		if (deltaX > 87.5 || deltaY > (5 * window.innerWidth / 100) / 2) {
			setIsTouching(false);
			setTouchStartTime(null);
			setStartX(null);
			setStartY(null);
		}
    };

    return (
        <div className="header">
            <div className="logo">
                <img
                    src={logo}
                    alt="HomeHub"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchMove}
                />
            </div>
            <Navbar page={page} />
            <div className="refresh">
                <button onClick={() => window.location.reload(true)}>
                    <i className="fas fa-rotate-right"></i>
                </button>
            </div>
        </div>
    );
}

export default Header;