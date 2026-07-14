import React from "react";
import "../../styles/Incentives.css";

const incentiveData = [
  {
    id: 1,
    name: "Baavaraj",
    type: "Monthly",
    amount: 10000,
    joiningDate: "10-Jan-2025",
    Jan: "-",
    Feb: "-",
    Mar: "-",
    Apr: "₹10,000",
    May: "₹10,000",
    Jun: "₹10,000",
    Jul: "₹10,000",
    Aug: "₹10,000",
    Sep: "₹10,000",
    Oct: "₹10,000",
    Nov: "₹10,000",
    Dec: "₹10,000",
  },
  {
    id: 2,
    name: "Deepak",
    type: "Quarterly",
    amount: 30000,
    joiningDate: "15-Mar-2025",
    Jan: "-",
    Feb: "-",
    Mar: "-",
    Apr: "-",
    May: "-",
    Jun: "₹30,000",
    Jul: "-",
    Aug: "-",
    Sep: "₹30,000",
    Oct: "-",
    Nov: "-",
    Dec: "₹30,000",
  },
];

const Incentives = () => {
  return (
    <div className="incentive-container">
      <h2>Employee Incentives</h2>

      <div className="table-wrapper">
        <table className="incentive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Joining Date</th>
              <th>Jan</th>
              <th>Feb</th>
              <th>Mar</th>
              <th>Apr</th>
              <th>May</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sep</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
            </tr>
          </thead>

          <tbody>
            {incentiveData.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.type}</td>
                <td>₹{emp.amount.toLocaleString()}</td>
                <td>{emp.joiningDate}</td>
                <td>{emp.Jan}</td>
                <td>{emp.Feb}</td>
                <td>{emp.Mar}</td>
                <td>{emp.Apr}</td>
                <td>{emp.May}</td>
                <td>{emp.Jun}</td>
                <td>{emp.Jul}</td>
                <td>{emp.Aug}</td>
                <td>{emp.Sep}</td>
                <td>{emp.Oct}</td>
                <td>{emp.Nov}</td>
                <td>{emp.Dec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incentives;
