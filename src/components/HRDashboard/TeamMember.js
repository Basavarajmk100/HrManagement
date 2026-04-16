import React, { useState } from "react";
import "../../styles/TeamMember.css";

const Team = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: "Development Team",
      teamFunction: "Frontend & Backend Development",
      teamLead: "E101",
      members: [
        { id: 1, name: "Basavaraj", role: "Software Developer", email: "basujuly31@gmail.com" },
        { id: 2, name: "Sandeep", role: "Software Developer", email: "sandeep45@gmail.com" },
      ],
    },
  ]);


     const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";

  const [newTeam, setNewTeam] = useState({
    teamName: "",
    teamFunction: "",
    teamLead: "",
    members: [],
  });

  const [newMember, setNewMember] = useState({ name: "", role: "", email: "" });
  const [editingTeam, setEditingTeam] = useState(null);

  // ➕ Add new team
  const handleAddTeam = () => {
    if (!newTeam.teamName || !newTeam.teamFunction || !newTeam.teamLead) {
      alert("Please fill all team details.");
      return;
    }
    const updatedTeams = [...teams, { ...newTeam, id: teams.length + 1 }];
    setTeams(updatedTeams);
    setNewTeam({ teamName: "", teamFunction: "", teamLead: "", members: [] });
  };

  // ➕ Add team member before saving
  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) {
      alert("Please fill all member fields.");
      return;
    }
    setNewTeam({
      ...newTeam,
      members: [...newTeam.members, { id: newTeam.members.length + 1, ...newMember }],
    });
    setNewMember({ name: "", role: "", email: "" });
  };

  // ❌ Delete a team
  const handleDeleteTeam = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      setTeams(teams.filter((team) => team.id !== id));
    }
  };

  // ✏️ Edit team
  const handleEditTeam = (team) => {
    setEditingTeam(team.id);
    setNewTeam({ ...team });
  };

  // 💾 Save edited team
  const handleSaveTeam = () => {
    const updatedTeams = teams.map((t) =>
      t.id === editingTeam ? { ...newTeam, id: editingTeam } : t
    );
    setTeams(updatedTeams);
    setEditingTeam(null);
    setNewTeam({ teamName: "", teamFunction: "", teamLead: "", members: [] });
  };

  // ➕ Add button reset form
  const handleNewTeamClick = () => {
    setEditingTeam(null);
    setNewTeam({ teamName: "", teamFunction: "", teamLead: "", members: [] });
  };
return (
  <div className

={`team-page theme-${theme}`}>

    {/* BACKGROUND EFFECTS */}
    <div className

="bg-canvas">
      {(isDark || isColorful) && (
        <>
          <div className

="ambient-orb orb-1"></div>
          <div className

="ambient-orb orb-2"></div>
          <div className

="ambient-orb orb-3"></div>
          <div className

="ambient-orb orb-4"></div>
          <div className

="bg-glass-layer"></div>
        </>
      )}
    </div>

    {/* MAIN PANEL */}
    <div className

="table-panel">

      {/* HEADER */}
      <div className

="table-header-row">
        <div>
          <div className

="table-title">👥 Team Management</div>
          <div className

="table-subtitle">
            Create and manage teams efficiently
          </div>
        </div>

        <button className

="add-btn" onClick={handleNewTeamClick}>
          + New Team
        </button>
      </div>

      {/* FORM */}
      <div className

="team-form glass-card">

        <h3>{editingTeam ? "Edit Team" : "Add New Team"}</h3>

        {/* TEAM INFO */}
        <div className

="form-row">
          <input
            type="text"
            placeholder="Team Name"
            value={newTeam.teamName}
            onChange={(e) => setNewTeam({ ...newTeam, teamName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Team Function"
            value={newTeam.teamFunction}
            onChange={(e) => setNewTeam({ ...newTeam, teamFunction: e.target.value })}
          />
        </div>

        {/* TEAM LEAD */}
        <div className

="form-row">
          <input
            type="text"
            placeholder="Team Lead (Emp ID)"
            value={newTeam.teamLead}
            onChange={(e) => setNewTeam({ ...newTeam, teamLead: e.target.value })}
          />
        </div>

        {/* MEMBERS */}
        <div className

="member-section">
          <h4>Add Members</h4>

          <div className

="form-row">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
          </div>

          <button onClick={handleAddMember} className

="add-btn small-btn">
            Add Member
          </button>

          {newTeam.members.length > 0 && (
            <ul className

="member-list">
              {newTeam.members.map((m, i) => (
                <li key={i}>
                  <div className

="member-item">
                    <div className

="cell-avatar">{m.name.charAt(0)}</div>
                    <span>{m.name} ({m.role})</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ACTION BUTTON */}
        {editingTeam ? (
          <button onClick={handleSaveTeam} className

="add-btn">
            Save Team
          </button>
        ) : (
          <button onClick={handleAddTeam} className

="add-btn">
            Add Team
          </button>
        )}

      </div>

      {/* TABLE */}
      <div className

="table-wrapper">
        <table className

="styled-table">

          <thead>
            <tr>
              <th>Team</th>
              <th>Function</th>
              <th>Lead</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="5" className

="noData">No teams available</td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id} className

="table-row">

                  {/* TEAM NAME */}
                  <td>
                    <div className

="cell-avatar">
                      {team.teamName.charAt(0)}
                    </div>
                    {team.teamName}
                  </td>

                  <td>{team.teamFunction}</td>
                  <td>{team.teamLead}</td>

                  {/* MEMBERS */}
                  <td>
                    {team.members.map((m, i) => (
                      <span key={i} className

="member-pill">
                        {m.name}
                      </span>
                    ))}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className

="action-group">
                      <button className

="more-action-btn" onClick={() => handleEditTeam(team)}>Edit</button>
                      <button className

="more-action-btn delete" onClick={() => handleDeleteTeam(team.id)}>Delete</button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  </div>
);
};

export default Team;
