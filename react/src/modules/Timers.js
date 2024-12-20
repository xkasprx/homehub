import "../assets/css/Timers.css";
import React, { useState, useEffect, useRef } from "react";
import tickingSound from "../assets/sounds/ticking.mp3";
import alarmSound from "../assets/sounds/alarm.mp3";

let timers = [
	{ label: "1 min", value: 60 },
	{ label: "5 min", value: 300 },
	{ label: "10 min", value: 600 },
	{ label: "15 min", value: 900 },
	{ label: "30 min", value: 1800 },
	{ label: "1 hr", value: 3600 },
];

function Timers() {
	let [timeLeft, setTimeLeft] = useState(0);
	let [isRunning, setIsRunning] = useState(false);
	let [customTime, setCustomTime] = useState("");
	let tickingAudio = useRef(new Audio(tickingSound));
	let alarmAudio = useRef(new Audio(alarmSound));
	let intervalRef = useRef(null);
	let [customInterval, setCustomInterval] = useState(null);

	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			intervalRef.current = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
			tickingAudio.current.play();
			tickingAudio.current.loop = true;
		} else {
			clearInterval(intervalRef.current);
			tickingAudio.current.pause();
			tickingAudio.current.currentTime = 0;
		}

		if (timeLeft === 0 && isRunning) {
			tickingAudio.current.pause();
			alarmAudio.current.play();
			setIsRunning(false);
		}

		return () => clearInterval(intervalRef.current);
	}, [isRunning, timeLeft]);

	let startTimer = (seconds) => {
		setCustomTime(0);
		setTimeLeft(seconds);
		setIsRunning(true);
	};

	let stopTimer = () => {
		setIsRunning(false);
		tickingAudio.current.pause();
		tickingAudio.current.currentTime = 0;
		alarmAudio.current.pause();
		alarmAudio.current.currentTime = 0;
	};

	let resetTimer = () => {
		setTimeLeft(0);
		setIsRunning(false);
		tickingAudio.current.pause();
		tickingAudio.current.currentTime = 0;
		alarmAudio.current.pause();
		alarmAudio.current.currentTime = 0;
	};

    let handleCustomTimeChange = (amount) => {
        setCustomTime(prevTime => Math.max(0, prevTime + amount));
    };

    let handleStartTimer = () => {
		startTimer(customTime * 60);
    };

	const handleMouseDown = (amount) => {
        setCustomInterval(setInterval(() => handleCustomTimeChange(amount), 100));
    };

    const handleMouseUp = () => {
        clearInterval(customInterval);
    };

    const handleTouchStart = (amount, e) => {
        e.preventDefault();
        handleMouseDown(amount);
    };


    const handleTouchEnd = () => {
        handleMouseUp();
    };
	return (
		<div className="timers">
			<div className={`countdown`}>
				{new Date(timeLeft * 1000).toISOString().substr(11, 8)}
			</div>
			<div className="timer-buttons">
				{timers.map((timer) => (
					<button key={timer.label} onClick={() => startTimer(timer.value)}>
						{timer.label}
					</button>
				))}
			</div>
			<div className="custom-timer">
                <button
                    onMouseDown={() => handleMouseDown(1)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart(1, e)}
                    onTouchEnd={handleTouchEnd}
                >▲</button>
                <span className="customeTimerChoice">{customTime || 0} min{customTime !== 1 ? 's' : ''}</span>
                <button
                    onMouseDown={() => handleMouseDown(-1)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart(-1, e)}
                    onTouchEnd={handleTouchEnd}
                >▼</button>
            </div>
			<div className="control-buttons">
				<button onClick={handleStartTimer}>Start</button>
				<button onClick={stopTimer}>Stop</button>
				<button onClick={resetTimer}>Reset</button>
			</div>
		</div>
	);
}

export default Timers;