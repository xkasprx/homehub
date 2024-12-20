import "../assets/css/Events.css";
import { useEffect, useState } from "react";
import ICAL from "ical.js";

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let fetchEvents = async () => {
            fetch("http://localhost:3001/api/calendar", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.text())
            .then(data => {
                const jcalData = ICAL.parse(data);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents("vevent");
                const today = new Date();
                const todaysEvents = vevents.filter(event => {
                    const vevent = new ICAL.Event(event);
                    const eventStartDate = vevent.startDate.toJSDate();
                    const eventEndDate = vevent.endDate.toJSDate();
                    return eventStartDate <= today && eventEndDate >= today;
                });
                setEvents(todaysEvents);
            })
            .catch(error => console.error("Error fetching calendar:", error));
        }

        let initialFetchTimer = setTimeout(fetchEvents, 0);
        let eventUpdateTimer = setInterval(fetchEvents, 300000);

        return () => {
            clearTimeout(initialFetchTimer);
            clearInterval(eventUpdateTimer);
        }
    }, []);

    return (
        <div className="events">
            {events.length > 0 ? (
                events.map((event, index) => {
                    const vevent = new ICAL.Event(event);

					return (
                        <div key={index} className="event">
                            <h3 className="eventTitle">{vevent.summary || "No summary"}</h3>
                            <p className="eventDescription">{vevent.description || "No description"}</p>
                            <p className="eventStartDate">{vevent.startDate ? vevent.startDate.toString() : "No start date"}</p>
                            <p className="eventEndDate">{vevent.endDate ? vevent.endDate.toString() : "No end date"}</p>
                        </div>
                    );
                })
            ) : (
                <p className="events">No events for today.</p>
            )}
        </div>
    );
}

export default Events;