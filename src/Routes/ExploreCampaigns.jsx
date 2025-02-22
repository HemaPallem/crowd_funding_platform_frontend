import React, { useState } from "react";

const campaigns = [
  { id: 1, title: "Education for All", category: "Education", funds: 5000 },
  { id: 2, title: "Tech Startup Launch", category: "Technology", funds: 20000 },
  { id: 3, title: "Medical Help Fund", category: "Health", funds: 15000 },
];

const ExploreCampaigns = () => {
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Explore Campaigns</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search campaigns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filteredCampaigns.map((campaign) => (
          <li key={campaign.id} className="list-group-item">
            {campaign.title} - {campaign.category} (${campaign.funds} raised)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExploreCampaigns;
