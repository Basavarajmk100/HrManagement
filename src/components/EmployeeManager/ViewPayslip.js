import React from "react";
import "../../styles/ViewPayslip.css";

const ViewPayslip = () => {
  return (
    <div className="payslip-container">
      {/* Header */}
      <div className="payslip-header">
        <div>
          <h2>KINSOFT TECHNOLOGIES</h2>
          <p>
            Rajahamsa,831 A,4th Main 5th Cross,Vijayanagar <br />
            Bengaluru,Karnataka,560040 India
          </p>
        </div>
      </div>

      <h3 className="title">Payslip for the month of Dec / 2025</h3>

      {/* Employee Details */}
      <div className="details-grid">
        <div>
          <p>
            <b>Emp ID:</b> 1047
          </p>
          <p>
            <b>DOJ:</b> 11/03/2025
          </p>
          <p>
            <b>UAN:</b> 101523850018
          </p>
          <p>
            <b>Paid Days:</b> 25
          </p>
          <p>
            <b>LOP:</b> 0
          </p>
        </div>

        <div>
          <p>
            <b>Employee Name:</b> Basavaraj Kolur
          </p>
          <p>
            <b>PAN:</b> BKAPC8755P
          </p>
          <p>
            <b>PF No:</b> PYBOM1948752000001035
          </p>
          <p>
            <b>A/c No:</b> 074303884006
          </p>
        </div>
      </div>

      {/* Earnings & Deductions */}
      <div className="payslip-table-wrapper">
        <table className="payslip-table">
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
              <td>22,500.00</td>
              <td>22,500.00</td>
              <td>PF</td>
              <td>1,800.00</td>
            </tr>

            <tr>
              <td>HRA</td>
              <td>4,500.00</td>
              <td>4,500.00</td>
              <td>PT</td>
              <td>200.00</td>
            </tr>

            <tr>
              <td>SPECIAL AL</td>
              <td>11,700.00</td>
              <td>11,700.00</td>
              <td>TDS</td>
              <td>4,800.00</td>
            </tr>

            <tr>
              <td>STAT BONUS</td>
              <td>4,500.00</td>
              <td>4,500.00</td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>PERFORMANCE INCENTIVE</td>
              <td>1,800.00</td>
              <td>1,800.00</td>
              <td></td>
              <td></td>
            </tr>

            <tr className="total-row">
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>45,000.00</b>
              </td>
              <td>
                <b>45,000.00</b>
              </td>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>6,800.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Net Pay */}
      <div className="netpay">
        <p>
          <b>Net Pay:</b> ₹38,200.00
        </p>
        <p>
          <b>In Words:</b> Rupees Thirty Eight Thousand Two Hundred Only
        </p>
      </div>
    </div>
  );
};

export default ViewPayslip;
