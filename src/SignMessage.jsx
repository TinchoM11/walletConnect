import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";

export function SignMessage() {
  const { data, error, isLoading, signMessage, variables } = useSignMessage();
  const { address } = useAccount();

  React.useEffect(() => {
    (async () => {
      if (variables?.message) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: data,
        });

        console.log("Address Recovered:", recoveredAddress);
        console.log(
          "Equals wallet expected:",
          recoveredAddress === "0xAE13fCFb77eb02361C196e30105E91867AfaC369"
        );
      }
    })();
  }, [data, variables?.message]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = formData.get("message");
        signMessage({ message });
      }}
      style={{
        background: "#222",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "650px",
        margin: "0 auto",
        marginTop: "10px",
      }}
    >
      <div style={{ marginBottom: "5px", color: "white" }}>
        User Address: {address}
      </div>
      <label htmlFor="message" style={{ color: "white", marginBottom: "10px" }}>
        Enter a message to sign
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="Sign this message to prove you own this address"
        style={{
          width: "100%",
          minHeight: "100px",
          borderRadius: "4px",
          padding: "5px",
        }}
      />
      <button
        disabled={isLoading}
        style={{
          marginTop: "10px",
          background: "#2499c7",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "10px",
          width: "100%",
        }}
      >
        {isLoading ? "Check Wallet" : "Sign Message"}
      </button>
      {data && (
        <div style={{ marginTop: "20px", color: "white" }}>
          <div style={{ marginBottom: "5px" }}>Signature:</div>
          <div
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
              maxWidth: "100%",
              borderRadius: "4px",
              background: "#444",
              padding: "5px",
            }}
          >
            {data}
          </div>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "white" }}>{error.message}</div>
      )}
    </form>
  );
}
