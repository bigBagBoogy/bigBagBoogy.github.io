const popupContainer = document.getElementById("popupContainer");
const popupContent = popupContainer.querySelector(".popup-content");
const closeButton = popupContainer.querySelector("#closePopupButton");
const heading = popupContent.querySelector("h2");
const messageElement = document.getElementById("resultsText"); // Target the existing element for the message

export function openPopup(message) {
  console.log("Opening popup...");
  if (popupContainer) {
    heading.textContent = "Calculation Results";
    messageElement.innerHTML = message; // Set the message directly
    popupContainer.style.display = "flex";
  }
}

// Close popup
export function closePopup() {
  popupContainer.style.display = "none";
}
