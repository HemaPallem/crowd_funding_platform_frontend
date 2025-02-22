import React, { useState } from "react";

const AnonymousDonation = () => {
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    alert(`Anonymous donation of $${amount} successful!`);
  };

  return (
    <div className="container mt-4">
      <h2>Anonymous Donation</h2>
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleDonate}>
        Donate Anonymously
      </button>
    </div>
  );
};

export default AnonymousDonation;
