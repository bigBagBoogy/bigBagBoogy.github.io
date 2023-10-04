import { mint, encodeImageToBase64 } from "./buildUri.js";

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const traitTypeInput = document.getElementById("traitType");
const traitValueInput = document.getElementById("traitValue");

const mintButton = document.getElementById("mintButton");
const mintOnPolygonButton = document.getElementById("mintOnPolygonButton");
const checkURIbutton = document.getElementById("checkURIbutton");
const uriContainer = document.getElementById("uriContainer");
const imageUrl = "/images/bearYellow.svg"; // ********* Change this to your image path *********
const ETHEREUM_NETWORK = "0xaa36a7";
const POLYGON_NETWORK = "0x13881";

let nftName;
let description;
let traitType;
let traitValue;

checkURIbutton.addEventListener("click", async () => {
  nftName = nameInput.value;
  description = descriptionInput.value;
  traitType = traitTypeInput.value;
  traitValue = traitValueInput.value;
  // Call encodeImageToBase64 with the input values
  const { metadata, imgUri } = await encodeImageToBase64(
    imageUrl,
    nftName,
    description,
    traitType,
    traitValue
  );
  uriContainer.textContent = metadata;
  imageContainer.src = imgUri; // Set the src attribute to display the image
});
// mint on Ethereum
mintButton.addEventListener("click", async () => {
  const preferedNetwork = ETHEREUM_NETWORK;
  const { metadata, tokenUri, imgUri } = await encodeImageToBase64(
    imageUrl,
    nftName,
    description,
    traitType,
    traitValue
  );
  uriContainer.textContent = metadata;
  imageContainer.src = imgUri; // Set the src attribute to display the image

  await mint(tokenUri, preferedNetwork);
});
// mint on Polygon
mintOnPolygonButton.addEventListener("click", async () => {
  const preferedNetwork = POLYGON_NETWORK;
  const { metadata, tokenUri, imgUri } = await encodeImageToBase64(imageUrl);
  uriContainer.textContent = metadata;
  imageContainer.src = imgUri; // Set the src attribute to display the image

  await mint(tokenUri, preferedNetwork);
});
