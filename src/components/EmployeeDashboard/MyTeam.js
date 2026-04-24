import React, { useState, useEffect } from "react";
import "../../styles/MyTeam.css";

const MyTeam = ({ managerId }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5133/api/MyTeam/${managerId}`)
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching team:", err);
        setLoading(false);
      });
  }, [managerId]);

  if (loading) return <p>Loading team...</p>;
  if (teamMembers.length === 0) return <p>No team members found.</p>;

  return (
    <div className="my-team">
      <h2>My Team</h2>
      <div className="team-list">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="avatar">{member.name.charAt(0)}</div>
            <div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
