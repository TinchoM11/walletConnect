import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "./App.css";
import LinkWithEmail from "./LinkWithEmail";
import SignMessage from "./SignMessage";
import GrantApproval from "./GrantApproval";

function App() {
  const { isConnected, address } = useAccount();
  const [email, setEmail] = useState("");
  const [isEmailLinked, setIsEmailLinked] = useState(false);

  // Just for testing purposes, simulated database of users
  const initialUserData = [
    { address: "0xAE13fCFb7aeb12361C186e30105H91867AfaC468", email: "tincho@gmail.com" },
    { address: "0xD4B56839bF7246142222Ab7b136EC2Ea061043e4", email: "tincho2@gmail.com"}
  ];
  const [userData, setUserData] = useState(initialUserData);


  useEffect(() => {
    if (!isConnected) {
      setEmail("");
      setIsEmailLinked(false);
    } else {
      const existingUser = userData.find((user) => user.address === address);
      if (existingUser) {
        setEmail(existingUser.email);
        setIsEmailLinked(true);
      } else {
        setEmail("");
        setIsEmailLinked(false);
      }
    }
  }, [isConnected]);

  const handleEmailLink = (email) => {
    setEmail(email);
    setIsEmailLinked(true);

    const existingUser = userData.find((user) => user.address === address);
    if (!existingUser) {
      setUserData((prevUserData) => [...prevUserData, { address, email }]);
    }
  };

  return (
    <div>
      <h1>Wallet Connect Testing 👨🏻‍💻</h1>
      <h3>Using RainbowKit 🌈 + Wagmi for sending transactions</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <ConnectButton label="Connect Your Wallet" accountStatus="address" />
        </div>
      </div>
      {!isEmailLinked && isConnected && (
        <LinkWithEmail onEmailLink={handleEmailLink} />
      )}
      {isEmailLinked && isConnected && (
        <div>
          <h2 style={{ fontSize: "18px" }}>User Email Account: {email}</h2>
          <SignMessage />
          <GrantApproval />
        </div>
      )}
    </div>
  );
}

export default App;
