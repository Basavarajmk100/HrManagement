import React from "react";
import "../../styles/AddPurchaseVoucher.css";

const AddPurchaseVoucher = () => {
  return (
    <div className

="voucher-page">

      <div className

="voucher-card">
        <h2>Add Purchase Voucher</h2>
        <p className

="voucher-subtitle">Enter purchase voucher details</p>

        <form className

="voucher-form">

          <div className

="form-group">
            <label>Voucher No</label>
            <input type="text" placeholder="PV-1011" />
          </div>

          <div className

="form-group">
            <label>Vendor Name</label>
            <input type="text" placeholder="Enter vendor name" />
          </div>

          <div className

="form-group">
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" />
          </div>

          <div className

="form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          <div className

="form-group">
            <label>Status</label>
            <select>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>

          <button className

="save-voucher-btn">
            Save Voucher
          </button>

        </form>
      </div>

    </div>
  );
};

export default AddPurchaseVoucher;