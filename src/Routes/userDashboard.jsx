import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <div className="list-group">
        <Link to="/profile" className="list-group-item list-group-item-action">
          Manage Profile
        </Link>
        <Link to="/explore" className="list-group-item list-group-item-action">
          Explore Campaigns
        </Link>
        <Link to="/anonymous-donation" className="list-group-item list-group-item-action">
          Make Anonymous Donation
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
