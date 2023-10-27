# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "improved CSS"
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

# free hosting static site:

GitHub Pages: Offers free hosting for static websites directly from your GitHub repositories.

Netlify: Provides a powerful platform for deploying static sites, with continuous deployment, custom domains, and serverless functions. It has a free plan.

Vercel (formerly Zeit): Offers hosting for static and serverless functions, with automatic deployments from your Git repository. It has a free tier.

GitLab Pages: GitLab's equivalent to GitHub Pages, which allows you to host static sites from your GitLab repositories.

Bitbucket: Bitbucket offers static website hosting directly from your repositories. It's a similar service to GitHub Pages.

AWS Amplify: Part of Amazon Web Services (AWS), it offers hosting for static sites and serverless functions. A free tier is available.

Firebase Hosting: Part of Google's Firebase platform, it provides hosting for web apps, including static websites. Firebase has a free plan.

Render: Offers a platform for web hosting and application deployment. It provides a free tier for small projects.

Zeit Now (deprecated, replaced by Vercel): Zeit's predecessor, which offered hosting and deployments for web projects.

Surge: Provides simple static site hosting with custom domains. It offers a free plan.

# hidden code:

bearGreen card-flip animation. commented out in html line 70 and JS line 277

🚀 Excited to introduce my latest project - a cutting-edge Dapp for NFT enthusiasts! 🎨✨

🔹 Introducing Testnet NFT-minter 🔹

✨ What makes it unique? ✨

🌟 100% On-Chain Minting: No more relying on centralized servers or ipfs! With Testnet NFT-minter, you can mint NFTs directly on the Ethereum and Polygon testnets, ensuring trust and decentralization.

🖼️ SVG Magic: Love SVG images? We support SVG images up to 20KB, giving you the creative freedom you desire. Make your art come to life!

🎨 Ascii Art Transformation: Ever wondered how your PNG or JPG image would look as an ASCII art SVG? Wonder no more! [Your Dapp's Name] can transform your images into captivating ASCII art.

📈 NFT Portfolio Tracker: Easily monitor your NFT collection by simply submitting your public key. Keep an eye on your investments and share your unique art with the world.

🔗 https://bigbagboogy.github.io/

Feel free to reach out for more details or a demo. Let's shape the future of NFTs together! 🚀

#NFTs #Web3 #DecentralizedArt #CryptoArt #Ethereum #Polygon #Blockchain #WebDevelopment #Dapp
