import Head from "next/head";
import TextField from "@mui/material/TextField";

import Web3Modal from "web3modal";
import { providers } from "ethers";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Crypto State
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const web3ModalRef = useRef();

  // Input State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the signer from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      setWalletConnected(true);
      setAddress(address);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>Create your experience NFT</title>
        <meta
          name="description"
          content="Generate unique NFTs to record your experience in your favorite locations, such as restaurants, bars and clubs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Your experience NFT: {address}</h1>
        <TextField
          required
          id="name"
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          required
          id="description"
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          required
          id="image"
          label="Image"
          value={image}
          onChange={handleImageChange}
        />
      </main>
    </div>
  );
}
