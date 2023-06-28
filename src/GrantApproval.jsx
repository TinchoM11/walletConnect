import { ethers } from "ethers";
import React, { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
} from "wagmi";

const GrantApproval = () => {
  const [spenderAddress, setSpenderAddress] = useState("");
  const amountToApprove = "10000000"; //  10 USDC
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC Contract Address on Polygon
    abi: erc20ABI,
    functionName: "approve",
    args: [spenderAddress, amountToApprove], // Spender and Amount to approve
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleAddressChange = (event) => {
    setSpenderAddress(event.target.value); // Actualiza el estado con la dirección ingresada por el usuario
  };

  return (
    <div>
      <label
        htmlFor="spender-address"
        style={{
          fontSize: "20px",
          color: "black",
          fontStyle: "bold",
        }}
      >
        Spender Address:
      </label>
      <input
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          background: "#515151",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "10px",
          width: "300px",
        }}
        type="text"
        id="spender-address"
        placeholder="Insert Address"
        value={spenderAddress}
        onChange={handleAddressChange}
      />
      <button
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          background: "#2499c7",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "10px",
          width: "200px",
        }}
        disabled={!write || isLoading}
        onClick={() => write()}
      >
        {isLoading ? "Approving..." : "Grant Approval 10 USDC"}
      </button>
      {isSuccess && (
        <div>
          Successfully Granted Approval
          <div>
            <p>Tx Hash: {data?.hash}</p>
            <a href={`https://polygonscan.com/tx/${data?.hash}`}>View on Polygonscan</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrantApproval;
