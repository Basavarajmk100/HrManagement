import { useState } from "react";
import {
  CalendarCheck,
  ChevronDown,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";
import "../../styles/HREventRegistration.css";

const TEAMS = [
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Finance",
  "Operations",
  "Sales",
];
const STAFF = [
  { id: 1, name: "Basavaraj", role: "Engineer" },
  { id: 2, name: "Deepak", role: "Designer" },
  { id: 3, name: "Kiran", role: "HR Manager" },
];

export default function EventRegistration() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    openTo: "ALL",
  });
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [teamDropOpen, setTeamDropOpen] = useState(false);
  const [staffDropOpen, setStaffDropOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleTeam = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team],
    );
  };

  const toggleStaff = (staff) => {
    setSelectedStaff((prev) =>
      prev.find((s) => s.id === staff.id)
        ? prev.filter((s) => s.id !== staff.id)
        : [...prev, staff],
    );
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Event title is required";
    if (!form.date) e.date = "Event date is required";
    if (form.openTo === "teams" && selectedTeams.length === 0)
      e.audience = "Select at least one team";
    if (form.openTo === "custom" && selectedStaff.length === 0)
      e.audience = "Select at least one staff member";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      openTo: "ALL",
    });
    setSelectedTeams([]);
    setSelectedStaff([]);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="er-success-page">
        <div className="er-success-card">
          <div className="er-success-icon">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="er-success-title">Event Created!</h2>
          <p className="er-success-event">{form.title}</p>
          <p className="er-success-meta">
            {form.date} {form.time && `· ${form.time}`} ·{" "}
            {form.openTo === "ALL"
              ? "All employees"
              : form.openTo === "teams"
                ? selectedTeams.join(", ")
                : selectedStaff.map((s) => s.name).join(", ")}
          </p>
          <button className="er-btn-again" onClick={handleReset}>
            Create Another Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="er-page">
      <div className="er-wrapper">
        {/* Header */}
        <div className="er-header">
          <div className="er-header-icon">
            <CalendarCheck size={20} />
          </div>
          <div>
            <h1 className="er-header-title">Event Registration</h1>
            <p className="er-header-sub">
              Schedule and publish a company event
            </p>
          </div>
        </div>

        <div className="er-card">
          {/* Title */}
          <div className="er-field">
            <label className="er-label">
              Event Title <span className="er-required">*</span>
            </label>
            <input
              className={`er-input${errors.title ? " error" : ""}`}
              name="title"
              value={form.title}
              onChange={handle}
              placeholder="e.g. Annual Town Hall 2025"
            />
            {errors.title && (
              <span className="er-error-msg">{errors.title}</span>
            )}
          </div>

          {/* Description */}
          <div className="er-field">
            <label className="er-label">Description</label>
            <textarea
              className="er-textarea"
              name="description"
              value={form.description}
              onChange={handle}
              placeholder="Brief description about the event..."
            />
          </div>

          {/* Date & Time */}
          <div className="er-row">
            <div className="er-field">
              <label className="er-label">
                Event Date <span className="er-required">*</span>
              </label>
              <input
                className={`er-input${errors.date ? " error" : ""}`}
                type="date"
                name="date"
                value={form.date}
                onChange={handle}
              />
              {errors.date && (
                <span className="er-error-msg">{errors.date}</span>
              )}
            </div>
            <div className="er-field">
              <label className="er-label">Time</label>
              <input
                className="er-input"
                type="time"
                name="time"
                value={form.time}
                onChange={handle}
              />
            </div>
          </div>

          {/* Location */}
          <div className="er-field">
            <label className="er-label">Location</label>
            <input
              className="er-input"
              name="location"
              value={form.location}
              onChange={handle}
              placeholder="e.g. Conference Hall A / Meet link"
            />
          </div>

          {/* Open To */}
          <div className="er-field">
            <label className="er-label">
              Open To <span className="er-required">*</span>
            </label>

            <select
              className="er-input er-select"
              name="openTo"
              value={form.openTo}
              onChange={(e) => {
                setForm({ ...form, openTo: e.target.value });
                setSelectedTeams([]);
                setSelectedStaff([]);
                setErrors({ ...errors, audience: "" });
              }}
            >
              <option value="ALL">
                All Employees — open to everyone in the company
              </option>
              <option value="teams">Teams — pick specific teams</option>
              <option value="custom">
                Custom Staff — pick individual employees
              </option>
            </select>

            {/* Teams dropdown */}
            {form.openTo === "teams" && (
              <div className="er-dropdown-wrap">
                <button
                  className="er-dropdown-trigger"
                  onClick={() => setTeamDropOpen(!teamDropOpen)}
                >
                  <span className={selectedTeams.length ? "" : "placeholder"}>
                    {selectedTeams.length
                      ? `${selectedTeams.length} team${selectedTeams.length > 1 ? "s" : ""} selected`
                      : "Select teams..."}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`er-chevron${teamDropOpen ? " open" : ""}`}
                  />
                </button>
                {teamDropOpen && (
                  <div className="er-dropdown-menu">
                    {TEAMS.map((team) => (
                      <button
                        key={team}
                        className={`er-dropdown-item${selectedTeams.includes(team) ? " selected" : ""}`}
                        onClick={() => toggleTeam(team)}
                      >
                        {team}
                        {selectedTeams.includes(team) && (
                          <CheckCircle2 size={15} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {selectedTeams.length > 0 && (
                  <div className="er-chips">
                    {selectedTeams.map((t) => (
                      <span key={t} className="er-chip">
                        {t}
                        <button
                          className="er-chip-remove"
                          onClick={() => toggleTeam(t)}
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Staff dropdown */}
            {form.openTo === "custom" && (
              <div className="er-dropdown-wrap">
                <button
                  className="er-dropdown-trigger"
                  onClick={() => setStaffDropOpen(!staffDropOpen)}
                >
                  <span className={selectedStaff.length ? "" : "placeholder"}>
                    {selectedStaff.length
                      ? `${selectedStaff.length} staff member${selectedStaff.length > 1 ? "s" : ""} selected`
                      : "Select staff members..."}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`er-chevron${staffDropOpen ? " open" : ""}`}
                  />
                </button>
                {staffDropOpen && (
                  <div className="er-dropdown-menu">
                    {STAFF.map((s) => {
                      const initials = s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("");
                      const isSelected = !!selectedStaff.find(
                        (x) => x.id === s.id,
                      );
                      return (
                        <button
                          key={s.id}
                          className={`er-dropdown-item${isSelected ? " selected" : ""}`}
                          onClick={() => toggleStaff(s)}
                        >
                          <span className="er-staff-item">
                            <span className="er-avatar">{initials}</span>
                            <span>
                              <span className="er-staff-name">{s.name}</span>
                              <br />
                              <span className="er-staff-role">{s.role}</span>
                            </span>
                          </span>
                          {isSelected && <CheckCircle2 size={15} />}
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedStaff.length > 0 && (
                  <div className="er-chips">
                    {selectedStaff.map((s) => (
                      <span key={s.id} className="er-chip">
                        {s.name}
                        <button
                          className="er-chip-remove"
                          onClick={() => toggleStaff(s)}
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {errors.audience && (
              <span className="er-error-msg">{errors.audience}</span>
            )}
          </div>

          {/* Actions */}
          <div className="er-actions">
            <button className="er-btn-clear" onClick={handleReset}>
              Clear
            </button>
            <button className="er-btn-submit" onClick={handleSubmit}>
              <Plus size={16} /> Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
