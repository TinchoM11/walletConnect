import { ethers } from "ethers";
import React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
} from "wagmi";

const GrantApproval = () => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC Contract Address on Polygon
    abi: erc20ABI,
    functionName: "approve",
    args: ["0xAE13fCFb77eb02361C196e30105E91867AfaC369", "10000000"], // Spender and Amount to approve
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button
        style={{
          marginTop: "10px",
          background: "#2499c7",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "10px",
          width: "300px",
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
            <a href={`https://polygonscan.com/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
};

export default GrantApproval;
