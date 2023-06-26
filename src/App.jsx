import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { SignMessage } from "./SignMessage";
import GrantApproval from "./GrantApproval";

function App() {
  const { isConnected } = useAccount();

  return (
    <div>
      <h1>Wallet Connect Testing</h1>
      <h3>Using RainbowKit + Wagmi for sending transactions</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <ConnectButton label="Connect Your Wallet" accountStatus="address" />
        </div>
      </div>
      {isConnected && <SignMessage />}
      {isConnected && <GrantApproval />}
    </div>
  );
}

export default App;
