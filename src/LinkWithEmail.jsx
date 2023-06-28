import React, { useEffect, useState } from "react";

const LinkWithEmail = ({ onEmailLink }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmailLink(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h2>Link Account with Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          style={{
            marginLeft: "10px",
            color: "white",
            backgroundColor: "#222",
            border: "none",
            borderRadius: "25px",
            padding: "10px",
            width: "400px",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            background: "#2499c7",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "10px",
            width: "100px",
          }}
        >
          Link
        </button>
      </form>
    </div>
  );
};

export default LinkWithEmail;
