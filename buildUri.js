import { ethers } from "./ethers-5.6.esm.min.js";
import { abi } from "/constants.js"; // ethereum

const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
async function connect() {
  console.log("Button clicked");
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      //Metamask is connected, update the image source
      document.getElementById("connectButton").src =
        "images/metamaskConnected.svg";
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

export async function mint(tokenUri, preferedNetwork) {
  let contractAddress;
  const contractAddressEthereum = "0x0d3F6Baf4639da5120B777E728Fd9eC184C1550f";
  const contractAddressPolygon = "0xda46867287aDB1f7189a19845c498e87F1cca7F9";
  if (preferedNetwork === "ethereum") {
    contractAddress = contractAddressEthereum;
    console.log(`minting ${tokenUri} to Ethereum: ${contractAddressEthereum}`);
  } else if (preferedNetwork === "polygon") {
    console.log(`minting ${tokenUri} to Polygon: ${contractAddressPolygon}`);
    contractAddress = contractAddressPolygon;
  }
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const toAddress = "0xEC5DBFed2e8A5E88De2AC7a9E5884B0bD4F6Ca7f";
      console.log(`minting ${tokenUri} to: ${toAddress}`);
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.mintNFT(toAddress, tokenUri);
      await tx.wait();
      console.log("NFT minted successfully");
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  } else {
    console.error("Web3 provider not found (e.g., MetaMask)");
  }
}

export async function encodeImageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const data = await response.blob();

    const base64Image = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(data);
    });

    const metaData = '{"name":"Rock-Bear", "description":"Hell yeah!", ';
    const metaData2 =
      '"attributes": {"trait_type": "Purple", "value": "100"}, "image":"';
    const imgUri = `data:image/svg+xml;base64,${base64Image.split(",")[1]}`;
    const closingTag = '"}';

    const metadataString = `${metaData}${metaData2}${imgUri}${closingTag}`;
    // Base64 encode the entire metadata string
    const encodedMetadata = btoa(metadataString);
    const jsonTokenUri = `data:application/json;base64,${encodedMetadata}`;
    console.log(jsonTokenUri);

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
