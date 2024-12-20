import "../assets/css/Calendar.css";
import { useState, useEffect } from "react";
import settings from '../assets/json/settings.json';

function Calendar() {
    let [currentDate, setCurrentDate] = useState(new Date());
    let [days, setDays] = useState([]);
	let monthNames = settings.months;
	let dayNames = settings.days;
	
    useEffect(() => {
        let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        setDays(daysArray);
    }, [currentDate]);

	let isBirthday = (day) => {
		let checkBirthday = (dob) => {
			let dateOfBirth = new Date(dob);
			return dateOfBirth.getDate() === day && dateOfBirth.getMonth() === currentDate.getMonth();
		};

		return settings.kids.some(kid => checkBirthday(kid.dob)) || 
			   settings.parents.some(parent => checkBirthday(parent.dob)) || false;
	};

    let isHoliday = (day) => {
		let holidays = settings.holidays;

        let formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let holiday = holidays.find(holiday => holiday.date === formattedDate);
        return holiday ? holiday.icon : null;
    };

    return (
		<div className="calendar-container">
			<div className="calendar">
				<div className="calendar-header">
					<h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
				</div>
				<div className="calendar-body">
					<div className="calendar-days">
						{dayNames.map((day, index) => (
							<div key={index} className="calendar-day-name">{day}</div>
						))}
					</div>
					<div className="calendar-dates">
						{days.map((day, index) => {
							let isToday = day === new Date().getDate() &&
								currentDate.getMonth() === new Date().getMonth() &&
								currentDate.getFullYear() === new Date().getFullYear();
							let birthdayIcon = isBirthday(day) ? <span className="fas fa-cake-candles birthday-icon"></span> : null;
							let holidayIcon = isHoliday(day);
							return (
								<div key={index} className={`calendar-date ${isToday ? 'isToday' : ''}`}>
									{birthdayIcon && <div className="icon-top-left">{birthdayIcon}</div>}
									{holidayIcon && <div className="icon-top-right"><span className={holidayIcon}></span></div>}
									{day}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
    );
}

export default Calendar;