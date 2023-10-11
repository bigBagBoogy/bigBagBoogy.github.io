# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "hid imgContainer"
git push -u origin main

# todo:⭐️

add logic for switching Metamask's connected network (ethereum/polygon) - [x]

add user input fields to have a user create the Metadata. - [x]

add user SVG submission - [x]

get new mint contracts for both polygon and ehtereum with higher gas limits
and without the "is Ownable"

add logging event and user copy contract address + tokenID for ethereum

const toAddress = "0xEC5DBFed2e8A5E88De2AC7a9E5884B0bD4F6Ca7f"; should be changed to:
const toAddress = address(Signer); or address[Signer];?

# issue:

inpage.js:1 MetaMask - RPC Error: gas required exceeds allowance (30000000) {code: -32000, message: 'gas required exceeds allowance (30000000)'}

      ```const tx = await contractWithSigner.mintNFT(userAddress, tokenUri, {
        gasLimit: 50000000,
      }); // Set the gasLimit (size: 36kb > 30000000 gas)```

The above approach won't work, because the blocksize is exceeded for these bigger NFT's.

--> MetaMask - RPC Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32000,"message":"exceeds block gas limit"}}'

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
