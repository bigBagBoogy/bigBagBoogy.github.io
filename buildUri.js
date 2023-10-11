import { ethers } from "./ethers-5.6.esm.min.js";
import { abi } from "/constants.js"; // ethereum

const ETHEREUM_NETWORK = "0xaa36a7";
const POLYGON_NETWORK = "0x13881";
// const gasLimit = 300000;

const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      //Metamask is connected, update the image source
      document.getElementById("connectButton");
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    connectButton.style.backgroundColor = "green";
    connectButton.style.padding = "10px 45px";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
    const networkId = await detectConnectedNetwork();
    if (networkId === ETHEREUM_NETWORK) {
      console.log("Connected to Ethereum");
    } else {
      console.log("Connected to Polygon");
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

export async function mint(tokenUri, preferedNetwork) {
  const connectedNetwork = await detectConnectedNetwork(); // this will return chainId
  console.log(`connected network: ${connectedNetwork}`);
  let contractAddress;
  const contractAddressEthereum = "0xe30D6bB8993177Be246F3832E8A6aBd113256F25";
  const contractAddressPolygon = "0x4f7A244A8Fd94935389cDFc528dE599850d4605c";
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const userAddress = accounts[0]; // Get the user's address
  if (preferedNetwork === ETHEREUM_NETWORK) {
    contractAddress = contractAddressEthereum;
    if (connectedNetwork !== ETHEREUM_NETWORK) {
      await promptSwitchNetwork(ETHEREUM_NETWORK);
    }
    console.log(`minting ${tokenUri} to Ethereum: ${contractAddressEthereum}`);
  } else if (preferedNetwork === POLYGON_NETWORK) {
    if (connectedNetwork !== POLYGON_NETWORK) {
      await promptSwitchNetwork(POLYGON_NETWORK);
    }
    console.log(`minting ${tokenUri} to Polygon: ${contractAddressPolygon}`);
    contractAddress = contractAddressPolygon;
  }
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.mintNFT(userAddress, tokenUri); // without setting the gasLimit
      console.log("NFT will go to:", userAddress);
      const transactionResponse = await tx.wait();
      console.log("Transaction Response:", transactionResponse);
      console.log("Transaction Hash:", transactionResponse.transactionHash);

      const events = transactionResponse.events;
      if (events && events.length > 0) {
        const tokenIdHex = events[0].args.tokenId; // This is the tokenId in bigNumber hex
        const tokenId = BigInt(tokenIdHex); // Use BigInt to maintain precision
        console.log(
          "Token ID:",
          tokenId.toString(),
          "Contract Address:",
          contractAddress
        );
        alert(
          "Token ID: " +
            tokenId.toString() +
            "\nContract Address: " +
            contractAddress
        );

        const copyButton = document.createElement("button");
        copyButton.id = "copyButton";
        copyButton.textContent = "Copy Token ID";
        copyButton.addEventListener("click", () => {
          const textToCopy = tokenId + " " + contractAddress;
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              alert("Token ID and Contract Address copied to clipboard");
            })
            .catch((error) => {
              console.error("Failed to copy Token ID to clipboard:", error);
            });
        });
        document.body.appendChild(copyButton);
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  } else {
    console.error("Web3 provider not found (e.g., MetaMask)");
  }
}

export async function encodeImageToBase64(
  clientImageUrl,
  nftName,
  description,
  traitType,
  traitValue
) {
  try {
    console.log(clientImageUrl);
    const response = await fetch(clientImageUrl);
    const data = await response.blob();
    console.log(data);
    const base64Image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(data);
    });
    const metaData = `{"name":"${nftName}", "description":"${description}", `;
    const metaData2 = `"attributes": {"trait_type": "${traitType}", "value": "${traitValue}"}, "image":"`;
    const imgUri = `data:image/svg+xml;base64,${base64Image.split(",")[1]}`;
    const closingTag = '"}';

    const metadataString = `${metaData}${metaData2}${imgUri}${closingTag}`;
    // Base64 encode the entire metadata string
    const encodedMetadata = btoa(metadataString);
    const jsonTokenUri = `data:application/json;base64,${encodedMetadata}`;
    // console.log(jsonTokenUri);

    return {
      metadata: metadataString,
      tokenUri: jsonTokenUri,
      imgUri: imgUri,
    };
  } catch (error) {
    throw error;
  }
}
export function testinteraction() {
  console.log("test");
}
// helper functions
// Function to prompt the user to switch networks
async function promptSwitchNetwork(targetChainId) {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request to switch to the target network
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      });
      console.log("Switched to the target network.");
    } catch (error) {
      console.error("Error switching networks:", error);
    }
  }
}
// Function to detect connected network
export async function detectConnectedNetwork() {
  if (typeof window.ethereum !== "undefined") {
    const networkId = await ethereum.request({ method: "eth_chainId" }); // Get the chain ID
    return networkId;
  }
  return null;
}
