import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
  useNetwork,
} from "wagmi";

const GrantApproval = () => {
  const [spenderAddress, setSpenderAddress] = useState("");
  const [chainUSDCAddress, setChainUSDCAddress] = useState("");
  const { chain } = useNetwork();

  useEffect(() => {
    setChainUSDCAddress(USDCAddresses[chain.id]);
  }, [chain.id]);

  const USDCAddresses = {
    1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC Contract Address on Ethereum
    137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC Contract Address on Polygon
    56: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // USDC Contract Address on BSC
    10: "0x7f5c764cbc14f9669b88837ca1490cca17c31607", // USDC Contract Address on Optimism
    43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", // USDC Contract Address on Avalanche
    42161: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", // USDC Contract Address on Arbitrum
    250: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", // USDC Contract Address on Fantom
  };

  const amountToApprove = chain.id === 56 ? "10000000000000000000" : "10000000"
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: chainUSDCAddress, // USDC Contract Address
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
            <a href={`https://polygonscan.com/tx/${data?.hash}`}>
              View on Polygonscan
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrantApproval;
