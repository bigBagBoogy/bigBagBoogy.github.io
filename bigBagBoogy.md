# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "amended CSS"
git push -u origin main

# todo:⭐️

add logic for switching Metamask's connected network (ethereum/polygon) - [x]

add user input fields to have a user create the Metadata. - [x]

add user SVG submission - [x]

get new mint contracts for both polygon and ehtereum without the "is Ownable" - [x]

add logging event and user copy contract address + tokenID for ethereum

const toAddress = "0xEC5DBFed2e8A5E88De2AC7a9E5884B0bD4F6Ca7f"; should be changed to:
const toAddress = address(Signer); or address[Signer];? - [x]

add ASCII application. extra page or pop-up?
max size of image to convert?
png AND jpg?

# issue:

The switching of networks (polygon <--> ethereum) does not work properly if the user has not yet added the Polygon network!!!

inpage.js:1 MetaMask - RPC Error: gas required exceeds allowance (30000000) {code: -32000, message: 'gas required exceeds allowance (30000000)'}

     const tx = await contractWithSigner.mintNFT(userAddress, tokenUri, {
        gasLimit: 50000000,
      }); // Set the gasLimit (size: 36kb > 30000000 gas)

The above approach won't work, because the blocksize is exceeded for these bigger NFT's.

--> MetaMask - RPC Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32000,"message":"exceeds block gas limit"}}'

- later: ASCII snapshot to NFT

# let's:

Token ID: 0 contractAddress: 0xe30D6bB8993177Be246F3832E8A6aBd113256F25 🧩

# end of todo..........................................

origin https://github.com/bigBagBoogy/bigBagBoogy.github.io.git (fetch)
origin https://github.com/bigBagBoogy/bigBagBoogy.github.io.git (push)

# link to website:

https://bigBagBoogy.github.io
