import React from "react";
import "../../styles/ViewPayslip.css";

const ViewPayslip = () => {
  return (
    <div className

="payslip-container">
      {/* Header */}
      <div className

="payslip-header">
        <div>
          <h2>KINSOFT TECHNOLOGIES</h2>
          <p>
            Rajahamsa,831 A,4th Main 5th Cross,Vijayanagar <br />
            Bengaluru,Karnataka,560040 India
       
          </p>
        </div>
      </div>

      <h3 className

="title">Payslip for the month of Dec / 2025</h3>

      {/* Employee Details */}
      <div className

="details-grid">
        <div>
          <p><b>Emp ID:</b> 1047</p>
          <p><b>DOJ:</b> 11/03/2025</p>
          <p><b>UAN:</b> 101523850018</p>
          <p><b>Paid Days:</b> 25</p>
          <p><b>LOP:</b> 0</p>
        </div>

        <div>
          <p><b>Employee Name:</b> Basavaraj Kolur</p>
          <p><b>PAN:</b> BKAPC8755P</p>
          <p><b>PF No:</b> PYBOM1948752000001035</p>
          <p><b>A/c No:</b> 074303884006</p>
        </div>
      </div>

      {/* Earnings & Deductions */}
      <div className

="payslip-table-wrapper">
      <table className

="payslip-table">
        <thead>
          <tr>
            <th>Earnings</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BASIC + DA</td>
            <td>35,959.57</td>
            <td>35,960.00</td>
            <td>PF</td>
            <td>1,800.00</td>
          </tr>
          <tr>
            <td>HRA</td>
            <td>14,383.82</td>
            <td>14,384.00</td>
            <td>PT</td>
            <td>200.00</td>
          </tr>
          <tr>
            <td>SPECIAL AL</td>
            <td>20,080.71</td>
            <td>20,081.00</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>STAT BONUS</td>
            <td>7,191.91</td>
            <td>7,192.00</td>
            <td></td>
            <td></td>
          </tr>

          <tr className

="total-row">
            <td><b>Total</b></td>
            <td><b>77,616.01</b></td>
            <td><b>77,617.00</b></td>
            <td><b>Total</b></td>
            <td><b>2,000.00</b></td>
          </tr>
        </tbody>
      </table>
</div>
      {/* Net Pay */}
      <div className

="netpay">
        <p><b>Net Pay:</b> ₹75,617.00</p>
        <p><b>In Words:</b> Rupees Seventy Five Thousand Six Hundred Seventeen Only</p>
      </div>
    </div>
  );
};

export default ViewPayslip;
