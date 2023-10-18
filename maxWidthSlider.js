const maxWidthSlider = document.getElementById("maxWidthSlider");
const maxWidthValue = document.getElementById("maxWidthValue");

let maxWidth = parseInt(maxWidthSlider.value); // Initialize maxWidth with the slider's initial value

maxWidthSlider.addEventListener("input", () => {
  maxWidth = parseInt(maxWidthSlider.value);
  maxWidthValue.textContent = maxWidth; // Update the displayed value of maxWidth
});

export function getMaxWidth() {
  return maxWidth;
}
