import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, FileText } from "lucide-react";
import "../../styles/EventReports.css";

export default function EventReports() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      // 🔥 MOCK DATA (since backend not ready)
      const mockData = [
        {
          event_title: "Annual Meetup",
          description: "Company yearly meetup with CEO address and awards",
          event_date: "2026-06-25",
          event_time: "10:00 AM",
          location: "Bangalore Office",
          open_to: "ALL",
          selected_teams: "Engineering, HR",
          selected_staff: "Basavaraj",
        },
        {
          event_title: "Tech Seminar",
          description: "React & Node advanced session for developers",
          event_date: "2026-06-28",
          event_time: "2:00 PM",
          location: "Conference Hall A",
          open_to: "teams",
          selected_teams: "Engineering",
          selected_staff: "",
        },
        {
          event_title: "HR Training Workshop",
          description: "Employee engagement and HR policy training",
          event_date: "2026-07-02",
          event_time: "11:00 AM",
          location: "Training Room 1",
          open_to: "teams",
          selected_teams: "HR",
          selected_staff: "",
        },
        {
          event_title: "Marketing Strategy Meet",
          description: "Q3 marketing planning and campaign discussion",
          event_date: "2026-07-05",
          event_time: "3:00 PM",
          location: "Meeting Room B",
          open_to: "teams",
          selected_teams: "Marketing, Sales",
          selected_staff: "",
        },
        {
          event_title: "Finance Review Meeting",
          description: "Quarterly financial performance review",
          event_date: "2026-07-10",
          event_time: "10:30 AM",
          location: "Finance Cabin",
          open_to: "custom",
          selected_teams: "",
          selected_staff: "Kiran",
        },
        {
          event_title: "Product Demo Day",
          description: "New product demo presentation for stakeholders",
          event_date: "2026-07-12",
          event_time: "4:00 PM",
          location: "Main Auditorium",
          open_to: "ALL",
          selected_teams: "",
          selected_staff: "",
        },
        {
          event_title: "Team Building Activity",
          description: "Outdoor team building and games event",
          event_date: "2026-07-15",
          event_time: "9:00 AM",
          location: "Resort Grounds",
          open_to: "teams",
          selected_teams: "Engineering, Sales, Marketing",
          selected_staff: "",
        },
      ];

      setEvents(mockData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading event reports...</div>;
  }

  return (
    <div className="er-container">
      <div className="er-header">
        <h2>
          <FileText size={18} /> Event Reports
        </h2>
        <p>List of all scheduled company events</p>
      </div>

      {events.length === 0 ? (
        <div className="er-empty">No events found</div>
      ) : (
        <div className="er-grid">
          {events.map((event, index) => (
            <div className="er-card" key={index}>
              <h3 className="er-title">{event.event_title}</h3>

              <p className="er-desc">{event.description || "No description"}</p>

              <div className="er-meta">
                <span>
                  <Calendar size={14} /> {event.event_date} {event.event_time}
                </span>

                <span>
                  <MapPin size={14} /> {event.location}
                </span>

                <span>
                  <Users size={14} /> {event.open_to}
                </span>
              </div>

              <hr />

              <div className="er-extra">
                <p>
                  <b>Teams:</b> {event.selected_teams || "All Employees"}
                </p>
                <p>
                  <b>Staff:</b> {event.selected_staff || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
