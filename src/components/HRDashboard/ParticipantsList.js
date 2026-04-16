import React, { useEffect, useState } from "react";
import "../../styles/ParticipantsList.css";

const ParticipantsList = () => {

  const [participants, setParticipants] = useState([]);
  const [searchActivity, setSearchActivity] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Dummy Data
  const dummyParticipants = [
    {
      id: 1,
      employeeId: "EMP101",
      employeeName: "Basavaraj Kolur",
      department: "IT",
      activityName: "Cricket Tournament",
      date: "2026-04-05"
    },
    {
      id: 2,
      employeeId: "EMP102",
      employeeName: "Prajwal HL",
      department: "HR",
      activityName: "Yoga Session",
      date: "2026-04-08"
    },
    {
      id: 3,
      employeeId: "EMP103",
      employeeName: "Arjun Reddy",
      department: "Finance",
      activityName: "Tree Plantation",
      date: "2026-04-12"
    },
    {
      id: 4,
      employeeId: "EMP104",
      employeeName: "Santosh Mk",
      department: "Marketing",
      activityName: "Badminton Tournament",
      date: "2026-04-15"
    }
  ];


   const theme = localStorage.getItem("theme") || "simple";
    const isSimple = theme === "simple";
    const isDark = theme === "dark";
    const isColorful = theme === "colorful";


  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch("https://http://localhost:5133/api/EventRegistration");
      const data = await response.json();

      if (data.length === 0) {
        setParticipants(dummyParticipants);
      } else {
        setParticipants(data);
      }

    } catch (error) {
      console.error("Error fetching participants:", error);
      setParticipants(dummyParticipants);
    }
  };

  const deleteParticipant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;

    try {
      await fetch(`https://http://localhost:5133/api/EventRegistration/${id}`, {
        method: "DELETE"
      });

      fetchParticipants();

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredParticipants = participants.filter((p) => {
    return (
      p.activityName.toLowerCase().includes(searchActivity.toLowerCase()) &&
      (filterDate === "" || p.date.includes(filterDate))
    );
  });

  const downloadCSV = () => {

    const headers = ["Employee ID", "Employee Name", "Department", "Activity", "Date"];

    const rows = filteredParticipants.map(p => [
      p.employeeId,
      p.employeeName,
      p.department,
      p.activityName,
      p.date
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "participants.csv");
    document.body.appendChild(link);

    link.click();
  };

  return (

  <div className

={`participants-container theme-${theme}`}>

      <h2>Activity Participants</h2>

      <div className

="participants-controls">

        <input
          type="text"
          placeholder="Search by Activity"
          value={searchActivity}
          onChange={(e) => setSearchActivity(e.target.value)}
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <button onClick={downloadCSV}>Download</button>

      </div>

      <table className

="participants-table">

        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Activity</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredParticipants.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No participants registered
              </td>
            </tr>
          ) : (
            filteredParticipants.map((p) => (
              <tr key={p.id}>
                <td>{p.employeeId}</td>
                <td>{p.employeeName}</td>
                <td>{p.department}</td>
                <td>{p.activityName}</td>
                <td>{p.date}</td>
                <td>
                
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
};

export default ParticipantsList;