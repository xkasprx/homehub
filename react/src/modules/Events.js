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
                console.log(data);

                const jcalData = ICAL.parse(data);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents("vevent");
                const today = new Date().toISOString().split("T")[0];
                const todaysEvents = vevents.filter(event => {
                    const vevent = new ICAL.Event(event);
                    const eventDate = vevent.startDate.toJSDate().toISOString().split("T")[0];
                    return eventDate === today;
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
            {events.length === 0 ? (
                <p className="noEvents">No Events</p>
            ) : (
                <ul className="eventList">
                    {events.map((event, index) => {
                        const vevent = new ICAL.Event(event);
                        return (
                            <li key={index} className="event">
                                {vevent.summary} - {vevent.startDate.isDate ? "All Day" : new Date(vevent.startDate.toJSDate()).toLocaleTimeString()}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Events;