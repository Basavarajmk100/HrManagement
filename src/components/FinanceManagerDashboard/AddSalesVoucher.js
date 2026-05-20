import React from "react";
import "../../styles/AddSalesVoucher.css";

const AddSalesVoucher = () => {
  return (
    <div className="voucher-page">
      <div className="voucher-card">
        <h2>Add Sales Voucher</h2>

        <form className="voucher-form">
          <div className="form-group">
            <label>Voucher No</label>
            <input type="text" placeholder="SV-2005" />
          </div>

          <div className="form-group">
            <label>Customer Name</label>
            <input type="text" placeholder="Enter customer name" />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input type="number" />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>

          <button className="save-voucher-btn">Save Sales Voucher</button>
        </form>
      </div>
    </div>
  );
};

export default AddSalesVoucher;
