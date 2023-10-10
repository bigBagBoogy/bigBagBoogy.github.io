# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "fixed bigNumber parsing bug"
git push -u origin main

# todo:⭐️

add logic for switching Metamask's connected network (ethereum/polygon) - [x]

add user input fields to have a user create the Metadata. - [x]

add user SVG submission - [x]

add logging event and user copy contract address + tokenID for ethereum

const toAddress = "0xEC5DBFed2e8A5E88De2AC7a9E5884B0bD4F6Ca7f"; should be changed to:
const toAddress = address(Signer); or address[Signer];?

# issue:

inpage.js:1 MetaMask - RPC Error: gas required exceeds allowance (30000000) {code: -32000, message: 'gas required exceeds allowance (30000000)'}

Replace poly and eth contracts and ABI's to accept gas limit parameter if you want to be able to mint bigger NFT's: include below:
const gasLimit = **a very large amount**; // Set a higher gas limit
const transactionResponse = await contract.mintNFT(to, tokenURI, { gasLimit });

function mintNFT(address to, string memory tokenURI, uint256 gasLimit) external

- later: ASCII snapshot to NFT

# let's:

look into creating ECMAScript modules. 🧩

# end of todo..........................................

if (clientImageUrl == null) {
// Handle the case where no file is selected
alert("No image file selected");
// or for development purposes, pass in a different image url here:
// clientImageUrl = imageUrl;
// console.error("No image file selected");
return;
}
