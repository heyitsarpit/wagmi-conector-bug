'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        <div style={{ display: 'flex', flexDirection:"column", gap: 8 }}>
        {connectors.map((connector) => (
          <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          type="button"
          style={{width: "200px"}}
          >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={connector.icon} alt={connector.name} width={20} height={20} />
            {connector.name}
          </div>
          </button>
        ))}

        </div>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
