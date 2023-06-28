import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";

export default function SignMessage() {
  const { data, error, isLoading, signMessage, variables } = useSignMessage();
  const { address } = useAccount();
  const [recoveredAddress, setRecoveredAddress] = React.useState("");

  React.useEffect(() => {
    (async () => {
      if (variables?.message) {
        const recovered = await recoverMessageAddress({
          message: variables?.message,
          signature: data,
        });
        setRecoveredAddress(recovered);
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
          width: "90%",
          minHeight: "50px",
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
          width: "50%",
        }}
      >
        {isLoading ? "Check Wallet" : "Sign Message"}
      </button>
      {data && (
        <div style={{ marginTop: "20px", color: "white" }}>
          {recoveredAddress === address ? (
            <div>
              <div style={{ marginBottom: "5px" }}>
                ¡Address Recovered Match with Expected! ✅
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: "5px" }}>
                ¡Address Recovered Doesn't Match with Expected! ❌
              </div>
            </div>
          )}
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
        <div style={{ marginTop: "10px", color: "white" }}>{error.message}</div>
      )}
    </form>
  );
}
