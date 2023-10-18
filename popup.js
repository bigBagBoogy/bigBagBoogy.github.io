const popupContainer = document.getElementById("popupContainer");
const popupContent = popupContainer.querySelector(".popup-content");
const closeButton = popupContainer.querySelector("#closePopupButton");
const heading = popupContent.querySelector("h2");
const messageElement = document.createElement("p"); // Create a new paragraph element for the message

export function openPopup(message) {
  console.log("popup function");
  if (popupContent) {
    heading.textContent = "File too big";
    closeButton.textContent = "Close";
    popupContent.appendChild(message);
    popupContainer.style.display = "flex";
    closeButton.addEventListener("click", closePopup);
  }
}

// Close popup
export function closePopup() {
  popupContainer.style.display = "none";
  closeButton.removeEventListener("click", closePopup);
  // Remove the message element when closing
  if (popupContent.contains(messageElement)) {
    popupContent.removeChild(messageElement);
  }
}
