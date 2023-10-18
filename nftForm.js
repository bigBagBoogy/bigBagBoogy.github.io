import { mint, encodeImageToBase64 } from "./buildUri.js";
import { openPopup } from "./popup.js";

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const traitTypeInput = document.getElementById("traitType");
const traitValueInput = document.getElementById("traitValue");
const nftImageInput = document.getElementById("nftImageButton");
const nameOfNft = document.getElementById("name");
const descriptionOfNft = document.getElementById("description");
const traitTypeOfNft = document.getElementById("traitType");
const traitValueOfNft = document.getElementById("traitValue");
const mintButton = document.getElementById("mintButton");
const mintOnPolygonButton = document.getElementById("mintOnPolygonButton");
// const checkURIbutton = document.getElementById("checkURIbutton");
const uriContainer = document.getElementById("uriContainer");
const imageUrl = "/images/bearYellow.svg"; // ********* Change this to your image path *********
const ETHEREUM_NETWORK = "0xaa36a7";
const POLYGON_NETWORK = "0x13881";

let nftName;
let description;
let traitType;
let traitValue;

nameOfNft.addEventListener("input", updateUriContainer);
descriptionOfNft.addEventListener("input", updateUriContainer);
traitTypeOfNft.addEventListener("input", updateUriContainer);
traitValueOfNft.addEventListener("input", updateUriContainer);

function updateUriContainer() {
  const nameValue = nameOfNft.value;
  const descriptionValue = descriptionOfNft.value;
  const traitTypeValue = traitTypeOfNft.value;
  const traitValueValue = traitValueOfNft.value;
  uriContainer.textContent =
    "name: " +
    nameValue +
    "\n" +
    "description: " +
    descriptionValue +
    "\n" +
    "traitType: " +
    traitTypeValue +
    "\n" +
    "traitValue: " +
    traitValueValue;
}

nftImageInput.addEventListener("change", function () {
  // Check if a file has been selected
  if (nftImageInput.files && nftImageInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageContainer = document.getElementById("imageContainer");

      // Get the file type
      const selectedFile = nftImageInput.files[0];
      const fileType = selectedFile.type;
      console.log("File type: " + fileType);

      // Get the file size in kilobytes
      const fileSize = selectedFile.size;
      const fileSizeKB = fileSize / 1024;
      console.log("File size: " + fileSizeKB + " KB" + fileSize + " bytes");
      if (fileSize > 22000) {
        const message = document.createElement("div");
        message.innerHTML = `File size exceeds the limit of 20 KB.<br>Please select a smaller file. Your file is: ${Math.floor(
          fileSizeKB
        )} KB`;
        openPopup(message);
        return;
      } else {
        imageContainer.src = e.target.result;
      }
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(nftImageInput.files[0]);
  }
});

// checkURIbutton.addEventListener("click", async () => {
//   const nftImageFile = nftImageInput.files[0];

//   if (!nftImageFile) {
//     // Handle the case where no file is selected
//     console.error("No image file selected");
//     return;
//   }
//   const reader = new FileReader();

//   reader.onload = async (event) => {
//     const imageUrl = event.target.result;
//     console.log("Image file loaded");
//     nftName = nameInput.value;
//     description = descriptionInput.value;
//     traitType = traitTypeInput.value;
//     traitValue = traitValueInput.value;
//     // Call encodeImageToBase64 with the input values
//     const { metadata, imgUri } = await encodeImageToBase64(
//       imageUrl,
//       nftName,
//       description,
//       traitType,
//       traitValue
//     );
//     uriContainer.textContent = metadata;
//     imageContainer.src = imgUri; // Set the src attribute to display the image
//     imageContainer.style.display = "block";
//   };

//   reader.readAsDataURL(nftImageFile);
// });

///////////////////////////////
//////// mint on Ethereum /////
///////////////////////////////
mintButton.addEventListener("click", async () => {
  const preferedNetwork = ETHEREUM_NETWORK;
  const nftImageFile = nftImageInput.files[0];
  if (!nftImageFile) {
    // Handle the case where no file is selected
    console.error("No image file selected");
    alert("No image file selected");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (event) => {
    const imageUrl = event.target.result;
    console.log("Image file loaded");
    nftName = nameInput.value;
    description = descriptionInput.value;
    traitType = traitTypeInput.value;
    traitValue = traitValueInput.value;
    // Call encodeImageToBase64 with the input values
    const { tokenUri } = await encodeImageToBase64(
      imageUrl,
      nftName,
      description,
      traitType,
      traitValue
    );
    await mint(tokenUri, preferedNetwork);
  };

  reader.readAsDataURL(nftImageFile);
});
////////////////////
// mint on Polygon//
////////////////////
mintOnPolygonButton.addEventListener("click", async () => {
  const preferedNetwork = POLYGON_NETWORK;
  const nftImageFile = nftImageInput.files[0];
  if (!nftImageFile) {
    // Handle the case where no file is selected
    console.error("No image file selected");
    alert("No image file selected");
    return;
  }
  const reader = new FileReader();

  reader.onload = async (event) => {
    const imageUrl = event.target.result;
    console.log("Image file loaded");
    nftName = nameInput.value;
    description = descriptionInput.value;
    traitType = traitTypeInput.value;
    traitValue = traitValueInput.value;
    // Call encodeImageToBase64 with the input values
    const { tokenUri } = await encodeImageToBase64(
      imageUrl,
      nftName,
      description,
      traitType,
      traitValue
    );
    await mint(tokenUri, preferedNetwork);
  };

  reader.readAsDataURL(nftImageFile);
});
