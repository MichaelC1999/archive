import './App.css';
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Storage } from 'web3.storage'



const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID // required
    }
  }
};


function App() {
  const [urlInput, setUrlInput] = useState("");
  const [web3ModalProvider, setWeb3ModalProvider] = useState(null)

  const archive = async () => {
    console.log('archive')
    makeConnection()
  }

  const makeConnection = async () => {
    console.log('CONNECT')
    let web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions
    })
    let web3ModalInstance = await web3Modal.connect()
    setWeb3ModalProvider(new ethers.providers.Web3Provider(web3ModalInstance))
  }

  useEffect(() => {
    // Code to execute upon initial connection
    console.log(web3ModalProvider)
  }, [web3ModalProvider])

  const isValidURL = (str) => {
    try {
      new URL(urlInput)
      return true
    } catch (err) {
      return false
    }
  }
  console.log(urlInput, isValidURL(urlInput))
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Enter a URL to archive
        </h2>
        <input style={{ fontSize: "20px", height: "30px", marginBottom: "20px", width: "60%" }} type="text" onChange={(x) => setUrlInput(x.target.value)} value={urlInput} />
        <button
          className="App-button"
          target="_blank"
          style={{ height: "40px", width: "120px", fontSize: "20px" }}
          onClick={() => archive()}
        >
          Archive
        </button>
      </header>
    </div>
  );
}

export default App;
