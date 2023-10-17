// Add this JavaScript to enable image upload and preview
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

const imageContainer1 = document.getElementById("imageContainer1");

imageContainer1.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer1.classList.add("drag-over");
});

imageContainer1.addEventListener("dragleave", () => {
  imageContainer1.classList.remove("drag-over");
});

imageContainer1.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer1.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});
